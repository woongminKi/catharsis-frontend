import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import SchoolPassersSection from '../components/SchoolPassersSection';
import AutoScrollSlider from '../components/AutoScrollSlider';
import ThreeColumnSection from '../components/ThreeColumnSection';
import RealTimeConsultSection from '../components/RealTimeConsultSection';
import {
  contentAPI,
  HeroSection as HeroSectionType,
  SchoolPasser,
  YoutubeVideo,
  Instructor as InstructorType,
  InstagramPost as InstagramPostType,
} from '../utils/api';

interface Passer {
  name: string;
  school: string;
  year: string;
  link: string;
}

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [heroData, setHeroData] = useState<HeroSectionType | null>(null);
  const [schoolPassers, setSchoolPassers] = useState<SchoolPasser[]>([]);
  const [youtubeVideos, setYoutubeVideos] = useState<YoutubeVideo[]>([]);
  const [instructors, setInstructors] = useState<InstructorType[]>([]);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPostType[]>([]);

  // 역대 합격자 데이터 (하드코딩 유지 - 별도 관리 필요시 추가 개발)
  const passersData: Passer[] = [
    { name: '이찬민', school: '한국예술종합학교', year: '25학년도', link: '/passer/4' },
    { name: '염예지', school: '한국예술종합학교', year: '25학년도', link: '/passer/5' },
    { name: '이자운', school: '한국예술종합학교', year: '24학년도', link: '/passer/6' },
    { name: '정지원', school: '한국예술종합학교', year: '24학년도', link: '/passer/7' },
    { name: '오지은', school: '한국예술종합학교', year: '24학년도', link: '/passer/8' },
    { name: '김선영', school: '한국예술종합학교', year: '24학년도', link: '/passer/9' },
    { name: '강준원', school: '한국예술종합학교', year: '24학년도', link: '/passer/10' },
    { name: '강하영', school: '한국예술종합학교', year: '24학년도', link: '/passer/11' },
  ];

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await contentAPI.getAll();
        const data = response.data.data;

        setHeroData(data.heroSection);
        setSchoolPassers(data.schoolPassers || []);
        setYoutubeVideos(data.youtubeVideos || []);
        setInstructors(data.instructors || []);
        setInstagramPosts(data.instagramPosts || []);
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

  if (loading) {
    return null; // 또는 로딩 스피너
  }

  return (
    <>
      <HeroSection
        imageUrl={heroData?.imageUrl}
        subtitle={heroData?.subtitle}
        title={heroData?.title}
        buttonText={heroData?.buttonText}
        buttonLink={heroData?.buttonLink}
      />
      <SchoolPassersSection schoolPassers={schoolPassers} />
      <AutoScrollSlider title="유튭 영상" items={youtubeItems} />
      <ThreeColumnSection
        instructors={instructorItems}
        passers={passersData}
        instagramPosts={instagramItems}
      />
      <RealTimeConsultSection />
    </>
  );
};

export default HomePage;
