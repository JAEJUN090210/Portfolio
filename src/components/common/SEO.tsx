import { useEffect } from 'react';
import { absoluteUrl, type PageMeta } from '../../constants/seo';
import { siteConfig } from '../../constants/site';

type MetaAttr = 'name' | 'property';

const upsertMeta = (attr: MetaAttr, key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

/**
 * 라우트가 바뀔 때 문서 제목·설명·canonical·공유 미리보기 메타를 갱신합니다.
 * 첫 응답의 HTML 은 빌드 시 라우트별로 미리 채워지고(vite.config.ts), 여기서는 클라이언트 내비게이션을 따라갑니다.
 */
export function SEO({ meta }: { meta: PageMeta }) {
  useEffect(() => {
    const url = absoluteUrl(meta.path);
    const image = `${siteConfig.canonicalUrl}${meta.image ?? siteConfig.ogImage}`;

    document.title = meta.title;
    upsertMeta('name', 'description', meta.description);
    upsertMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow');
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', image);
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertMeta('name', 'twitter:image', image);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    }
  }, [meta]);

  return null;
}
