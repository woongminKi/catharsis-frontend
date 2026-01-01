export interface PageSEO {
  title: string;
  description: string;
  keywords?: string;
}

export const PAGE_SEO: Record<string, PageSEO> = {
  '/': {
    title: '연기 입시 전문 학원',
    description:
      '카타르시스 연기학원은 서울 강남/홍대에 위치한 연기 입시 전문 학원입니다. 중앙대학교 출신 전문 강사진이 소수정예 맞춤 교육으로 연극영화과 합격을 이끕니다.',
    keywords:
      '연기학원, 연기입시, 연극영화과, 강남연기학원, 홍대연기학원, 중앙대연극학과, 뮤지컬입시, 카타르시스',
  },
  '/about/greeting': {
    title: '인사말',
    description:
      '카타르시스 연기학원 원장 김동길, 이호협의 인사말입니다. 학생들과 동등한 위치에서 함께 성장하며 개성을 끌어내는 맞춤형 교육을 지향합니다.',
    keywords: '카타르시스 연기학원, 원장 인사말, 연기학원 소개',
  },
  '/about/features': {
    title: '학원 특징',
    description:
      '카타르시스 연기학원만의 차별화된 교육 시스템을 소개합니다. 소수정예 수업, 개인 맞춤 커리큘럼, 실전 모의고사 등 체계적인 입시 준비 프로그램을 제공합니다.',
    keywords: '연기학원 특징, 소수정예 연기수업, 맞춤형 커리큘럼, 연기 입시 프로그램',
  },
  '/about/instructors': {
    title: '강사진 소개',
    description:
      '중앙대학교 연극영화과 출신 전문 강사진을 소개합니다. 연기, 뮤지컬, 무용 분야의 전문가들이 학생들의 입시를 지도합니다.',
    keywords: '연기학원 강사, 중앙대 연극영화과, 뮤지컬 강사, 무용 강사, 연기 입시 강사',
  },
  '/about/facilities': {
    title: '시설 안내',
    description:
      '카타르시스 연기학원의 최신 연습실, 개인 연습 공간 등 시설을 안내합니다. 강남점, 홍대점 모두 최적의 연기 연습 환경을 제공합니다.',
    keywords: '연기학원 시설, 강남 연기학원 연습실, 홍대 연기학원 시설',
  },
  '/about/location': {
    title: '오시는 길',
    description:
      '카타르시스 연기학원 강남점(02-511-6663), 홍대점(02-333-8889) 위치 및 교통 안내입니다. 매일 09:00-22:00 운영합니다.',
    keywords: '카타르시스 연기학원 강남, 카타르시스 연기학원 홍대, 연기학원 위치, 연기학원 주소',
  },
  '/curriculum/admission': {
    title: '입시반 안내',
    description:
      '고3, 재수생, N수생을 위한 연극영화과 입시 전문 과정입니다. 주 5회 소수정예 수업, 기초연기부터 면접까지 체계적인 커리큘럼을 제공합니다.',
    keywords: '연기입시반, 연극영화과 입시, 대학 연기과 입시, 재수생 연기학원',
  },
  '/curriculum/pre-admission': {
    title: '예비입시반 안내',
    description:
      '고1, 고2 학생을 위한 예비입시반입니다. 연기 기초부터 탄탄하게 준비하여 본격적인 입시에 대비합니다.',
    keywords: '연기 예비입시, 고등학생 연기학원, 연기 기초반, 연기 입문',
  },
  '/consultation/inquiry': {
    title: '상담 문의',
    description: '카타르시스 연기학원 입학 상담 및 문의 게시판입니다. 궁금하신 점을 남겨주세요.',
    keywords: '연기학원 상담, 입시 상담, 연기학원 문의',
  },
  '/passers': {
    title: '합격자 현황',
    description:
      '카타르시스 연기학원 합격자 현황입니다. 중앙대, 한예종, 서울예대 등 주요 대학 연극영화과 합격 소식을 전합니다.',
    keywords: '연기과 합격자, 연극영화과 합격, 연기학원 실적, 대학 합격자',
  },
  '/community/notice': {
    title: '공지사항',
    description:
      '카타르시스 연기학원의 공지사항 및 소식을 전합니다. 수업 일정, 특강, 입시 정보 등을 확인하세요.',
    keywords: '연기학원 공지사항, 수업 일정, 입시 정보',
  },
  '/community/archive': {
    title: '입시자료실',
    description:
      '연기 입시에 도움이 되는 다양한 자료를 제공합니다. 대학별 입시 정보, 합격 노하우 등을 확인하세요.',
    keywords: '연기 입시 자료, 연극영화과 입시 정보, 합격 노하우',
  },
  '/community/gallery': {
    title: '갤러리',
    description: '카타르시스 연기학원의 수업 현장, 공연 사진, 행사 사진 갤러리입니다.',
    keywords: '연기학원 갤러리, 수업 사진, 공연 사진',
  },
};
