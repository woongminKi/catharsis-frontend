import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// Import images
import kimSeungSeop from '../../images/김승섭 연기.png';
import leeHoYeop from '../../images/이호협 연기.jpg';
import yuHyunDo from '../../images/유현도 연기.jpg';
import jangSeoA from '../../images/장서아 연기.jpeg';
import parkChanJin from '../../images/박찬진 연기.jpg';
import parkJunHyuk from '../../images/박준혁 연기.jpg';
import parkHyunSu from '../../images/박현수 연기.jpg';
import yangJuWon from '../../images/양주원 연기.jpg';
import kimDongGil from '../../images/김동길 연기.jpg';
import parkSungMin from '../../images/박성민 연기.jpg';
import jungYunHu from '../../images/정윤후 연기.jpg';
import kimMinAh from '../../images/김민아 연기.png';
import joYeRim from '../../images/조예림 연기.jpg';
import hanByul from '../../images/한별 연기.jpg';
import leeHanNuRi from '../../images/이한누리 연기.jpg';
import kimJaeMin from '../../images/김재민 연기.jpg';
import yunKyung from '../../images/윤경 연기.jpg';
import parkJiWoo from '../../images/박지우 연기.jpg';
import yunHeeJae from '../../images/윤희재 연기.jpg';
import jungHyunJi from '../../images/정현지 연기.jpg';
import joYoungRae from '../../images/조영래 연기.jpg';
import kimDongIl from '../../images/김동일 연기.jpg';
import kangSeHwa from '../../images/강세화 뮤지컬.jpg';
import kwonDaBin from '../../images/권다빈 뮤지컬.jpg';
import kimChaeWon from '../../images/김채원 뮤지컬.jpg';
import songMinKook from '../../images/송민국 뮤지컬.jpg';
import yunHoJung from '../../images/윤호정 뮤지컬.jpg';
import leeJungBin from '../../images/이정빈 뮤지컬.jpg';
import leeJiWoo from '../../images/이지우 뮤지컬.jpg';
import limDaIn from '../../images/임다인 뮤지컬.jpg';
import limHyeRan from '../../images/임혜란 뮤지컬.jpg';
import jiMinYoung from '../../images/지민영 뮤지컬.jpg';
import choiSungEun from '../../images/최성은 뮤지컬.jpg';
import choiJiYoung from '../../images/최지영 뮤지컬.jpg';
import hanGaRam from '../../images/한가람 뮤지컬.png';
import parkAYoung from '../../images/박아영 무용.jpg';
import parkJinJoo from '../../images/박진주 무용.jpg';
import yuEunBi from '../../images/유은비 무용.jpg';
import leeJungHo from '../../images/이정호 무용.png';
import limJiHoon from '../../images/임지훈 무용.jpg';
import jungDaBin from '../../images/정다빈 무용.jpg';
import jungYuDam from '../../images/정유담 무용.jpg';
import jungJiHyun from '../../images/정지현 무용.jpg';
import choiYunHee from '../../images/최윤희 무용.png';
import hanJiWon from '../../images/한지원 무용.jpg';
import sinJaeHee from '../../images/신재희 무용.jpg';
import kimGyungMin from '../../images/김경민 무용.jpg';
import kwakEunYoung from '../../images/곽은영 무용.png';
import kuJaRyong from '../../images/구자룡 뮤지컬.jpg';
import kimGiBeom from '../../images/김기범 무용.jpg';
import kimSoYoung from '../../images/김소영 무용.jpg';
import parkSunYoung from '../../images/박선영 연기.jpg';
import seoEunYoung from '../../images/서은영 연기.jpg';
import sinInSu from '../../images/신인수 뮤지컬.jpg';

