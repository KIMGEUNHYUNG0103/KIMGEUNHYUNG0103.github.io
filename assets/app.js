const STORAGE_KEY = "quote-man-leads";
const endpoint = document.querySelector('meta[name="lead-endpoint"]')?.content?.trim();

export function validatePhone(value) {
  return /^01[016789]-?\d{3,4}-?\d{4}$/.test(value.replace(/\s/g, ""));
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, digits.length - 4)}-${digits.slice(-4)}`;
}

function readLeads() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function storeDemoLead(lead) {
  const leads = readLeads();
  leads.unshift(lead);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads.slice(0, 100)));
}

function track(event, data = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

async function submitLead(form) {
  const status = form.querySelector(".form-status");
  const submit = form.querySelector('button[type="submit"]');
  const data = new FormData(form);
  const phone = String(data.get("phone") || "");

  status.className = "form-status";
  status.textContent = "";

  if (data.get("website")) return;
  const requiredFields = [...form.querySelectorAll('[required]:not([name="privacy"])')];
  if (requiredFields.some((field) => !field.checkValidity())) {
    form.reportValidity();
    return;
  }
  if (!validatePhone(phone)) {
    status.classList.add("error");
    status.textContent = "연락 가능한 휴대폰 번호를 확인해 주세요.";
    form.elements.phone.focus();
    return;
  }
  if (!data.get("privacy")) {
    status.classList.add("error");
    status.textContent = "상담을 위해 개인정보 수집 및 이용 동의가 필요합니다.";
    form.elements.privacy.focus();
    return;
  }

  const lead = {
    id: crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
    source: location.pathname.includes("cctv") ? "cctv-landing" : "main-landing",
    service: String(data.get("service") || ""),
    location: String(data.get("location") || ""),
    name: String(data.get("name") || ""),
    phone: formatPhone(phone),
    space: String(data.get("space") || ""),
    quantity: String(data.get("quantity") || ""),
    note: String(data.get("note") || ""),
  };

  submit.disabled = true;
  submit.textContent = "접수 중...";

  try {
    if (endpoint) {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      status.textContent = "상담 신청이 접수되었습니다. 확인 후 연락드리겠습니다.";
    } else {
      storeDemoLead(lead);
      status.textContent = "시안용 접수가 완료되었습니다. 실제 알림·DB 연동은 배포 설정 단계에서 활성화됩니다.";
    }
    status.classList.add("success");
    track("generate_lead", { service: lead.service, source: lead.source });
    form.reset();
  } catch {
    status.classList.add("error");
    status.textContent = "접수 연결이 원활하지 않습니다. 010-3743-8889 또는 카카오톡으로 문의해 주세요.";
  } finally {
    submit.disabled = false;
    submit.textContent = form.dataset.submitLabel || "비밀 지원금 상담 신청하기";
  }
}

document.querySelectorAll('input[name="phone"]').forEach((input) => {
  input.addEventListener("input", () => {
    input.value = formatPhone(input.value);
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
    const select = form.elements.service;
    if (select) select.value = trigger.dataset.service;
  });
});

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
