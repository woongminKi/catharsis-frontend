import React from 'react';
import styled from 'styled-components';

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
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 30px;
  background: #7c3aed;
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: #6d28d9;
    transform: translateY(-2px);
  }
`;

const FooterInfo = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 40px;
  text-align: center;
`;

const CompanyInfo = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.8;
  margin-bottom: 20px;
`;

const Copyright = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
`;

const Logo = styled.div`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
  letter-spacing: 3px;
`;

const ConsultationFooter: React.FC = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterTitle>상담 문의</FooterTitle>
        <FooterSubtitle>
          민액터스 연기학원은 빠른 상담 답변을 위해
          <br />
          전화 / 카카오톡 / 인스타그램 으로
          <br />
          상담 예약을 받고 있습니다.
        </FooterSubtitle>

        <ContactGrid>
          <ContactItem>
            <ContactLabel>전화 문의</ContactLabel>
            <ContactValue>02-521-1086</ContactValue>
            <ContactButton href="tel:02-521-1086">전화걸기</ContactButton>
          </ContactItem>

          <ContactItem>
            <ContactLabel>카카오톡 문의</ContactLabel>
            <ContactValue>mynact</ContactValue>
            <ContactButton href="http://pf.kakao.com/_example" target="_blank" rel="noopener noreferrer">
              오픈채팅
            </ContactButton>
          </ContactItem>

          <ContactItem>
            <ContactLabel>인스타그램 문의</ContactLabel>
            <ContactValue>@mynactors</ContactValue>
            <ContactButton href="https://instagram.com/mynactors" target="_blank" rel="noopener noreferrer">
              인스타그램
            </ContactButton>
          </ContactItem>
        </ContactGrid>

        <FooterInfo>
          <Logo>MYNACTORS</Logo>
          <CompanyInfo>
            상호 : 민액터스 연기학원 | 대표 : 김동현
            <br />
            카카오톡 ID : mynact | E-mail : myn_actors@naver.com
            <br />
            주소 : 서울시 서초구 잠원동 8-12 금화빌딩 1층 민액터스 연기학원
            <br />
            전화 : 02-521-1086 팩스 : 02-6008-1461 | 사업자 : 877-85-03141
          </CompanyInfo>
          <Copyright>
            © 2024 MYNACTORS. All rights reserved.
          </Copyright>
        </FooterInfo>
      </Container>
    </FooterContainer>
  );
};

export default ConsultationFooter;
