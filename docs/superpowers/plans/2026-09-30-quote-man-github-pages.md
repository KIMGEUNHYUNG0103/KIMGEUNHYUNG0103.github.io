# 견적주는남자 GitHub Pages 배포 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 현재 견적주는남자 정적 사이트를 새 GitHub 계정의 Pages 저장소에 배포하고 `www.견적주는남자.com`을 연결한다.

**Architecture:** 기존 정적 HTML/CSS/JavaScript와 Git 기록을 사용자 Pages 저장소 `KIMGEUNHYUNG0103.github.io`로 이전한다. GitHub Pages가 `main` 브랜치 루트를 배포하고, 가비아의 apex A 레코드와 `www` CNAME이 GitHub Pages를 가리키도록 구성한다.

**Tech Stack:** HTML5, CSS, JavaScript, Node.js 테스트, Git, GitHub Pages, 가비아 DNS

## Global Constraints

- 바탕화면 원본 `C:\Users\pro\Desktop\견적주는남자`는 수정하지 않는다.
- 새 저장소는 `KIMGEUNHYUNG0103.github.io`라는 공개 저장소로 만든다.
- 이전 계정 `cyj940603-code`의 저장소와 윾진이네 홈페이지는 변경하지 않는다.
- 공개 연락처 `010-3743-8889`와 오픈카카오톡 링크 `https://open.kakao.com/o/sRn6N6Pi`는 사용자가 공개에 동의했다.
- 사용자 도메인은 `www.xn--l89ap9efxb823bcqa80c.com`이고 표시 도메인은 `www.견적주는남자.com`이다.

---

### Task 1: 배포 전 사이트 검증

**Files:**
- Verify: `index.html`
- Verify: `cctv.html`
- Verify: `assets/app.js`
- Verify: `server.mjs`
- Verify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: 기존 커밋 `c285ba4`의 정적 사이트 파일
- Produces: 배포 가능한 것으로 검증된 `main` 브랜치

- [ ] **Step 1: 의존성 없는 Node 테스트 실행**

Run: `npm test`

Expected: Node test runner가 모든 테스트를 통과하고 실패 수가 0이다.

- [ ] **Step 2: JavaScript 구문 검사**

Run: `node --check assets/app.js`

Expected: 출력 없이 종료 코드 0이다.

- [ ] **Step 3: 로컬 서버 구문 검사**

Run: `node --check server.mjs`

Expected: 출력 없이 종료 코드 0이다.

- [ ] **Step 4: 작업 트리 검사**

Run: `git status --short`

Expected: 계획·설계 문서 외 홈페이지 소스 변경이 없다.

### Task 2: 새 GitHub 저장소 생성과 코드 이전

**Files:**
- Push: `.gitignore`
- Push: `.htmlvalidate.json`
- Push: `.nojekyll`
- Push: `CNAME`
- Push: `README.md`
- Push: `assets/app.js`
- Push: `assets/styles.css`
- Push: `cctv.html`
- Push: `index.html`
- Push: `package.json`
- Push: `robots.txt`
- Push: `server.mjs`
- Push: `sitemap.xml`
- Push: `tests/site.test.mjs`
- Push: `docs/superpowers/specs/2026-09-30-quote-man-github-pages-design.md`
- Push: `docs/superpowers/plans/2026-09-30-quote-man-github-pages.md`

**Interfaces:**
- Consumes: 검증된 로컬 `main` 브랜치와 로그인된 GitHub 계정 `KIMGEUNHYUNG0103`
- Produces: 공개 저장소 `https://github.com/KIMGEUNHYUNG0103/KIMGEUNHYUNG0103.github.io`

- [ ] **Step 1: GitHub에서 빈 공개 저장소 생성**

브라우저에서 저장소 이름을 `KIMGEUNHYUNG0103.github.io`로 입력하고 Public을 선택한다. README, `.gitignore`, 라이선스를 추가하지 않은 빈 저장소로 생성한다.

Expected: 저장소 페이지 주소가 `https://github.com/KIMGEUNHYUNG0103/KIMGEUNHYUNG0103.github.io`다.

- [ ] **Step 2: 로컬 원격 주소 변경**

