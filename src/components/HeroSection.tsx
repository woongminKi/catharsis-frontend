import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  imageUrls?: string[];
  subtitle?: string;
  title?: string;
  buttonText?: string;
  buttonLink?: string;
}

interface HeroContainerProps {
  $hasImages?: boolean;
}

const HeroContainer = styled.section<HeroContainerProps>`
  margin-top: 70px;
  width: 100%;
  min-height: ${props => (props.$hasImages ? 'auto' : '600px')};
  background-color: #667eea;
  background: ${props =>
    props.$hasImages ? 'transparent' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: ${props => (props.$hasImages ? 'auto' : '500px')};
  }

  @media (max-width: 480px) {
    min-height: ${props => (props.$hasImages ? 'auto' : '400px')};
  }
`;

const CarouselWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const CarouselTrack = styled.div<{ $currentIndex: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${props => -props.$currentIndex * 100}%);
`;

const CarouselSlide = styled.div`
  width: 100%;
  min-width: 100%;
  flex-shrink: 0;
`;

const HeroImage = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: contain;
  display: block;
  background-color: #f5f5f5;
`;

const CarouselButton = styled.button<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => (props.$position === 'left' ? 'left: 20px;' : 'right: 20px;')}
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #333;
  z-index: 10;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 20px;
    ${props => (props.$position === 'left' ? 'left: 10px;' : 'right: 10px;')}
  }

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    font-size: 18px;
  }
`;

const CarouselDots = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;

  @media (max-width: 480px) {
    bottom: 15px;
    gap: 8px;
  }
`;

const CarouselDot = styled.button<{ $active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  background: ${props => (props.$active ? 'white' : 'transparent')};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.7);
  }

  @media (max-width: 480px) {
    width: 10px;
    height: 10px;
  }
`;

const HeroContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 2;
  padding: 0 20px;
  width: 100%;
`;

const Subtitle = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Title = styled.h1`
  font-size: 56px;
  font-weight: bold;
  margin: 20px 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 40px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
    margin: 15px 0;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  margin-top: 30px;
  padding: 15px 40px;
  background: white;
  color: #667eea;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 12px 30px;
    font-size: 14px;
    margin-top: 20px;
  }

  @media (max-width: 480px) {
    padding: 10px 25px;
    font-size: 13px;
  }
`;

const HeroSection: React.FC<HeroSectionProps> = ({
  imageUrls = [],
  subtitle,
  title,
  buttonText,
  buttonLink,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const validImageUrls = imageUrls.filter(url => url && url.trim() !== '');
  const hasMultipleImages = validImageUrls.length > 1;
  const hasImages = validImageUrls.length > 0;

  // 자동 슬라이드
  useEffect(() => {
    if (!hasMultipleImages || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % validImageUrls.length);
    }, 4000); // 4초마다 자동 전환

    return () => clearInterval(interval);
  }, [hasMultipleImages, isAutoPlaying, validImageUrls.length]);

  const goToPrevious = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => (prev - 1 + validImageUrls.length) % validImageUrls.length);
    // 5초 후 자동 재생 재시작
    setTimeout(() => setIsAutoPlaying(true), 5000);
  }, [validImageUrls.length]);

  const goToNext = useCallback(() => {
    setIsAutoPlaying(false);
    setCurrentIndex(prev => (prev + 1) % validImageUrls.length);
    // 5초 후 자동 재생 재시작
    setTimeout(() => setIsAutoPlaying(true), 5000);
  }, [validImageUrls.length]);

  const goToSlide = useCallback((index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    // 5초 후 자동 재생 재시작
    setTimeout(() => setIsAutoPlaying(true), 5000);
  }, []);

  // 빈 문자열도 falsy로 처리
  const displaySubtitle = subtitle?.trim() || '';
  const displayTitle = title?.trim() || '';
  const displayButtonText = buttonText?.trim() || '';
  const displayButtonLink = buttonLink?.trim() || '';

  // 버튼은 텍스트와 링크가 모두 있을 때만 표시
  const showButton = displayButtonText && displayButtonLink;
  const hasContent = displaySubtitle || displayTitle || showButton;

  return (
    <HeroContainer $hasImages={hasImages}>
      {hasImages && (
        <CarouselWrapper>
          <CarouselTrack $currentIndex={currentIndex}>
            {validImageUrls.map((url, index) => (
              <CarouselSlide key={index}>
                <HeroImage src={url} alt={`히어로 이미지 ${index + 1}`} />
              </CarouselSlide>
            ))}
          </CarouselTrack>

          {hasMultipleImages && (
            <>
              <CarouselButton $position="left" onClick={goToPrevious} aria-label="이전 이미지">
                &#10094;
              </CarouselButton>
              <CarouselButton $position="right" onClick={goToNext} aria-label="다음 이미지">
                &#10095;
              </CarouselButton>
              <CarouselDots>
                {validImageUrls.map((_, index) => (
                  <CarouselDot
                    key={index}
                    $active={index === currentIndex}
                    onClick={() => goToSlide(index)}
                    aria-label={`${index + 1}번 이미지로 이동`}
                  />
                ))}
              </CarouselDots>
            </>
          )}
        </CarouselWrapper>
      )}
      {hasContent && (
        <HeroContent>
          {displaySubtitle && <Subtitle>{displaySubtitle}</Subtitle>}
          {displayTitle && <Title>{displayTitle}</Title>}
          {showButton && <CTAButton to={displayButtonLink}>{displayButtonText}</CTAButton>}
        </HeroContent>
      )}
    </HeroContainer>
  );
};

export default HeroSection;
