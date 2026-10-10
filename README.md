# 견적주는남자 랜딩페이지

렌탈·CCTV 비교견적 문의를 받기 위한 정적 반응형 랜딩페이지 시안입니다.

## 포함 페이지

- `index.html`: CCTV·경비·보안, 인터넷·TV, 정수기렌탈, 스마트오더·포스기를 아우르는 메인 광고 랜딩
- `cctv.html`: CCTV / 캡스 / 캡스홈CCTV 검색광고용 전용 랜딩
- `assets/styles.css`: PC·모바일 반응형 디자인
- `assets/app.js`: 폼 검증, 전화번호 포맷, FAQ, 개인정보 안내, 전환 이벤트

## 로컬 확인

```bash
npm run serve
```

브라우저에서 `http://127.0.0.1:4173`을 엽니다.

## 테스트

```bash
npm test
node --check assets/app.js
node --check server.mjs
```

## GitHub Pages 배포

정적 웹페이지는 GitHub Pages에서 서비스하고, 폼 접수 API는 견적주는남자 전용 Google Apps Script로 분리합니다.

- Site files remain deployed through the GitHub Pages repository. The API project is deployed separately from Apps Script.

희망 도메인 `견적주는남자.com`은 가비아 계정의 도메인 목록에서 확인했습니다. 정적 사이트는 GitHub Pages를 유지하며, 별도 가비아 웹호스팅은 필요하지 않습니다.

## 상담 DB·실시간 알림 연동 상태

상담 폼은 이름과 연락처를 필수로 받고, 관심 서비스·설치 지역·문의 내용은 선택 입력으로 받습니다. 접수 API는 `assets/site-config.js`에 설정된 견적주는남자 전용 Apps Script로 연결됩니다. 접수는 견적주는남자 전용 비공개 스프레드시트에 저장되며 Telegram 알림을 보냅니다.

상담 DB와 Telegram 알림 설정은 [`apps-script/README.md`](apps-script/README.md)를 참고하세요. 캡스 사이트의 Apps Script 주소·시트·봇 설정은 공유하지 않습니다.

오픈카카오톡 URL은 사용자가 직접 상담방에 들어가는 링크이며, 폼 제출 내용을 오픈채팅방으로 자동 전송하는 공식 webhook은 아닙니다. 전화번호만으로 관리자에게 자동 문자 발송도 불가능하므로 문자 API 공급자 계정과 발신번호 인증이 필요합니다.

## 개인정보·사업자 정보

폼에는 최소 수집 항목과 90일 보유 문구를 시안으로 넣었습니다. 운영 전 실제 개인정보 처리방침, 사업자 상호·대표자·사업자등록번호·주소, 담당자와 보유 기간을 확정해 교체해야 합니다.

## 광고 측정

전화, 카카오톡, 폼 제출 시 `window.dataLayer`에 각각 `click_to_call`, `click_kakao`, `generate_lead` 이벤트를 기록합니다. 네이버 광고 전환 스크립트와 분석 태그 ID는 계정이 준비된 뒤 삽입합니다.
