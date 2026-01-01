const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://catharsisact.com';

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about/greeting', priority: '0.8', changefreq: 'monthly' },
  { path: '/about/features', priority: '0.8', changefreq: 'monthly' },
  { path: '/about/instructors', priority: '0.8', changefreq: 'monthly' },
  { path: '/about/facilities', priority: '0.7', changefreq: 'monthly' },
  { path: '/about/location', priority: '0.7', changefreq: 'yearly' },
  { path: '/curriculum/admission', priority: '0.9', changefreq: 'monthly' },
  { path: '/curriculum/pre-admission', priority: '0.9', changefreq: 'monthly' },
  { path: '/consultation/inquiry', priority: '0.6', changefreq: 'daily' },
  { path: '/passers', priority: '0.8', changefreq: 'weekly' },
  { path: '/community/notice', priority: '0.6', changefreq: 'weekly' },
  { path: '/community/archive', priority: '0.5', changefreq: 'weekly' },
  { path: '/community/gallery', priority: '0.5', changefreq: 'weekly' },
];

const generateSitemap = () => {
  const today = new Date().toISOString().split('T')[0];

  const urls = staticRoutes
    .map(
      (route) => `
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  const publicPath = path.join(__dirname, '../public/sitemap.xml');
  const buildPath = path.join(__dirname, '../build/sitemap.xml');

  // public 폴더에 저장
  fs.writeFileSync(publicPath, sitemap.trim());
  console.log('Sitemap generated at:', publicPath);

  // build 폴더가 있으면 거기에도 저장
  if (fs.existsSync(path.join(__dirname, '../build'))) {
    fs.writeFileSync(buildPath, sitemap.trim());
    console.log('Sitemap copied to:', buildPath);
  }

  console.log('Sitemap generation complete!');
};

generateSitemap();
