import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface PasserData {
  school: string;
  count: number;
  link: string;
}

const SectionContainer = styled.section`
  padding: 80px 20px;
  background: #f9fafb;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }

  @media (max-width: 480px) {
    padding: 40px 15px;
  }
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
  color: #333;

  @media (max-width: 768px) {
    font-size: 30px;
    margin-bottom: 40px;
  }

  @media (max-width: 480px) {
    font-size: 26px;
    margin-bottom: 30px;
  }
`;

const PassersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const PasserCard = styled(Link)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const PasserImage = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;

  @media (max-width: 768px) {
    height: 200px;
    font-size: 20px;
  }

  @media (max-width: 480px) {
    height: 180px;
    font-size: 18px;
  }
`;

const PasserInfo = styled.div`
  padding: 20px;
  text-align: center;
`;

const SchoolName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const PasserCount = styled.p`
  font-size: 14px;
  color: #666;
`;

const SchoolPassersSection: React.FC = () => {
  const passersData: PasserData[] = [
    { school: '한국예술종합학교', count: 25, link: '/passers/karts' },
    { school: '서울예술대학교', count: 18, link: '/passers/sau' },
    { school: '중앙대학교', count: 15, link: '/passers/cau' },
    { school: '동국대학교', count: 12, link: '/passers/dgu' },
    { school: '성균관대학교', count: 10, link: '/passers/skku' },
    { school: '한양대학교', count: 8, link: '/passers/hanyang' },
  ];

  return (
    <SectionContainer>
      <Container>
        <SectionTitle>학교별 합격자</SectionTitle>
        <PassersGrid>
          {passersData.map((data, index) => (
            <PasserCard key={index} to={data.link}>
              <PasserImage>{data.school.slice(0, 3)}</PasserImage>
              <PasserInfo>
                <SchoolName>{data.school}</SchoolName>
                <PasserCount>합격자 {data.count}명</PasserCount>
              </PasserInfo>
            </PasserCard>
          ))}
        </PassersGrid>
      </Container>
    </SectionContainer>
  );
};

export default SchoolPassersSection;
