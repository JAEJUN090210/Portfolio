import { useEffect } from 'react';
import { siteConfig } from '../../constants/site';

type SEOProps = {
  title: string;
  description?: string;
  path?: string;
};

const setMeta = (selector: string, value: string) => {
  const element = document.head.querySelector(selector);
  if (element) {
    element.setAttribute('content', value);
  }
};

export function SEO({ title, description = siteConfig.description, path = '/' }: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${siteConfig.name}`;
    const canonicalUrl = `${siteConfig.canonicalUrl}${path === '/' ? '' : path}`;
    document.title = fullTitle;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', canonicalUrl);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    }
  }, [description, path, title]);

  return null;
}
