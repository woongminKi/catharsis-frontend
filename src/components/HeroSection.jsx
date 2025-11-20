import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeroContainer = styled.section`
  margin-top: 70px;
  height: 600px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 0 20px;

  @media (max-width: 768px) {
    height: 500px;
  }

  @media (max-width: 480px) {
    height: 400px;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
  z-index: 1;
  padding: 0 20px;
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
  transition: transform 0.3s, box-shadow 0.3s;

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

const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <Subtitle>MAKE YOUR STYLE</Subtitle>
        <Title>
          입시를 스타일하다, 민액터스
        </Title>
        <CTAButton to="/apply">2024 합격자 전체보기</CTAButton>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
