import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
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

const SliderTrack = styled.div`
  display: flex;
  width: fit-content;
  animation: ${scroll} 30s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
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

const SlideImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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

const AutoScrollSlider = ({ title, items }) => {
  const trackRef = useRef(null);

  useEffect(() => {
    if (trackRef.current) {
      const track = trackRef.current;
      const clone = track.cloneNode(true);
      track.parentElement.appendChild(clone);
    }
  }, []);

  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <SliderWrapper>
        <SliderTrack ref={trackRef}>
          {items.concat(items).map((item, index) => (
            <SlideItem key={index} to={item.link}>
              <SlideImage>{item.title}</SlideImage>
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
