import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("main landing contains the primary conversion path", async () => {
  const html = await read("index.html");

  assert.match(html, /견적주는남자/);
  assert.match(html, /비밀 지원금 상담 신청/);
  assert.match(html, /id="consultation-form"/);
  assert.match(html, /010-3743-8889/);
  assert.match(html, /https:\/\/open\.kakao\.com\/o\/sRn6N6Pi/);
  assert.match(html, /개인정보 수집 및 이용/);
});

test("main navigation names the four services and the process", async () => {
  const html = await read("index.html");

  for (const label of [
    "CCTV·경비·보안업체",
    "인터넷·TV",
    "테이블오더·포스기",
    "정수기렌탈",
    "이용방법",
  ]) {
    assert.match(html, new RegExp(label.replace("·", "\\·")));
  }
});

test("service cards state the requested comparison proposition without appliance rental", async () => {
  const html = await read("index.html");

  assert.match(html, /01 \/ CCTV·경비·보안/);
  assert.match(html, /ADT캡스/);
  assert.match(html, /에스원/);
  assert.match(html, /KT텔레캅/);
  assert.match(html, /SK·KT·LG/);
  assert.match(html, /비밀지원금/);
  assert.match(html, /스마트오더·포스기/);
  assert.match(html, /동일 조건에 맞는 지원금/);
  assert.match(html, /계약기간과 부가서비스/);
  assert.doesNotMatch(html, /가전렌탈/);
});

test("header CTAs use Kakao yellow styling and direct phone consultation", async () => {
  const html = await read("index.html");
  const styles = await read("assets/styles.css");

  assert.match(html, /btn btn-kakao[^>]*>카카오 상담/);
  assert.match(html, /href="tel:010-3743-8889"[^>]*>전화 상담/);
  assert.match(styles, /\.quote-panel::before[^}]*font-size:\s*(?:3[5-9]|4\d)px/s);
});

test("mobile layout keeps the comparison table contained and the primary service readable", async () => {
  const styles = await read("assets/styles.css");

  assert.match(styles, /@media \(max-width: 640px\)[\s\S]*\.compare-row\s*\{[^}]*min-width:\s*0/s);
  assert.match(styles, /@media \(max-width: 640px\)[\s\S]*\.service-card\.primary\s*\{[^}]*min-height:\s*(?:3[5-9]\d|[4-9]\d\d)px/s);
});

test("CCTV ad landing has a focused message and its own consultation form", async () => {
  const html = await read("cctv.html");

  assert.match(html, /CCTV 비교견적/);
  assert.match(html, /캡스/);
  assert.match(html, /캡스홈CCTV/);
  assert.match(html, /id="consultation-form"/);
  assert.doesNotMatch(html, /최저가 보장|무조건|업계 1위/);
});

test("shared script validates and stores consultation leads", async () => {
  const script = await read("assets/app.js");

  assert.match(script, /validatePhone/);
  assert.match(script, /quote-man-leads/);
  assert.match(script, /lead-endpoint/);
  assert.match(script, /dataLayer/);
  assert.match(script, /checkValidity/);
  assert.match(script, /data\.get\("quantity"\)/);
});

test("both pages expose essential search and social metadata", async () => {
  for (const file of ["index.html", "cctv.html"]) {
    const html = await read(file);
    assert.match(html, /<meta name="description"/);
    assert.match(html, /<meta property="og:title"/);
    assert.match(html, /<meta name="viewport"/);
    assert.match(html, /application\/ld\+json/);
  }
});

test("preview server resolves a Korean project path with fileURLToPath", async () => {
  const server = await read("server.mjs");
  assert.match(server, /fileURLToPath/);
});

test("search discovery files expose both landing pages", async () => {
  const robots = await read("robots.txt");
  const sitemap = await read("sitemap.xml");

  assert.match(robots, /Sitemap: https:\/\/www\.xn--l89ap9efxb823bcqa80c\.com\/sitemap\.xml/);
  assert.match(sitemap, /https:\/\/www\.xn--l89ap9efxb823bcqa80c\.com\//);
  assert.match(sitemap, /https:\/\/www\.xn--l89ap9efxb823bcqa80c\.com\/cctv\.html/);
});
