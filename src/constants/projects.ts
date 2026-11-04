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
          paragraphs: [
            '동아리의 **첫 프론트엔드 개발자로 합류**해 설계부터 개발까지 담당했습니다.',
          ],
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
          bullets: [
            '앱마다 달랐던 용어, 버튼 라벨, 여백, 페이지 이동 시 스크롤 위치를 하나로 통일',
          ],
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
  {
    id: 'uranus-nettools',
    title: 'Uranus-NetTools',
    summary: '터미널 하나로 쓰는 크로스플랫폼 네트워크 도구 모음 CLI',
    description:
      'Uranus-NetTools(unt)는 핑·트레이스·포트 스캔·DNS·WHOIS 등 네트워크 진단 도구 13개를 한 가지 인터페이스로 묶은 크로스플랫폼 CLI입니다.',
    role: '개인 프로젝트로 설계부터 개발, 테스트, 플랫폼별 실행 파일 패키징과 배포 자동화까지 전부 맡았습니다.',
    imageVariant: 'mono',
    tags: ['TypeScript', 'Node.js', 'Commander', 'esbuild', 'Node SEA', 'Vitest', 'GitHub Actions'],
    period: '2026.10.12 – 2026.10.20',
    status: 'v1.0.2 배포',
    team: '개인 프로젝트',
    position: '설계 · 개발 · 패키징 · 배포',
    contribution: '커밋 198 / 198',
    scale: '명령 13개 · 테스트 파일 69개 · 실행 파일 7종',
    links: [
      { label: 'Github', href: 'https://github.com/JAEJUN090210/Uranus-NetTools' },
      { label: '홈페이지', href: 'https://jaejun090210.github.io/Uranus-NetTools/' },
    ],
    detail: {
      intro: [
        'Uranus-NetTools(unt)는 핑, 트레이스라우트, 포트 스캔, LAN 호스트 탐색, DNS·WHOIS·GeoIP 조회, HTTP 헤더·TLS 인증서 확인, 로컬 네트워크 정보까지 **네트워크 진단 도구 13개를 한 가지 인터페이스로 묶은** 크로스플랫폼 CLI입니다. 한 번에 실행하는 서브커맨드와 히스토리·탭 완성이 되는 대화형 셸 두 방식을 지원하고, --json 옵션으로 스크립트에서도 쓸 수 있습니다.',
        'Node.js가 내장된 **단일 실행 파일**로 배포해 따로 설치할 것이 없고, 설치 스크립트·apt 저장소·Homebrew tap으로 Windows·macOS·Linux에 설치할 수 있습니다.',
      ],
      highlights: [
        'raw socket 없이 동작하는 **관리자 권한 불필요** 설계 — 시스템 ping·TCP 핸드셰이크 핑, TCP connect 포트 스캔, ARP 테이블 기반 호스트 탐색',
        'DNS 와이어 프로토콜·RDAP·WHOIS 클라이언트를 직접 구현하고, Nmap 상위 1000개 포트·IANA 서비스명·OUI 데이터를 빌드 시 생성',
        'Node SEA(Single Executable Application)로 **OS 3종 × 아키텍처별 실행 파일 7종**을 GitHub Actions 릴리스로 자동 빌드',
        'SHA256 검증 설치 스크립트, GitHub Pages 위 **apt 저장소**, Homebrew tap, winget 매니페스트까지 배포 채널 구성',
        'Vitest 테스트 파일 69개, Windows·macOS·Linux CI 매트릭스, husky 커밋 컨벤션 검사',
      ],
      features: [
        {
          label: '진단',
          text: '핑(ICMP·TCP), 트레이스라우트(--watch 로 mtr 처럼 홉별 실시간 측정), TCP 포트 연결 확인',
        },
        {
          label: '스캔',
          text: 'TCP connect 포트 스캔, 서비스 배너 읽기, LAN 호스트 탐색(ICMP·TCP·ARP)',
        },
        { label: '조회', text: 'DNS 레코드, WHOIS·RDAP, IP 위치·ASN, HTTP 헤더, TLS 인증서' },
        {
          label: '로컬',
          text: '네트워크 인터페이스, 공인 IP, 기본 게이트웨이, 활성 연결·리스닝 포트',
        },
        { label: '셸', text: '탭 완성·히스토리가 있는 대화형 셸, Ctrl+C 로 실행 중인 명령만 취소' },
      ],
      sections: [
        {
          title: '설계',
          paragraphs: [
            '명령(commands)과 실제 동작(core)을 분리해 모든 명령이 **같은 출력 형식(테이블·JSON)과 종료 코드 규칙**을 따르게 했습니다.',
          ],
          bullets: [
            'Commander 기반 서브커맨드와 대화형 셸(REPL)이 같은 명령 정의를 공유',
            '색상은 TTY가 아니거나 NO_COLOR 가 설정되면 자동으로 꺼짐',
            '공인 IP 스캔은 확인을 받고, 터미널이 아니면 --yes 없이는 거부해 책임 있는 사용을 기본값으로',
          ],
        },
        {
          title: '권한 없이 동작하는 네트워크 도구',
          paragraphs: [
            'raw socket 을 쓰면 관리자 권한이 필요해, **권한 없이도 되는 방법**을 골라 구현했습니다.',
          ],
          bullets: [
            '핑: 시스템 ping 명령 출력을 OS별로 파싱하고, ICMP가 막힌 곳은 TCP 핸드셰이크 시간으로 대체',
            '트레이스: tracert·traceroute·tracepath 를 OS에 맞게 호출해 출력 파싱, --watch 는 경로를 한 번 찾은 뒤 홉마다 핑',
            '스캔: 동시 500개 TCP connect 로 open·closed·filtered 구분, 배너는 서비스 인사말 → HTTP HEAD → TLS 순으로 시도',
            '탐색: ICMP → 공통 TCP 포트 → OS ARP 테이블 순으로 조용한 호스트까지 찾고 OUI 로 제조사 표시',
          ],
        },
        {
          title: '패키징·배포 자동화',
          paragraphs: [
            'esbuild 로 번들한 뒤 Node SEA 와 postject 로 **플랫폼별 단일 실행 파일**을 만들고, 태그를 올리면 GitHub Actions 가 릴리스를 만듭니다.',
          ],
          bullets: [
            'Windows x64 · macOS arm64/x64 · Linux x64/arm64 실행 파일과 .deb 패키지, SHA256SUMS',
            'GitHub Pages 에 apt 저장소(서명 키 포함)·설치 스크립트·문서 사이트를 함께 배포',
            'install.sh · install.ps1 은 OS·CPU 에 맞는 빌드를 받아 체크섬을 검증하고 PATH 까지 설정',
          ],
        },
        {
          title: '품질',
          bullets: [
            'Vitest 테스트 파일 69개: 로컬 DNS 서버·TCP 서버 헬퍼로 네트워크 동작을 실제 소켓으로 검증',
            'Ubuntu·Windows·macOS 매트릭스 CI, typecheck·lint·prettier·test 를 한 명령(check)으로',
            'husky commit-msg 훅과 PR 제목 검사 워크플로로 커밋 컨벤션 강제',
          ],
        },
      ],
      retrospective: [
        '프론트엔드 밖에서 네트워크 프로토콜(DNS 와이어 포맷, RDAP, TLS)을 직접 다뤄 보며 **표준 문서를 읽고 구현하는 경험**을 쌓았습니다.',
        '설치 스크립트·apt 저장소·Homebrew 까지 배포 채널을 직접 만들어 보니, 사용자가 설치하는 순간의 경험도 제품의 일부라는 점을 실감했습니다.',
      ],
    },
  },
  {
    id: 'uranus-totp',
    title: 'Uranus-TOTP',
    summary: '터미널에서 쓰는 2단계 인증 코드(TOTP) 생성기 CLI',
    description:
      'Uranus-TOTP(utc)는 Google Authenticator처럼 2단계 인증용 일회용 비밀번호를 터미널에서 만들어 주는 CLI로, 계정은 비밀번호로 암호화된 파일 하나에 보관합니다.',
    role: '개인 프로젝트로 TOTP 생성과 암호화 저장소, 대화형 셸, 플랫폼별 배포까지 전부 맡았습니다.',
    imageVariant: 'aurora',
    tags: [
      'TypeScript',
      'Node.js',
      'Commander',
      'AES-256-GCM',
      'scrypt',
      'Vitest',
      'GitHub Actions',
    ],
    period: '2026.10.21',
    status: 'v1.0.0 배포',
    team: '개인 프로젝트',
    position: '설계 · 개발 · 패키징 · 배포',
    contribution: '커밋 111 / 111',
    scale: '명령 12개 · 테스트 파일 32개 · 실행 파일 7종',
    links: [
      { label: 'Github', href: 'https://github.com/JAEJUN090210/Uranus-TOTP' },
      { label: '홈페이지', href: 'https://jaejun090210.github.io/Uranus-TOTP/' },
    ],
    detail: {
      intro: [
        'Uranus-TOTP(utc)는 Google Authenticator 나 Authy 처럼 2단계 인증(2FA)에 쓰는 **시간 기반 일회용 비밀번호(TOTP)를 터미널에서 생성**하는 크로스플랫폼 CLI입니다. 계정은 네임스페이스로 묶여 비밀번호로 암호화된 파일 하나에 보관됩니다.',
        'Go 로 만들어진 totp-cli 의 명령 체계를 TypeScript 로 다시 구현했고, Uranus-NetTools 에서 만든 CLI·대화형 셸·패키징 기반을 그대로 재사용했습니다.',
      ],
      highlights: [
        'RFC 6238 TOTP(SHA-1·SHA-256·SHA-512, 자릿수·주기 설정)를 **Node.js crypto 만으로 구현**',
        '계정 파일은 **AES-256-GCM + scrypt** 로 암호화하고 강도(fast·normal·strong)를 선택, 비밀번호는 어디에도 저장하지 않음',
        '토큰은 인자로 받지 않고 숨김 입력·환경 변수·표준 입력으로만 받아 **셸 히스토리에 비밀이 남지 않도록** 설계',
        '대화형 셸은 비밀번호를 한 번만 묻고 5분 미사용 시 자동 잠금, 네임스페이스·계정 이름까지 탭 완성',
        'NetTools 와 같은 빌드·릴리스 파이프라인으로 OS 3종 실행 파일·apt·Homebrew 배포, 테스트 파일 32개',
      ],
      features: [
        {
          label: '코드 생성',
          text: '저장한 계정의 코드 생성(generate, --follow 로 바뀔 때마다 출력), 저장 없이 즉석 생성(instant)',
        },
        {
          label: '계정 관리',
          text: '추가·목록·이름 변경·옵션 수정·삭제, 네임스페이스 단위 그룹화',
        },
        { label: '토큰 옵션', text: '계정별 자릿수, 접두어, HMAC 알고리즘, 유효 시간' },
        { label: '저장소', text: '비밀번호 변경, JSON 내보내기(dump)·가져오기(import)' },
      ],
      sections: [
        {
          title: '암호화 저장소',
          paragraphs: ['모든 계정을 **비밀번호로 암호화된 파일 하나**에 보관합니다.'],
          bullets: [
            'scrypt 로 비밀번호에서 키를 유도하고 AES-256-GCM 으로 암호화, 강도 옵션으로 키 유도 비용 선택',
            '비밀번호는 저장하지 않아 잊으면 복구 불가 — 대신 dump 로 평문 백업을 명시적으로 만들 수 있게',
            '토큰은 --json 출력이나 list 에서도 절대 보여 주지 않음',
          ],
        },
        {
          title: '비밀이 새지 않는 입력',
          bullets: [
            '토큰·비밀번호는 터미널에서 숨김 입력으로, 파이프에서는 정해진 순서로 표준 입력에서 읽음',
            'add-token 은 저장 전에 토큰으로 코드를 한 번 만들어 보고 잘못 복사한 토큰을 바로 잡아냄',
            'instant 는 토큰을 UTC_TOKEN 환경 변수·숨김 질문·표준 입력에서만 받아 인자로는 받지 않음',
          ],
        },
        {
          title: '대화형 셸',
          bullets: [
            '비밀번호는 처음 필요한 명령에서 한 번만 묻고, lock 명령 또는 5분 미사용 시 잊음',
            '잠금이 풀린 동안에는 네임스페이스·계정 이름까지 탭 완성',
          ],
        },
      ],
      retrospective: [
        'NetTools 에서 만든 CLI 기반(명령 정의·REPL·출력·패키징)을 둘째 프로젝트에 그대로 옮겨 보며, **재사용 가능한 구조를 먼저 만들어 두는 것의 가치**를 체감했습니다.',
        '암호화는 라이브러리를 고르는 일보다 키 유도·저장 경로·백업 같은 운영 결정이 더 어렵다는 점을 배웠습니다.',
      ],
    },
  },
  {
    id: 'portfolio',
    title: '포트폴리오 사이트',
    summary: '지금 보고 있는 이 사이트 — React·Vite 로 만든 개인 포트폴리오',
    description:
      '프로젝트·경험·기술 스택을 소개하는 개인 포트폴리오 사이트로, 라우트별 정적 HTML 생성과 Lighthouse 기반 성능·SEO·접근성 개선을 직접 적용했습니다.',
    role: '기획·디자인·개발·배포를 혼자 맡았고, 검색 노출과 성능을 실제 서비스 수준으로 맞추며 운영하고 있습니다.',
    imageVariant: 'studio',
    tags: [
      'React 18',
      'TypeScript',
      'Vite',
      'Emotion',
      'React Router',
      'Docker',
      'nginx',
      'Portainer',
    ],
    period: '2026.07.03 – 현재',
    status: '서비스 중',
    team: '개인 프로젝트',
    position: '기획 · 디자인 · Frontend · 배포',
    links: [
      { label: 'Github', href: 'https://github.com/JAEJUN090210/Portfolio' },
      { label: '홈페이지', href: 'https://jaejun.isdevj.kr' },
    ],
    detail: {
      intro: [
        '지금 보고 있는 이 사이트입니다. 프로젝트·경험·기술 스택·수상 내역을 소개하는 개인 포트폴리오로, 단순한 정적 페이지가 아니라 **검색 노출·성능·접근성을 실제 서비스 수준으로** 맞추는 것을 목표로 만들었습니다.',
        'Vite + React SPA 지만 빌드 시 라우트별 정적 HTML 을 생성해, JavaScript 를 실행하지 않는 크롤러와 메신저 미리보기도 페이지별 정보를 읽을 수 있습니다.',
      ],
      highlights: [
        '빌드 후 **라우트별 정적 HTML·sitemap 을 생성하는 Vite 플러그인** 직접 작성 — 제목·설명·canonical·OG·JSON-LD 를 페이지마다 채움',
        'Suspense 스켈레톤 마진 병합으로 생기던 **CLS 0.93 제거**, 대표 이미지 480/960/1440 srcset·preload 로 LCP 개선',
        '닫힌 아코디언 inert 처리, 헤딩 순서, 터치 영역, 텍스트 대비 등 **접근성 점검 항목 보완**',
        'Docker 멀티스테이지 빌드 + nginx(try_files·gzip)로 Portainer Stack 배포, 네이버 서치어드바이저·Google 색인 등록',
        '프로젝트 데이터를 TypeScript 상수로 관리해 목록·상세·SEO·sitemap 이 한 곳의 데이터를 공유',
      ],
      features: [
        {
          label: '홈',
          text: '히어로, 프로젝트 아코디언(더보기), 경험 타임라인, 기술 스택, 연락처',
        },
        {
          label: '프로젝트 상세',
          text: '역할·기여도·주요 기능·트러블슈팅·회고, Lighthouse 개선 전후 비교 카드',
        },
        { label: 'SEO', text: '라우트별 정적 HTML, sitemap, OG 이미지, JSON-LD, 404 noindex' },
        {
          label: '기타',
          text: '다크·라이트 테마, 스크롤 위치에 따른 섹션 라벨, PDF 포트폴리오 다운로드',
        },
      ],
      sections: [
        {
          title: '정적 HTML 생성 플러그인',
          paragraphs: [
            'SSR 프레임워크로 옮기는 대신, 기존 Vite SPA 에 **빌드 후처리 플러그인**을 붙였습니다.',
          ],
          bullets: [
            'seo.ts 의 페이지 메타를 읽어 라우트마다 index.html 을 복제하고 제목·설명·canonical·OG·twitter 메타를 치환',
            '라우트가 쓰는 스크립트 청크 modulepreload 와 대표 이미지 preload 힌트를 HTML 단계에 삽입',
            'nginx 의 try_files $uri $uri.html /index.html 로 라우트별 HTML 을 먼저 서빙',
            '메타 태그를 찾지 못하면 빌드를 실패시켜 index.html 과 어긋나지 않게',
          ],
        },
        {
          title: '성능·접근성',
          bullets: [
            'Lighthouse 로 측정하며 CLS 원인(Suspense 폴백 마진 병합)을 찾아 제거',
            '웹폰트 비차단 로딩, Montserrat 가변 폰트·Pretendard dynamic subset 으로 교체',
            'react-icons 기술 로고는 첫 화면 아래라 lazy 청크로 분리',
            '닫힌 아코디언 패널에 inert 를 줘 숨은 링크가 Tab 에 잡히지 않게',
          ],
        },
        {
          title: '배포',
          bullets: [
            'Dockerfile 멀티스테이지(node 빌드 → nginx:alpine), docker-compose 헬스체크',
            'Portainer Stack 이 main 브랜치를 보고 빌드·배포',
          ],
        },
      ],
      retrospective: [
        '포트폴리오라는 작은 사이트에서도 측정(Lighthouse)과 수정 사이클을 돌려 보니, **숫자로 확인되는 개선**이 가장 설득력 있다는 것을 배웠습니다.',
        '내용을 자주 고치게 되는 사이트라 데이터와 화면을 분리해 둔 선택이 유지보수에 큰 도움이 됐습니다.',
      ],
    },
  },
  {
    id: 'brainps-client',
    title: '두뇌발전소 홈페이지',
    summary: '심리·뇌파 검사 업체 두뇌발전소의 홈페이지 리뉴얼 (외주)',
    description:
      '심리검사·뇌파검사 서비스를 제공하는 두뇌발전소의 홈페이지를 외주로 새로 만들었습니다. 회사·서비스 소개부터 회원가입, 포트원 결제, 관리자 페이지까지 프론트엔드 전체를 담당했습니다.',
    role: '외주 프로젝트의 프론트엔드를 혼자 담당해 소개 페이지, 회원·결제, 관리자 페이지까지 전부 개발했습니다.',
    imageVariant: 'studio',
    tags: [
      'React 19',
      'TypeScript',
      'Vite',
      'Emotion',
      'React Router 7',
      'React Compiler',
      'PortOne',
      'Kakao Maps',
    ],
    period: '2026.02 – 2026.04',
    status: '서비스 중',
    team: 'Frontend 1명 · Backend 1명',
    position: '외주 · Frontend 전담',
    contribution: '커밋 38 / 39',
    links: [{ label: '홈페이지', href: 'https://brainps.co.kr' }],
    detail: {
      intro: [
        '심리검사·뇌파검사 서비스를 제공하는 **두뇌발전소의 홈페이지를 외주로 새로 만든** 프로젝트입니다. 회사 소개(인사말·연혁·오시는 길), 검사 서비스 4종 소개, 회원가입·로그인, 검사 상품 구매(포트원 결제), 마이페이지, 관리자 페이지까지 프론트엔드 전체를 혼자 담당했습니다.',
        '2026년 2월부터 4월까지 백엔드 개발자 1명과 함께 진행했고, 현재 brainps.co.kr 에서 운영 중입니다.',
      ],
      highlights: [
        '포트원(PortOne) 브라우저 SDK v2 로 **상품 결제 → 서버 검증 → 결과 안내** 흐름 구현, 모바일 결제 복귀(redirectUrl) 처리',
        '관리자 페이지: 상품 등록·수정·삭제, **드래그 앤 드롭 정렬**, 판매 상태 토글, 회원 검색·페이지네이션·삭제, 견적 문의',
        '이메일 인증 코드 회원가입(연령 확인 필수), 로그인·로그아웃·비밀번호 찾기·변경, 역할 기반 관리자 라우트 가드',
        '카카오맵 오시는 길, 연혁 타임라인, 이용약관·개인정보 처리방침을 시행일자별 파일로 관리',
        'React 19 + React Compiler 로 수동 메모이제이션 없이 구성, API 호출을 utils·hooks 로 분리',
      ],
      features: [
        {
          label: '방문자',
          text: '회사 소개(인사말·연혁·오시는 길), 검사 서비스 4종 소개, 문의·견적 문의',
        },
        {
          label: '회원',
          text: '이메일 인증 회원가입(연령 확인 필수), 로그인, 비밀번호 찾기·변경, 마이페이지',
        },
        { label: '결제', text: '검사 상품 목록, 수량 선택 후 포트원 결제, 서버 결제 검증' },
        {
          label: '관리자',
          text: '상품 관리(등록·수정·삭제·정렬·판매 여부), 회원 관리, 견적 문의 관리',
        },
      ],
      sections: [
        {
          title: '결제 흐름',
          paragraphs: [
            '상품 페이지에서 수량을 고르면 포트원 결제창을 열고, 성공 응답의 paymentId 를 서버에 보내 **검증이 끝난 뒤에만 완료로 처리**합니다.',
          ],
          bullets: [
            '모바일 결제 수단은 결제 후 페이지가 이동되므로 redirectUrl 복귀 처리를 함께 구현',
            '검증 응답의 status 가 PAID 가 아니면 실패 다이얼로그로 안내',
            '상품 조회·결제 검증 API 규격을 README 에 문서화해 백엔드와 계약 공유',
          ],
        },
        {
          title: '관리자 페이지',
          bullets: [
            '상품 카드를 드래그해 노출 순서를 바꾸고 저장(드롭 위치 before/after 계산)',
            '판매 중·중지 필터, 키워드 검색, 회원 목록 페이지네이션',
            '관리자 역할 확인 API 로 라우트 가드',
          ],
        },
        {
          title: '외주 진행',
          bullets: [
            '백엔드 개발자 1명과 API 규격을 먼저 합의한 뒤 화면 개발',
            '환경 변수(.env.example)와 실행 방법을 README 로 문서화해 운영자가 직접 빌드·배포할 수 있게',
          ],
        },
      ],
      retrospective: [
        '실제 돈이 오가는 결제를 처음 붙여 보며, 프론트엔드의 성공 응답을 믿지 않고 **서버 검증을 기준으로 삼는** 이유를 몸으로 배웠습니다.',
        '혼자 프론트엔드 전체를 맡는 외주에서는 코드만큼 문서(README·환경 변수)가 인수인계의 핵심이라는 것을 느꼈습니다.',
      ],
    },
  },
];
