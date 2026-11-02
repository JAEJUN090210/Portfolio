import react from '@vitejs/plugin-react';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import { projects } from './src/constants/projects';
import {
  absoluteUrl,
  projectMeta,
  sitemapRoutes,
  staticRoutes,
  type PageMeta,
} from './src/constants/seo';
import { siteConfig } from './src/constants/site';
import {
  ACCORDION_COVER_SIZES,
  coverSrcSet,
  coverVariant,
  DETAIL_COVER_SIZES,
} from './src/utils/image';

/** 라우트 경로 → 그 라우트를 그리는 페이지 모듈 이름(src/pages/*.tsx) */
const ROUTE_PAGE: Record<string, string> = {
  '/': 'HomePage',
  '/projects': 'ProjectsPage',
  '/experience': 'ExperiencePage',
  '/skills': 'SkillsPage',
  '/awards': 'AwardsPage',
  '/contact': 'ContactPage',
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** `<meta name|property="key" content="...">` 한 줄을 새 값으로 바꿉니다. 없으면 빌드를 실패시켜 index.html 과 어긋나지 않게 합니다. */
const replaceTag = (html: string, pattern: RegExp, replacement: string, label: string) => {
  if (!pattern.test(html)) {
    throw new Error(`[routeHtml] index.html 에서 ${label} 태그를 찾지 못했습니다.`);
  }
  return html.replace(pattern, replacement);
};

const setMeta = (html: string, attr: 'name' | 'property', key: string, value: string) =>
  replaceTag(
    html,
    new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`),
    `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`,
    `${attr}="${key}"`,
  );

/** LCP 가 될 대표 이미지를 HTML 단계에서 미리 요청하게 하는 힌트 */
const preloadCover = (cover: string, sizes: string) =>
  `<link rel="preload" as="image" href="${coverVariant(cover, 960)}" imagesrcset="${coverSrcSet(cover)}" imagesizes="${sizes}" fetchpriority="high" />`;

const routeFile = (path: string) => (path === '/' ? 'index.html' : `${path.slice(1)}.html`);

/**
 * 빌드가 끝나면 라우트마다 제목·설명·canonical·OG 메타를 채운 HTML 을 따로 써 둡니다.
 * JavaScript 를 실행하지 않는 크롤러(네이버, 카카오톡·슬랙 미리보기 등)도 페이지별 정보를 읽을 수 있고,
 * 해당 라우트의 스크립트 청크와 대표 이미지를 미리 불러오도록 힌트를 넣어 첫 렌더링 대기열을 줄입니다.
 * nginx.conf 의 `try_files $uri $uri.html /index.html` 이 이 파일들을 서빙합니다.
 */
function routeHtml(): Plugin {
  let outDir = 'dist';
  /** 페이지 모듈 이름 → 빌드된 청크 파일 */
  const pageChunks = new Map<string, string>();
  /** 청크 파일 → 그 청크가 정적으로 import 하는 청크들 */
  const chunkImports = new Map<string, string[]>();

  const collectImports = (file: string, seen = new Set<string>()): string[] => {
    if (seen.has(file)) return [];
    seen.add(file);
    const nested = (chunkImports.get(file) ?? []).flatMap((dep) => collectImports(dep, seen));
    return [file, ...nested];
  };

  const buildRouteHtml = (template: string, meta: PageMeta, pageModule: string | undefined) => {
    const url = absoluteUrl(meta.path);
    const image = `${siteConfig.canonicalUrl}${meta.image ?? siteConfig.ogImage}`;

    let html = replaceTag(
      template,
      /<title>[^<]*<\/title>/,
      `<title>${escapeHtml(meta.title)}</title>`,
      'title',
    );
    html = setMeta(html, 'name', 'description', meta.description);
    html = setMeta(html, 'property', 'og:title', meta.title);
    html = setMeta(html, 'property', 'og:description', meta.description);
    html = setMeta(html, 'property', 'og:url', url);
    html = setMeta(html, 'property', 'og:image', image);
    html = setMeta(html, 'name', 'twitter:title', meta.title);
    html = setMeta(html, 'name', 'twitter:description', meta.description);
    html = setMeta(html, 'name', 'twitter:image', image);
    html = replaceTag(
      html,
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${url}" />`,
      'canonical',
    );

    const hints: string[] = [];
    const chunk = pageModule ? pageChunks.get(pageModule) : undefined;
    if (chunk) {
      for (const file of collectImports(chunk)) {
        if (!html.includes(`/${file}`)) {
          hints.push(`<link rel="modulepreload" crossorigin href="/${file}" />`);
        }
      }
    }

    // 프로젝트 목록(/projects)은 첫 프로젝트가 펼쳐진 채 시작하므로 그 대표 이미지를 미리 받습니다.
    if (meta.path === '/projects' && projects[0]?.cover) {
      hints.push(preloadCover(projects[0].cover, ACCORDION_COVER_SIZES));
    }

    const project = projects.find((item) => projectMeta(item).path === meta.path);
    if (project?.cover) {
      hints.push(preloadCover(project.cover, DETAIL_COVER_SIZES));
      hints.push(
        `<script type="application/ld+json">${JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          headline: project.summary,
          description: project.description,
          url,
          image,
          inLanguage: 'ko-KR',
          keywords: project.tags.join(', '),
          author: { '@id': `${siteConfig.canonicalUrl}/#person` },
        })}</script>`,
      );
    }

    if (hints.length > 0) {
      html = html.replace('</head>', `    ${hints.join('\n    ')}\n  </head>`);
    }
    return html;
  };

  const buildSitemap = () =>
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...sitemapRoutes.map((route) => `  <url><loc>${absoluteUrl(route.path)}</loc></url>`),
      '</urlset>',
      '',
    ].join('\n');

  return {
    name: 'portfolio:route-html',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    generateBundle(_, bundle) {
      for (const output of Object.values(bundle)) {
        if (output.type !== 'chunk') continue;
        chunkImports.set(output.fileName, output.imports);
        const page = output.facadeModuleId?.replace(/\\/g, '/').match(/\/src\/pages\/(\w+)\.tsx$/);
        if (page) {
          pageChunks.set(page[1], output.fileName);
        }
      }
    },
    writeBundle() {
      const template = readFileSync(join(outDir, 'index.html'), 'utf8');
      for (const meta of staticRoutes) {
        const pageModule = ROUTE_PAGE[meta.path] ?? 'ProjectDetailPage';
        const target = join(outDir, routeFile(meta.path));
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, buildRouteHtml(template, meta, pageModule));
      }
      writeFileSync(join(outDir, 'sitemap.xml'), buildSitemap());
    },
  };
}

/** `vite preview` 도 nginx 처럼 `/projects/foo` 요청에 `projects/foo.html` 을 돌려주게 합니다. */
function previewRouteHtml(): Plugin {
  return {
    name: 'portfolio:preview-route-html',
    configurePreviewServer(server) {
      const outDir = resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((req, _res, next) => {
        const pathname = (req.url ?? '/').split('?')[0];
        if (
          pathname !== '/' &&
          !extname(pathname) &&
          existsSync(join(outDir, `${pathname}.html`))
        ) {
          req.url = `${pathname}.html${req.url?.slice(pathname.length) ?? ''}`;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), routeHtml(), previewRouteHtml()],
  build: {
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          emotion: ['@emotion/react', '@emotion/styled'],
          icons: ['lucide-react'],
        },
      },
    },
  },
});
