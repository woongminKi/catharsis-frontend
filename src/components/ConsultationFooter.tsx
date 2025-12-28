import React from 'react';
import styled from 'styled-components';
import titleLogo from '../images/main/title-logo.png';

const FooterContainer = styled.footer`
  background: #1a1a1a;
  color: white;
  padding: 80px 20px 40px;

  @media (max-width: 768px) {
    padding: 60px 20px 30px;
  }

  @media (max-width: 480px) {
    padding: 40px 15px 20px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 30px;
  }

  @media (max-width: 480px) {
    font-size: 26px;
  }
`;

const FooterSubtitle = styled.p`
  text-align: center;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 60px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 40px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 30px;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  @media (max-width: 480px) {
    gap: 25px;
    margin-bottom: 40px;
  }
`;

const ContactItem = styled.div`
  text-align: center;
`;

const ContactLabel = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ContactValue = styled.div`
  font-size: 22px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  background: #7c3aed;
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 13px;
  transition:
    background 0.3s,
    transform 0.3s;

  &:hover {
    background: #6d28d9;
    transform: translateY(-2px);
  }
`;

const BranchContact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const BranchContactItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const BranchTag = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 12px;
  border-radius: 20px;
`;

const ContactValueSmall = styled.div`
  font-size: 18px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const FooterInfo = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 40px;
  display: flex;
  gap: 40px;
  align-items: flex-start;

  @media (max-width: 968px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
`;

const LogoSection = styled.div`
  flex-shrink: 0;

  @media (max-width: 968px) {
    text-align: center;
  }
`;

const LogoImage = styled.img`
  height: 80px;
  width: auto;

  @media (max-width: 768px) {
    height: 60px;
  }
`;

const BranchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  flex: 1;

  @media (max-width: 968px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const BranchInfo = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const BranchName = styled.div`
  color: white;
  font-weight: 500;
  margin-bottom: 8px;
`;

const BranchTel = styled.span`
  color: white;
  font-weight: 500;
`;

const ConsultationFooter: React.FC = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterTitle>상담 문의</FooterTitle>
        <FooterSubtitle>
          카타르시스 연기학원은 빠른 상담 답변을 위해
          <br />
          전화 / 카카오톡 / 인스타그램 으로
          <br />
          상담 예약을 받고 있습니다.
        </FooterSubtitle>

        <ContactGrid>
          <ContactItem>
            <ContactLabel>전화 문의</ContactLabel>
            <BranchContact>
              <BranchContactItem>
                <BranchTag>강남점</BranchTag>
                <ContactValue>02.511.6663</ContactValue>
                <ContactButton href="tel:02-511-6663">전화걸기</ContactButton>
              </BranchContactItem>
              <BranchContactItem>
                <BranchTag>홍대점</BranchTag>
                <ContactValue>02.333.8889</ContactValue>
                <ContactButton href="tel:02-333-8889">전화걸기</ContactButton>
              </BranchContactItem>
            </BranchContact>
          </ContactItem>

          <ContactItem>
            <ContactLabel>카카오톡 문의</ContactLabel>
            <BranchContact>
              <BranchContactItem>
                <BranchTag>강남점</BranchTag>
                <ContactValueSmall>카타르시스연기학원</ContactValueSmall>
                <ContactButton
                  href="http://pf.kakao.com/_xbAnDd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  오픈채팅
                </ContactButton>
              </BranchContactItem>
              <BranchContactItem>
                <BranchTag>홍대점</BranchTag>
                <ContactValueSmall>카타르시스연기학원 홍대점</ContactValueSmall>
                <ContactButton
                  href="http://pf.kakao.com/_TbMrxj"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  오픈채팅
                </ContactButton>
              </BranchContactItem>
            </BranchContact>
          </ContactItem>

          <ContactItem>
            <ContactLabel>인스타그램 문의</ContactLabel>
            <BranchContact>
              <BranchContactItem>
                <BranchTag>강남점</BranchTag>
                <ContactValue>@catharsis_act</ContactValue>
                <ContactButton
                  href="https://www.instagram.com/catharsis_act?igsh=MXBkaWMzN2IyMWdwZA=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  인스타그램
                </ContactButton>
              </BranchContactItem>
            </BranchContact>
          </ContactItem>
        </ContactGrid>

        <FooterInfo>
          <LogoSection>
            <LogoImage src={titleLogo} alt="카타르시스 연기학원" />
          </LogoSection>
          <BranchGrid>
            <BranchInfo>
              <BranchName>학원명 : 카타르시스연기학원</BranchName>
              학원등록번호 : 제12099호
              <br />
              TEL <BranchTel>02-511-6663</BranchTel>
              <br />
              업무시간 : 매일 09:00~22:00
              <br />
              대표 : 김동길, 이호협
              <br />
              사업자번호 : 492-99-00289
              <br />
              서울시 서초구 신반포로47길 19 2,3층
            </BranchInfo>
            <BranchInfo>
              <BranchName>학원명 : 카타르시스연기학원 홍대점</BranchName>
              학원등록번호 : 제02202300050호
              <br />
              TEL <BranchTel>02-333-8889</BranchTel>
              <br />
              업무시간 : 매일 09:00~22:00
              <br />
              대표 : 유현도
              <br />
              사업자번호 : 173-93-02045
              <br />
              서울시 마포구 양화로78-9, 지1,1층
            </BranchInfo>
            <BranchInfo>
              <BranchName>학원명 : 카타르시스연기학원 강남점</BranchName>
              학원등록번호 : 제14696호
              <br />
              대표 : 이호협
              <br />
              사업자번호 : 567-94-02096
              <br />
              서울시 서초구 신반포로45길 9-20 202호
            </BranchInfo>
          </BranchGrid>
        </FooterInfo>
      </Container>
    </FooterContainer>
  );
};

export default ConsultationFooter;
