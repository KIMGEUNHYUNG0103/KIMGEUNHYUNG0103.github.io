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
    code: "01 / HOME SECURITY", service: "CCTV·경비·보안", space: "주택·가정", source: "space-home-detail",
    image: "assets/images/space-home.png", alt: "정원과 현관이 있는 단독주택",
    title: "집 안팎을 살피는\n가정용 CCTV 상담", lead: "현관, 주차 공간, 마당처럼 확인하고 싶은 곳에 맞춰 설치 조건을 살펴봅니다.",
    bullets: ["현관·마당·주차장", "실내·실외 설치 환경", "휴대폰 영상 확인"],
    formTitle: "가정용 보안 상담 신청", formCopy: "이름과 연락처만 남겨도 상담할 수 있습니다.",
    fields: [
      { name: "cameraArea", label: "확인할 장소", type: "select", options: ["현관·출입문", "마당·주택 외부", "주차 공간", "실내", "여러 곳"] },
      { name: "quantity", label: "예상 카메라 수", type: "select", options: ["1~2대", "3~4대", "5대 이상", "잘 모르겠어요"] }
    ],
    pointsTitle: "가정 환경에 따라 확인해요", points: ["설치할 곳이 실내인지 실외인지", "전원과 통신 연결 환경", "야간에도 확인이 필요한지", "휴대폰으로 영상을 볼지"]
  },
  store: {
    code: "02 / SMALL BUSINESS", service: "CCTV·경비·보안", space: "소상공인 매장", source: "space-store-detail",
    image: "assets/images/space-store.png", alt: "유리 전면과 따뜻한 조명이 있는 소규모 매장",
    title: "매장 출입구와 주요 공간,\n운영에 맞춰 상담하세요.", lead: "출입문과 계산대, 고객 동선을 기준으로 매장 보안 구성을 확인합니다.",
    bullets: ["출입구·계산대 확인", "영업 시간 고려", "매장 구조에 맞는 배치"],
    formTitle: "매장 CCTV 상담 신청", formCopy: "매장 이름이나 상세 주소는 필수가 아닙니다. 지역과 연락처만 남겨주세요.",
    fields: [
      { name: "cameraArea", label: "주로 확인할 곳", type: "select", options: ["출입구", "계산대", "매장 내부", "창고·후문", "전체 공간"] },
      { name: "quantity", label: "예상 카메라 수", type: "select", options: ["1~2대", "3~4대", "5~8대", "9대 이상", "잘 모르겠어요"] }
    ],
    pointsTitle: "매장 상황에 맞춰 확인해요", points: ["매장 규모와 출입구 수", "영업 종료 후 모니터링", "실내·외 설치 위치", "기존 장비 교체 여부"]
  },
  restaurant: {
    code: "03 / RESTAURANT · CAFE", service: "CCTV·경비·보안", space: "식당·카페", source: "space-restaurant-detail",
    image: "assets/images/space-restaurant.png", alt: "창가 좌석과 테이블이 있는 식당",
    title: "홀과 주방 동선을 고려한\n식당·카페 보안 상담", lead: "손님 동선과 직원 작업 구역을 함께 살펴 필요한 카메라 위치를 정리합니다.",
    bullets: ["홀·주방·출입구", "계산대와 재고 공간", "영업 중 사각지대 점검"],
    formTitle: "식당·카페 CCTV 상담 신청", formCopy: "업종과 확인할 구역을 선택하면 상담 준비에 도움이 됩니다.",
    fields: [
      { name: "cameraArea", label: "확인할 구역", type: "select", options: ["홀", "주방", "출입구·계산대", "창고·후문", "홀과 주방 모두"] },
      { name: "quantity", label: "예상 카메라 수", type: "select", options: ["1~2대", "3~4대", "5~8대", "9대 이상", "잘 모르겠어요"] }
    ],
    pointsTitle: "업종과 동선에 맞춰 확인해요", points: ["홀·주방 사이 시야", "계산대와 출입구 위치", "영업 시간과 야간 운영", "청소·열기 등 설치 환경"]
  },
  factory: {
    code: "04 / FACTORY · WORKPLACE", service: "CCTV·경비·보안", space: "공장·사업장", source: "space-factory-detail",
    image: "assets/images/space-factory.png", alt: "넓은 생산 라인이 있는 공장 내부",
    title: "넓은 사업장도\n구역과 운영 환경부터 살펴봅니다.", lead: "출입구, 생산 구역, 적재 공간 등 현장별 보안 요구를 확인합니다.",
    bullets: ["넓은 구역과 동선", "실내·실외 환경", "야간·비근무 시간 관리"],
    formTitle: "사업장 보안 상담 신청", formCopy: "사업장 상세 주소는 나중에 확인해도 됩니다. 연락 가능한 번호를 남겨주세요.",
    fields: [
      { name: "cameraArea", label: "주요 설치 구역", type: "select", options: ["출입구·주차장", "생산 라인", "창고·적재장", "사무 공간", "여러 구역"] },
      { name: "quantity", label: "예상 카메라 수", type: "select", options: ["1~4대", "5~8대", "9~16대", "17대 이상", "현장 상담 필요"] }
    ],
    pointsTitle: "사업장 환경에 맞춰 확인해요", points: ["구역별 크기와 출입 동선", "실내·외 배선 환경", "야간 조명과 작업 시간", "기존 보안 장비와 연동 필요"]
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
    <section class="detail-hero" aria-labelledby="detail-title">
      <div class="detail-photo"><img src="${page.image}" alt="${page.alt}" fetchpriority="high"></div>
      <div class="container detail-grid">
        <div class="detail-intro">
          <p class="detail-code">${page.code}</p>
          <p class="eyebrow">견적주는남자 · 조건 비교 상담</p>
          <h1 id="detail-title">${page.title.replace("\n", "<br>")}</h1>
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
