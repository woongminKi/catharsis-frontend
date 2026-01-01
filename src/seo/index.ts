// Components
export { SEOHead, JsonLdScript } from './components';

// Schemas
export {
  createOrganizationSchema,
  createWebSiteSchema,
  createFAQSchema,
  createBreadcrumbSchema,
  createPersonSchema,
  createInstructorsListSchema,
  createCourseSchema,
} from './schemas';

export type { FAQItem, BreadcrumbItem, InstructorData, CourseData } from './schemas';

// Data
export { PAGE_SEO, academyFAQs, breadcrumbConfig } from './data';
export type { PageSEO } from './data';
