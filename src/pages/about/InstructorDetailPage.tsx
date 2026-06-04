import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { instructorAPI, InstructorDetail } from '../../utils/api';
import { rewriteImageUrl } from '../../services/imageService';

const InstructorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [instructor, setInstructor] = useState<InstructorDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchInstructor = async (): Promise<void> => {
      try {
        const response = await instructorAPI.getOne(id!);
        setInstructor(response.data.data);
      } catch (error: any) {
        if (error.response?.status === 404) {
          alert('강사 정보를 찾을 수 없습니다.');
          navigate('/about/instructors');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInstructor();
  }, [id, navigate]);

  const handlePrevImage = () => {
    if (instructor && instructor.profileImages.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? instructor.profileImages.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (instructor && instructor.profileImages.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === instructor.profileImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <PageTitle>강사소개</PageTitle>
        <LoadingMessage>로딩 중...</LoadingMessage>
      </PageContainer>
    );
  }

  if (!instructor) {
    return (
      <PageContainer>
        <PageTitle>강사소개</PageTitle>
        <LoadingMessage>강사 정보를 찾을 수 없습니다.</LoadingMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>강사소개</PageTitle>

      <ContentContainer>
        <Header>
          <InstructorName>{instructor.name}</InstructorName>
          <ViewCount>{instructor.viewCount}</ViewCount>
        </Header>

        <MainSection>
          <ImageSection>
            {instructor.profileImages.length > 0 ? (
              <>
                <ProfileImage
                  src={rewriteImageUrl(instructor.profileImages[currentImageIndex])}
                  alt={instructor.name}
                />
                {instructor.profileImages.length > 1 && (
                  <>
                    <NavButton $position="left" onClick={handlePrevImage}>
                      &lt;
                    </NavButton>
                    <NavButton $position="right" onClick={handleNextImage}>
                      &gt;
                    </NavButton>
                  </>
                )}
              </>
            ) : (
              <NoImagePlaceholder>이미지 없음</NoImagePlaceholder>
            )}
          </ImageSection>

          <InfoSection>
            <InfoTable>
              <tbody>
                <InfoRow>
                  <InfoLabel>이름</InfoLabel>
                  <InfoValue>{instructor.name}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>직책</InfoLabel>
                  <InfoValue>{instructor.position}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>학력</InfoLabel>
                  <InfoValue>{instructor.education}</InfoValue>
                </InfoRow>
              </tbody>
            </InfoTable>
          </InfoSection>
        </MainSection>

        <DetailSections>
          {instructor.detailSections.map((section, index) => (
            <DetailSection key={index}>
              <SectionTitle>{section.title}</SectionTitle>
              <SectionContent>
                {section.items.map((item, itemIndex) => (
                  <SectionItem key={itemIndex}>{item}</SectionItem>
                ))}
              </SectionContent>
            </DetailSection>
          ))}
        </DetailSections>

        <ButtonGroup>
          <BackButton onClick={() => navigate('/about/instructors')}>목록</BackButton>
        </ButtonGroup>
      </ContentContainer>
    </PageContainer>
  );
};

export default InstructorDetailPage;

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 120px 20px 40px;
  min-height: calc(100vh - 200px);
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #1a1a1a;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`;

const ContentContainer = styled.div`
  background: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-top: 2px solid #333;
  border-bottom: 1px solid #ddd;
`;

const InstructorName = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const ViewCount = styled.span`
  font-size: 14px;
  color: #999;
`;

const MainSection = styled.div`
  display: flex;
  gap: 40px;
  padding: 30px 0;
  border-bottom: 1px solid #eee;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const ImageSection = styled.div`
  position: relative;
  width: 350px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  border-top: 3px solid #4dabf7;
`;

const NoImagePlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 3/4;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  border-top: 3px solid #4dabf7;
`;

const NavButton = styled.button<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ $position }) => ($position === 'left' ? 'left: 10px;' : 'right: 10px;')}
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  font-size: 20px;
  color: #4dabf7;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: white;
    color: #339af0;
  }
`;

const InfoSection = styled.div`
  flex: 1;
`;

const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const InfoRow = styled.tr`
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.td`
  padding: 15px 0;
  width: 80px;
  font-size: 14px;
  color: #666;
  vertical-align: top;
`;

const InfoValue = styled.td`
  padding: 15px 0;
  font-size: 14px;
  color: #333;
`;

const DetailSections = styled.div`
  padding: 30px 0;
`;

const DetailSection = styled.div`
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
`;

const SectionContent = styled.div``;

const SectionItem = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.8;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 30px 0;
  border-top: 1px solid #eee;
`;

const BackButton = styled.button`
  padding: 10px 24px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
  color: #333;
  border: 1px solid #ddd;

  &:hover {
    border-color: #999;
  }
`;