Run: `git remote set-url origin https://github.com/KIMGEUNHYUNG0103/KIMGEUNHYUNG0103.github.io.git`

Expected: `git remote -v`가 새 저장소만 표시한다.

- [ ] **Step 3: 계획 문서 커밋**

Run: `git add docs/superpowers/plans/2026-09-30-quote-man-github-pages.md && git commit -m "docs: add GitHub Pages deployment plan"`

Expected: 새 계획 문서만 포함한 커밋이 생성된다.

- [ ] **Step 4: 새 저장소로 푸시**

Run: `git push -u origin main`

Expected: 새 GitHub 저장소의 `main` 브랜치에 기존 사이트와 두 문서 커밋이 표시된다.

### Task 3: GitHub Pages 및 사용자 도메인 확인

**Files:**
- Verify: `CNAME`

**Interfaces:**
- Consumes: `main` 브랜치 루트와 `CNAME` 값 `www.xn--l89ap9efxb823bcqa80c.com`
- Produces: GitHub Pages 배포와 등록된 사용자 도메인

- [ ] **Step 1: Pages 배포 소스 확인**

GitHub 저장소의 Settings → Pages에서 배포 소스가 `main` 브랜치의 `/ (root)`인지 확인한다. 자동 설정되지 않은 경우 해당 값으로 저장한다.

Expected: Pages 화면이 사이트 배포 또는 빌드 진행 상태를 표시한다.

- [ ] **Step 2: 사용자 도메인 확인**

Pages의 Custom domain 값이 `www.xn--l89ap9efxb823bcqa80c.com`인지 확인한다. 비어 있으면 이 값을 입력하고 저장한다.

Expected: GitHub가 사용자 도메인을 저장하고 DNS 확인을 시작한다.

### Task 4: 가비아 DNS 연결

**Files:**
- No repository file changes.

**Interfaces:**
- Consumes: 가비아 도메인 `견적주는남자.com`과 GitHub Pages 대상 `kimgeunhyung0103.github.io.`
- Produces: GitHub Pages를 가리키는 apex 및 `www` DNS 레코드

- [ ] **Step 1: apex A 레코드 확인**

호스트 `@`의 A 레코드 값이 각각 `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`인지 확인한다.

Expected: 네 레코드가 모두 존재하며 TTL은 600이다.

- [ ] **Step 2: www CNAME 수정**

호스트 `www`의 CNAME 값을 `kimgeunhyung0103.github.io.`로 변경한다.

Expected: 가비아 DNS 목록에 새 CNAME 값이 표시된다.

- [ ] **Step 3: DNS 레코드 저장**

가비아의 DNS 레코드 수정 화면에서 저장을 실행한다.

Expected: 저장 성공 안내가 표시되고 수정 화면을 다시 열어도 새 값이 유지된다.

### Task 5: 공개 사이트 검증

**Files:**
- No repository file changes.

**Interfaces:**
- Consumes: GitHub Pages 배포와 저장된 DNS 레코드
- Produces: 검증된 기본 주소와 사용자 도메인 상태

- [ ] **Step 1: GitHub 기본 주소 확인**

브라우저에서 `https://kimgeunhyung0103.github.io/`를 연다.

Expected: 견적주는남자 메인 페이지 제목과 콘텐츠가 표시된다.

- [ ] **Step 2: 하위 페이지 확인**

브라우저에서 `https://kimgeunhyung0103.github.io/cctv.html`을 연다.

Expected: CCTV 비교견적 페이지가 표시된다.

- [ ] **Step 3: 사용자 도메인 확인**

브라우저에서 `https://www.견적주는남자.com/`과 `https://www.견적주는남자.com/cctv.html`을 연다.

Expected: 두 페이지가 표시된다. DNS 또는 TLS가 전파 중이면 GitHub Pages와 가비아의 저장 상태를 근거로 대기 상태를 보고한다.

- [ ] **Step 4: 최종 저장소 상태 확인**

Run: `git status --short && git log -3 --oneline && git remote -v`

Expected: 작업 트리가 깨끗하고 최근 세 커밋과 새 원격 주소가 표시된다.
