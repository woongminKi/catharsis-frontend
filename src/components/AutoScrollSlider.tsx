import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';

interface SliderItem {
  title: string;
  description: string;
  link: string;
  thumbnailUrl?: string;
}

interface SlideImageProps {
  $imageUrl?: string;
}

interface AutoScrollSliderProps {
  title: string;
  items: SliderItem[];
}

interface SliderTrackProps {
  $shouldScroll: boolean;
}

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.333%);
  }
`;

const SectionContainer = styled.section`
  padding: 80px 0;
  background: white;
  overflow: hidden;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 50px;
  color: #333;
  padding: 0 20px;
`;

const SliderWrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;

const SliderTrack = styled.div<SliderTrackProps>`
  display: flex;
  flex-wrap: nowrap;
  width: fit-content;
  justify-content: ${props => (props.$shouldScroll ? 'flex-start' : 'center')};
  margin: ${props => (props.$shouldScroll ? '0' : '0 auto')};
  ${props =>
    props.$shouldScroll &&
    css`
      animation: ${scroll} 30s linear infinite;

      &:hover {
        animation-play-state: paused;
      }
    `}
`;

const SlideItem = styled(Link)`
  flex: 0 0 auto;
  width: 350px;
  margin-right: 30px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SlideImage = styled.div<SlideImageProps>`
  width: 100%;
  height: 200px;
  background: ${props =>
    props.$imageUrl
      ? `url(${props.$imageUrl}) center/cover no-repeat`
      : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

const SlideContent = styled.div`
  padding: 20px;
  background: white;
`;

const SlideTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const SlideDescription = styled.p`
  font-size: 14px;
  color: #666;
`;

const AutoScrollSlider: React.FC<AutoScrollSliderProps> = ({ title, items }) => {
  const [shouldScroll, setShouldScroll] = useState(false);
  const itemWidth = 380; // 350px + 30px margin

  useEffect(() => {
    const checkWidth = () => {
      const totalItemsWidth = items.length * itemWidth;
      const screenWidth = window.innerWidth;
      setShouldScroll(totalItemsWidth > screenWidth);
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, [items.length]);

  // 스크롤이 필요하면 3배 복제, 아니면 원본만
  const displayItems = shouldScroll ? [...items, ...items, ...items] : items;

  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <SliderWrapper>
        <SliderTrack $shouldScroll={shouldScroll}>
          {displayItems.map((item, index) => (
            <SlideItem key={index} to={item.link}>
              <SlideImage $imageUrl={item.thumbnailUrl}>
                {!item.thumbnailUrl && item.title}
              </SlideImage>
              <SlideContent>
                <SlideTitle>{item.title}</SlideTitle>
                <SlideDescription>{item.description}</SlideDescription>
              </SlideContent>
            </SlideItem>
          ))}
        </SliderTrack>
      </SliderWrapper>
    </SectionContainer>
  );
};

export default AutoScrollSlider;
