const endpoint = window.ESTIMATE_SITE_CONFIG?.formEndpoint?.trim() || "";

const heroSlides = [...document.querySelectorAll(".hero-slide")];
const heroSlideButtons = [...document.querySelectorAll("[data-hero-slide]")];
const heroRotationToggle = document.querySelector("[data-hero-rotation]");
if (heroSlides.length && heroSlideButtons.length) {
  let activeHeroSlide = 0;
  let rotationPaused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const showHeroSlide = (index) => {
    activeHeroSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === activeHeroSlide));
    heroSlideButtons.forEach((button, buttonIndex) => button.setAttribute("aria-pressed", String(buttonIndex === activeHeroSlide)));
  };
  heroSlideButtons.forEach((button) => {
    button.addEventListener("click", () => showHeroSlide(Number(button.dataset.heroSlide)));
  });
  const syncRotationToggle = () => {
    if (!heroRotationToggle) return;
    heroRotationToggle.setAttribute("aria-pressed", String(rotationPaused));
    heroRotationToggle.textContent = rotationPaused ? "자동 넘김 다시 시작" : "자동 넘김 멈춤";
  };
  heroRotationToggle?.addEventListener("click", () => {
    rotationPaused = !rotationPaused;
    syncRotationToggle();
  });
  syncRotationToggle();
  window.setInterval(() => {
    if (!rotationPaused && !document.hidden) showHeroSlide(activeHeroSlide + 1);
  }, 7000);
}

