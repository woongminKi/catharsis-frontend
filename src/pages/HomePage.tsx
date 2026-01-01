import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import AutoScrollSlider from '../components/AutoScrollSlider';
import ThreeColumnSection from '../components/ThreeColumnSection';
import RealTimeConsultSection from '../components/RealTimeConsultSection';
import {
  contentAPI,
  HeroSection as HeroSectionType,
  YoutubeVideo,
  Instructor as InstructorType,
  InstagramPost as InstagramPostType,
  HistoryPasser,
} from '../utils/api';
import {
  SEOHead,
  JsonLdScript,
  PAGE_SEO,
  createOrganizationSchema,
  createWebSiteSchema,
  createFAQSchema,
  createBreadcrumbSchema,
  academyFAQs,
  breadcrumbConfig,
} from '../seo';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [heroData, setHeroData] = useState<HeroSectionType | null>(null);
  const [youtubeVideos, setYoutubeVideos] = useState<YoutubeVideo[]>([]);
  const [instructors, setInstructors] = useState<InstructorType[]>([]);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPostType[]>([]);
  const [historyPassers, setHistoryPassers] = useState<HistoryPasser[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await contentAPI.getAll();
        const data = response.data.data;

        setHeroData(data.heroSection);
        setYoutubeVideos(data.youtubeVideos || []);
        setInstructors(data.instructors || []);
        setInstagramPosts(data.instagramPosts || []);
        setHistoryPassers(data.historyPassers || []);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // 강사진 데이터 변환
  const instructorItems =
    instructors.length > 0
      ? instructors.map(inst => ({
          title: inst.name,
          description: inst.description,
          link: inst.link,
          imageUrl: inst.imageUrl,
        }))
      : [
          {
            title: '김민수 강사',
            description: '한국예술종합학교 출신',
            link: '/instructor/1',
            imageUrl: '',
          },
          {
            title: '이지은 강사',
            description: '중앙대학교 연극학과 출신',
            link: '/instructor/2',
            imageUrl: '',
          },
        ];

  // 인스타그램 데이터 변환
  const instagramItems =
    instagramPosts.length > 0
      ? instagramPosts.map(post => ({
          id: post._id || String(post.order),
          title: post.title,
          link: post.link,
          imageUrl: post.imageUrl,
        }))
      : [
          { id: '1', title: '포스트 1', link: 'https://instagram.com/post1', imageUrl: '' },
          { id: '2', title: '포스트 2', link: 'https://instagram.com/post2', imageUrl: '' },
        ];

  // 유튜브 데이터 변환
  const youtubeItems =
    youtubeVideos.length > 0
      ? youtubeVideos.map(video => ({
          title: video.title,
          description: video.description,
          link: video.link,
          thumbnailUrl: video.thumbnailUrl,
        }))
      : [
          {
            title: '합격생 인터뷰 1',
            description: '2024 합격생의 솔직한 이야기',
            link: '/video/1',
            thumbnailUrl: '',
          },
          {
            title: '합격생 인터뷰 2',
            description: '민액터스 수강 후기',
            link: '/video/2',
            thumbnailUrl: '',
          },
        ];

  // SEO 스키마 데이터
  const seoData = PAGE_SEO['/'];
  const schemas = [
    createOrganizationSchema(),
    createWebSiteSchema(),
    createFAQSchema(academyFAQs),
    createBreadcrumbSchema(breadcrumbConfig['/']),
  ];

  if (loading) {
    return null; // 또는 로딩 스피너
  }

  return (
    <>
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
      />
      <JsonLdScript data={schemas} />
      <HeroSection
        imageUrls={heroData?.imageUrls}
        subtitle={heroData?.subtitle}
        title={heroData?.title}
        buttonText={heroData?.buttonText}
        buttonLink={heroData?.buttonLink}
      />
      {/* 학교별 합격자 */}
      {/* <SchoolPassersSection schoolPassers={schoolPassers} /> */}
      <AutoScrollSlider title="유튭 영상" items={youtubeItems} />
      <ThreeColumnSection
        instructors={instructorItems}
        passers={historyPassers}
        instagramPosts={instagramItems}
      />
      <RealTimeConsultSection />
    </>
  );
};

export default HomePage;
