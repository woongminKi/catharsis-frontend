const SITE_URL = 'https://catharsisact.com';

export const createWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: '카타르시스 연기학원',
  description:
    '서울 강남/홍대 위치 연기 입시 전문 학원. 중앙대학교 출신 강사진의 연기, 뮤지컬, 무용 교육.',
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  inLanguage: 'ko-KR',
});
