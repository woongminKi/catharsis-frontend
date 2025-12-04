import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { getS3ImageUrl } from "../../services/imageService";

interface Facility {
  id: number;
  name: string;
  image: string;
}

interface FacilitiesData {
  [key: string]: Facility[];
}

interface FacilitiesGridProps {
  $isVisible: boolean;
}

interface FacilityCardProps {
  $delay: number;
  $isVisible: boolean;
}

// 시설 이미지 URL 생성 헬퍼 함수
const getFacilityImage = (folder: string, filename: string): string => getS3ImageUrl(`${folder}/${filename}`);

// 시설 데이터 정의
const facilitiesData: FacilitiesData = {
  "강남점 별관": [
    { id: 1, name: "별관 복도", image: getFacilityImage("강남점 별관 시설 사진", "별관 복도.jpg") },
    { id: 2, name: "별관 B", image: getFacilityImage("강남점 별관 시설 사진", "별관B.jpg") },
    { id: 3, name: "별관 A", image: getFacilityImage("강남점 별관 시설 사진", "별관 A.jpg") },
  ],
  "강남점 본관": [
    { id: 4, name: "2층 로비", image: getFacilityImage("강남점 본관 시설 사진", "2층 로비.PNG") },
    { id: 5, name: "본관 상담실", image: getFacilityImage("강남점 본관 시설 사진", "본관 상담실.jpg") },
    { id: 6, name: "본관 2층A", image: getFacilityImage("강남점 본관 시설 사진", "본관 2층A.jpg") },
    { id: 7, name: "본관 2층B", image: getFacilityImage("강남점 본관 시설 사진", "본관 2층B.jpg") },
    { id: 8, name: "본관 2층C", image: getFacilityImage("강남점 본관 시설 사진", "본관 2층C.jpg") },
    { id: 9, name: "본관 3층 무용실", image: getFacilityImage("강남점 본관 시설 사진", "본관 3층 무용실.jpg") },
    { id: 10, name: "3층C 강의실", image: getFacilityImage("강남점 본관 시설 사진", "3층C강의실.jpg") },
    { id: 11, name: "3층B 강의실", image: getFacilityImage("강남점 본관 시설 사진", "3층B강의실.jpg") },
    { id: 12, name: "2층 안내데스크", image: getFacilityImage("강남점 본관 시설 사진", "2층 안내데스크.jpg") },
  ],
  "강남점 신관": [
    { id: 13, name: "신관 무용실", image: getFacilityImage("강남점 신관 시설 사진", "신관 무용실.png") },
    { id: 14, name: "신관 복도", image: getFacilityImage("강남점 신관 시설 사진", "신관 복도.png") },
    { id: 15, name: "신관 연기연습실", image: getFacilityImage("강남점 신관 시설 사진", "신관 연기연습실.png") },
  ],
  "홍대점": [
    { id: 16, name: "움직임룸", image: getFacilityImage("홍대점 시설 사진", "카타르시스_홍대점_움직임룸.jpg") },
    { id: 17, name: "보컬룸", image: getFacilityImage("홍대점 시설 사진", "카타르시스_홍대점_보컬룸.jpg") },
    { id: 18, name: "연기룸 2", image: getFacilityImage("홍대점 시설 사진", "카타르시스_홍대점_연기룸2.jpg") },
    { id: 19, name: "연기룸 1", image: getFacilityImage("홍대점 시설 사진", "카타르시스_홍대점_연기룸1.jpg") },
    { id: 20, name: "움직임룸 2", image: getFacilityImage("홍대점 시설 사진", "카타르시슷_홍대점_움직임룸2.jpg") },
    { id: 21, name: "연기룸 5", image: getFacilityImage("홍대점 시설 사진", "카타르시스홍대 연기룸5.jpg") },
    { id: 22, name: "연기룸 3", image: getFacilityImage("홍대점 시설 사진", "카타르시스홍대 연기룸3.jpg") },
    { id: 23, name: "움직임룸 3", image: getFacilityImage("홍대점 시설 사진", "카타르시스홍대점 움직임룸3.jpg") },
    { id: 24, name: "연기룸 4", image: getFacilityImage("홍대점 시설 사진", "카타르시스홍대 연기룸4.jpg") },
  ],
};

const locationOptions: string[] = Object.keys(facilitiesData);

const FacilitiesPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("강남점 본관");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<Facility | null>(null);
  const contentRef = useRef<HTMLElement>(null);

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

  // Reset animation when location changes
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [selectedLocation]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setModalImage(null);
      }
    };

    if (modalImage) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [modalImage]);

  const currentFacilities: Facility[] = facilitiesData[selectedLocation] || [];

  const handleImageClick = (facility: Facility): void => {
    setModalImage(facility);
  };

  const closeModal = (): void => {
    setModalImage(null);
  };

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <Title>시설안내</Title>
        </HeroContent>
      </HeroSection>

      <ContentSection ref={contentRef}>
        <SelectWrapper>
          <SelectBox
            value={selectedLocation}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedLocation(e.target.value)}
          >
            {locationOptions.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </SelectBox>
        </SelectWrapper>

        <FacilitiesGrid $isVisible={isVisible}>
          {currentFacilities.map((facility, index) => (
            <FacilityCard
              key={facility.id}
              $delay={index * 0.05}
              $isVisible={isVisible}
              onClick={() => handleImageClick(facility)}
            >
              <ImageWrapper>
                <FacilityImage src={facility.image} alt={facility.name} />
                <FacilityName>{facility.name}</FacilityName>
              </ImageWrapper>
            </FacilityCard>
          ))}
        </FacilitiesGrid>
      </ContentSection>

      {/* Image Modal */}
      {modalImage && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <ModalImage src={modalImage.image} alt={modalImage.name} />
            <ModalCaption>{modalImage.name}</ModalCaption>
          </ModalContent>
        </ModalOverlay>
      )}
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
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
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
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 40px 80px;

  @media (max-width: 768px) {
    padding: 40px 20px 60px;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 40px;
`;

const SelectBox = styled.select`
  padding: 14px 48px 14px 20px;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 0;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;
  transition: all 0.2s ease;
  min-width: 200px;

  &:hover {
    background-color: #f5f5f5;
  }

  &:focus {
    outline: none;
    border-color: #333;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 15px;
    padding: 12px 44px 12px 16px;
  }
`;

const FacilitiesGrid = styled.div<FacilitiesGridProps>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transform: ${(props) =>
    props.$isVisible ? "translateY(0)" : "translateY(30px)"};
  transition: all 0.6s ease-out;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FacilityCard = styled.div<FacilityCardProps>`
  position: relative;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transform: ${(props) =>
    props.$isVisible ? "translateY(0)" : "translateY(20px)"};
  transition: all 0.5s ease-out;
  transition-delay: ${(props) => props.$delay}s;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f0f0f0;
`;

const FacilityImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.6s ease-in-out;

  ${ImageWrapper}:hover & {
    transform: scale(1.2);
  }
`;

const FacilityName = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  padding: 8px 14px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  border-radius: 4px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 6px 10px;
    bottom: 12px;
    right: 12px;
  }
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 40px;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: scaleIn 0.3s ease;

  @keyframes scaleIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -50px;
  right: -10px;
  background: none;
  border: none;
  color: white;
  font-size: 48px;
  cursor: pointer;
  line-height: 1;
  transition: all 0.2s ease;
  z-index: 10001;

  &:hover {
    color: #ccc;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    top: -40px;
    right: 0;
    font-size: 36px;
  }
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const ModalCaption = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 500;
  margin-top: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-top: 16px;
  }
`;
