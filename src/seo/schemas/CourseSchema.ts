const SITE_URL = 'https://catharsisact.com';

export interface CourseData {
  name: string;
  description: string;
  url?: string;
}

export const createCourseSchema = (course: CourseData) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: course.name,
  description: course.description,
  provider: {
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: '카타르시스 연기학원',
    url: SITE_URL,
  },
  ...(course.url && { url: course.url }),
});
