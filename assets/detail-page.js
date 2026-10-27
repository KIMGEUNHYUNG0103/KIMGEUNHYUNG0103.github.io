const pages = {
  internet: {
    code: "01 / INTERNET · TV", service: "인터넷·TV", source: "internet-tv-detail",
    image: "assets/images/hero-internet-tv.jpg", alt: "인터넷과 TV 서비스를 이용하는 밝은 실내",
    title: "인터넷과 TV,\n우리 집 조건에 맞게 비교하세요.",
    lead: "사용 장소와 필요한 회선을 확인해 요금, 약정, 설치 조건을 함께 살펴봅니다.",
    bullets: ["신규·이전 설치", "인터넷 속도와 TV 구성", "약정·월 이용료 확인"],
    formTitle: "인터넷·TV 상담 신청", formCopy: "이름과 연락처만 적어도 상담을 요청할 수 있습니다.",
    fields: [
      { name: "setupType", label: "신청 유형", type: "select", options: ["신규 가입", "이전 설치", "상품 변경", "잘 모르겠어요"] },
      { name: "internetUse", label: "필요한 구성", type: "select", options: ["인터넷", "인터넷 + TV", "가족 회선 결합", "상담 후 결정"] }
    ],
    pointsTitle: "상담 때 확인하는 내용", points: ["설치할 주소와 건물 유형", "사용 중인 통신 서비스", "원하는 속도와 TV 채널 구성", "결합 가능한 휴대폰 회선"]
  },
  table: {
    code: "02 / TABLE ORDER · POS", service: "테이블오더·포스기", source: "table-order-detail",
    image: "assets/images/hero-table-order.jpg", alt: "테이블오더와 포스기를 사용하는 매장",
    title: "매장 운영에 맞는\n테이블오더·포스 구성을 찾아보세요.",
    lead: "좌석 수와 주문 흐름을 먼저 확인하고 매장에 필요한 장비 구성을 상담합니다.",
    bullets: ["테이블오더", "포스기 구성", "주문·결제 동선 확인"],
    formTitle: "매장 솔루션 상담 신청", formCopy: "매장 정보와 연락처를 남기면 필요한 항목부터 확인합니다.",
    fields: [
      { name: "storeType", label: "매장 업종", type: "select", options: ["음식점", "카페·디저트", "주점", "기타 매장"] },
      { name: "quantity", label: "테이블 수", type: "select", options: ["1~5개", "6~10개", "11~20개", "21개 이상", "아직 몰라요"] }
    ],
    pointsTitle: "매장에 맞춰 살펴볼 항목", points: ["테이블 수와 주문 방식", "포스기·결제 장비 구성", "주방 주문 전달 방식", "설치 일정과 운영 환경"]
  },
  home: {
    code: "01 / HOME SECURITY", service: "CCTV·보안·테이블오더", space: "주택·가정", source: "space-home-detail",
    image: "assets/images/space-home.png", alt: "정원과 현관이 있는 단독주택",
    title: "인터넷+TV 교체하면서\n보안과 CCTV까지?", lead: "현관, 주차 공간, 마당처럼 확인하고 싶은 곳에 맞춰 설치 조건을 살펴봅니다.",
    bullets: ["현관·마당·주차장", "실내·실외 설치 환경", "휴대폰 영상 확인"],
    formTitle: "가정용 보안 상담 신청", formCopy: "이름과 연락처만 남겨도 상담할 수 있습니다.",
    fields: [
      { name: "quantity", label: "예상 카메라 수", type: "select", options: ["1~2대", "3~4대", "5대 이상", "잘 모르겠어요"] }
    ],
    pointsTitle: "가정 환경에 따라 확인해요", points: ["설치할 곳이 실내인지 실외인지", "전원과 통신 연결 환경", "야간에도 확인이 필요한지", "휴대폰으로 영상을 볼지"]
  },
  store: {
    code: "02 / SMALL BUSINESS", service: "CCTV·보안·테이블오더", space: "소상공인 매장", source: "space-store-detail",
    image: "assets/images/space-store.png", alt: "유리 전면과 따뜻한 조명이 있는 소규모 매장",
    title: "인터넷+TV 지원금 받고\n테이블오더 지원금 받고\nCCTV+보안 지원금까지?", lead: "매장에 필요한 CCTV·보안과 테이블오더 도입 조건을 함께 비교해 인건비 절감 방안까지 안내합니다.",
    bullets: ["출입구·계산대 CCTV", "매장 보안 구성 상담", "테이블오더 도입과 인건비 절감 검토"],
    formTitle: "매장 보안·테이블오더 상담 신청", formCopy: "필요한 서비스와 매장 환경을 알려주시면 조건을 함께 살펴봅니다.",
    fields: [
      { name: "serviceNeeds", label: "상담할 내용", type: "select", options: ["CCTV·보안", "테이블오더 도입", "CCTV·보안 + 테이블오더", "함께 상담하고 싶어요"] }
    ],
    pointsTitle: "매장 보안과 운영을 함께 살펴요", points: ["매장 규모와 출입구 CCTV", "계산대와 사각지대 보안", "테이블오더 도입 조건", "주문·응대 업무와 인건비 절감 검토"]
  },
  restaurant: {
    code: "03 / RESTAURANT · CAFE", service: "CCTV·보안·테이블오더", space: "식당·카페", source: "space-restaurant-detail",
    image: "assets/images/space-restaurant.png", alt: "창가 좌석과 테이블이 있는 식당",
    title: "CCTV와 보안으로 매장을 지키고\n테이블오더로 인건비 절감까지", lead: "CCTV와 보안으로 매장을 지키고, 테이블오더 도입으로 인건비 절감까지 함께 살펴봅니다.",
    bullets: ["매장 CCTV·보안", "홀·주방·출입구 점검", "테이블오더 도입 상담"],
    formTitle: "식당·카페 보안·운영 상담 신청", formCopy: "CCTV·보안과 테이블오더 도입을 함께 살펴볼 수 있습니다.",
    fields: [
      { name: "serviceNeeds", label: "상담할 내용", type: "select", options: ["CCTV·보안", "테이블오더 도입", "CCTV·보안 + 테이블오더", "함께 상담하고 싶어요"] },
      { name: "cameraArea", label: "확인할 공간", type: "select", options: ["홀", "주방", "출입구·계산대", "창고·후문", "홀과 주방 모두"] },
      { name: "quantity", label: "예상 카메라 수", type: "select", options: ["1~2대", "3~4대", "5~8대", "9대 이상", "잘 모르겠어요"] }
    ],
    pointsTitle: "매장 보안과 운영을 함께 살펴요", points: ["홀·주방·출입구 CCTV", "계산대와 사각지대 보안", "테이블오더 도입 방식", "주문·응대 업무와 인건비 절감 검토"]
  },
  building: {
    code: "03 / BUILDING MANAGEMENT", service: "CCTV·출입보안·화재안전", space: "건물관리", source: "space-building-detail",
    image: "assets/images/building-management.png", alt: "유리와 석재 외벽으로 된 현대적인 상업용 건물 입구",
    title: "물리보안 효율화로\n인력 부담까지 줄이는 방안을 살펴봅니다.", lead: "CCTV·출입 관리 등 물리보안 설비를 연계해 건물 관리 효율을 높이고 인력 감축 방안을 함께 검토합니다. 불꽃감지기와 화재 초기 대응 설비도 상담할 수 있습니다.",
    bullets: ["공용부·주차장 CCTV", "출입·근태 관리 효율화", "물리보안으로 인력 감축 검토", "불꽃감지기와 화재 초기 대응"],
    formTitle: "건물관리 보안·안전 상담 신청", formCopy: "건물 규모와 필요한 설비를 알려주시면 공용공간과 운영 조건에 맞춰 살펴봅니다.",
    fields: [
      { name: "serviceNeeds", label: "상담할 내용", type: "select", options: ["공용부 CCTV", "출입·근태 관리", "물리보안·인력 감축", "불꽃감지기·화재 초기 대응", "보안·안전 통합 상담"] },
      { name: "cameraArea", label: "확인할 구역", type: "select", options: ["로비·공용부", "출입구", "주차장", "복도·계단", "여러 구역"] }
    ],
    pointsTitle: "건물 운영과 안전을 함께 살펴요", points: ["로비·공용부 CCTV 범위", "출입 권한과 근태 관리", "보안 설비 연계와 인력 운영 효율", "불꽃감지기 설치와 화재 초기 대응"]
  },
  factory: {
    code: "04 / FACTORY · WORKPLACE", service: "CCTV·경비·보안", space: "공장·사업장", source: "space-factory-detail",
    image: "assets/images/space-factory.png", alt: "넓은 생산 라인이 있는 공장 내부",
    title: "근태·출입 관리부터\n화재 초기 대응까지 살펴봅니다.", lead: "보안 CCTV와 근태·출입 관리로 사업장을 지키고, 불꽃감지기 연동으로 화재 징후를 빠르게 확인해 초기 대응을 돕습니다.",
    bullets: ["근태·출입 관리", "보안 CCTV와 사각지대 확인", "불꽃감지기로 화재 초기 대응"],
    formTitle: "공장·사업장 보안 상담 신청", formCopy: "사업장 규모와 필요한 보안·안전 설비를 알려주시면 설치 조건을 함께 살펴봅니다.",
    fields: [
      { name: "serviceNeeds", label: "필요한 설비", type: "select", options: ["근태·출입 관리", "보안 CCTV", "불꽃감지기·화재 초기 대응", "보안·화재 통합 상담", "현장 상담 필요"] },
      { name: "quantity", label: "사업장 규모", type: "select", options: ["소규모 사업장", "중소형 사업장", "대형 사업장", "여러 동·층 운영", "상담 후 결정"] }
    ],
    pointsTitle: "사업장 안전과 운영을 함께 살펴요", points: ["근태·출입 관리가 필요한 구역", "CCTV 설치 위치와 사각지대", "불꽃감지기 설치 환경", "화재 징후 확인과 초기 대응 방식"]
  }
};