const InstructorsPage = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [visibleImages, setVisibleImages] = useState(new Set());
  const imageRefs = useRef([]);

  useEffect(() => {
    setIsHeroVisible(true);

    // Intersection Observer for lazy loading images
    const imageObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target);
            setVisibleImages(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    imageRefs.current.forEach(ref => {
      if (ref) imageObserver.observe(ref);
    });

    return () => {
      imageObserver.disconnect();
    };
  }, []);

  // Instructor data organized by role - following the screenshot order
  const leaders = [
    {
      name: '김동길',
      role: '대표원장',
      education: '중앙대학교 연극학과 연기전공',
      image: kimDongGil,
    },
    {
      name: '이호엽',
      role: '대표원장',
      education: '중앙대학교 연극학과 연기전공',
      image: leeHoYeop,
    },
    {
      name: '유현도',
      role: '홍대점 대표원장',
      education: '중앙대학교 연극학과 연기전공',
      image: yuHyunDo,
    },
  ];

  const actingInstructors = [
    {
      name: '장서아',
      role: '액팅파트 뮤지컬강사',
      education: '중앙대학교 연극학과 연기전공',
      image: jangSeoA,
    },
    {
      name: '박찬진',
      role: '액팅파트 교육원장',
      education: '세종대학교 영화예술학과 연기예술전공',
      image: parkChanJin,
    },
    {
      name: '박준혁',
      role: '홍대점 액팅파트 책임원장',
      education: '중앙대학교 연극학과 연기전공',
      image: parkJunHyuk,
    },
    {
      name: '박선영',
      role: '액팅파트 입시연기강사',
      education: '중앙대학교 연극학과 연기전공',
      image: parkSunYoung,
    },
    {
      name: '양주원',
      role: '액팅파트 입시전임',
      education: '중앙대학교 연극학과 연기전공',
      image: yangJuWon,
    },
    {
      name: '김동일',
      role: '액팅파트 입시전임',
      education: '중앙대학교 연극학과 연기전공',
      image: kimDongIl,
    },
    {
      name: '박성민',
      role: '액팅파트 입시전임',
      education: '중앙대학교 연극학과 연기전공',
      image: parkSungMin,
    },
    {
      name: '정윤후',
      role: '홍대점 액팅파트 팀장',
      education: '중앙대학교 연극학과 연기전공',
      image: jungYunHu,
    },
    {
      name: '김민아',
      role: '액팅파트',
      education: '중앙대학교 연극학과 연기전공',
      image: kimMinAh,
    },
    {
      name: '정현지',
      role: '액팅파트',
      education: '중앙대학교 연극학과 연기전공',
      image: jungHyunJi,
    },
    {
      name: '조예림',
      role: '액팅파트',
      education: '중앙대학교 연극학과 연기전공',
      image: joYeRim,
    },
    {
      name: '한별',
      role: '액팅파트',
      education: '서울예술대학교 연기전공',
      image: hanByul,
    },
    {
      name: '김승섭',
      role: '액팅파트',
      education: '동국대학교 연극학부 연기전공',
      image: kimSeungSeop,
    },
    {
      name: '박현수',
      role: '액팅파트',
      education: '중앙대학교 연극학과 연기전공',
      image: parkHyunSu,
    },
    {
      name: '윤희재',
      role: '액팅파트',
      education: '중앙대학교 연극학과 연기전공',
      image: yunHeeJae,
    },
    {
      name: '서은영',
      role: '홍대점 액팅파트',
      education: '중앙대학교 연극학과 연기전공',
      image: seoEunYoung,
    },
    {
      name: '조영래',
      role: '액팅파트',
      education: '중앙대학교 연극학과 연기전공',
      image: joYoungRae,
    },
    {
      name: '박지우',
      role: '액팅파트 입시연기강사',
      education: '중앙대학교 연극학과 연기전공',
      image: parkJiWoo,
    },
    {
      name: '이한누리',
      role: '액팅파트',
      education: '중앙대학교 연극학과 연기전공',
      image: leeHanNuRi,
    },
    {
      name: '김재민',
      role: '액팅파트',
      education: '중앙대학교 연극학과 연기전공',
      image: kimJaeMin,
    },
    {
      name: '윤경',
      role: '홍대점 액팅파트',
      education: '중앙대학교 연극학과 연기전공',
      image: yunKyung,
    },
  ];

  const musicalInstructors = [
    {
      name: '임혜란',
      role: '뮤지컬 파트',
      education: '중앙대학교 연극학과 뮤지컬전공',
      image: limHyeRan,
    },
    {
      name: '이지우',
      role: '뮤지컬 파트',
      education: '중앙대학교 연극학과 뮤지컬전공',
      image: leeJiWoo,
    },
    {
      name: '임다인',
      role: '뮤지컬 파트',
      education: '중앙대학교 연극학과 뮤지컬전공',
      image: limDaIn,
    },
    {
      name: '한가람',
      role: '뮤지컬 파트',
      education: '중앙대학교 연극학과 뮤지컬전공',
      image: hanGaRam,
    },
    {
      name: '권다빈',
      role: '뮤지컬 파트',
      education: '중앙대학교 연극학과 뮤지컬전공',
      image: kwonDaBin,
    },
    {
      name: '이정빈',
      role: '뮤지컬 파트',
      education: '중앙대학교 연극학과 뮤지컬전공',
      image: leeJungBin,
    },
    {
      name: '송민국',
      role: '뮤지컬 파트',
      education: '중앙대학교 연극학과 뮤지컬전공',
      image: songMinKook,
    },
    {
      name: '최성은',
      role: '뮤지컬 파트',
      education: '중앙대학교 성악과',
      image: choiSungEun,
    },
    {
      name: '구자룡',
      role: '뮤지컬 파트',
      education: '중앙대학교 성악과',
      image: kuJaRyong,
    },
    {
      name: '신인수',
      role: '뮤지컬 파트',
      education: '독일 쾰른 국립음대 성악과',
      image: sinInSu,
    },
    {
      name: '강세화',
      role: '뮤지컬 파트',
      education: '서경대학교 뮤지컬학과',
      image: kangSeHwa,
    },
    {
      name: '지민영',
      role: '홍대점 뮤지컬 파트',
      education: '연세대학교 성악과 졸업',
      image: jiMinYoung,
    },
    {
      name: '김채원',
      role: '뮤지컬 파트',
      education: '국민대학교 성악과',
      image: kimChaeWon,
    },
    {
      name: '윤호정',
      role: '홍대점 뮤지컬 파트',
      education: '동국대학교 연극학부 뮤지컬전공',
      image: yunHoJung,
    },

    {
      name: '최지영',
      role: '홍대점 뮤지컬 파트',
      education: '중앙대학교 성악과',
      image: choiJiYoung,
    },
  ];

  const danceInstructors = [
    {
      name: '유은비',
      role: '움직임파트',
      education: '중앙대학교 무용과',
      image: yuEunBi,
    },
    {
      name: '정다빈',
      role: '움직임파트',
      education: '중앙대학교 무용과',
      image: jungDaBin,
    },
    {
      name: '임지훈',
      role: '움직임파트',
      education: '중앙대학교 무용과',
      image: limJiHoon,
    },
    {
      name: '곽은영',
      role: '움직임파트',
      education: '중앙대학교 무용과',
      image: kwakEunYoung,
    },
    {
      name: '최윤희',
      role: '움직임파트',
      education: '수원대학교 무용과',
      image: choiYunHee,
    },
    {
      name: '박아영',
      role: '움직임파트',
      education: '성균관대학교 무용과',
      image: parkAYoung,
    },
    {
      name: '박진주',
      role: '움직임파트',
      education: '성균관대학교 무용과',
      image: parkJinJoo,
    },
    {
      name: '정유담',
      role: '움직임파트',
      education: '세종대학교 무용과',
      image: jungYuDam,
    },
    {
      name: '김소영',
      role: '움직임파트',
      education: '세종대학교 무용과',
      image: kimSoYoung,
    },
    {
      name: '정지현',
      role: '홍대점 움직임파트',
      education: '세종대학교 무용과',
      image: jungJiHyun,
    },
    {
      name: '김기범',
      role: '움직임파트',
      education: '한국예술종합학교 무용과',
      image: kimGiBeom,
    },
    {
      name: '이정호',
      role: '움직임파트',
      education: '한국예술종합학교 무용과',
      image: leeJungHo,
    },
    {
      name: '김경민',
      role: '움직임파트',
      education: '한국예술종합학교 무용과',
      image: kimGyungMin,
    },
    {
      name: '신재희',
      role: '움직임파트',
      education: '한국예술종합학교 무용과',
      image: sinJaeHee,
    },
    {
      name: '한지원',
      role: '홍대점 움직임파트',
      education: '한국예술종합학교 무용과',
      image: hanJiWon,
    },
  ];

  return (
    <PageWrapper>
      <HeroSection $isVisible={isHeroVisible}>
        <HeroContent>
          <HeroQuote>
            "최고의 선생은 무엇을 봐야 할지 알려주지 않고,
            <br />
            어디를 바라봐야 하는 지 알려주는 사람이다."
          </HeroQuote>
          <HeroAuthor>- Alexandra K. Trenfor</HeroAuthor>
          <HeroTitle>강사 소개</HeroTitle>
        </HeroContent>
      </HeroSection>

      <ContentWrapper>
        {/* Leader & Head Coach Section */}
        <Section>
          <SectionTitle>Leader & Head Coach</SectionTitle>
          <LeaderGrid>
            {leaders.map((instructor, index) => (
              <LeaderCard key={index} ref={el => (imageRefs.current[index] = el)}>
                <InstructorImage
                  src={instructor.image}
                  alt={instructor.name}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  $visible={visibleImages.has(index) || index < 4}
                />
                <InstructorInfo>
                  <InstructorName>{instructor.name}</InstructorName>
                  <InstructorRole>{instructor.role}</InstructorRole>
                  <InstructorEducation>{instructor.education}</InstructorEducation>
                </InstructorInfo>
              </LeaderCard>
            ))}
          </LeaderGrid>
        </Section>

        {/* Acting Coach Section */}
        <Section>
          <SectionTitle>Acting Coach</SectionTitle>
          <InstructorGrid>
            {actingInstructors.map((instructor, index) => (
              <InstructorCard
                key={index}
                ref={el => (imageRefs.current[leaders.length + index] = el)}
              >
                <InstructorImage
                  src={instructor.image}
                  alt={instructor.name}
                  loading="lazy"
                  $visible={visibleImages.has(leaders.length + index)}
                />
                <InstructorInfo>
                  <InstructorName>{instructor.name}</InstructorName>
                  <InstructorRole>{instructor.role}</InstructorRole>
                  <InstructorEducation>{instructor.education}</InstructorEducation>
                </InstructorInfo>
              </InstructorCard>
            ))}
          </InstructorGrid>
        </Section>

        {/* Musical Coach Section */}
        <Section>
          <SectionTitle>Musical Coach</SectionTitle>
          <InstructorGrid>
            {musicalInstructors.map((instructor, index) => (
              <InstructorCard
                key={index}
                ref={el =>
                  (imageRefs.current[leaders.length + actingInstructors.length + index] = el)
                }
              >
                <InstructorImage
                  src={instructor.image}
                  alt={instructor.name}
                  loading="lazy"
                  $visible={visibleImages.has(leaders.length + actingInstructors.length + index)}
                />
                <InstructorInfo>
                  <InstructorName>{instructor.name}</InstructorName>
                  <InstructorRole>{instructor.role}</InstructorRole>
                  <InstructorEducation>{instructor.education}</InstructorEducation>
                </InstructorInfo>
              </InstructorCard>
            ))}
          </InstructorGrid>
        </Section>

        {/* Dance Coach Section */}
        <Section>
          <SectionTitle>Dance Coach</SectionTitle>
          <InstructorGrid>
            {danceInstructors.map((instructor, index) => (
              <InstructorCard
                key={index}
                ref={el =>
                  (imageRefs.current[
                    leaders.length + actingInstructors.length + musicalInstructors.length + index
                  ] = el)
                }
              >
                <InstructorImage
                  src={instructor.image}
                  alt={instructor.name}
                  loading="lazy"
                  $visible={visibleImages.has(
                    leaders.length + actingInstructors.length + musicalInstructors.length + index
                  )}
                />
                <InstructorInfo>
                  <InstructorName>{instructor.name}</InstructorName>
                  <InstructorRole>{instructor.role}</InstructorRole>
                  <InstructorEducation>{instructor.education}</InstructorEducation>
                </InstructorInfo>
              </InstructorCard>
            ))}
          </InstructorGrid>
        </Section>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default InstructorsPage;

// Styled Components
const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
`;

const HeroSection = styled.section`
  width: 100%;
  padding: 120px 40px;
  background: #fafafa;
  text-align: center;
  opacity: ${props => (props.$isVisible ? 1 : 0)};
  transform: ${props => (props.$isVisible ? 'translateY(0)' : 'translateY(20px)')};
  transition: all 1s ease-out;

  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const HeroQuote = styled.p`
  font-size: 18px;
  color: #5e5e5e;
  line-height: 1.8;
  margin-bottom: 16px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const HeroAuthor = styled.p`
  font-size: 14px;
  color: #999999;
  margin-bottom: 60px;
  font-style: italic;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #000000;
  margin: 0;
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 100px 40px;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const Section = styled.section`
  margin-bottom: 120px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 80px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #000000;
  margin: 0 0 50px 0;
  padding-bottom: 20px;
  border-bottom: 2px solid #000000;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 40px;
  }
`;

const LeaderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const LeaderCard = styled.div`
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

const InstructorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const InstructorCard = styled.div`
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

const InstructorImage = styled.img`
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  margin-bottom: 20px;
  opacity: ${props => (props.$visible ? 1 : 0)};
  transform: ${props => (props.$visible ? 'scale(1)' : 'scale(0.95)')};
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const InstructorInfo = styled.div`
  padding: 0 10px;
`;

const InstructorName = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  margin: 0 0 8px 0;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const InstructorRole = styled.p`
  font-size: 15px;
  color: #5e5e5e;
  margin: 0 0 6px 0;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const InstructorEducation = styled.p`
  font-size: 14px;
  color: #999999;
  margin: 0;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
