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
  if (result.ok !== true || result.alertSent !== true) {
    setFormStatus(form, "접수에 실패했습니다. 입력 내용을 확인한 뒤 다시 시도해 주세요.", "error");
    return;
  }

  form.reset();
  track("generate_lead", { service: result.service || "", source: result.source || "" });
  if (result.alertSent !== true) {
    setFormStatus(form, "상담 내용은 저장됐지만 운영자 알림 전송이 지연되고 있습니다. 다시 제출하지 않으셔도 됩니다.", "error");
    return;
  }
  setFormStatus(form, "상담 신청이 완료되었습니다. 순차적으로 유선 상담드리겠습니다.", "success");
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

  const standardFields = new Set(["id", "submittedAt", "source", "service", "location", "name", "phone", "privacy", "optionalConsent", "sharingConsent", "website", "space", "quantity", "note"]);
  const extraDetails = [...data.entries()]
    .filter(([key, value]) => !standardFields.has(key) && String(value).trim())
    .map(([key, value]) => `${form.querySelector(`[name="${CSS.escape(key)}"]`)?.labels?.[0]?.textContent?.replace("(선택)", "").trim() || key}: ${String(value).trim()}`);
  const noteParts = [String(data.get("note") || "").trim(), ...extraDetails].filter(Boolean);
  const optionalAccepted = data.get("optionalConsent") === "agree";
  if (!optionalAccepted && [data.get("location"), data.get("quantity"), ...noteParts].some(value => String(value || "").trim())) {
    setFormStatus(form, "추가 상담 정보를 입력하셨습니다. 선택 정보 이용에 동의하거나 해당 내용을 지운 뒤 신청해 주세요.", "error");
    form.querySelector(".consent-options").open = true;
    form.elements.optionalConsent.focus();
    return;
  }
  const lead = {
    id: crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    submittedAt: new Date().toISOString(),
    source: form.dataset.source || (location.pathname.includes("cctv") ? "cctv-landing" : "main-landing"),
    service: selectedServices.join(", "),
    location: String(data.get("location") || ""),
    name: String(data.get("name") || ""),
    phone: formatPhone(phone),
    privacyAccepted: data.get("privacy") === "agree",
    optionalAccepted,
    sharingAccepted: data.get("sharingConsent") === "agree",
    consentVersion: "2026-10-29",
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
  const options = document.createElement("details");
  options.className = "consent-options";
  options.innerHTML = '<summary>추가 정보 이용·상담업체 연결 동의 (선택)</summary><label><input type="checkbox" name="optionalConsent" value="agree">추가 상담 정보 수집·이용에 동의합니다. (선택)</label><p>목적: 상세 견적 상담. 항목: 입력한 지역·공간·수량·상품 조건·문의 내용. 보유기간: 접수일부터 90일, 철회 시 삭제. 동의하지 않아도 기본 상담이 가능합니다.</p><label><input type="checkbox" name="sharingConsent" value="agree">최싸네트웍스에 정보 제공을 동의합니다. (선택)</label><p>제공받는 자: 최싸네트웍스. 목적: 요청한 상품의 후속 상담 및 가입·설치 연결. 항목: 이름·전화번호·관심 서비스와 추가 정보 이용에 동의한 상담 내용. 보유기간: 견적주는남자 접수일부터 90일, 철회 시 삭제. 거부 시 해당 업체 연결은 제한되지만 기본 상담은 가능합니다.</p>';
  if (form.querySelector('[name="location"], [name="quantity"], [name="note"]')) { form.querySelector(".consent")?.after(options); }
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

import { activityHistory, activityCurrent } from "./activity-history.js?v=monthly-order-20261028";

const activityPanels = document.querySelectorAll(".activity-panel");
const activityInterval = 8000;
function animateActivityWave(rows) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  rows.forEach((row, index) => {
    row.getAnimations().forEach(animation => animation.cancel());
    row.animate([
      { opacity: .45, transform: 'translateY(5px)', backgroundColor: 'rgba(50,133,246,0)' },
      { opacity: 1, transform: 'translateY(-2px)', backgroundColor: 'rgba(50,133,246,.07)', offset: .45 },
      { opacity: 1, transform: 'translateY(0)', backgroundColor: 'rgba(50,133,246,0)' }
    ], { duration: 650, delay: index * 85, easing: 'ease-out', fill: 'backwards' });
  });
}
function refreshActivityHistory() {
  // Shared time slots select fixed batches, so reloads and visitors use the same history.
  const slot = Math.floor(Date.now() / activityInterval);
  const todayInKorea = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
  activityPanels.forEach((panel, panelIndex) => {
    const batches = activityHistory[panelIndex];
    if (!batches?.length) return;
    const rows = [...panel.querySelectorAll(".activity-row:not(.activity-row-head)")];
    const timeline = [...(panelIndex === 0 ? activityCurrent : []), ...batches.flat()]
      .filter(record => Date.parse(record.at) <= Date.now())
      .sort((a, b) => Date.parse(b.at) - Date.parse(a.at));
    if (!timeline.length || !rows.length) return;
    const pageCount = Math.ceil(timeline.length / rows.length);
    const start = (slot % pageCount) * rows.length;
    const records = timeline.slice(start, start + rows.length);
    const changed = rows[0]?.dataset.recordId !== records[0]?.id;
    rows.forEach((row, index) => {
      const record = records[index];
      const date = row.querySelector("[data-demo-date]");
      const time = row.querySelector("[data-demo-time]");
      if (!record || !date || !time) return;
      row.dataset.recordId = record.id;
      date.textContent = record.at.slice(5, 10).replace("-", ".");
      time.dateTime = record.at;
      time.textContent = record.at.slice(11, 16);
      row.children[1].textContent = record.item;
      row.querySelector("strong").textContent = record.name;
      const status = row.querySelector(".activity-status");
      const isPastApplication = panelIndex === 0 && record.at.slice(0, 10) < todayInKorea;
      const displayStatus = isPastApplication ? "상담 완료" : record.status;
      status.textContent = displayStatus;
      status.className = `activity-status ${displayStatus === "상담 진행중" ? "in-progress" : displayStatus === "상담 대기중" ? "waiting" : displayStatus.endsWith("완료") ? "done" : "application"}`;
    });
    if (changed) animateActivityWave(rows);
  });
}
if (activityPanels.length) {
  const tickActivity = () => {
    refreshActivityHistory();
    window.setTimeout(tickActivity, activityInterval - (Date.now() % activityInterval) + 25);
  };
  tickActivity();
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) refreshActivityHistory();
  });
}

