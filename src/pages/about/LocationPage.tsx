import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface BranchInfo {
  name: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
}

interface BranchData {
  [key: string]: BranchInfo;
}

interface ContentWrapperProps {
  $isVisible: boolean;
}

declare global {
  interface Window {
    naver: any;
  }
}

// 지점 데이터
const branchData: BranchData = {
  gangnam: {
    name: '카타르시스 연기학원 강남',
    address: '서울시 서초구 신반포로47길 19 2,3층',
    phone: '02-511-6663',
    hours: '매일 09:00~22:00',
    lat: 37.5115,
    lng: 127.0193,
  },
  hongdae: {
    name: '카타르시스 연기학원 홍대',
    address: '서울시 마포구 양화로 78-9, 2층',
    phone: '02-333-8889',
    hours: '매일 09:00~22:00',
    lat: 37.5514,
    lng: 126.9175,
  },
};

const LocationPage: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<string>('gangnam');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const contentRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const currentBranch = branchData[selectedBranch];

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

  // 네이버 지도 스크립트 로드 확인
  useEffect(() => {
    const checkNaverMaps = (): boolean => {
      if (window.naver && window.naver.maps) {
        setMapLoaded(true);
        return true;
      }
      return false;
    };

    if (checkNaverMaps()) return;

    // 스크립트가 아직 로드되지 않았다면 대기
    const interval = setInterval(() => {
      if (checkNaverMaps()) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // 지도 초기화 및 업데이트
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const { naver } = window;
    const location = new naver.maps.LatLng(currentBranch.lat, currentBranch.lng);

    if (!mapInstanceRef.current) {
      // 지도 처음 생성
      mapInstanceRef.current = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 17,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      });

      markerRef.current = new naver.maps.Marker({
        position: location,
        map: mapInstanceRef.current,
      });
    } else {
      // 지점 변경 시 지도 중심 및 마커 이동
      mapInstanceRef.current.setCenter(location);
      markerRef.current.setPosition(location);
    }
  }, [mapLoaded, selectedBranch, currentBranch.lat, currentBranch.lng]);

  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedBranch(e.target.value);
  };

  const handleShareLocation = (): void => {
    // 네이버 지도 앱/웹으로 공유
    const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(currentBranch.address)}`;
    window.open(naverMapUrl, '_blank');
  };

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <Title>오시는 길</Title>
        </HeroContent>
      </HeroSection>

      <ContentSection ref={contentRef}>
        <ContentWrapper $isVisible={isVisible}>
          {/* 지점 선택 드롭다운 */}
          <SelectWrapper>
            <BranchSelect value={selectedBranch} onChange={handleBranchChange}>
              <option value="gangnam">강남점</option>
              <option value="hongdae">홍대점</option>
            </BranchSelect>
          </SelectWrapper>

          {/* 지점 정보 카드 */}
          <LocationCard>
            <InfoSection>
              <AddressInfo>
                <MainAddress>{currentBranch.address}</MainAddress>
                <BranchName>{currentBranch.name}</BranchName>
                <ContactInfo>
                  <InfoItem>{currentBranch.phone}</InfoItem>
                  <InfoItem>{currentBranch.hours}</InfoItem>
                </ContactInfo>
              </AddressInfo>
              <ShareButton onClick={handleShareLocation}>위치 공유하기</ShareButton>
            </InfoSection>

            {/* 네이버 지도 */}
            <MapContainer>
              {!mapLoaded ? (
                <MapPlaceholder>
                  <PlaceholderText>지도를 불러오는 중...</PlaceholderText>
                  <PlaceholderSubText>
                    네이버 지도 API가 로드되지 않았습니다.
                    <br />
                    Client ID 설정을 확인해주세요.
                  </PlaceholderSubText>
                </MapPlaceholder>
              ) : (
                <MapWrapper ref={mapRef} />
              )}
            </MapContainer>
          </LocationCard>
        </ContentWrapper>
      </ContentSection>
    </Container>
  );
};

export default LocationPage;

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

const ContentWrapper = styled.div<ContentWrapperProps>`
  opacity: ${props => (props.$isVisible ? 1 : 0)};
  transform: ${props => (props.$isVisible ? 'translateY(0)' : 'translateY(50px)')};
  transition: all 0.8s ease-out;
`;

const SelectWrapper = styled.div`
  margin-bottom: 40px;
`;

const BranchSelect = styled.select`
  padding: 16px 24px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid #000;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  min-width: 200px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 20px;

  &:focus {
    outline: none;
    border-color: #7c3aed;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 16px;
    padding: 14px 20px;
  }
`;

const LocationCard = styled.div`
  background: #f9f9f9;
  border-radius: 16px;
  overflow: hidden;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px;
  background: white;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
    padding: 24px;
  }
`;

const AddressInfo = styled.div`
  flex: 1;
`;

const MainAddress = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #000;
  margin: 0 0 12px 0;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const BranchName = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 16px 0;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoItem = styled.span`
  font-size: 15px;
  color: #333;
`;

const ShareButton = styled.button`
  padding: 16px 32px;
  background: #000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;

  &:hover {
    background: #333;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 14px 24px;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 500px;

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const MapPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #e5e5e5;
`;

const PlaceholderText = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #666;
  margin: 0 0 8px 0;
`;

const PlaceholderSubText = styled.p`
  font-size: 14px;
  color: #999;
  text-align: center;
  margin: 0;
  line-height: 1.6;
`;
