import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface HeroSectionProps {
  $isVisible: boolean;
}

const AdmissionPage: React.FC = () => {
  const [isHeroVisible, setIsHeroVisible] = useState<boolean>(false);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setIsHeroVisible(true);

    const observers = sectionsRef.current.map(section => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && section) {
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
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <PageWrapper>
      <HeroSection $isVisible={isHeroVisible}>
        <HeroOverlay>
          <HeroContent>
            <HeroTitle>입시반</HeroTitle>
            <HeroSubtitle>ADMISSION CLASS</HeroSubtitle>
          </HeroContent>
        </HeroOverlay>
      </HeroSection>

      <ContentWrapper>
        {/* 개요 섹션 */}
        <Section
          ref={el => {
            sectionsRef.current[0] = el;
          }}
        >
          <SectionHeader>
            <SectionTitle>입시반 개요</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <ContentGrid>
              <ContentItem>
                <ItemLabel>대상</ItemLabel>
                <ItemValue>고등학교 3학년, 재수생, N수생</ItemValue>
              </ContentItem>
              <ContentItem>
                <ItemLabel>수업 시간</ItemLabel>
                <ItemValue>주 5회 (월~금) / 1일 4시간</ItemValue>
              </ContentItem>
              <ContentItem>
                <ItemLabel>정원</ItemLabel>
                <ItemValue>한 반 최대 8명 (소수정예)</ItemValue>
              </ContentItem>
              <ContentItem>
                <ItemLabel>기간</ItemLabel>
                <ItemValue>3월 ~ 입시 종료 시까지</ItemValue>
              </ContentItem>
            </ContentGrid>
          </SectionContent>
        </Section>

        {/* 시간표 섹션 */}
        <Section
          ref={el => {
            sectionsRef.current[1] = el;
          }}
        >
          <SectionHeader>
            <SectionTitle>시간표</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <ScheduleTable>
              <thead>
                <tr>
                  <TableHeader>시간</TableHeader>
                  <TableHeader>월</TableHeader>
                  <TableHeader>화</TableHeader>
                  <TableHeader>수</TableHeader>
                  <TableHeader>목</TableHeader>
                  <TableHeader>금</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableCell className="time">14:00 - 15:00</TableCell>
                  <TableCell>기초연기</TableCell>
                  <TableCell>특기 준비</TableCell>
                  <TableCell>기초연기</TableCell>
                  <TableCell>특기 준비</TableCell>
                  <TableCell>모의실기</TableCell>
                </tr>
                <tr>
                  <TableCell className="time">15:00 - 16:00</TableCell>
                  <TableCell>작품연기</TableCell>
                  <TableCell>발성/발음</TableCell>
                  <TableCell>작품연기</TableCell>
                  <TableCell>발성/발음</TableCell>
                  <TableCell>모의실기</TableCell>
                </tr>
                <tr>
                  <TableCell className="time">16:00 - 17:00</TableCell>
                  <TableCell>즉흥연기</TableCell>
                  <TableCell>개인별 작품</TableCell>
                  <TableCell>즉흥연기</TableCell>
                  <TableCell>개인별 작품</TableCell>
                  <TableCell>피드백</TableCell>
                </tr>
                <tr>
                  <TableCell className="time">17:00 - 18:00</TableCell>
                  <TableCell>면접 준비</TableCell>
                  <TableCell>카메라 연기</TableCell>
                  <TableCell>면접 준비</TableCell>
                  <TableCell>카메라 연기</TableCell>
                  <TableCell>상담</TableCell>
                </tr>
              </tbody>
            </ScheduleTable>
            <ScheduleNote>
              * 위 시간표는 기본 스케줄이며, 입시 일정 및 학생 상황에 따라 조정될 수 있습니다.
            </ScheduleNote>
          </SectionContent>
        </Section>

        {/* 커리큘럼 섹션 */}
        <Section
          ref={el => {
            sectionsRef.current[2] = el;
          }}
        >
          <SectionHeader>
            <SectionTitle>커리큘럼</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <CurriculumGrid>
              <CurriculumItem>
                <CurriculumNumber>01</CurriculumNumber>
                <CurriculumTitle>기초연기</CurriculumTitle>
                <CurriculumList>
                  <li>감정 훈련 및 표현 연습</li>
                  <li>신체/움직임 훈련</li>
                  <li>상황 분석 및 캐릭터 이해</li>
                  <li>대본 리딩 및 분석</li>
                </CurriculumList>
              </CurriculumItem>

              <CurriculumItem>
                <CurriculumNumber>02</CurriculumNumber>
                <CurriculumTitle>작품연기</CurriculumTitle>
                <CurriculumList>
                  <li>개인별 맞춤 작품 선정</li>
                  <li>작품 분석 및 캐릭터 구축</li>
                  <li>독창적인 해석 및 표현</li>
                  <li>작품 완성도 향상</li>
                </CurriculumList>
              </CurriculumItem>

              <CurriculumItem>
                <CurriculumNumber>03</CurriculumNumber>
                <CurriculumTitle>즉흥연기</CurriculumTitle>
                <CurriculumList>
                  <li>주제별 즉흥 연습</li>
                  <li>순발력 및 창의력 향상</li>
                  <li>상황 대처 능력 배양</li>
                  <li>학교별 기출 문제 연습</li>
                </CurriculumList>
              </CurriculumItem>

              <CurriculumItem>
                <CurriculumNumber>04</CurriculumNumber>
                <CurriculumTitle>특기 준비</CurriculumTitle>
                <CurriculumList>
                  <li>노래 (성악, 가요 등)</li>
                  <li>춤 (현대무용, 한국무용 등)</li>
                  <li>악기 연주</li>
                  <li>기타 개인 특기 개발</li>
                </CurriculumList>
              </CurriculumItem>

              <CurriculumItem>
                <CurriculumNumber>05</CurriculumNumber>
                <CurriculumTitle>발성 및 발음</CurriculumTitle>
                <CurriculumList>
                  <li>호흡 훈련 및 발성 교정</li>
                  <li>표준 발음 연습</li>
                  <li>대사 전달력 향상</li>
                  <li>목소리 톤 및 감정 조절</li>
                </CurriculumList>
              </CurriculumItem>

              <CurriculumItem>
                <CurriculumNumber>06</CurriculumNumber>
                <CurriculumTitle>카메라 연기</CurriculumTitle>
                <CurriculumList>
                  <li>카메라 앞 자연스러운 연기</li>
                  <li>영상 분석 및 피드백</li>
                  <li>시선 처리 및 표정 연습</li>
                  <li>영화/방송 연기 차이 이해</li>
                </CurriculumList>
              </CurriculumItem>

              <CurriculumItem>
                <CurriculumNumber>07</CurriculumNumber>
                <CurriculumTitle>면접 준비</CurriculumTitle>
                <CurriculumList>
                  <li>학교별 면접 질문 분석</li>
                  <li>자기소개서 작성 지도</li>
                  <li>예상 질문 답변 연습</li>
                  <li>면접 태도 및 매너 교육</li>
                </CurriculumList>
              </CurriculumItem>

              <CurriculumItem>
                <CurriculumNumber>08</CurriculumNumber>
                <CurriculumTitle>모의실기 및 평가</CurriculumTitle>
                <CurriculumList>
                  <li>실전과 동일한 모의고사</li>
                  <li>영상 촬영 및 분석</li>
                  <li>상세한 개별 피드백</li>
                  <li>약점 보완 및 강점 극대화</li>
                </CurriculumList>
              </CurriculumItem>
            </CurriculumGrid>
          </SectionContent>
        </Section>

        {/* 카타르시스 입시반 학생 특징 */}
        <Section
          ref={el => {
            sectionsRef.current[3] = el;
          }}
        >
          <SectionHeader>
            <SectionTitle>카타르시스 입시반의 특징</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <FeatureList>
              <FeatureItem>
                <FeatureIcon>✓</FeatureIcon>
                <FeatureText>
                  <FeatureTextTitle>소수정예 시스템</FeatureTextTitle>
                  <FeatureTextDesc>
                    한 반 최대 8명으로 구성하여 모든 학생에게 세밀한 개별 지도가 가능합니다.
                  </FeatureTextDesc>
                </FeatureText>
              </FeatureItem>

              <FeatureItem>
                <FeatureIcon>✓</FeatureIcon>
                <FeatureText>
                  <FeatureTextTitle>중앙대학교 출신 전문 강사진</FeatureTextTitle>
                  <FeatureTextDesc>
                    국내 최고 연극영화과 출신의 10년 이상 경력 강사들이 직접 지도합니다.
                  </FeatureTextDesc>
                </FeatureText>
              </FeatureItem>

              <FeatureItem>
                <FeatureIcon>✓</FeatureIcon>
                <FeatureText>
                  <FeatureTextTitle>개인별 맞춤 작품 및 전략</FeatureTextTitle>
                  <FeatureTextDesc>
                    학생 개개인의 매력과 특성을 살린 독창적인 작품과 입시 전략을 제시합니다.
                  </FeatureTextDesc>
                </FeatureText>
              </FeatureItem>

              <FeatureItem>
                <FeatureIcon>✓</FeatureIcon>
                <FeatureText>
                  <FeatureTextTitle>체계적인 실전 대비</FeatureTextTitle>
                  <FeatureTextDesc>
                    주간 모의실기, 카메라 연기, 영상 분석을 통해 실전 감각을 극대화합니다.
                  </FeatureTextDesc>
                </FeatureText>
              </FeatureItem>

              <FeatureItem>
                <FeatureIcon>✓</FeatureIcon>
                <FeatureText>
                  <FeatureTextTitle>학교별 맞춤 전략</FeatureTextTitle>
                  <FeatureTextDesc>
                    각 대학의 특성과 평가 기준을 분석하여 학교별 최적화된 준비를 진행합니다.
                  </FeatureTextDesc>
                </FeatureText>
              </FeatureItem>

              <FeatureItem>
                <FeatureIcon>✓</FeatureIcon>
                <FeatureText>
                  <FeatureTextTitle>지속적인 상담 및 관리</FeatureTextTitle>
                  <FeatureTextDesc>
                    입시 전 과정에서 학생과 학부모님께 정기적인 상담과 피드백을 제공합니다.
                  </FeatureTextDesc>
                </FeatureText>
              </FeatureItem>
            </FeatureList>
          </SectionContent>
        </Section>

        {/* 문의 섹션 */}
        <Section
          ref={el => {
            sectionsRef.current[4] = el;
          }}
        >
          <SectionHeader>
            <SectionTitle>수강 문의</SectionTitle>
          </SectionHeader>
          <SectionContent>
            <ContactInfo>
              <ContactItem>
                <ContactLabel>전화</ContactLabel>
                <PhoneContainer>
                  <PhoneRow>
                    <BranchLabel>강남점</BranchLabel>
                    <PhoneNumber href="tel:02-511-6663">02.511.6663</PhoneNumber>
                  </PhoneRow>
                  <PhoneRow>
                    <BranchLabel>홍대점</BranchLabel>
                    <PhoneNumber href="tel:02-333-8889">02.333.8889</PhoneNumber>
                  </PhoneRow>
                </PhoneContainer>
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
              * 자세한 상담은 방문 또는 전화 예약 후 진행됩니다.
              <br />* 학생 개개인의 상황에 맞는 맞춤 상담을 제공해 드립니다.
            </ConsultationNote>
          </SectionContent>
        </Section>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default AdmissionPage;

// Styled Components
const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
`;

const HeroSection = styled.section<HeroSectionProps>`
  width: 100%;
  height: 400px;
  background:
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('/images/admission-hero.jpg') center/cover no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.$isVisible ? 1 : 0)};
  transform: ${props => (props.$isVisible ? 'scale(1)' : 'scale(1.1)')};
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ContentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ItemLabel = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #000000;
  min-width: 100px;

  @media (max-width: 768px) {
    min-width: 80px;
    font-size: 14px;
  }
`;

const ItemValue = styled.div`
  font-size: 15px;
  color: #404040;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ScheduleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const TableHeader = styled.th`
  background: #212121;
  color: white;
  padding: 16px 12px;
  font-weight: 600;
  font-size: 15px;
  text-align: center;
  border: 1px solid #404040;

  @media (max-width: 768px) {
    padding: 12px 8px;
    font-size: 13px;
  }
`;

const TableCell = styled.td`
  padding: 14px 12px;
  text-align: center;
  border: 1px solid #e7e7e7;
  color: #404040;
  font-size: 14px;

  &.time {
    background: #f5f5f5;
    font-weight: 600;
    color: #000000;
  }

  @media (max-width: 768px) {
    padding: 10px 6px;
    font-size: 12px;
  }
`;

const ScheduleNote = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #5e5e5e;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 13px;
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

const PhoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PhoneRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const BranchLabel = styled.span`
  font-size: 12px;
  color: #5e5e5e;
  background: #f0f0f0;
  padding: 3px 10px;
  border-radius: 12px;
`;

const PhoneNumber = styled.a`
  font-size: 16px;
  color: #404040;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #2c5282;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;
