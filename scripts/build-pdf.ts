/**
 * 포트폴리오 PDF 생성 스크립트
 *
 * 사이트와 같은 데이터(src/constants)를 읽어 A4 HTML 을 만들고,
 * Chrome 헤드리스로 public/전재준_포트폴리오.pdf 를 출력합니다.
 *
 *   bun scripts/build-pdf.ts            # PDF 생성
 *   bun scripts/build-pdf.ts --html     # HTML 만 생성 (브라우저로 미리보기)
 *
 * 글꼴: Noto Sans KR (PC 에 설치돼 있어야 합니다)
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { awards, education, experiences, projects, skillGroups, skills } from '../src/constants/portfolio';
import { hero, siteConfig } from '../src/constants/site';
import type { Project } from '../src/types/portfolio';

/* ───────────── PDF 전용 문구 ───────────── */

/** 헤더 두 번째 줄 */
const headline = `${siteConfig.role} · 대덕소프트웨어마이스터고등학교 · XQUARE 부장`;

/** 헤더 아래 기술 칩 */
const headerTags = ['React', 'TypeScript', 'Emotion', 'Vite', 'Turborepo', 'Docker', 'Kubernetes'];

/** 프로젝트별 소개 두 줄(없으면 description + role 로 만듭니다) 과 추가 행 */
const projectOverrides: Record<string, { blurb?: string; extraRow?: [string, string] }> = {
  'entry-dsm-frontend': {
    blurb:
      '원서 작성부터 합격자 발표까지 입학 전형 전 과정을 온라인 한 곳에서 처리하는 웹 서비스입니다. PM과 어드민 앱 개발, 배포를 맡아 2026년 버전을 새 저장소에서 다시 구성했고, 모의 원서 접수부터 실제 서비스로 운영했습니다.',
  },
  'xquare-infra-v3': {
    blurb:
      '학생들이 자기 프로젝트를 학교 서버에 직접 배포할 수 있게 해 주는 교내 인프라 플랫폼입니다. 동아리의 첫 프론트엔드 개발자로 합류해 설계부터 개발까지 맡았고, 부장·PM으로 서비스를 운영하고 있습니다.',
  },
  'Commonly-frontend': {
    blurb:
      '유성구청의 기간제 근로자 경력 관리와 경력증명서 발급 업무를 온라인으로 옮긴 서비스입니다. 관리자·업무 담당자·민원인 앱 3개로 나누고 정부 디자인 시스템(KRDS)을 기준으로 디자인했습니다.',
    extraRow: ['성과', '2026 유성 데이터기반 실증 리빙랩 우수상'],
  },
  'uranus-nettools': {
    blurb:
      '핑·트레이스·포트 스캔·DNS·WHOIS 등 네트워크 진단 도구 13개를 한 가지 인터페이스로 묶은 크로스플랫폼 CLI입니다. 설계부터 개발, 테스트, 플랫폼별 실행 파일 패키징과 배포 자동화까지 혼자 맡았습니다.',
  },
  'uranus-totp': {
    blurb:
      '2단계 인증용 일회용 비밀번호(TOTP)를 터미널에서 생성하는 CLI로, 계정은 비밀번호로 암호화된 파일 하나에 보관합니다. TOTP 생성과 암호화 저장소, 대화형 셸, 플랫폼별 배포까지 전부 맡았습니다.',
  },
  portfolio: {
    blurb:
      '프로젝트·경험·기술 스택을 소개하는 개인 포트폴리오 사이트입니다. 라우트별 정적 HTML 생성과 Lighthouse 기반 성능·SEO·접근성 개선을 직접 적용하며 운영하고 있습니다.',
  },
  'brainps-client': {
    blurb:
      '심리검사·뇌파검사 업체 두뇌발전소의 홈페이지를 외주로 새로 만들었습니다. 회사·서비스 소개부터 회원가입, 포트원 결제, 관리자 페이지까지 프론트엔드 전체를 혼자 담당했습니다.',
  },
};

