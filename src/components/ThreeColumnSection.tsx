import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

interface Instructor {
  title: string;
  description: string;
  link: string;
  imageUrl?: string;
}

interface Passer {
  name: string;
  school: string;
  year: string;
  link: string;
}

interface InstagramPost {
  id?: string;
  title: string;
  link: string;
  imageUrl?: string;
}

interface ThreeColumnSectionProps {
  instructors: Instructor[];
  passers: Passer[];
  instagramPosts: InstagramPost[];
}

interface CarouselTrackProps {
  $currentIndex: number;
}

interface CarouselButtonProps {
  $direction: 'prev' | 'next';
}

interface IndicatorProps {
  $active: boolean;
}

interface ImageProps {
  $imageUrl?: string;
}

const scrollUp = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
`;

const SectionContainer = styled.section`
  padding: 80px 20px;
  background: white;

  @media (max-width: 968px) {
    padding: 60px 20px;
  }

  @media (max-width: 480px) {
    padding: 40px 15px;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColumnTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
  color: #333;

  @media (max-width: 968px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const ContentContainer = styled.div`
  height: 400px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: white;
`;

// 캐러셀 스타일
const CarouselWrapper = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const CarouselTrack = styled.div<CarouselTrackProps>`
  height: 100%;
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(-${props => props.$currentIndex * 100}%);
`;

const CarouselSlide = styled.div`
  min-width: 100%;
  height: 100%;
  flex-shrink: 0;
`;

const CarouselButton = styled.button<CarouselButtonProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => (props.$direction === 'prev' ? 'left: 10px;' : 'right: 10px;')}
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #333;
  z-index: 2;
  transition:
    background 0.3s,
    transform 0.3s;

  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

const CarouselIndicators = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
`;

const Indicator = styled.button<IndicatorProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => (props.$active ? '#7c3aed' : 'rgba(255, 255, 255, 0.5)')};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${props => (props.$active ? '#7c3aed' : 'rgba(255, 255, 255, 0.8)')};
  }
`;

// 강사진 카드 스타일
const InstructorCard = styled(Link)`
  width: 100%;
  height: 100%;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  background: white;
`;

const InstructorImage = styled.div<ImageProps>`
  width: 100%;
  flex: 1;
  background: ${props =>
    props.$imageUrl
      ? `url(${props.$imageUrl}) center/cover no-repeat`
      : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;
  font-weight: bold;
`;

const InstructorInfo = styled.div`
  padding: 20px;
  text-align: center;
  background: white;
`;

const InstructorName = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const InstructorDesc = styled.p`
  font-size: 15px;
  color: #666;
`;

// 역대 합격자 스타일
const PassersScrollContainer = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
  background: white;
`;

const PassersScrollList = styled.div`
  animation: ${scrollUp} 20s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const PasserItem = styled(Link)`
  display: block;
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
  text-decoration: none;
  color: #333;
  transition: background 0.3s;

  &:hover {
    background: #f9fafb;
  }
`;

const PasserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
`;

const PasserName = styled.span`
  font-weight: 600;
  color: #333;
`;

const PasserSchool = styled.span`
  color: #666;
  font-size: 13px;
`;

// 인스타그램 카드 스타일
const InstagramCard = styled.a`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  display: block;
  background: #000;

  &:hover {
    .overlay {
      opacity: 1;
    }

    img {
      transform: scale(1.05);
    }
  }
`;

const InstagramImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 28px;
  font-weight: bold;
`;

const InstagramImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

const ThreeColumnSection: React.FC<ThreeColumnSectionProps> = ({
  instructors,
  passers,
  instagramPosts,
}) => {
  const [instructorIndex, setInstructorIndex] = useState<number>(0);
  const [instagramIndex, setInstagramIndex] = useState<number>(0);

  // 강사진 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setInstructorIndex(prev => (prev + 1) % instructors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [instructors.length]);

  // 인스타그램 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setInstagramIndex(prev => (prev + 1) % instagramPosts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [instagramPosts.length]);

  const handleInstructorPrev = (): void => {
    setInstructorIndex(prev => (prev - 1 + instructors.length) % instructors.length);
  };

  const handleInstructorNext = (): void => {
    setInstructorIndex(prev => (prev + 1) % instructors.length);
  };

  const handleInstagramPrev = (): void => {
    setInstagramIndex(prev => (prev - 1 + instagramPosts.length) % instagramPosts.length);
  };

  const handleInstagramNext = (): void => {
    setInstagramIndex(prev => (prev + 1) % instagramPosts.length);
  };

  return (
    <SectionContainer>
      <Container>
        <Grid>
          {/* 강사진 캐러셀 */}
          <Column>
            <ColumnTitle>강사진</ColumnTitle>
            <ContentContainer>
              <CarouselWrapper>
                <CarouselTrack $currentIndex={instructorIndex}>
                  {instructors.map((instructor, index) => (
                    <CarouselSlide key={index}>
                      <InstructorCard to={instructor.link}>
                        <InstructorImage $imageUrl={instructor.imageUrl}>
                          {!instructor.imageUrl && instructor.title}
                        </InstructorImage>
                        <InstructorInfo>
                          <InstructorName>{instructor.title}</InstructorName>
                          <InstructorDesc>{instructor.description}</InstructorDesc>
                        </InstructorInfo>
                      </InstructorCard>
                    </CarouselSlide>
                  ))}
                </CarouselTrack>
                <CarouselButton $direction="prev" onClick={handleInstructorPrev}>
                  ‹
                </CarouselButton>
                <CarouselButton $direction="next" onClick={handleInstructorNext}>
                  ›
                </CarouselButton>
                <CarouselIndicators>
                  {instructors.map((_, index) => (
                    <Indicator
                      key={index}
                      $active={index === instructorIndex}
                      onClick={() => setInstructorIndex(index)}
                    />
                  ))}
                </CarouselIndicators>
              </CarouselWrapper>
            </ContentContainer>
          </Column>

          {/* 역대 합격자 자동 스크롤 */}
          <Column>
            <ColumnTitle>역대 합격자</ColumnTitle>
            <ContentContainer>
              <PassersScrollContainer>
                <PassersScrollList>
                  {passers.concat(passers).map((passer, index) => (
                    <PasserItem key={index} to={passer.link}>
                      <PasserInfo>
                        <PasserName>{passer.name}</PasserName>
                        <PasserSchool>
                          {passer.school} {passer.year}
                        </PasserSchool>
                      </PasserInfo>
                    </PasserItem>
                  ))}
                </PassersScrollList>
              </PassersScrollContainer>
            </ContentContainer>
          </Column>

          {/* 인스타 썸네일 캐러셀 */}
          <Column>
            <ColumnTitle>학원 인스타 썸네일</ColumnTitle>
            <ContentContainer>
              <CarouselWrapper>
                <CarouselTrack $currentIndex={instagramIndex}>
                  {instagramPosts.map((post, index) => (
                    <CarouselSlide key={index}>
                      <InstagramCard href={post.link} target="_blank" rel="noopener noreferrer">
                        {post.imageUrl ? (
                          <InstagramImg src={post.imageUrl} alt={post.title} />
                        ) : (
                          <InstagramImageWrapper>{post.title}</InstagramImageWrapper>
                        )}
                        <Overlay className="overlay">Instagram에서 보기</Overlay>
                      </InstagramCard>
                    </CarouselSlide>
                  ))}
                </CarouselTrack>
                <CarouselButton $direction="prev" onClick={handleInstagramPrev}>
                  ‹
                </CarouselButton>
                <CarouselButton $direction="next" onClick={handleInstagramNext}>
                  ›
                </CarouselButton>
                <CarouselIndicators>
                  {instagramPosts.map((_, index) => (
                    <Indicator
                      key={index}
                      $active={index === instagramIndex}
                      onClick={() => setInstagramIndex(index)}
                    />
                  ))}
                </CarouselIndicators>
              </CarouselWrapper>
            </ContentContainer>
          </Column>
        </Grid>
      </Container>
    </SectionContainer>
  );
};

export default ThreeColumnSection;
