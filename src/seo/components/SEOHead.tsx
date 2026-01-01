import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  children?: React.ReactNode;
}

const SITE_URL = 'https://catharsisact.com';
const DEFAULT_TITLE = '카타르시스 연기학원';
const DEFAULT_DESCRIPTION =
  '카타르시스 연기학원은 서울 강남/홍대에 위치한 연기 입시 전문 학원입니다. 중앙대학교 출신 전문 강사진이 소수정예 맞춤 교육으로 연극영화과 합격을 이끕니다.';
const DEFAULT_KEYWORDS =
  '연기학원, 연기입시, 연극영화과, 강남연기학원, 홍대연기학원, 중앙대연극학과, 뮤지컬입시, 연기레슨, 카타르시스';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
  children,
}) => {
  const location = useLocation();
  const canonicalUrl = `${SITE_URL}${location.pathname}`;
  const fullTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;

  return (
    <Helmet>
      {/* 기본 메타 태그 */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* 로봇 메타 태그 */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph 메타 태그 */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={DEFAULT_TITLE} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card 메타 태그 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {children}
    </Helmet>
  );
};

export default SEOHead;
