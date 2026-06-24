import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { instructorAPI, InstructorDetail } from '../../utils/api';
import {
  SEOHead,
  JsonLdScript,
  PAGE_SEO,
  createBreadcrumbSchema,
  createInstructorsListSchema,
  breadcrumbConfig,
  InstructorData,
} from '../../seo';

interface HeroSectionProps {
  $isVisible: boolean;
}

interface InstructorImageProps {
  $visible: boolean;
}

const InstructorsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isHeroVisible, setIsHeroVisible] = useState<boolean>(false);
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const [leaderInstructorsFromDB, setLeaderInstructorsFromDB] = useState<InstructorDetail[]>([]);
  const [actingInstructorsFromDB, setActingInstructorsFromDB] = useState<InstructorDetail[]>([]);
  const [musicalInstructorsFromDB, setMusicalInstructorsFromDB] = useState<InstructorDetail[]>([]);
  const [danceInstructorsFromDB, setDanceInstructorsFromDB] = useState<InstructorDetail[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsHeroVisible(true);

    // DB에서 강사 목록 가져오기 (카테고리별)
    const fetchInstructors = async () => {
      try {
        const [leaderRes, actingRes, musicalRes, danceRes] = await Promise.all([
          instructorAPI.getAll({ category: 'leader' }),
          instructorAPI.getAll({ category: 'acting' }),
          instructorAPI.getAll({ category: 'musical' }),
          instructorAPI.getAll({ category: 'dance' }),
        ]);
        setLeaderInstructorsFromDB(leaderRes.data.data);
        setActingInstructorsFromDB(actingRes.data.data);
        setMusicalInstructorsFromDB(musicalRes.data.data);
        setDanceInstructorsFromDB(danceRes.data.data);
      } catch (error) {
        console.error('Error fetching instructors from DB:', error);
      }
    };
    fetchInstructors();
  }, []);

  // Intersection Observer for lazy loading images
  useEffect(() => {
    const imageObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement);
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
  }, [
    leaderInstructorsFromDB,
    actingInstructorsFromDB,
    musicalInstructorsFromDB,
    danceInstructorsFromDB,
  ]);

  // 강사 카드 클릭 핸들러
  const handleInstructorClick = (id: string) => {
    navigate(`/about/instructors/${id}`);
  };

  const seoData = PAGE_SEO['/about/instructors'];

  // SEO용 강사 데이터 변환
  const allInstructorsForSEO: InstructorData[] = [
    ...leaderInstructorsFromDB.slice(0, 5).map(i => ({
      name: i.name,
      role: i.position,
      education: i.education,
      image: i.profileImages[0] || '',
      department: 'leader' as const,
    })),
    ...actingInstructorsFromDB.slice(0, 5).map(i => ({
      name: i.name,
      role: i.position,
      education: i.education,
      image: i.profileImages[0] || '',
      department: 'acting' as const,
    })),
    ...musicalInstructorsFromDB.slice(0, 5).map(i => ({
      name: i.name,
      role: i.position,
      education: i.education,
      image: i.profileImages[0] || '',
      department: 'musical' as const,
    })),
    ...danceInstructorsFromDB.slice(0, 5).map(i => ({
      name: i.name,
      role: i.position,
      education: i.education,
      image: i.profileImages[0] || '',
      department: 'dance' as const,
    })),
  ];

  const schemas = [
    createBreadcrumbSchema(breadcrumbConfig['/about/instructors']),
    createInstructorsListSchema(allInstructorsForSEO),
  ];

  return (
    <PageWrapper>
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
      />
      <JsonLdScript data={schemas} />
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
        {/* Leader & Head Coach Section - DB에서 동적으로 가져옴 */}
        <Section>
          <SectionTitle>Leader & Head Coach</SectionTitle>
          <LeaderGrid>
            {leaderInstructorsFromDB.map((instructor, index) => (
              <LeaderCard
                key={instructor._id}
                ref={el => {
                  imageRefs.current[index] = el;
                }}
                onClick={() => handleInstructorClick(instructor._id)}
                $clickable={true}
              >
                <InstructorImage
                  src={instructor.profileImages[0] || ''}
                  alt={instructor.name}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  $visible={visibleImages.has(index) || index < 4}
                />
                <InstructorInfo>
                  <InstructorName>{instructor.name}</InstructorName>
                  <InstructorRole>{instructor.position}</InstructorRole>
                  <InstructorEducation>{instructor.education}</InstructorEducation>
                </InstructorInfo>
              </LeaderCard>
            ))}
          </LeaderGrid>
        </Section>

        {/* Acting Coach Section - DB에서 동적으로 가져옴 */}
        <Section>
          <SectionTitle>Acting Coach</SectionTitle>
          <InstructorGrid>
            {actingInstructorsFromDB.map((instructor, index) => (
              <InstructorCard
                key={instructor._id}
                ref={el => {
                  imageRefs.current[leaderInstructorsFromDB.length + index] = el;
                }}
                onClick={() => handleInstructorClick(instructor._id)}
                $clickable={true}
              >
                <InstructorImage
                  src={instructor.profileImages[0] || ''}
                  alt={instructor.name}
                  loading="lazy"
                  $visible={visibleImages.has(leaderInstructorsFromDB.length + index)}
                />
                <InstructorInfo>
                  <InstructorName>{instructor.name}</InstructorName>
                  <InstructorRole>{instructor.position}</InstructorRole>
                  <InstructorEducation>{instructor.education}</InstructorEducation>
                </InstructorInfo>
              </InstructorCard>
            ))}
          </InstructorGrid>
        </Section>

        {/* Musical Coach Section - DB에서 동적으로 가져옴 */}
        <Section>
          <SectionTitle>Musical Coach</SectionTitle>
          <InstructorGrid>
            {musicalInstructorsFromDB.map((instructor, index) => {
              const imageIndex =
                leaderInstructorsFromDB.length + actingInstructorsFromDB.length + index;
              return (
                <InstructorCard
                  key={instructor._id}
                  ref={el => {
                    imageRefs.current[imageIndex] = el;
                  }}
                  onClick={() => handleInstructorClick(instructor._id)}
                  $clickable={true}
                >
                  <InstructorImage
                    src={instructor.profileImages[0] || ''}
                    alt={instructor.name}
                    loading="lazy"
                    $visible={visibleImages.has(imageIndex)}
                  />
                  <InstructorInfo>
                    <InstructorName>{instructor.name}</InstructorName>
                    <InstructorRole>{instructor.position}</InstructorRole>
                    <InstructorEducation>{instructor.education}</InstructorEducation>
                  </InstructorInfo>
                </InstructorCard>
              );
            })}
          </InstructorGrid>
        </Section>

        {/* Dance Coach Section - DB에서 동적으로 가져옴 */}
        <Section>
          <SectionTitle>Dance Coach</SectionTitle>
          <InstructorGrid>
            {danceInstructorsFromDB.map((instructor, index) => {
              const imageIndex =
                leaderInstructorsFromDB.length +
                actingInstructorsFromDB.length +
                musicalInstructorsFromDB.length +
                index;
              return (
                <InstructorCard
                  key={instructor._id}
                  ref={el => {
                    imageRefs.current[imageIndex] = el;
                  }}
                  onClick={() => handleInstructorClick(instructor._id)}
                  $clickable={true}
                >
                  <InstructorImage
                    src={instructor.profileImages[0] || ''}
                    alt={instructor.name}
                    loading="lazy"
                    $visible={visibleImages.has(imageIndex)}
                  />
                  <InstructorInfo>
                    <InstructorName>{instructor.name}</InstructorName>
                    <InstructorRole>{instructor.position}</InstructorRole>
                    <InstructorEducation>{instructor.education}</InstructorEducation>
                  </InstructorInfo>
                </InstructorCard>
              );
            })}
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

const HeroSection = styled.section<HeroSectionProps>`
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

const LeaderCard = styled.div<{ $clickable?: boolean }>`
  text-align: center;
  transition: transform 0.3s ease;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};

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

const InstructorCard = styled.div<{ $clickable?: boolean }>`
  text-align: center;
  transition: transform 0.3s ease;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};

  &:hover {
    transform: translateY(-8px);
  }
`;

const InstructorImage = styled.img<InstructorImageProps>`
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
