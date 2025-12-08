import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  imageUrl?: string;
  subtitle?: string;
  title?: string;
  buttonText?: string;
  buttonLink?: string;
}

interface HeroContainerProps {
  $imageUrl?: string;
}

const HeroContainer = styled.section<HeroContainerProps>`
  margin-top: 70px;
  width: 100%;
  min-height: ${props => (props.$imageUrl ? 'auto' : '600px')};
  background-color: #667eea;
  background: ${props =>
    props.$imageUrl ? 'transparent' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: ${props => (props.$imageUrl ? 'auto' : '500px')};
  }

  @media (max-width: 480px) {
    min-height: ${props => (props.$imageUrl ? 'auto' : '400px')};
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
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
  imageUrl,
  subtitle,
  title,
  buttonText,
  buttonLink,
}) => {
  // 빈 문자열도 falsy로 처리
  const displaySubtitle = subtitle?.trim() || '';
  const displayTitle = title?.trim() || '';
  const displayButtonText = buttonText?.trim() || '';
  const displayButtonLink = buttonLink?.trim() || '';

  // 버튼은 텍스트와 링크가 모두 있을 때만 표시
  const showButton = displayButtonText && displayButtonLink;
  const hasContent = displaySubtitle || displayTitle || showButton;

  return (
    <HeroContainer $imageUrl={imageUrl}>
      {imageUrl && <HeroImage src={imageUrl} alt="히어로 이미지" />}
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
