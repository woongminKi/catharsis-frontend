import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface FeatureData {
  title: string;
  content: string[];
}

interface FeatureBoxProps {
  $isVisible: boolean;
  $delay: number;
}

const PageContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  padding-top: 80px;
`;

const HeroSection = styled.section`
  width: 100%;
  height: 500px;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url('/images/directors-hero.jpg') center/cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;

  @media (max-width: 768px) {
    height: 350px;
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    font-size: 56px;
    font-weight: 700;
    letter-spacing: 8px;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    letter-spacing: 3px;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 36px;
      letter-spacing: 4px;
    }

    p {
      font-size: 14px;
    }
  }
`;

const DirectorNames = styled.div`
  position: absolute;
  bottom: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 10%;
  font-size: 16px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0 5%;
  }
`;

const ContentSection = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 80px 40px;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const MainTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #000000;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #404040;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const FeaturesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 60px;
`;

const FeatureBox = styled.div<FeatureBoxProps>`
  border: 2px solid #e7e7e7;
  padding: 40px;
  background: #ffffff;
  transition: all 0.3s ease;
  opacity: ${props => (props.$isVisible ? 1 : 0)};
  transform: ${props => (props.$isVisible ? 'translateY(0)' : 'translateY(50px)')};
  transition: all 0.8s ease-out;
  transition-delay: ${props => props.$delay}s;

  &:hover {
    border-color: #000000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #000000;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const FeatureContent = styled.div`
  p {
    font-size: 15px;
    line-height: 1.8;
    color: #404040;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (max-width: 768px) {
    p {
      font-size: 14px;
    }
  }
`;

const FeaturesPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

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

  const features: FeatureData[] = [
    {
      title: "중앙대학교 출신 선생님들의 특별한 교육",
      content: [
        "-카타르시스는 국내 최고의 연극영화과인 '중앙대학교 연극학과'출신 선생님들이 모였습니다.",
        "저희 선생님들은 10년이 넘는 입시교육경력뿐 아니라 연극,영화,드라마 등의 현장에서 다양한 활동을 바탕으로 특별한 교육을 진행합니다.",
      ],
    },
    {
      title: "한 반 정원 8명! 소수정예 연기클래스",
      content: [
        "-카타르시스는 소수정예로 연기수업을 진행합니다. 한 반 정원 8명으로 제한하여 학생들이 수업시간을 충분히 활용할 수 있도록 하겠습니다.",
        "-소수정예가 아닌 느낌 수업 주 수업을 말하고 믿도있는 수업불평가와 친족적인 케어의 학생을 약속합니다에게 늘어나겠습니다.",
      ],
    },
    {
      title: "유니크하고 트렌디 한 작품",
      content: [
        "-카타르시스는 늘 새롭고 독창적인 연기작품을 추구합니다. 유행이 지난 구시대적인 연기는 현재에 맞지 않습니다.",
        "똑같은 레퍼토리의 사용이 아닌 독창적이고 특별한 '나'만 할 수 있는 작품을 창작합니다.",
      ],
    },
    {
      title: "개인의 개성을 살리는 전략",
      content: [
        "-실전에서 자신만의 매력과 개성을 보여줄 수 있어야 합니다.",
        "입박시 교육경력에서 보이나 즐겁고 자유로운 분위기 속에서 개개인의 개성을 발견해야 합니다.",
        "매주 진행되는 컨설팅와 아이미 채점 프로그램을 통하여 자신만의 전략을 단들어 나갑니다.",
      ],
    },
    {
      title: "기본에 충실한 교육",
      content: [
        "-입시연기의 가장 중요한 점은 기본기입니다.",
        "하나 많은 교육학원에서 기본기 보다는 외형적인 모습을 집중하며, 주먹구구식 작품 수업으로 배우의 성장을 방해합니다.",
        "카타르시스는 발성,발음,눈빛 등을 배우가 기자와야 기본적인 부분들을 훈련합니다.",
      ],
    },
  ];

  return (
    <PageContainer>
      <HeroSection>
        <Logo>
          <h1>CATHARSIS</h1>
          <p>ACTING SCHOOL</p>
        </Logo>
        <DirectorNames>
          <span>원장 이호엽</span>
          <span>원장 김동길</span>
        </DirectorNames>
      </HeroSection>

      <ContentSection>
        <TitleSection>
          <MainTitle>카타르시스 특징</MainTitle>
          <Description>
            카타르시스 연기학원은 '짧 멕터 연기학원(2015)'에서 출발하여 2017년 소수정예연기학원으로 다시
            탄생해 수많은 합격생을 배출한 입시 명문학원입니다.
          </Description>
        </TitleSection>

        <FeaturesGrid ref={contentRef}>
          {features.map((feature, index) => (
            <FeatureBox key={index} $isVisible={isVisible} $delay={index * 0.15}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureContent>
                {feature.content.map((text, textIndex) => (
                  <p key={textIndex}>{text}</p>
                ))}
              </FeatureContent>
            </FeatureBox>
          ))}
        </FeaturesGrid>
      </ContentSection>
    </PageContainer>
  );
};

export default FeaturesPage;
