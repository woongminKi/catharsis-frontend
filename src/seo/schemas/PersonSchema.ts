const SITE_URL = 'https://catharsisact.com';

export interface InstructorData {
  name: string;
  role: string;
  education: string;
  image?: string;
  department?: 'acting' | 'musical' | 'dance' | 'leader';
}

const getDepartmentExpertise = (dept?: string): string[] => {
  switch (dept) {
    case 'acting':
      return ['연기', '연극', '영화 연기', '입시 연기'];
    case 'musical':
      return ['뮤지컬', '성악', '노래', '뮤지컬 연기'];
    case 'dance':
      return ['무용', '현대무용', '한국무용', '움직임'];
    case 'leader':
      return ['연기 교육', '연극 연출', '입시 컨설팅'];
    default:
      return ['연기', '연극'];
  }
};

export const createPersonSchema = (instructor: InstructorData) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: instructor.name,
  jobTitle: instructor.role,
  worksFor: {
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: '카타르시스 연기학원',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: instructor.education,
  },
  ...(instructor.image && { image: instructor.image }),
  knowsAbout: getDepartmentExpertise(instructor.department),
});

export const createInstructorsListSchema = (instructors: InstructorData[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '카타르시스 연기학원 강사진',
  description: '중앙대학교 등 명문 대학 출신 전문 연기/뮤지컬/무용 강사진',
  numberOfItems: instructors.length,
  itemListElement: instructors.map((instructor, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: createPersonSchema(instructor),
  })),
});
