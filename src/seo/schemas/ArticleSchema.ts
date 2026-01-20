export interface ArticleData {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}

const SITE_URL = 'https://catharsisact.com';
const ORGANIZATION_NAME = '카타르시스 연기학원';
const LOGO_URL = `${SITE_URL}/logo512.png`;

export const createArticleSchema = (article: ArticleData) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  url: article.url,
  image: article.imageUrl || `${SITE_URL}/og-image.jpg`,
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  author: {
    '@type': 'Organization',
    name: article.authorName || ORGANIZATION_NAME,
  },
  publisher: {
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': article.url,
  },
});

export const createNewsArticleSchema = (article: ArticleData) => ({
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: article.title,
  description: article.description,
  url: article.url,
  image: article.imageUrl || `${SITE_URL}/og-image.jpg`,
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  author: {
    '@type': 'Organization',
    name: article.authorName || ORGANIZATION_NAME,
  },
  publisher: {
    '@type': 'Organization',
    name: ORGANIZATION_NAME,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': article.url,
  },
});
