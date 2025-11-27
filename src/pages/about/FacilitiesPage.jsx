import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

// 시설 데이터 (이미지는 나중에 추가 예정)
const facilitiesData = [
  {
    id: 1,
    name: "카타르시스",
    image: null,
  },
  {
    id: 2,
    name: "신관 복도",
    image: null,
  },
  {
    id: 3,
    name: "신관 뮤지컬실",
    image: null,
  },
  {
    id: 4,
    name: "신관 대연습실",
    image: null,
  },
  {
    id: 5,
    name: "출차량 음악임실",
    image: null,
  },
  {
    id: 6,
    name: "출차량 뮤지컬실",
    image: null,
  },
  {
    id: 7,
    name: "출차량 연기2",
    image: null,
  },
  {
    id: 8,
    name: "출차량 연기1",
    image: null,
  },
  {
    id: 9,
    name: "출차량 음악임실",
    image: null,
  },
  {
    id: 10,
    name: "2층 로비",
    image: null,
  },
  {
    id: 11,
    name: "상담실",
    image: null,
  },
  {
    id: 12,
    name: "3층 뮤지컬실",
    image: null,
  },
];

const FacilitiesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  const itemsPerPage = 12;

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
      }
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

  // 페이지네이션 계산
  const totalPages = Math.ceil(facilitiesData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFacilities = facilitiesData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // 페이지 변경
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <Title>시설안내</Title>
        </HeroContent>
      </HeroSection>

      <ContentSection ref={contentRef}>
        <FacilitiesGrid $isVisible={isVisible}>
          {currentFacilities.map((facility, index) => (
            <FacilityCard key={facility.id} $delay={index * 0.05}>
              <ImageWrapper>
                {facility.image ? (
                  <FacilityImage src={facility.image} alt={facility.name} />
                ) : (
                  <ImagePlaceholder>이미지 준비중</ImagePlaceholder>
                )}
              </ImageWrapper>
              <FacilityName>{facility.name}</FacilityName>
            </FacilityCard>
          ))}
        </FacilitiesGrid>

        {totalPages > 1 && (
          <Pagination>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <PageButton
                  key={pageNumber}
                  $active={currentPage === pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </PageButton>
              )
            )}
          </Pagination>
        )}
      </ContentSection>
    </Container>
  );
};

export default FacilitiesPage;

// Styled Components
const Container = styled.div`
  width: 100%;
`;

const HeroSection = styled.section`
  width: 100%;
  height: 400px;
  background: #888;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const HeroContent = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 56px;
  font-weight: 700;
  color: white;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 40px;
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

const FacilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin-bottom: 80px;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transform: ${(props) =>
    props.$isVisible ? "translateY(0)" : "translateY(50px)"};
  transition: all 0.8s ease-out;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FacilityCard = styled.div`
  display: flex;
  flex-direction: column;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transform: ${(props) =>
    props.$isVisible ? "translateY(0)" : "translateY(30px)"};
  transition: all 0.6s ease-out;
  transition-delay: ${(props) => props.$delay}s;
  cursor: pointer;

  &:hover img {
    transform: scale(1.05);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f5f5f5;
  margin-bottom: 16px;
  border: 1px solid black;
`;

const FacilityImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.4s ease;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #999;
  font-size: 14px;
`;

const FacilityName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  margin: 0;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
`;

const PageButton = styled.button`
  min-width: 40px;
  height: 40px;
  padding: 0 12px;
  border: none;
  background: ${(props) => (props.$active ? "#000000" : "transparent")};
  color: ${(props) => (props.$active ? "#ffffff" : "#000000")};
  font-size: 15px;
  font-weight: ${(props) => (props.$active ? "700" : "400")};
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.$active ? "#000000" : "#f5f5f5")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
