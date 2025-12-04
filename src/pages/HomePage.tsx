import React from 'react';
import HeroSection from '../components/HeroSection';
import SchoolPassersSection from '../components/SchoolPassersSection';
import AutoScrollSlider from '../components/AutoScrollSlider';
import ThreeColumnSection from '../components/ThreeColumnSection';
import RealTimeConsultSection from '../components/RealTimeConsultSection';

interface Video {
  title: string;
  description: string;
  link: string;
}

interface Instructor {
  title: string;
  description: string;
  link: string;
}

interface Passer {
  name: string;
  school: string;
  year: string;
  link: string;
}

interface InstagramPost {
  id: number;
  title: string;
  link: string;
}

const HomePage: React.FC = () => {
  const youtubeVideos: Video[] = [
    {
      title: '합격생 인터뷰 1',
      description: '2024 합격생의 솔직한 이야기',
      link: '/video/1',
    },
    {
      title: '합격생 인터뷰 2',
      description: '민액터스 수강 후기',
      link: '/video/2',
    },
    {
      title: '합격생 인터뷰 3',
      description: '입시 준비 노하우 공개',
      link: '/video/3',
    },
    {
      title: '합격생 인터뷰 4',
      description: '연기 입시의 모든 것',
      link: '/video/4',
    },
    {
      title: '합격생 인터뷰 5',
      description: '수험생 필수 시청',
      link: '/video/5',
    },
  ];

  const instructors: Instructor[] = [
    {
      title: '김민수 강사',
      description: '한국예술종합학교 출신',
      link: '/instructor/1',
    },
    {
      title: '이지은 강사',
      description: '중앙대학교 연극학과 출신',
      link: '/instructor/2',
    },
    {
      title: '박준영 강사',
      description: '서울예술대학교 출신',
      link: '/instructor/3',
    },
    {
      title: '최서연 강사',
      description: '동국대학교 연극학부 출신',
      link: '/instructor/4',
    },
    {
      title: '정우성 강사',
      description: '성균관대학교 출신',
      link: '/instructor/5',
    },
  ];

  const passersData: Passer[] = [
    { name: '김영현', school: '한국예술종합학교', year: '25학년도', link: '/passer/1' },
    { name: '배하람', school: '한국예술종합학교', year: '25학년도', link: '/passer/2' },
    { name: '최예원', school: '한국예술종합학교', year: '25학년도', link: '/passer/3' },
    { name: '이찬민', school: '한국예술종합학교', year: '25학년도', link: '/passer/4' },
    { name: '염예지', school: '한국예술종합학교', year: '25학년도', link: '/passer/5' },
    { name: '이자운', school: '한국예술종합학교', year: '24학년도', link: '/passer/6' },
    { name: '정지원', school: '한국예술종합학교', year: '24학년도', link: '/passer/7' },
    { name: '오지은', school: '한국예술종합학교', year: '24학년도', link: '/passer/8' },
    { name: '김선영', school: '한국예술종합학교', year: '24학년도', link: '/passer/9' },
    { name: '강준원', school: '한국예술종합학교', year: '24학년도', link: '/passer/10' },
    { name: '강하영', school: '한국예술종합학교', year: '24학년도', link: '/passer/11' },
    { name: '공원우', school: '한국예술종합학교', year: '24학년도', link: '/passer/12' },
  ];

  const instagramPosts: InstagramPost[] = [
    { id: 1, title: '포스트 1', link: 'https://instagram.com/post1' },
    { id: 2, title: '포스트 2', link: 'https://instagram.com/post2' },
    { id: 3, title: '포스트 3', link: 'https://instagram.com/post3' },
    { id: 4, title: '포스트 4', link: 'https://instagram.com/post4' },
    { id: 5, title: '포스트 5', link: 'https://instagram.com/post5' },
    { id: 6, title: '포스트 6', link: 'https://instagram.com/post6' },
  ];

  return (
    <>
      <HeroSection />
      <SchoolPassersSection />
      <AutoScrollSlider title="유튭 영상" items={youtubeVideos} />
      <ThreeColumnSection
        instructors={instructors}
        passers={passersData}
        instagramPosts={instagramPosts}
      />
      <RealTimeConsultSection />
    </>
  );
};

export default HomePage;
