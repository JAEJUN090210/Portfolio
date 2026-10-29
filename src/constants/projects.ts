import type { Project } from '../types/portfolio';

export const projects: Project[] = [
  {
    id: 'entry-dsm-frontend',
    title: 'Entry DSM',
    summary: '대덕소프트웨어마이스터고등학교 입학전형 서비스',
    description:
      'Entry DSM은 원서 작성부터 합격자 발표까지 입학 전형 전 과정을 온라인 한 곳에서 처리하는 웹 서비스입니다.',
    role: 'PM과 어드민 앱 개발, 배포를 맡아 2026년 버전을 새 저장소에서 다시 구성했고, 모의 원서 접수부터 실제 서비스로 운영하고 있습니다.',
    imageVariant: 'mono',
    cover: '/images/projects/entry-dsm.webp',
    tags: [
      'React 19',
      'TypeScript',
      'TanStack Query',
      'Emotion',
      'Turborepo',
      'Sentry',
      'Cloudflare Workers',
    ],
    period: '2026.03.19 – 2026.10.09',
    status: '서비스 종료(2026.10.19~2026.10.22)',
    team: 'Frontend 3명 · Backend 2명',
    position: 'PM · Frontend(어드민 전담) · 배포',
    contribution: '커밋 293 / 650 (팀 내 최다)',
    scale: '모의 원서 접수 지원자 120명',
    collaboration: 'GitHub Issue · PR · CodeRabbit 리뷰 · Notion',
    links: [
      { label: 'Github', href: 'https://github.com/EntryDSM/EntryDsm-Admission-2026' },
      { label: '홈페이지', href: 'https://entrydsm.hs.kr/' },
    ],
    detail: {
      intro: [
        'Entry DSM은 지원자가 원서를 손으로 써서 내고 학교가 이를 수기로 관리하던 대덕소프트웨어마이스터고 입학전형을, **원서 작성부터 합격자 발표까지 온라인 한 곳에서 처리**하기 위하여 개발한 서비스입니다.',
        '2026년 버전을 맡아 2025년 버전을 이어받지 않고 **새 저장소에서 다시 구성**했고, 2026년 10월 모의 원서 접수부터 실제 서비스로 운영되고 있습니다.',
      ],
      highlights: [
        '앱 5개와 공통 패키지 4개를 **Turborepo 모노레포**로 구성하고 Nx·SSR 구조를 Vite SPA로 단순화',
        '**어드민 화면 8개 전부** 직접 개발 — 지원자 관리, 1차 합격자 일괄 산출, 수험번호 발급, 전형 통계',
        'CBT·OBT 두 단계 베타 테스트를 운영하며 **원서 데이터 정합성** 문제를 찾아 수정',
        'Sentry 공용 패키지, CSRF 대응, S3·CloudFront → **Cloudflare Workers** 배포 전환',
        'robots.txt·meta description 정비로 Lighthouse **SEO 83 → 100점**, 어드민 등 4개 앱은 색인 차단',
      ],
      features: [
        { label: '지원자', text: '전형 안내, 모의 성적 계산, 공지·FAQ, 합격 결과 조회' },
        { label: '인증', text: 'PASS 본인인증 회원가입, 로그인, 비밀번호 찾기' },
        {
          label: '원서 작성',
          text: '인적 사항·성적·출결·봉사·가산점 입력, 원서 미리보기, 제출',
        },
        {
          label: '어드민',
          text: '지원자 관리, 1차 합격자 일괄 산출, 수험번호 일괄 발급, 모집 정원·전형 일정·공지 관리, 전형 통계',
        },
        { label: '모니터링', text: '실시간 접속자 수 확인, 오류 모니터링' },
      ],
      sections: [
        {
          title: '저장소 설계',
          paragraphs: ['앱 5개와 공통 패키지 4개를 **Turborepo 모노레포**로 구성했습니다.'],
          bullets: [
            '2025년 버전(Nx · React Router SSR)은 SSR이 필요 없다고 판단해 **Vite SPA로 단순화**',
            '지원자·인증·원서·어드민·모니터링을 따로 배포하고 권한을 나누기 위해 앱 분리',
          ],
        },
        {
          title: '어드민 앱 전담',
          paragraphs: ['어드민 화면 **8개 전부를 직접 개발**했습니다.'],
          bullets: [
            '지원자 관리: 전형별 조회, 원서 도착 확인, 1차 합격자 일괄 산출, 2차 합격자 등록, 수험번호 일괄 발급, 접수 취소',
            '운영 관리: 전형 통계(경쟁률·지역별 접수·성비), 모집 정원, 전형 일정, 공지',
          ],
        },
        {
          title: '합격 결과 조회',
          paragraphs: ['지원자 앱의 결과 조회 화면을 개발했습니다.'],
          bullets: ['로그인 만료·결과 미발표·지원 정보 없음 등 **상황별 안내 문구를 분리**'],
        },
        {
          title: '검색 노출 정책 · SEO 개선',
          paragraphs: [
            '지원자 앱만 검색에 노출하고, 나머지 4개 앱은 색인을 차단했습니다. Lighthouse로 지원자 앱을 측정해 **SEO 점수를 83점에서 100점으로** 올렸습니다.',
          ],
          bullets: [
            '문제: robots.txt가 없어 SPA가 모든 경로에 index.html을 응답해 **어드민까지 크롤링 가능**. Lighthouse도 robots.txt 요청에 HTML이 돌아와 **구문 오류 14건**으로 판정',
            '해결: 실제 robots.txt 파일을 제공하고, 차단할 앱은 robots.txt · noindex 메타 · 응답 헤더 **세 겹으로 차단**',
            '검색 결과에 보일 **meta description**이 없던 문제를 찾아 지원자 앱에 추가',
          ],
        },
        {
          title: 'PM',
          paragraphs: ['담당 선생님과 소통하며 일정을 조율했습니다.'],
          bullets: [
            '팀원 누구나 이어서 운영할 수 있도록 **배포 · 검색 노출 · 오류 수집 설정을 문서화**',
          ],
        },
        {
          title: '테스트 운영 (CBT · OBT)',
          paragraphs: ['실서비스 전 **두 단계로 베타 테스트**를 진행했습니다.'],
          bullets: [
            'CBT: 교내 재학생 및 교직원 대상 (2026.09.28 – 09.30)',
            'OBT 겸 모의 원서 접수: 2027학년도 원서 접수 희망자 대상 (2026.10.06 – 10.14)',
            'CBT 제보 버그 수정: 동시에 보내 서로 덮어쓰던 출결·자격증 저장 요청을 **순차 요청으로 변경**',
            '앱마다 달랐던 에러 응답 파싱 공통화',
          ],
        },
      ],
      scorecard: {
        title: 'Lighthouse 개선 전후',
        description: [
          '지원자 앱(entrydsm.hs.kr)을 Lighthouse 13.3으로 측정한 결과입니다. SEO 항목에서 지적된 robots.txt 구문 오류와 meta description 누락을 고쳐 **SEO 83점 → 100점**을 받았습니다.',
        ],
        conditions: ['2026.09.11 · 모바일 에뮬레이션', '2026.09.12 · 데스크톱 에뮬레이션'],
        items: [
          { label: 'Performance', before: 61, after: 96 },
          { label: 'Accessibility', before: 94, after: 94 },
          { label: 'Best Practices', before: 77, after: 77 },
          { label: 'SEO', before: 83, after: 100 },
          { label: 'Agentic Browsing', before: 67, after: 67, display: ['2/3', '2/3'] },
        ],
        notes: [
          '두 측정은 기기 조건이 달라(모바일 → 데스크톱) Performance 차이에는 네트워크·CPU 제한 완화가 포함돼 있습니다. SEO 점수는 기기 조건과 무관합니다.',
          '남은 과제: 색상 대비(Accessibility), 콘솔 오류·폐기 API 경고(Best Practices), llms.txt 보강(Agentic Browsing)',
        ],
      },
      troubleshooting: [
        {
          title: '원서 데이터 정합성',
          situation:
            'CBT 기간에 원서 데이터가 서버와 어긋나는 문제 두 가지를 발견했습니다. 앞 단계를 고친 뒤 주소창이나 뒤로 가기로 미리보기·제출로 넘어가면 **고치기 전 값이 제출**됐고, 출결과 자격증을 저장하면 **둘 중 하나가 사라졌습니다.**',
          cause:
            '단계 저장은 "다음"을 눌러야만 일어나서, 다른 경로로 넘어가면 서버에는 고치기 전 값이 남았습니다. 또 백엔드는 출결·자격증 요청 모두 성적 기록 전체를 읽어 고친 뒤 통째로 저장하는데(잠금 없음), 두 요청을 동시에 보내 늦게 끝난 쪽이 먼저 저장된 값을 덮어썼습니다.',
          solution:
            '단계마다 서버에 저장한 입력값의 **지문을 남기고**, 지금 입력값과 다르면 미리보기·제출 전에 그 단계로 돌려보냈습니다. 출결과 자격증 저장은 **순서대로 보내도록** 바꿨습니다.',
          decision:
            '증명사진 같은 파일은 JSON으로 바꾸면 빈 객체가 되어 변경을 알아챌 수 없어, 파일까지 반영하는 직렬화를 직접 만들었습니다. 지문을 저장할 수 없는 환경에서는 모든 단계가 "저장 안 됨"으로 보여 다시 저장하게 될 뿐 잘못 제출되지는 않도록, 안전한 쪽으로 동작하게 했습니다.',
          result:
            'OBT(모의 원서 접수) 전에 원서 데이터가 사라지거나 고치기 전 값으로 제출되는 경로를 막았습니다.',
          improvement:
            '동시 저장 문제는 근본적으로 백엔드가 바뀐 항목만 저장하거나 잠금을 걸어야 해결되는 문제라, 프론트에서 요청 순서를 맞춘 것은 임시 대응에 가깝습니다.',
        },
        {
          title: 'Sentry 도입',
          situation:
            '테스트 기간에 버그 제보를 받아 고쳤지만, 지원자 브라우저에서 난 오류는 제보가 없으면 알 수 없었고 재현도 어려웠습니다.',
          solution:
            '공용 패키지 **@entry/observability**를 만들어 앱 5개에 Sentry를 한 번에 붙였습니다. 처리되지 않은 예외, React 렌더 오류, API 실패를 모으고, 비로그인 401 같은 정상 응답은 제외했습니다.',
          decision:
            '지원자 개인정보 보호를 위해 쿠키·헤더·요청 본문 수집을 끄고 로그를 마스킹했습니다. 세션 리플레이와 트레이싱은 수집 데이터와 번들 크기를 줄이려고 넣지 않았으며, 소스맵 업로드는 빌드 시크릿 관리 부담 때문에 다음 과제로 남겼습니다.',
          result: '오류를 앱·환경·배포 커밋 단위로 나눠 볼 수 있게 됐습니다.',
        },
        {
          title: 'CSRF 대응',
          situation:
            '백엔드 게이트웨이에 CSRF 더블서브밋 검사가 들어오면서, JavaScript가 쿠키에서 토큰을 꺼내 헤더에 넣던 기존 방식으로는 변경 요청이 막혔습니다.',
          cause:
            '게이트웨이는 로그인 쿠키가 실린 변경 요청마다 XSRF-TOKEN 쿠키와 X-XSRF-TOKEN 헤더 값이 같은지 확인하는데, 프론트는 이 헤더를 보내지 않았습니다.',
          solution:
            '인증 토큰은 **HttpOnly 쿠키로 브라우저에 맡기고**, GET·HEAD·OPTIONS를 제외한 모든 요청에 X-XSRF-TOKEN 헤더를 붙이도록 앱별 HTTP 레이어를 고쳤습니다.',
          decision:
            '보통은 요청마다 토큰을 새로 받지만, 15초마다 하트비트를 보내는 모니터링과 페이지를 떠날 때 로그를 보내는 수집기는 그럴 수 없었습니다. 게이트웨이가 같은 쿠키에는 같은 토큰을 준다는 점을 확인하고, 이 둘만 토큰을 캐시해 쓰고 403이 오면 다시 받게 했습니다.',
          result:
            '액세스 토큰을 JavaScript가 다루지 않게 됐고, 하트비트와 이탈 로그도 CSRF 검사를 통과하게 됐습니다.',
        },
        {
          title: '배포 전환',
          situation:
            '처음에는 S3·CloudFront와 GitHub Actions로 배포했습니다. 앱 5개를 운영·스테이징으로 나누니 CloudFront 배포 10개, 240줄짜리 워크플로우, CI에 넣은 AWS 자격 증명까지 관리할 게 많았고, AWS 비용과 계정 관리도 부담이었습니다.',
          solution:
            '정적 자산 전용 **Cloudflare Workers**로 옮기고, 도메인·SPA 라우팅·환경 설정을 앱별 wrangler.jsonc로 저장소에 넣었습니다. 빌드와 배포는 GitHub와 연동된 Workers Builds에 맡겨 배포 워크플로우를 지웠습니다.',
          decision:
            '스테이징 도메인은 auth.stag.entrydsm.hs.kr이 아니라 stag-auth.entrydsm.hs.kr처럼 한 단계로 두었습니다. 그래야 와일드카드 인증서 한 장과 쿠키 도메인 공유를 그대로 쓸 수 있었습니다.',
          result:
            'main·develop에 합치면 운영·스테이징에 자동 배포되고 PR마다 프리뷰 URL이 생깁니다. CI에 AWS 자격 증명을 둘 필요도 없어졌습니다.',
        },
      ],
      retrospective: [
        'PM과 어드민 개발을 함께 맡으면서, 일정 안에 끝내려면 **무엇을 먼저 할지 정하는 일이 개발만큼 중요**하다는 걸 배웠습니다. 배포·검색 노출·오류 수집 설정을 문서로 남겨 두니 다른 팀원도 같은 방식으로 배포하고 문제를 찾을 수 있었고, 그 뒤로는 설정을 바꿀 때 문서도 같이 고치고 있습니다.',
        '특히 원서 접수라는 중요한 시스템의 개발을 맡아 진행하며, **책임감 있는 개발이 무엇인지, 시스템의 안정성이 왜 중요한지** 이해하고 실천할 수 있었습니다.',
      ],
    },
  },
  {
    id: 'xquare-infra-v3',
    title: 'XQUARE Infra',
    summary: '교내 프로젝트 배포 플랫폼 XQUARE 인프라 서비스 V3',
    description:
      'XQUARE Infra V3는 대덕소프트웨어마이스터고 학생들이 자기 프로젝트를 학교 서버에 직접 배포할 수 있게 해 주는 교내 인프라 플랫폼입니다.',
    role: '동아리의 첫 프론트엔드 개발자로 합류해 설계부터 개발까지 맡았고, 부장·PM으로 사용자 127명 규모의 서비스를 운영하고 있습니다.',
    imageVariant: 'aurora',
    cover: '/images/projects/xquare-infra.webp',
    tags: ['React 19', 'TypeScript', 'Emotion', 'Turborepo', 'Storybook', 'Kubernetes', 'Argo CD'],
    period: '2025.11.20 – 현재',
    status: '서비스 중(2026.01.16~)',
    team: 'Frontend 3명 · Backend 2명 · DevOps 1명',
    position: '부장 · PM · Frontend · Infra',
    contribution: '프론트엔드 커밋 307 / 379 (81%)',
    scale: '사용자 127명 · 프로젝트 60여 개 배포',
    collaboration: 'Notion 태스크 · Discord 알림 봇(직접 개발)',
    links: [
      { label: 'Github', href: 'https://github.com/team-xquare/xquare-infra-frontend-v3' },
      { label: '홈페이지', href: 'https://xquare.dsmhs.kr/' },
    ],
    detail: {
      intro: [
        '대덕소프트웨어마이스터고 학생들이 **자기 프로젝트를 학교 서버에 직접 배포**할 수 있게 해 주는 교내 인프라 플랫폼입니다. 2023년 AWS 기반 v1으로 시작해 2025년 학교 서버로 옮기면서 Kubernetes·Argo CD 환경을 만들었고, v3에서는 웹에서 배포 설정·로그·시크릿을 직접 관리할 수 있게 했습니다.',
        '2026년 10월부터는 **Proxmox 서버를 더해 컨테이너 대여**도 제공합니다.',
      ],
      highlights: [
        '동아리 첫 프론트엔드 개발자로 **기술 스택·구조·디자인 시스템을 결정**하고 모노레포 구성',
        '배포 설정·배포 로그·애드온 생성·팀 관리 화면과 학교 이메일 인증 회원가입 개발',
        '**Proxmox 컨테이너 대여** 서비스를 직접 제안하고 OS 설치·네트워크·라우팅 설계 전담',
        '서버 포맷 전 **클러스터 전체 백업**(DB 41개, 이미지 73개, 5.84GiB) 및 복원 방법 문서화',
      ],
      features: [
        { label: '배포 관리', text: '애플리케이션 배포 설정, 배포 로그, 환경 변수(시크릿) 관리' },
        { label: '대시보드', text: '노드별 파드 상태와 헬스, 마지막 배포·빌드 시각 확인' },
        { label: '애드온·팀', text: 'DB 같은 애드온 생성, 팀 단위 프로젝트 관리' },
        { label: '자동 배포', text: 'GitHub push 후 이미지 빌드부터 Argo CD 동기화까지 자동 진행' },
        { label: '컨테이너 대여', text: 'Proxmox 기반 컨테이너 제공 (2026.10 –)' },
      ],
      sections: [
        {
          title: '부장 · PM',
          paragraphs: ['계획서를 작성하고 일정을 조율했습니다.'],
          bullets: [
            '예산안·보고서를 직접 작성해 **CPU 4개 교체 예산 확보** (교체 작업 예정)',
            '프론트엔드 인력 부족 → FE 전공 학생 2명을 설득해 영입',
            '주식회사 키키랩 대표님을 섭외해 팀원 대상 강연 2회 개최',
          ],
        },
        {
          title: '프론트엔드 설계 · 개발',
          paragraphs: ['동아리의 **첫 프론트엔드 개발자로 합류**해 설계부터 개발까지 담당했습니다.'],
          bullets: [
            '기술 스택·구조·디자인 시스템 결정, 사용자·관리자 앱과 공통 모듈(UI·hooks·utils)로 모노레포 구성',
            '배포 설정·배포 로그·애드온 생성·팀 관리 화면, 시크릿 표시 토글, 학교 이메일 인증 회원가입 개발',
            'Storybook으로 컴포넌트를 따로 확인하는 환경 구성',
          ],
        },
        {
          title: 'Proxmox 컨테이너 대여',
          paragraphs: ['2학년 때 데브옵스 역량을 보완하며 **직접 제안한 서비스**입니다.'],
          bullets: [
            '동아리·담당 선생님 승인 후 OS 설치, 서비스 구조, 네트워크·라우팅 설계 전담',
            '오픈 후 사용자 문의 대응',
          ],
        },
        {
          title: '클러스터 전체 백업',
          paragraphs: ['서버 포맷 전, 서비스 영향 없이 전체 데이터를 백업했습니다.'],
          bullets: [
            '읽기 전용 방식으로 DB 41개, Vault, 오브젝트 스토리지, 컨테이너 이미지 73개 등 **5.84GiB 백업**',
            '전 파일 SHA-256 검증, 프로젝트별 복원 방법 문서화',
          ],
        },
        {
          title: '팀 알림 봇',
          paragraphs: [
            'Notion 태스크와 GitHub PR·이슈 변경을 Discord로 알리는 봇을 Node.js로 개발했습니다.',
          ],
        },
      ],
      troubleshooting: [
        {
          title: '학교망 서버 외부 연결',
          situation:
            '학교망 안의 서버를 외부 도메인으로 서비스하고, 동아리원이 서버에 접속할 수 있어야 했습니다. AWS EC2를 **WireGuard 릴레이**로 두고 80·443 트래픽을 학교 서버의 리버스 프록시로 넘겼고, 터널이 EC2의 기본 경로를 가져가 원격 접속이 끊기지 않도록 정책 라우팅으로 경로를 나눴습니다.',
          problem: '그런데 VPN을 켠 개발자 PC에서 인터넷이 되지 않았습니다.',
          cause:
            '처음에는 MTU를 의심해 낮춰 봤지만 그대로였습니다. 접속한 사이트의 인증서를 확인해 보니 **교육청망의 SSL 검사 장비가 발급한 인증서**로 바뀌어 있었고, PC가 이를 신뢰하지 못해 연결이 끊긴 것이었습니다.',
          solution: '학교 내부 대역만 터널로 보내는 **split tunnel**로 바꿨습니다.',
          decision:
            '인터넷을 EC2로 돌리는 방법도 있었습니다. 하지만 동아리원에게 필요한 건 학교 서버 접속뿐이었고, EC2로 돌리면 비용과 속도 부담이 생겼습니다.',
          result:
            '외부 도메인에서 학교 서버로 들어오는 경로를 열었고, VPN을 켜도 인터넷이 끊기지 않게 됐습니다.',
        },
        {
          title: 'PWA 캐시로 새 버전이 전달되지 않는 문제',
          situation:
            '2026년 4월 사용자 앱에 PWA(앱 설치·오프라인 지원)를 넣은 뒤, 새 버전을 배포해도 사용자에게 **이전 화면이 보이는 문제**가 생겼습니다.',
          cause:
            '서비스 워커가 빌드 결과물(index.html·JS·CSS)을 미리 캐시해 두고 캐시에서 먼저 화면을 띄우는 구조라, 새 버전은 그다음에야 받아서 적용됐습니다. XQUARE는 접속할 일이 적은 서비스라 들어올 때마다 이전 버전부터 보게 됐고, 릴리즈가 잦아 이 문제가 계속 반복됐습니다.',
          decision:
            '접속 빈도가 낮은 서비스에서는 설치·오프라인 같은 PWA의 이점이 크지 않은 반면, 릴리즈할 때마다 새 버전이 제대로 전달되지 않는 비용은 컸습니다.',
          solution: '도입 두 달 만인 2026년 6월에 **PWA를 제거**했습니다.',
          result: '새로 접속하는 사용자에게는 배포한 버전이 바로 전달됩니다.',
          improvement:
            '플러그인을 제거하는 것만으로는 이미 설치된 서비스 워커가 브라우저에 남아 옛 화면을 계속 보여줄 수 있습니다. 기존 사용자를 위해 스스로 삭제하는 서비스 워커를 배포해 정리해야 합니다.',
        },
      ],
      retrospective: [
        '127명이 쓰는 서비스를 맡고 나니, 기능을 만드는 것만큼 **사용자 문의에 답하고 장애를 처리하는 일**이 많다는 걸 알게 됐습니다.',
        '서버 포맷을 앞두고 전체 백업을 하면서는, **무언가를 바꾸기 전에 되돌릴 방법부터 확보하는 습관**이 생겼습니다.',
      ],
    },
  },
  {
    id: 'Commonly-frontend',
    title: 'Commonly',
    summary: '유성구청 리빙랩 — 기간제 근로자 경력 관리 시스템',
    description:
      'Commonly는 유성구청의 기간제 근로자 경력 관리와 경력증명서 발급 업무를 온라인으로 옮긴 서비스입니다.',
    role: 'PM과 디자인을 전담하고 세 앱의 공통 UI와 화면을 개발했으며, Portainer 기반 배포까지 맡았습니다.',
    imageVariant: 'studio',
    cover: '/images/projects/commonly.webp',
    tags: ['React 19', 'TypeScript', 'Emotion', 'Turborepo', 'Docker', 'Portainer', 'KRDS'],
    period: '2026.07 – 2026.10',
    status: '개발 완료',
    team: 'Frontend 2명 · Backend 2명',
    position: 'PM · 디자인 전담 · Frontend · 배포',
    contribution: '커밋 88 / 267',
    links: [{ label: 'Github', href: 'https://github.com/DSM2026-Commonly/Commonly-Frontend' }],
    detail: {
      intro: [
        '유성구청의 **기간제 근로자 경력 관리와 경력증명서 발급 업무를 온라인으로 옮기는** 프로젝트입니다. 관리자, 업무 담당자, 민원인(근로자)이 각자 쓰는 앱 3개로 나눠 만들었고, 공공 서비스에 맞게 **정부 디자인 시스템(KRDS)**을 기준으로 디자인했습니다.',
        '2026 유성 데이터기반 실증 리빙랩에서 **우수상**을 수상했습니다.',
      ],
      highlights: [
        'PM으로 Frontend 2명 · Backend 2명 팀의 일정과 협업을 이끌고 **세 앱 화면을 Figma로 전부 디자인**',
        '세 앱이 함께 쓰는 **공통 UI 패키지**를 중심으로 경력증명서 발급, 경력사항 수정, 사용자 등록·삭제, 민원 신청 화면 개발',
        '앱마다 달랐던 용어·버튼 라벨·여백·스크롤 위치를 하나로 통일',
        'Portainer가 main 브랜치를 확인해 세 앱을 한 Stack으로 배포하는 **단순한 배포 구성**',
      ],
      features: [
        { label: '관리자', text: '업무 담당자 계정 등록·삭제, 사용자 목록, 업무 이력 조회' },
        {
          label: '업무 담당자',
          text: '경력사항 개별 등록, 엑셀 파일로 통합 등록, 경력사항 수정, 경력증명서 발급',
        },
        { label: '민원인', text: '회원가입·본인 확인, 경력증명서 신청' },
        {
          label: '공통',
          text: '4단계로 나눈 경력증명서 발급 흐름(유의사항 확인, 발급 사유, 대상자, 발급 정보), 등록·발급 내역 기록',
        },
      ],
      sections: [
        {
          title: 'PM',
          paragraphs: ['Frontend 2명, Backend 2명 팀의 일정과 협업을 이끌었습니다.'],
        },
        {
          title: '디자인 전담',
          paragraphs: [
            'Figma로 세 앱의 화면을 모두 디자인했습니다. 공무원과 근로자가 쓰는 공공 서비스라 눈에 띄는 화면보다 **알아보기 쉬운 화면**이 중요하다고 보고, KRDS 컴포넌트와 토큰을 기준으로 삼았습니다.',
          ],
        },
        {
          title: '공통 UI · 화면 개발',
          paragraphs: [
            '세 앱이 함께 쓰는 **공통 UI 패키지**를 중심으로 경력증명서 발급, 경력사항 수정, 사용자 등록·삭제, 민원 신청 화면을 만들고 API를 연동했습니다.',
          ],
          bullets: ['앱마다 달랐던 용어, 버튼 라벨, 여백, 페이지 이동 시 스크롤 위치를 하나로 통일'],
        },
        {
          title: '배포',
          paragraphs: [
            'Portainer가 main 브랜치를 주기적으로 확인해 세 앱 이미지를 직접 빌드하고 **한 Stack으로 배포**하게 했습니다.',
          ],
          bullets: ['컨테이너 레지스트리나 GitHub Secrets 없이 배포가 돌아가도록 단순하게 구성'],
        },
      ],
      retrospective: [
        '공무원과 근로자가 쓰는 화면을 디자인하면서, 눈에 띄는 화면보다 **누구나 헷갈리지 않는 용어와 흐름**이 더 중요하다는 걸 느꼈습니다. 세 앱의 용어와 버튼을 하나로 맞추는 작업을 하며, **일관성이 곧 사용성**이고 그래서 공통 UI를 처음부터 잘 정해 두어야 한다는 걸 배웠습니다.',
        '특히 KRDS를 사용하며 기존의 표준에 맞춰 개발하는 과정에 대한 이해도를 높일 수 있었습니다.',
      ],
    },
  },
];