const storySet = document.querySelector("[data-story-set]");
const storySetCopy = document.querySelector("[data-story-set-copy]");
const storyTrack = document.querySelector("[data-story-track]");
if (storySet && storySetCopy && storyTrack) {
  const cards = [...storySet.children];
  for (let index = cards.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [cards[index], cards[target]] = [cards[target], cards[index]];
  }
  storySet.replaceChildren(...cards);
  storySetCopy.replaceChildren(...cards.map((card) => card.cloneNode(true)));

  const setMarqueeSpeed = () => {
    const pixelsPerSecond = window.matchMedia("(max-width: 640px)").matches ? 48 : 68;
    const seconds = Math.max(28, Math.round(storySet.scrollWidth / pixelsPerSecond));
    storyTrack.style.setProperty("--story-duration", `${seconds}s`);
  };
  setMarqueeSpeed();
  window.addEventListener("resize", setMarqueeSpeed, { passive: true });
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


// Fixed, explicitly labeled examples: five chronological rows per shared time slot.
const benefitTable = document.querySelector('.benefit-table');
if (benefitTable) {
  const rows = [...benefitTable.querySelectorAll('.benefit-row:not(.benefit-row-head)')];
  let previousSlot = -1;
  const renderBenefitPage = () => {
    const slot = Math.floor(Date.now() / activityInterval);
    if (slot === previousSlot || !rows.length) return;
    previousSlot = slot;
    const start = (slot % Math.ceil(rows.length / 5)) * 5;
    rows.forEach((row, index) => {
      row.hidden = index < start || index >= start + 5;
      row.classList.toggle('benefit-page-last', index === start + 4);

    });
    animateActivityWave(rows.filter(row => !row.hidden));
  };
  const tickBenefits = () => {
    renderBenefitPage();
    window.setTimeout(tickBenefits, activityInterval - (Date.now() % activityInterval) + 25);
  };
  tickBenefits();
}
