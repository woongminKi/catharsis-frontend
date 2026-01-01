const SITE_URL = 'https://catharsisact.com';

export const createOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'EducationalOrganization'],
  '@id': `${SITE_URL}/#organization`,
  name: '카타르시스 연기학원',
  alternateName: 'Catharsis Acting Academy',
  description:
    '서울 강남/홍대 위치, 중앙대학교 출신 전문 강사진의 입시/예비입시 연기 교육. 연기, 뮤지컬, 무용 분야 대학 입시 전문 학원.',
  url: SITE_URL,
  logo: `${SITE_URL}/logo512.png`,
  image: [`${SITE_URL}/og-image.jpg`],
  telephone: ['+82-2-511-6663', '+82-2-333-8889'],
  address: [
    {
      '@type': 'PostalAddress',
      name: '강남점',
      streetAddress: '신반포로47길 19 2,3층',
      addressLocality: '서초구',
      addressRegion: '서울특별시',
      postalCode: '06535',
      addressCountry: 'KR',
    },
    {
      '@type': 'PostalAddress',
      name: '홍대점',
      streetAddress: '양화로 78-9, 2층',
      addressLocality: '마포구',
      addressRegion: '서울특별시',
      postalCode: '04043',
      addressCountry: 'KR',
    },
  ],
  geo: [
    {
      '@type': 'GeoCoordinates',
      latitude: 37.5115,
      longitude: 127.0193,
    },
    {
      '@type': 'GeoCoordinates',
      latitude: 37.5514,
      longitude: 126.9175,
    },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '22:00',
    },
  ],
  priceRange: '$$',
  areaServed: '서울특별시',
  sameAs: [
    'https://www.instagram.com/catharsis_acting',
    'https://www.youtube.com/@catharsis_acting',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '연기 교육 프로그램',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Course',
          name: '입시반',
          description: '고등학교 3학년, 재수생, N수생 대상 대학 입시 전문 연기 교육',
          provider: { '@id': `${SITE_URL}/#organization` },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Course',
          name: '예비입시반',
          description: '고등학교 1-2학년 대상 연기 기초 및 입시 준비 교육',
          provider: { '@id': `${SITE_URL}/#organization` },
        },
      },
    ],
  },
});
