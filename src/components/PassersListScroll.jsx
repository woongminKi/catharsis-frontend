import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

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
  background: #1a1a2e;
  color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 50px;
`;

const ScrollWrapper = styled.div`
  max-height: 400px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px 0;
`;

const ScrollList = styled.div`
  animation: ${scrollUp} 20s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const PasserItem = styled(Link)`
  display: block;
  padding: 20px 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-decoration: none;
  color: white;
  transition: background 0.3s;

  &:hover {
    background: rgba(124, 58, 237, 0.3);
  }
`;

const PasserRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PasserName = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const PasserSchool = styled.span`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
`;

const PasserYear = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
`;

const PassersListScroll = () => {
  const passersData = [
    { name: '김영현', school: '한국예술종합학교', year: '25학년도', link: '/passer/1' },
    { name: '배하람', school: '한국예술종합학교', year: '25학년도', link: '/passer/2' },
    { name: '최예원', school: '한국예술종합학교', year: '25학년도', link: '/passer/3' },
    { name: '이찬민', school: '한국예술종합학교', year: '25학년도', link: '/passer/4' },
    { name: '염예지', school: '한국예술종합학교', year: '25학년도', link: '/passer/5' },
    { name: '이자운', school: '한국예술종합학교', year: '24학년도', link: '/passer/6' },
    { name: '정지원', school: '한국예술종합학교', year: '24학년도', link: '/passer/7' },
    { name: '오지은', school: '한국예술종합학교', year: '24학년도', link: '/passer/8' },
    { name: '김선영', school: '한국예술종합학교', year: '24학년도', link: '/passer/9' },
    { name: '강준원', school: '한국예술종합학교', year: '24학년도', link: '/passer/10' },
    { name: '강하영', school: '한국예술종합학교', year: '24학년도', link: '/passer/11' },
    { name: '공원우', school: '한국예술종합학교', year: '24학년도', link: '/passer/12' },
  ];

  return (
    <SectionContainer>
      <Container>
        <SectionTitle>역대 합격자</SectionTitle>
        <ScrollWrapper>
          <ScrollList>
            {passersData.concat(passersData).map((passer, index) => (
              <PasserItem key={index} to={passer.link}>
                <PasserRow>
                  <PasserName>{passer.name}</PasserName>
                  <PasserSchool>{passer.school}</PasserSchool>
                  <PasserYear>{passer.year}</PasserYear>
                </PasserRow>
              </PasserItem>
            ))}
          </ScrollList>
        </ScrollWrapper>
      </Container>
    </SectionContainer>
  );
};

export default PassersListScroll;