/* ───────────── 유틸 ───────────── */

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** `**굵게**` 마크다운만 <strong> 으로 바꿉니다. */
const rich = (s: string) =>
  escapeHtml(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

/** '2026.03.19 – 2026.10.09' → '2026.03 – 2026.10' */
const shortPeriod = (s: string) =>
  s
    .replace(/\s*[-–~]\s*/g, ' – ')
    .replace(/(\d{4}\.\d{2})\.\d{2}/g, '$1');

/** '2026.08.04 – 2026.08.05' → '2026.08.04 – 08.05' (같은 해면 두 번째 연도 생략) */
const shortRange = (s: string) => {
  const normalized = s.replace(/\s*[-–~]\s*/g, ' – ');
  // 일(day)까지 있는 날짜만 줄입니다. '2026.07 – 2026.10' 은 그대로 둡니다.
  const m = normalized.match(/^(\d{4})\.(\d{2}\.\d{2}) – (\d{4})\.(\d{2}\.\d{2})$/);
  if (m && m[1] === m[3]) return `${m[1]}.${m[2]} – ${m[4]}`;
  return normalized;
};

/** '서비스 중(2026.01.16~)' → '서비스 중' */
const shortStatus = (s: string) => s.replace(/\s*[(（].*?[)）]\s*/g, '').trim();

/** '2026. 10. 06' → '2026.10.06' */
const compactDate = (s: string) => s.replace(/\.\s+/g, '.');

const linkText = (href: string) => href.replace(/^https?:\/\//, '').replace(/\/$/, '');

const chips = (items: readonly string[], cls = 'chip') =>
  `<div class="chips">${items.map((t) => `<span class="${cls}">${escapeHtml(t)}</span>`).join('')}</div>`;

const bullets = (items: readonly string[], cls = 'bullets') =>
  `<ul class="${cls}">${items.map((t) => `<li>${rich(t)}</li>`).join('')}</ul>`;

/* ───────────── 섹션 ───────────── */

const renderProject = (p: Project) => {
  const o = projectOverrides[p.id] ?? {};
  const blurb =
    o.blurb ?? `${p.description.replace(/^[^\s]+[은는]\s+/, '')} ${p.role}`;

  const teamContribution = [p.team, p.contribution].filter(Boolean).join(' · ');
  const rows: [string, string][] = [];
  if (p.position) rows.push(['역할', p.position]);
  if (teamContribution) rows.push(['팀 / 기여', teamContribution]);
  if (p.scale) rows.push(['규모', p.scale]);
  if (o.extraRow) rows.push(o.extraRow);

  const meta = [shortPeriod(p.period), shortStatus(p.status)].filter(Boolean).join(' · ');

  return `
    <article class="project">
      <header class="project-head">
        <div class="project-title">
          <h3>${escapeHtml(p.title)}</h3>
          <span class="project-summary">${escapeHtml(p.summary)}</span>
        </div>
        <span class="project-meta">${escapeHtml(meta)}</span>
      </header>
      <p class="project-blurb">${escapeHtml(blurb)}</p>
      <dl class="rows">
        ${rows.map(([k, v]) => `<div><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`).join('')}
      </dl>
      ${bullets(p.detail.highlights.slice(0, 5), 'bullets arrow')}
      ${chips(p.tags)}
      ${
        p.links.length
          ? `<div class="links">${p.links
              .map((l) => `<a href="${escapeHtml(l.href)}">↗ ${escapeHtml(linkText(l.href))}</a>`)
              .join('')}</div>`
          : ''
      }
    </article>`;
};

const renderTimeline = (
  items: {
    organization: string;
    badge: string;
    title: string;
    location?: string;
    period: string;
    highlights: string[];
  }[],
  opts: { orgFirst?: boolean } = {},
) =>
  items
    .map((e) => {
      const heading = opts.orgFirst ? `${e.organization} · ${e.title}` : e.title;
      const sub = opts.orgFirst
        ? e.location ?? ''
        : [e.organization, e.location].filter(Boolean).join(' · ');
      return `
      <div class="tl">
        <div class="tl-date">${escapeHtml(shortRange(e.period))}</div>
        <div class="tl-body">
          <div class="tl-title"><strong>${escapeHtml(heading)}</strong><span class="badge">${escapeHtml(e.badge)}</span></div>
          ${sub ? `<div class="tl-sub">${escapeHtml(sub)}</div>` : ''}
          ${bullets(e.highlights)}
        </div>
      </div>`;
    })
    .join('');

const renderAwards = () =>
  awards
    .map(
      (a) => `
      <div class="tl award">
        <div class="tl-date">${escapeHtml(compactDate(a.year))}</div>
        <div class="tl-body"><strong>${escapeHtml(a.title)}</strong><span class="award-issuer"> · ${escapeHtml(a.issuer)}</span></div>
      </div>`,
    )
    .join('');

const renderSkills = () =>
  skillGroups
    .map((g) => {
      const items = skills.filter((s) => g.categories.includes(s.category)).map((s) => s.name);
      return `
      <div class="skill-col">
        <h3>${escapeHtml(g.title)}</h3>
        <p>${escapeHtml(g.description)}</p>
        ${chips(items)}
      </div>`;
    })
    .join('');

const leadHtml = hero.intro
  .map((seg) => (seg.strong ? `<strong>${escapeHtml(seg.text)}</strong>` : escapeHtml(seg.text)))
  .join('')
  .replace(/\n/g, ' ');

/* ───────────── 문서 ───────────── */

const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(siteConfig.name)} 포트폴리오</title>
<meta name="author" content="${escapeHtml(siteConfig.englishName)}" />
<style>
  @page { size: A4; margin: 17mm 16mm 16mm; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: 'Noto Sans KR', 'Pretendard', 'Malgun Gothic', sans-serif;
    font-size: 9.2pt;
    line-height: 1.55;
    color: #222;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    word-break: keep-all;
    overflow-wrap: anywhere;
  }
  a { color: inherit; text-decoration: none; }
  strong { font-weight: 700; color: #111; }
  p { margin: 0; }
  ul { margin: 0; padding: 0; }

  :root {
    --blue: #2a4ed6;
    --blue-dark: #1f3fc4;
    --blue-soft: #e8edfb;
    --text-soft: #666;
    --line: #e4e7ee;
  }

  /* 헤더 */
  .head { display: flex; justify-content: space-between; align-items: flex-end; }
  .name { display: flex; align-items: baseline; gap: 10px; }
  .name h1 { margin: 0; font-size: 25pt; font-weight: 800; letter-spacing: -0.5px; color: #111; line-height: 1.15; }
  .name .en { font-size: 10.5pt; color: #6b6b6b; font-weight: 500; }
  .headline { margin-top: 4px; font-size: 9pt; color: var(--blue); font-weight: 500; }
  .contact { text-align: right; font-size: 8.2pt; color: #555; line-height: 1.65; }
  .lead { margin-top: 15pt; padding-top: 11pt; border-top: 1px solid var(--line); font-size: 9.8pt; line-height: 1.7; }
  .lead strong { color: var(--blue-dark); }
  .head-chips { margin-top: 8pt; }
  .chip-blue { display: inline-block; padding: 1.5pt 6pt; border-radius: 3px; background: var(--blue); color: #fff; font-size: 7.3pt; font-weight: 500; }

  /* 섹션 */
  section { margin-top: 16pt; }
  h2 {
    margin: 0 0 9pt; padding-bottom: 5pt; border-bottom: 1px solid var(--line);
    font-size: 9pt; font-weight: 700; letter-spacing: 1.8px; color: var(--blue); text-transform: uppercase;
    break-after: avoid;
  }

  /* 프로젝트 */
  .project { padding: 4pt 0 10pt; break-inside: avoid; }
  .project + .project { border-top: 1px solid var(--line); padding-top: 11pt; }
  .project-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  .project-title { display: flex; align-items: baseline; gap: 8px; min-width: 0; }
  .project-title h3 { margin: 0; font-size: 12.5pt; font-weight: 700; color: var(--blue-dark); white-space: nowrap; }
  .project-summary { font-size: 8.4pt; color: #666; }
  .project-meta { flex-shrink: 0; font-size: 7.8pt; color: #777; }
  .project-blurb { margin-top: 5pt; font-size: 8.8pt; line-height: 1.6; }
  .rows { margin: 7pt 0 0; }
  .rows div { display: flex; gap: 8px; font-size: 8.3pt; line-height: 1.6; }
  .rows dt { flex: 0 0 56px; color: var(--blue); font-weight: 500; }
  .rows dd { margin: 0; color: #333; }
  .bullets { list-style: none; margin-top: 6pt; }
  .bullets li { position: relative; padding-left: 11px; font-size: 8.6pt; line-height: 1.6; }
  .bullets li::before { content: '•'; position: absolute; left: 1px; color: #555; }
  .bullets.arrow li::before { content: '‣'; font-size: 10pt; top: -1px; }
  .chips { display: flex; flex-wrap: wrap; gap: 4px 4px; margin-top: 6pt; }
  .chip { display: inline-block; padding: 1pt 5pt; border: 1px solid #d9dde6; border-radius: 3px; background: #f5f6f9; font-size: 7.2pt; color: #333; line-height: 1.5; }
  .links { display: flex; gap: 14px; margin-top: 6pt; font-size: 7.9pt; color: var(--blue-dark); }

  /* 타임라인 */
  .tl { display: flex; gap: 10px; padding: 6pt 0; border-bottom: 1px solid var(--line); break-inside: avoid; }
  .tl:last-child { border-bottom: 0; }
  .tl-date { flex: 0 0 100px; font-size: 7.8pt; color: var(--blue); padding-top: 1.5pt; white-space: nowrap; }
  .tl-body { flex: 1; min-width: 0; }
  .tl-title { display: flex; align-items: center; gap: 6px; font-size: 9.6pt; }
  .tl-title strong { color: #111; }
  .badge { display: inline-block; padding: 0.5pt 5pt; border-radius: 3px; background: var(--blue-soft); color: var(--blue-dark); font-size: 7pt; font-weight: 500; }
  .tl-sub { font-size: 7.9pt; color: #777; margin-top: 1pt; }
  .tl .bullets { margin-top: 3pt; }
  .tl .bullets li { font-size: 8.4pt; padding-left: 14px; }
  .tl .bullets li::before { left: 4px; }
  .award .tl-body { font-size: 9.2pt; padding-top: 1pt; }
  .award-issuer { font-size: 7.9pt; color: #777; }

  /* 기술 */
  .skills { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .skill-col h3 { margin: 0; font-size: 10pt; font-weight: 700; color: var(--blue-dark); }
  .skill-col p { margin-top: 2pt; font-size: 7.9pt; color: #777; line-height: 1.5; }

  /* 푸터 */
  .foot { display: flex; justify-content: space-between; margin-top: 18pt; padding-top: 7pt; border-top: 1px solid var(--line); font-size: 7.8pt; color: #888; }
</style>
</head>
<body>

<header class="head">
  <div>
    <div class="name"><h1>${escapeHtml(siteConfig.name)}</h1><span class="en">${escapeHtml(siteConfig.englishName)}</span></div>
    <div class="headline">${escapeHtml(headline)}</div>
  </div>
  <div class="contact">
    <div><a href="mailto:${escapeHtml(siteConfig.email)}">${escapeHtml(siteConfig.email)}</a></div>
    <div><a href="${escapeHtml(siteConfig.githubUrl)}">${escapeHtml(linkText(siteConfig.githubUrl))}</a></div>
    <div><a href="${escapeHtml(siteConfig.canonicalUrl)}">${escapeHtml(linkText(siteConfig.canonicalUrl))}</a></div>
  </div>
</header>

<p class="lead">${leadHtml}</p>
<div class="head-chips">${chips(headerTags, 'chip-blue')}</div>

<section>
  <h2>Projects</h2>
  ${projects.map(renderProject).join('')}
</section>

<section>
  <h2>Experience</h2>
  ${renderTimeline(experiences)}
</section>

<section>
  <h2>Awards</h2>
  ${renderAwards()}
</section>

<section>
  <h2>Education</h2>
  ${renderTimeline(education, { orgFirst: true })}
</section>

<section>
  <h2>Skills</h2>
  <div class="skills">${renderSkills()}</div>
</section>

<footer class="foot">
  <span>${escapeHtml(siteConfig.name)} · ${escapeHtml(siteConfig.role)}</span>
  <span>${escapeHtml(linkText(siteConfig.canonicalUrl))}</span>
</footer>

</body>
</html>`;

/* ───────────── 출력 ───────────── */

const root = path.resolve(import.meta.dir, '..');
const outDir = path.join(tmpdir(), 'portfolio-pdf');
mkdirSync(outDir, { recursive: true });
const htmlPath = path.join(outDir, 'portfolio.html');
writeFileSync(htmlPath, html, 'utf8');
console.log(`HTML: ${htmlPath}`);

if (process.argv.includes('--html')) process.exit(0);

const pdfPath = path.join(root, 'public', '전재준_포트폴리오.pdf');
const chromeCandidates = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter((p): p is string => Boolean(p));
const chrome = chromeCandidates.find((p) => existsSync(p));
if (!chrome) {
  console.error('Chrome 을 찾지 못했습니다. CHROME_PATH 환경 변수로 경로를 지정하세요.');
  process.exit(1);
}

execFileSync(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=${path.join(outDir, 'profile')}`,
    '--no-first-run',
    '--no-pdf-header-footer',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=3000',
    `--print-to-pdf=${pdfPath}`,
    pathToFileURL(htmlPath).href,
  ],
  { stdio: 'inherit' },
);
console.log(`PDF: ${pdfPath}`);