export function validatePhone(value) {
  return /^01[016789]-?\d{3,4}-?\d{4}$/.test(value.replace(/\s/g, ""));
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, digits.length - 4)}-${digits.slice(-4)}`;
}

function track(event, data = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

const responseFrame = document.createElement("iframe");
responseFrame.name = "estimate-lead-response";
responseFrame.title = "상담 접수 처리";
responseFrame.hidden = true;
document.body.append(responseFrame);

let pendingLead = null;
let pendingTimer = null;

function setFormStatus(form, message, type = "") {
  const status = form.querySelector(".form-status");
  status.className = "form-status";
  status.textContent = message;
  if (type) status.classList.add(type);
}

window.addEventListener("message", (event) => {
  // HtmlService may wrap its response in an extra iframe, so source can differ
  // from the named response frame. Verify the Google origin and request nonce.
  if (!/^https:\/\/(script\.google\.com|script\.googleusercontent\.com|[a-z0-9-]+-script\.googleusercontent\.com)$/.test(event.origin)) return;
  const result = event.data;
  if (!pendingLead || !result || result.channel !== "estimate-lead-result" || result.requestId !== pendingLead.id) return;

  clearTimeout(pendingTimer);
  const form = pendingLead.form;
  const submit = form.querySelector('button[type="submit"]');
  pendingLead = null;
  submit.disabled = false;
  submit.textContent = form.dataset.submitLabel || "견주남 지원금 신청하기";
  if (result.ok !== true) {
    setFormStatus(form, "접수에 실패했습니다. 입력 내용을 확인한 뒤 다시 시도해 주세요.", "error");
    return;
  }

  form.reset();
  track("generate_lead", { service: result.service || "", source: result.source || "" });
  if (result.alertSent === false) {
    setFormStatus(form, "상담 내용은 저장됐지만 운영자 알림 전송이 지연되고 있습니다. 다시 제출하지 않으셔도 됩니다.", "error");
    return;
  }
  setFormStatus(form, "상담 신청이 접수되었습니다. 확인 후 연락드리겠습니다.", "success");
});

async function submitLead(form) {
  const data = new FormData(form);
  const phone = String(data.get("phone") || "");
  const selectedServices = data.getAll("service").map((service) => String(service));

  setFormStatus(form, "");

  if (data.get("website")) return;
  if (!selectedServices.length) {
    setFormStatus(form, "필요한 서비스를 하나 이상 선택해 주세요.", "error");
    form.querySelector('input[name="service"]')?.focus();
    return;
  }
  const requiredFields = [...form.querySelectorAll('[required]:not([name="privacy"])')];
  if (requiredFields.some((field) => !field.checkValidity())) {
    form.reportValidity();
    return;
  }
  if (!validatePhone(phone)) {
    setFormStatus(form, "연락 가능한 휴대폰 번호를 확인해 주세요.", "error");
    form.elements.phone.focus();
    return;
  }
  if (!data.get("privacy")) {
    setFormStatus(form, "상담을 위해 개인정보 수집 및 이용 동의가 필요합니다.", "error");
    form.elements.privacy.focus();
    return;
  }

  const standardFields = new Set(["id", "submittedAt", "source", "service", "location", "name", "phone", "privacy", "website", "space", "quantity", "note"]);
  const extraDetails = [...data.entries()]
    .filter(([key, value]) => !standardFields.has(key) && String(value).trim())
    .map(([key, value]) => `${form.querySelector(`[name="${CSS.escape(key)}"]`)?.labels?.[0]?.textContent?.replace("(선택)", "").trim() || key}: ${String(value).trim()}`);
  const noteParts = [String(data.get("note") || "").trim(), ...extraDetails].filter(Boolean);
  const lead = {
    id: crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    submittedAt: new Date().toISOString(),
    source: form.dataset.source || (location.pathname.includes("cctv") ? "cctv-landing" : "main-landing"),
    service: selectedServices.join(", "),
    location: String(data.get("location") || ""),
    name: String(data.get("name") || ""),
    phone: formatPhone(phone),
    privacyAccepted: data.get("privacy") === "agree",
    website: String(data.get("website") || ""),
    space: String(data.get("space") || ""),
    quantity: String(data.get("quantity") || ""),
    note: noteParts.join("\n"),
  };

  if (!endpoint) {
    setFormStatus(form, "친구 검토용 미리보기입니다. 상담 신청은 실제 접수되지 않습니다.", "error");
    return;
  }
  if (pendingLead) return;

  const submit = form.querySelector('button[type="submit"]');
  submit.disabled = true;
  submit.textContent = "접수 중...";
  pendingLead = { ...lead, form };
  setFormStatus(form, "상담 요청을 보내고 있습니다.");

  try {
    const transport = document.createElement("form");
    transport.method = "POST";
    transport.action = endpoint;
    transport.target = responseFrame.name;
    const fields = {
      payload: JSON.stringify(lead),
      website: lead.website,
      parentOrigin: window.location.origin === "null" ? "" : window.location.origin,
    };
    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      transport.append(input);
    });
    document.body.append(transport);
    transport.submit();
    transport.remove();
    pendingTimer = setTimeout(() => {
      if (!pendingLead || pendingLead.id !== lead.id) return;
      pendingLead = null;
      submit.disabled = false;
      submit.textContent = form.dataset.submitLabel || "견주남 지원금 신청하기";
      setFormStatus(form, "접수 확인이 지연되고 있습니다. 중복 신청 전 전화 또는 카카오톡으로 문의해 주세요.", "error");
    }, 25000);
  } catch {
    pendingLead = null;
    submit.disabled = false;
    submit.textContent = form.dataset.submitLabel || "견주남 지원금 신청하기";
    setFormStatus(form, "접수 연결에 문제가 있습니다. 잠시 뒤 다시 시도해 주세요.", "error");
  }
}

document.querySelectorAll('input[name="phone"]').forEach((input) => {
  input.addEventListener("input", () => {
    input.value = formatPhone(input.value);
  });
});

document.querySelectorAll('.service-choice-group input[name="service"]').forEach((input) => {
  input.addEventListener("change", () => {
    if (!input.checked) return;
    input.closest(".service-choice-group")?.querySelectorAll('input[name="service"]').forEach((sibling) => {
      if (sibling !== input) sibling.checked = false;
    });
  });
});

document.querySelectorAll("#consultation-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitLead(form);
  });
});

document.querySelectorAll("[data-service]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const form = document.querySelector("#consultation-form");
    if (!form) return;
    const choice = [...form.querySelectorAll('input[name="service"]')].find((input) => input.value === trigger.dataset.service);
    if (!choice) return;
    choice.checked = true;
    choice.closest(".service-choice-group")?.querySelectorAll('input[name="service"]').forEach((sibling) => {
      if (sibling !== choice) sibling.checked = false;
    });
  });
});

document.querySelectorAll("[data-activity-board]").forEach((board) => {
  const buttons = [...board.querySelectorAll("[data-activity-filter]")];
  const rows = [...board.querySelectorAll(".activity-row[data-activity-category]")];
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.activityFilter;
      buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      rows.forEach((row) => {
        row.hidden = category !== "all" && row.dataset.activityCategory !== category;
      });
    });
  });
});

const demoActivityRows = [...document.querySelectorAll(".activity-row[data-activity-category]")];
if (demoActivityRows.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const sampleNames = ["강*서", "문*우", "배*윤", "임*진", "신*호", "백*아", "남*준", "차*은", "유*민", "안*혁", "서*연", "노*현"];
  const startedAt = Date.now();
  const refreshInterval = 30000;
  const baseMinutes = demoActivityRows.map((row) => {
    const time = row.querySelector("[data-demo-time]")?.textContent?.trim() || "";
    const minutes = Number(time.match(/(\d+)분/)?.[1] || 0);
    const hours = Number(time.match(/(\d+)시간/)?.[1] || 0);
    return hours * 60 + minutes;
  });

  const refreshDemoActivity = () => {
    const elapsedMs = Date.now() - startedAt;
    const nameCycle = Math.floor(elapsedMs / refreshInterval);
    const elapsedMinutes = Math.floor(elapsedMs / 60000);
    demoActivityRows.forEach((row, index) => {
      const name = row.querySelector("[data-demo-name]");
      const time = row.querySelector("[data-demo-time]");
      if (name) name.textContent = sampleNames[(nameCycle + index) % sampleNames.length];
      if (time) {
        const age = baseMinutes[index] + elapsedMinutes;
        time.textContent = age >= 60 ? `${Math.floor(age / 60)}시간${age % 60 ? ` ${age % 60}분` : ""} 전` : age > 0 ? `${age}분 전` : "방금 전";
      }
    });
  };

  refreshDemoActivity();
  window.setInterval(refreshDemoActivity, refreshInterval);
}

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const open = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
    button.querySelector("span:last-child").textContent = open ? "−" : "+";
  });
});

const privacyDialog = document.querySelector("#privacy-dialog");
document.querySelectorAll("[data-open-privacy]").forEach((button) => {
  button.addEventListener("click", () => privacyDialog?.showModal());
});
document.querySelectorAll("[data-close-privacy]").forEach((button) => {
  button.addEventListener("click", () => privacyDialog?.close());
});

document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener("click", () => track("click_to_call", { placement: link.dataset.placement || "page" }));
});
document.querySelectorAll('a[href*="open.kakao.com"]').forEach((link) => {
  link.addEventListener("click", () => track("click_kakao", { placement: link.dataset.placement || "page" }));
});


