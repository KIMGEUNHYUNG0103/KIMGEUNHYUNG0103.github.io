# 견적주는남자 GitHub Pages 이전 및 도메인 연결 설계

## 목표

바탕화면의 `견적주는남자` 정적 홈페이지와 기존 Git 기록을 새 GitHub 계정 `KIMGEUNHYUNG0103`으로 이전하고, `www.견적주는남자.com`을 GitHub Pages에 연결한다.

## 현재 상태

- 원본은 `C:\Users\pro\Desktop\견적주는남자`에 있다.
- `main` 브랜치의 최신 커밋은 `c285ba4 Launch 견적주는남자 landing pages`다.
- 기존 원격 저장소는 `https://github.com/cyj940603-code/quote-man-landing.git`로, 사용하지 않을 예전 계정이다.
- 새 계정 `KIMGEUNHYUNG0103`에는 현재 저장소가 없다.
- 사이트의 `CNAME`은 `www.xn--l89ap9efxb823bcqa80c.com`이며 이는 `www.견적주는남자.com`의 ASCII 표현이다.
- 공개될 연락처는 `010-3743-8889`이며, 오픈카카오톡 링크는 `https://open.kakao.com/o/sRn6N6Pi`다. 사용자가 공개에 동의했다.

## 배포 구조

1. 새 계정에 공개 저장소 `KIMGEUNHYUNG0103.github.io`를 만든다.
2. 기존 커밋 이력을 유지한 채 `main` 브랜치를 새 저장소에 올린다.
3. GitHub Pages 배포 소스는 `main` 브랜치의 저장소 루트(`/`)로 설정한다.
4. Pages 사용자 도메인은 `www.견적주는남자.com`으로 설정한다.
5. 가비아 DNS의 루트 도메인에는 GitHub Pages A 레코드 네 개를 유지한다.
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
6. `www` CNAME은 `kimgeunhyung0103.github.io.`로 설정한다.

## 안전 및 변경 범위

- 바탕화면 원본 저장소는 수정하지 않는다.
- 현재 작업 폴더의 복사본에서만 원격 주소와 배포 문서를 변경한다.
- 새 저장소에는 추적 중인 홈페이지 파일만 올리고, 미추적 미리보기 이미지와 `node_modules`는 제외한다.
- 이전 GitHub 계정의 저장소와 윾진이네 홈페이지는 변경하지 않는다.
- 가비아에서는 `견적주는남자.com`의 해당 A 및 `www` CNAME 레코드만 변경한다.

## 검증 기준

- `npm test`가 실패 없이 끝난다.
- `node --check assets/app.js`와 `node --check server.mjs`가 성공한다.
- 새 GitHub 저장소에 `main` 브랜치와 사이트 파일이 보인다.
- GitHub Pages가 배포 완료 상태를 표시한다.
- `https://kimgeunhyung0103.github.io`에서 메인 페이지가 열린다.
- `https://www.견적주는남자.com`과 `/cctv.html`이 정상 응답한다.
- 인증서 발급이 즉시 끝나지 않으면 DNS 설정과 Pages 사용자 도메인 저장 성공을 확인하고, HTTPS 전파 대기 상태를 명시한다.

## 실패 처리

- 저장소 이름이 이미 사용 중이면 기존 저장소 내용을 확인하고 덮어쓰지 않은 채 중단한다.
- GitHub Pages 사용자 도메인이 DNS 검증을 통과하지 못하면 GitHub 기본 주소 배포를 먼저 확인하고 DNS 전파 상태를 별도로 진단한다.
- 외부 서비스가 추가 승인을 요구하면 해당 단계에서 멈추고 승인 내용을 사용자에게 보여준다.
