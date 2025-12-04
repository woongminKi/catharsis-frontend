import React from 'react';
import styled from 'styled-components';

interface InstagramPost {
  id: number;
  title: string;
  link: string;
}

const SectionContainer = styled.section`
  padding: 80px 20px;
  background: white;
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
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const GridItem = styled.a`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    .overlay {
      opacity: 1;
    }
  }
`;

const GridImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  transition: transform 0.3s;

  ${GridItem}:hover & {
    transform: scale(1.05);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

const InstagramGrid: React.FC = () => {
  const instagramPosts: InstagramPost[] = [
    { id: 1, title: '포스트 1', link: 'https://instagram.com/post1' },
    { id: 2, title: '포스트 2', link: 'https://instagram.com/post2' },
    { id: 3, title: '포스트 3', link: 'https://instagram.com/post3' },
    { id: 4, title: '포스트 4', link: 'https://instagram.com/post4' },
    { id: 5, title: '포스트 5', link: 'https://instagram.com/post5' },
    { id: 6, title: '포스트 6', link: 'https://instagram.com/post6' },
  ];

  return (
    <SectionContainer>
      <Container>
        <SectionTitle>학원 인스타 썸네일</SectionTitle>
        <GridContainer>
          {instagramPosts.map(post => (
            <GridItem
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GridImage>{post.title}</GridImage>
              <Overlay className="overlay">Instagram에서 보기</Overlay>
            </GridItem>
          ))}
        </GridContainer>
      </Container>
    </SectionContainer>
  );
};

export default InstagramGrid;