const page = pages[document.querySelector("[data-detail-page]")?.dataset.detailPage];
const mount = document.querySelector("[data-detail-page]");

function fieldMarkup(field, index) {
  const id = `extra-${index}`;
  const options = field.options.map((option) => `<option>${option}</option>`).join("");
  const control = field.type === "select"
    ? `<select id="${id}" name="${field.name}"><option value="">선택해 주세요</option>${options}</select>`
    : `<input id="${id}" name="${field.name}" type="text" placeholder="${field.placeholder || "입력해 주세요"}">`;
  return `<div class="field"><label for="${id}">${field.label} <span aria-hidden="true">(선택)</span></label>${control}</div>`;
}

if (page && mount) {
  document.title = `${page.formTitle} | 견적주는남자`;
  const highlights = page.bullets.map((text) => `<li>${text}</li>`).join("");
  const points = page.points.map((text, index) => `<li><span>0${index + 1}</span>${text}</li>`).join("");
  mount.innerHTML = `
    <section class="detail-hero detail-hero-${mount.dataset.detailPage}" aria-labelledby="detail-title">
      <div class="detail-photo"><img src="${page.image}" alt="${page.alt}" fetchpriority="high"></div>
      <div class="container detail-grid">
        <div class="detail-intro">
          <p class="detail-code">${page.code}</p>
          <p class="eyebrow">견적주는남자 · 조건 비교 상담</p>
          <h1 id="detail-title">${page.title.replace(/\n/g, "<br>")}</h1>
          <p class="detail-lede">${page.lead}</p>
          <ul class="detail-highlights">${highlights}</ul>
          <div class="detail-contact"><a class="btn btn-phone" href="tel:010-3743-8889">전화 010-3743-8889</a><a class="btn btn-kakao" href="https://open.kakao.com/o/sb8k0KRi" target="_blank" rel="noreferrer">카카오톡 상담</a></div>
        </div>
        <form class="quote-panel detail-form" id="consultation-form" data-source="${page.source}" data-submit-label="상담 신청하기" novalidate>
          <h2>${page.formTitle}</h2><p class="panel-copy">${page.formCopy}</p>
          <input type="hidden" name="service" value="${page.service}">
          ${page.space ? `<input type="hidden" name="space" value="${page.space}">` : ""}
          <div class="field-row">
            <div class="field"><label for="detail-name">이름</label><input id="detail-name" name="name" type="text" autocomplete="name" placeholder="홍길동" required></div>
            <div class="field"><label for="detail-phone">연락처</label><input id="detail-phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="010-0000-0000" required></div>
          </div>
          <div class="field"><label for="detail-location">설치 지역 <span aria-hidden="true">(선택)</span></label><input id="detail-location" name="location" type="text" autocomplete="address-level1" placeholder="예: 서울 강남구"></div>
          ${page.fields.map(fieldMarkup).join("")}
          <div class="field"><label for="detail-note">타사 조건 및 문의 내용 <span aria-hidden="true">(선택)</span></label><textarea id="detail-note" name="note" placeholder="타사 지원금·계약 조건을 알고 계시면 적어주세요. 더 나은 조건을 찾아 안내해 드립니다."></textarea></div>
          <input class="honeypot" name="website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">
          <div class="consent"><input id="privacy" type="checkbox" name="privacy" value="agree" required><label for="privacy"><strong>개인정보 수집 및 이용</strong>에 동의합니다.</label><button type="button" data-open-privacy>내용 보기</button></div>
          <button class="btn btn-primary submit-btn" type="submit">상담 신청하기</button><p class="form-status" role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>
    <section class="detail-checks"><div class="container detail-check-grid"><div><p class="eyebrow">상담 전에 미리 확인해요</p><h2 class="section-heading">${page.pointsTitle}</h2><p class="section-copy">정확한 구성과 조건은 설치 환경과 이용 방식에 따라 달라질 수 있습니다. 남겨주신 내용을 바탕으로 필요한 부분부터 확인합니다.</p><a class="detail-back" href="index.html#services">전체 서비스와 공간 보기 <span aria-hidden="true">↗</span></a></div><ol>${points}</ol></div></section>
    <section class="detail-bottom"><div class="container"><p>원하시는 방식으로 편하게 문의하세요.</p><div><a href="tel:010-3743-8889">전화 상담</a><a href="https://open.kakao.com/o/sb8k0KRi" target="_blank" rel="noreferrer">카카오톡 상담</a></div></div></section>`;
}





