import { BreadcrumbItem } from '../schemas/BreadcrumbSchema';

const SITE_URL = 'https://catharsisact.com';

export const breadcrumbConfig: Record<string, BreadcrumbItem[]> = {
  '/': [{ name: '홈', url: SITE_URL }],
  '/about/greeting': [
    { name: '홈', url: SITE_URL },
    { name: '학원 소개', url: `${SITE_URL}/about` },
    { name: '인사말', url: `${SITE_URL}/about/greeting` },
  ],
  '/about/features': [
    { name: '홈', url: SITE_URL },
    { name: '학원 소개', url: `${SITE_URL}/about` },
    { name: '학원 특징', url: `${SITE_URL}/about/features` },
  ],
  '/about/instructors': [
    { name: '홈', url: SITE_URL },
    { name: '학원 소개', url: `${SITE_URL}/about` },
    { name: '강사진', url: `${SITE_URL}/about/instructors` },
  ],
  '/about/facilities': [
    { name: '홈', url: SITE_URL },
    { name: '학원 소개', url: `${SITE_URL}/about` },
    { name: '시설 안내', url: `${SITE_URL}/about/facilities` },
  ],
  '/about/location': [
    { name: '홈', url: SITE_URL },
    { name: '학원 소개', url: `${SITE_URL}/about` },
    { name: '오시는 길', url: `${SITE_URL}/about/location` },
  ],
  '/curriculum/admission': [
    { name: '홈', url: SITE_URL },
    { name: '커리큘럼', url: `${SITE_URL}/curriculum` },
    { name: '입시반', url: `${SITE_URL}/curriculum/admission` },
  ],
  '/curriculum/pre-admission': [
    { name: '홈', url: SITE_URL },
    { name: '커리큘럼', url: `${SITE_URL}/curriculum` },
    { name: '예비입시반', url: `${SITE_URL}/curriculum/pre-admission` },
  ],
  '/consultation/inquiry': [
    { name: '홈', url: SITE_URL },
    { name: '상담 문의', url: `${SITE_URL}/consultation/inquiry` },
  ],
  '/passers': [
    { name: '홈', url: SITE_URL },
    { name: '합격자 현황', url: `${SITE_URL}/passers` },
  ],
  '/community/notice': [
    { name: '홈', url: SITE_URL },
    { name: '커뮤니티', url: `${SITE_URL}/community` },
    { name: '공지사항', url: `${SITE_URL}/community/notice` },
  ],
  '/community/archive': [
    { name: '홈', url: SITE_URL },
    { name: '커뮤니티', url: `${SITE_URL}/community` },
    { name: '입시자료실', url: `${SITE_URL}/community/archive` },
  ],
  '/community/gallery': [
    { name: '홈', url: SITE_URL },
    { name: '커뮤니티', url: `${SITE_URL}/community` },
    { name: '갤러리', url: `${SITE_URL}/community/gallery` },
  ],
};
