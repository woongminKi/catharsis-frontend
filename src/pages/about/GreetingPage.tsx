import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import directorImage from '../../images/main/원장사진.jpg';

interface VisibilityProps {
  $isVisible: boolean;
}

const PageContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  padding-top: 80px;
`;

const HeroSection = styled.section`
  width: 100%;
  height: 400px;
  background:
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('/images/hero-greeting.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const ContentSection = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 100px 40px;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }
`;

const ImageWrapper = styled.div<VisibilityProps>`
  width: 100%;
  opacity: ${props => (props.$isVisible ? 1 : 0)};
  transform: ${props => (props.$isVisible ? 'translateY(0)' : 'translateY(50px)')};
  transition: all 0.8s ease-out;

  img {
    width: 100%;
    height: auto;
    display: block;
    filter: grayscale(100%);
  }
`;

const TextContent = styled.div<VisibilityProps>`
  opacity: ${props => (props.$isVisible ? 1 : 0)};
  transform: ${props => (props.$isVisible ? 'translateY(0)' : 'translateY(50px)')};
  transition: all 0.8s ease-out;
  transition-delay: 0.2s;
`;

const MainTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  line-height: 1.5;
  margin-bottom: 30px;
  color: #000000;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #404040;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const Highlight = styled.div`
  background: #f5f5f5;
  padding: 30px;
  border-left: 4px solid #000000;
  margin: 40px 0;

  p {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.8;
    color: #000000;
    margin: 0;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  @media (max-width: 768px) {
    padding: 20px;

    p {
      font-size: 16px;
    }
  }
`;

const Signature = styled.div`
  margin-top: 50px;
  text-align: right;
  font-size: 16px;
  color: #000000;
  font-weight: 600;
`;

const GreetingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <PageContainer>
      <HeroSection>
        <HeroTitle>인사말</HeroTitle>
      </HeroSection>

      <ContentSection ref={contentRef}>
        <ContentGrid>
          <ImageWrapper $isVisible={isVisible}>
            <img src={directorImage} alt="카타르시스 연기학원 원장" />
          </ImageWrapper>

          <TextContent $isVisible={isVisible}>
            <MainTitle>
              "연기를 할 때 너무나 무섭고 두렵습니다."
              <br />
              "즐겁지 않습니다."
            </MainTitle>

            <Paragraph>수많은 학생들은 연기 수업을 두려워합니다.</Paragraph>

            <Paragraph>
              어쩔적인 분위기와 선생님의 차별적 태도 때문에 연기 자체를 즐기기 못하고 자존감이
              낮아지기 때문입니다.
            </Paragraph>

            <Paragraph>
              높은 경쟁율 속에서 자신의 존재감을 뽐어내야하는 입시시험일때도 물구하고 많은 학생들은
              자신의 가치를 낮추는 것에 익숙해질 뿐입니다.
            </Paragraph>

            <Highlight>
              <p>우리는 고민했습니다</p>
              <p>어떻게 해야 즐겁고 행복하게 연기를 할 수 있을까?</p>
              <p>꼭 스파르타만이 합격의 비법일까?</p>
            </Highlight>

            <Paragraph>우리는 학생들과 동등한 위치에서 함께 성장하기로 했습니다.</Paragraph>

            <Paragraph>차별없이 개개인의 개성을 끌어내겠습니다.</Paragraph>

            <Paragraph>학생들과 대화의 문을 열고 소통하겠습니다.</Paragraph>

            <Paragraph>
              인사라는 안박감과 높은 경쟁률 속에서 때론 친구로 때로는 멘토가 되겠습니다.
            </Paragraph>

            <Highlight>
              <p>'배우'라는 가치있는 것에 도전하는 당신!</p>
              <p>끝없는 자신과의 싸움에 떠어든 당신!</p>
              <p>관객들의 정을을 정화시길 준비가 되어있는 당신!!</p>
            </Highlight>

            <Paragraph>우리 카타르시스 연기학원이 함께하겠습니다.</Paragraph>

            <Signature>카타르시스 연기학원 원장 이호엽, 김동길</Signature>
          </TextContent>
        </ContentGrid>
      </ContentSection>
    </PageContainer>
  );
};

export default GreetingPage;
