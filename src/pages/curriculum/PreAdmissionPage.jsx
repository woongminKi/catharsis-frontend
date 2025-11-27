import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const PreAdmissionPage = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const sectionsRef = useRef([]);

  useEffect(() => {
    setIsHeroVisible(true);

    const observers = sectionsRef.current.map((section, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
      );

      if (section) {
        observer.observe(section);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <PageWrapper>
      <HeroSection $isVisible={isHeroVisible}>
        <HeroOverlay>
          <HeroContent>
            <HeroTitle>예비입시반</HeroTitle>
            <HeroSubtitle>PRE-ADMISSION CLASS</HeroSubtitle>
          </HeroContent>
        </HeroOverlay>
      </HeroSection>

      <ContentWrapper>
        {/* 메인 메시지 섹션 */}
        <IntroSection ref={(el) => (sectionsRef.current[0] = el)}>
          <IntroTitle>
            연기의 첫 걸음마 누구와 함께 하느냐가 정말 중요합니다
          </IntroTitle>
          <IntroContent>
            <IntroParagraph>
              카타르시스만의 체계고 가족적인 분위기 속에서 가족을 들르며 다질 수
              있습니다.
            </IntroParagraph>
            <IntroParagraph>
              매년 늦어지는 입시경쟁률과 다양해진 시험내용을 카타르시스만의
              체계적인 코칭을 통해 미리 준비하세요.
            </IntroParagraph>
            <IntroHighlight>
              예비입시자만 입시반처럼 본인만의 작품을 준비합니다.
            </IntroHighlight>
          </IntroContent>
        </IntroSection>

        {/* 모집대상 섹션 */}
        <Section ref={(el) => (sectionsRef.current[1] = el)}>
          <SectionHeader>
            <SectionTitle>모집대상</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <TargetList>
              <TargetItem>
                고등학교 1, 2학년 재학생, 검정고시 응시생, 예고전학 희망자
              </TargetItem>
              <TargetItem>각부 정원 8명</TargetItem>
            </TargetList>
          </SectionContent>
        </Section>

        {/* 예비입시반 수업 정보 */}
        <Section ref={(el) => (sectionsRef.current[2] = el)}>
          <SectionHeader>
            <SectionTitle>예비입시반</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <InfoTable>
              <tbody>
                <tr>
                  <TableHeader>수업시간</TableHeader>
                  <TableCell>
                    <div>AM 11:00 ~ PM 01:00 특기</div>
                    <div>PM 02:00 ~ PM 05:30 연기</div>
                  </TableCell>
                </tr>
                <tr>
                  <TableHeader>강의횟수</TableHeader>
                  <TableCell>
                    주 연기 2회 | 음악임 1회 | 뮤지컬 1회 | 축석의
                  </TableCell>
                </tr>
                <tr>
                  <TableHeader>수업내용</TableHeader>
                  <TableCell>
                    기초연기, 희극, 즉흥연기, 장면만들기, 특별, 기초보컬,
                    기초음악임
                  </TableCell>
                </tr>
              </tbody>
            </InfoTable>
          </SectionContent>
        </Section>

        {/* 커리큘럼 상세 섹션 */}
        <Section ref={(el) => (sectionsRef.current[3] = el)}>
          <SectionHeader>
            <SectionTitle>커리큘럼</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <CurriculumGrid>
              <CurriculumItem>
                <CurriculumNumber>01</CurriculumNumber>
                <CurriculumTitle>기초연기</CurriculumTitle>
                <CurriculumList>
                  <li>연기의 기본 원리 이해</li>
                  <li>감정 표현 및 신체 표현 훈련</li>
                  <li>호흡과 발성의 기초</li>
                  <li>연기 기초 체력 만들기</li>
                </CurriculumList>
              </CurriculumItem>

              <CurriculumItem>
                <CurriculumNumber>02</CurriculumNumber>
                <CurriculumTitle>희극 (Comedy)</CurriculumTitle>
                <CurriculumList>
                  <li>코미디 연기의 이해</li>
                  <li>타이밍과 리듬감 훈련</li>
                  <li>캐릭터의 과장과 표현</li>
                  <li>상황극 실습</li>
                </CurriculumList>
              </CurriculumItem>

              <CurriculumItem>
                <CurriculumNumber>03</CurriculumNumber>
                <CurriculumTitle>즉흥연기</CurriculumTitle>
                <CurriculumList>
                  <li>순발력 및 창의력 개발</li>
                  <li>상황 대처 능력 향상</li>
                  <li>주제별 즉흥 연습</li>
                  <li>자신감 및 표현력 강화</li>
                </CurriculumList>
              </CurriculumItem>

              <CurriculumItem>
                <CurriculumNumber>04</CurriculumNumber>
                <CurriculumTitle>장면만들기</CurriculumTitle>
                <CurriculumList>
                  <li>대본 분석 기초</li>
                  <li>상대역과의 호흡 맞추기</li>
                  <li>장면 구성 및 연출</li>
                  <li>작품 완성도 높이기</li>
                </CurriculumList>
              </CurriculumItem>

              <CurriculumItem>
                <CurriculumNumber>05</CurriculumNumber>
                <CurriculumTitle>특별 수업</CurriculumTitle>
                <CurriculumList>
                  <li>월별 특별 워크숍</li>
                  <li>영화/연극 관람 및 분석</li>
                  <li>게스트 강사 특강</li>
                  <li>입시 정보 및 전략 세미나</li>
                </CurriculumList>
              </CurriculumItem>

              <CurriculumItem>
                <CurriculumNumber>06</CurriculumNumber>
                <CurriculumTitle>기초보컬</CurriculumTitle>
                <CurriculumList>
                  <li>발성 및 호흡 훈련</li>
                  <li>음정 및 박자 연습</li>
                  <li>개인별 노래 지도</li>
                  <li>무대 매너 및 표현력</li>
                </CurriculumList>
              </CurriculumItem>

              <CurriculumItem>
                <CurriculumNumber>07</CurriculumNumber>
                <CurriculumTitle>기초음악임</CurriculumTitle>
                <CurriculumList>
                  <li>음악의 기본 이론</li>
                  <li>리듬 및 박자 훈련</li>
                  <li>음악적 감각 개발</li>
                  <li>뮤지컬 기초 준비</li>
                </CurriculumList>
              </CurriculumItem>

              <CurriculumItem>
                <CurriculumNumber>08</CurriculumNumber>
                <CurriculumTitle>개인별 작품 준비</CurriculumTitle>
                <CurriculumList>
                  <li>학생 개개인 맞춤 작품 선정</li>
                  <li>작품 분석 및 캐릭터 연구</li>
                  <li>지속적인 연습 및 피드백</li>
                  <li>입시반 연계 준비</li>
                </CurriculumList>
              </CurriculumItem>
            </CurriculumGrid>
          </SectionContent>
        </Section>

        {/* 예비입시반의 특징 */}
        <Section ref={(el) => (sectionsRef.current[4] = el)}>
          <SectionHeader>
            <SectionTitle>카타르시스 예비입시반의 특징</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <FeatureList>
              <FeatureItem>
                <FeatureIcon>✓</FeatureIcon>
                <FeatureText>
                  <FeatureTextTitle>체계적인 기초 교육</FeatureTextTitle>
                  <FeatureTextDesc>
                    연기의 첫 걸음부터 체계적으로 배우며 탄탄한 기초를
                    다집니다. 입시에 필요한 모든 기본기를 단계적으로
                    학습합니다.
                  </FeatureTextDesc>
                </FeatureText>
              </FeatureItem>

              <FeatureItem>
                <FeatureIcon>✓</FeatureIcon>
                <FeatureText>
                  <FeatureTextTitle>소수정예 밀착 지도</FeatureTextTitle>
                  <FeatureTextDesc>
                    한 반 최대 8명으로 구성하여 학생 개개인의 특성과 장단점을
                    파악하고 맞춤형 지도를 제공합니다.
                  </FeatureTextDesc>
                </FeatureText>
              </FeatureItem>

              <FeatureItem>
                <FeatureIcon>✓</FeatureIcon>
                <FeatureText>
                  <FeatureTextTitle>가족같은 분위기</FeatureTextTitle>
                  <FeatureTextDesc>
                    카타르시스만의 가족적이고 따뜻한 분위기 속에서 편안하게
                    연기를 배우고 자신감을 키울 수 있습니다.
                  </FeatureTextDesc>
                </FeatureText>
              </FeatureItem>

              <FeatureItem>
                <FeatureIcon>✓</FeatureIcon>
                <FeatureText>
                  <FeatureTextTitle>입시반 연계 시스템</FeatureTextTitle>
                  <FeatureTextDesc>
                    예비입시반에서도 입시반처럼 본인만의 작품을 준비하여 입시반
                    진입 시 자연스럽게 연계됩니다.
                  </FeatureTextDesc>
                </FeatureText>
              </FeatureItem>

              <FeatureItem>
                <FeatureIcon>✓</FeatureIcon>
                <FeatureText>
                  <FeatureTextTitle>다양한 커리큘럼</FeatureTextTitle>
                  <FeatureTextDesc>
                    연기뿐만 아니라 보컬, 음악임, 뮤지컬 등 다양한 분야를
                    경험하며 자신에게 맞는 길을 찾을 수 있습니다.
                  </FeatureTextDesc>
                </FeatureText>
              </FeatureItem>

              <FeatureItem>
                <FeatureIcon>✓</FeatureIcon>
                <FeatureText>
                  <FeatureTextTitle>조기 입시 준비의 장점</FeatureTextTitle>
                  <FeatureTextDesc>
                    고등학교 1, 2학년부터 미리 준비하여 입시에 대한 부담을
                    줄이고 충분한 시간을 갖고 실력을 쌓을 수 있습니다.
                  </FeatureTextDesc>
                </FeatureText>
              </FeatureItem>
            </FeatureList>
          </SectionContent>
        </Section>

        {/* 예비입시반 학습 목표 */}
        <Section ref={(el) => (sectionsRef.current[5] = el)}>
          <SectionHeader>
            <SectionTitle>학습 목표</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <GoalGrid>
              <GoalItem>
                <GoalNumber>GOAL 01</GoalNumber>
                <GoalTitle>연기 기초 체력 완성</GoalTitle>
                <GoalDesc>
                  입시에 필요한 기본적인 연기 능력을 갖추고 자신감을 키웁니다.
                </GoalDesc>
              </GoalItem>

              <GoalItem>
                <GoalNumber>GOAL 02</GoalNumber>
                <GoalTitle>개인 작품 확보</GoalTitle>
                <GoalDesc>
                  본인만의 독창적인 작품을 만들어 입시반 진입 시 바로 활용할 수
                  있습니다.
                </GoalDesc>
              </GoalItem>

              <GoalItem>
                <GoalNumber>GOAL 03</GoalNumber>
                <GoalTitle>입시 이해도 향상</GoalTitle>
                <GoalDesc>
                  연극영화과 입시가 어떻게 진행되는지 이해하고 미리 경험해
                  봅니다.
                </GoalDesc>
              </GoalItem>

              <GoalItem>
                <GoalNumber>GOAL 04</GoalNumber>
                <GoalTitle>자신의 적성 발견</GoalTitle>
                <GoalDesc>
                  다양한 수업을 통해 자신에게 맞는 분야와 표현 방식을
                  찾습니다.
                </GoalDesc>
              </GoalItem>
            </GoalGrid>
          </SectionContent>
        </Section>

        {/* 문의 섹션 */}
        <Section ref={(el) => (sectionsRef.current[6] = el)}>
          <SectionHeader>
            <SectionTitle>수강 문의</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <ContactInfo>
              <ContactItem>
                <ContactLabel>전화</ContactLabel>
                <ContactValue>02-1234-5678</ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>카카오톡</ContactLabel>
                <ContactValue>카타르시스 연기학원</ContactValue>
              </ContactItem>
              <ContactItem>
                <ContactLabel>상담 시간</ContactLabel>
                <ContactValue>평일 09:00 - 21:00 / 주말 10:00 - 18:00</ContactValue>
              </ContactItem>
            </ContactInfo>
            <ConsultationNote>
              * 예비입시반은 선착순 마감되오니 조기 상담을 권장합니다.
              <br />* 학생 개개인의 특성에 맞는 맞춤 상담을 제공해 드립니다.
            </ConsultationNote>
          </SectionContent>
        </Section>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default PreAdmissionPage;

// Styled Components
const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
`;

const HeroSection = styled.section`
  width: 100%;
  height: 400px;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('/images/pre-admission-hero.jpg') center/cover no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transform: ${(props) => (props.$isVisible ? 'scale(1)' : 'scale(1.1)')};
  transition: all 1.2s ease-out;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const HeroOverlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 56px;
  font-weight: 700;
  margin: 0 0 20px 0;
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 18px;
  font-weight: 300;
  letter-spacing: 2px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px 100px;

  @media (max-width: 768px) {
    padding: 0 20px 60px;
  }
`;

const IntroSection = styled.section`
  margin-top: 80px;
  padding: 60px 0;
  text-align: center;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease-out;

  @media (max-width: 768px) {
    margin-top: 60px;
    padding: 40px 0;
  }
`;

const IntroTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: #000000;
  margin: 0 0 40px 0;
  line-height: 1.4;
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: 26px;
    margin-bottom: 30px;
  }
`;

const IntroContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const IntroParagraph = styled.p`
  font-size: 17px;
  color: #404040;
  line-height: 1.8;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const IntroHighlight = styled.div`
  margin-top: 40px;
  padding: 30px 40px;
  background: #f5f5f5;
  border-left: 4px solid #000000;
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  line-height: 1.6;

  @media (max-width: 768px) {
    padding: 24px 20px;
    font-size: 16px;
    margin-top: 30px;
  }
`;

const Section = styled.section`
  margin-top: 80px;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease-out;

  @media (max-width: 768px) {
    margin-top: 60px;
  }
`;

const SectionHeader = styled.div`
  background: #000000;
  padding: 20px 30px;
  margin-bottom: 0;

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

const SectionTitle = styled.h2`
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const SectionContent = styled.div`
  background: #fafafa;
  padding: 40px 30px;
  border: 1px solid #e7e7e7;
  border-top: none;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const TargetList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TargetItem = styled.li`
  font-size: 16px;
  color: #404040;
  line-height: 2;
  padding-left: 20px;
  position: relative;

  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: #000000;
    font-weight: 700;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
`;

const TableHeader = styled.td`
  background: #212121;
  color: white;
  padding: 20px 24px;
  font-weight: 700;
  font-size: 16px;
  text-align: left;
  border: 1px solid #404040;
  width: 200px;
  vertical-align: top;

  @media (max-width: 768px) {
    width: 120px;
    padding: 16px 16px;
    font-size: 14px;
  }
`;

const TableCell = styled.td`
  padding: 20px 24px;
  border: 1px solid #e7e7e7;
  color: #404040;
  font-size: 15px;
  line-height: 1.8;

  div {
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (max-width: 768px) {
    padding: 16px 16px;
    font-size: 14px;
  }
`;

const CurriculumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const CurriculumItem = styled.div`
  background: white;
  padding: 30px;
  border: 1px solid #e7e7e7;
  transition: all 0.3s ease;

  &:hover {
    border-color: #000000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

const CurriculumNumber = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 12px;
  letter-spacing: 1px;
`;

const CurriculumTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  margin: 0 0 20px 0;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const CurriculumList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    font-size: 15px;
    color: #404040;
    line-height: 1.8;
    padding-left: 16px;
    position: relative;
    margin-bottom: 8px;

    &:before {
      content: '·';
      position: absolute;
      left: 0;
      color: #000000;
      font-weight: 700;
    }

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FeatureItem = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding: 24px;
  background: white;
  border: 1px solid #e7e7e7;
  transition: all 0.3s ease;

  &:hover {
    border-color: #000000;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  }

  @media (max-width: 768px) {
    padding: 20px 16px;
    gap: 16px;
  }
`;

const FeatureIcon = styled.div`
  width: 28px;
  height: 28px;
  background: #000000;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 2px;

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    font-size: 14px;
  }
`;

const FeatureText = styled.div`
  flex: 1;
`;

const FeatureTextTitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: #000000;
  margin: 0 0 8px 0;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const FeatureTextDesc = styled.p`
  font-size: 15px;
  color: #404040;
  line-height: 1.7;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const GoalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const GoalItem = styled.div`
  background: white;
  padding: 32px;
  border: 1px solid #e7e7e7;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #000000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

const GoalNumber = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #000000;
  letter-spacing: 1px;
  margin-bottom: 16px;
`;

const GoalTitle = styled.h4`
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  margin: 0 0 16px 0;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const GoalDesc = styled.p`
  font-size: 15px;
  color: #404040;
  line-height: 1.7;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ContactItem = styled.div`
  background: white;
  padding: 24px;
  border: 1px solid #e7e7e7;
  text-align: center;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ContactLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
`;

const ContactValue = styled.div`
  font-size: 16px;
  color: #404040;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const ConsultationNote = styled.p`
  font-size: 14px;
  color: #5e5e5e;
  line-height: 1.8;
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
