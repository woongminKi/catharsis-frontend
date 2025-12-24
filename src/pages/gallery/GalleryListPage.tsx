import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { galleryAPI, Gallery } from '../../utils/api';

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

interface PageButtonProps {
  $active?: boolean;
}

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

const Divider = styled.hr`
  border: none;
  border-top: 2px solid #1a1a1a;
  margin-bottom: 30px;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const GalleryItem = styled.div`
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const GalleryImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 75%;
  overflow: hidden;
  background: #f5f5f5;
`;

const GalleryImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GalleryTitle = styled.p`
  margin-top: 12px;
  font-size: 14px;
  color: #333;
  line-height: 1.4;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #eee;
`;

const PageButton = styled.button<PageButtonProps>`
  padding: 8px 14px;
  border: none;
  background: transparent;
  color: ${({ $active }) => ($active ? '#1a1a1a' : '#999')};
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? '700' : '400')};
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: ${({ $active }) => ($active ? 'underline' : 'none')};
  text-underline-offset: 4px;

  &:hover:not(:disabled) {
    color: #1a1a1a;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
  font-size: 16px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`;

// Lightbox styles
const LightboxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LightboxContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LightboxImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
`;

const LightboxTitle = styled.p`
  color: white;
  font-size: 16px;
  margin-top: 16px;
  text-align: center;
`;

const LightboxCloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 32px;
  cursor: pointer;
  padding: 0;
  line-height: 1;

  &:hover {
    opacity: 0.8;
  }
`;

const LightboxNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 20px 15px;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const LightboxPrevButton = styled(LightboxNavButton)`
  left: -80px;

  @media (max-width: 768px) {
    left: 10px;
  }
`;

const LightboxNextButton = styled(LightboxNavButton)`
  right: -80px;

  @media (max-width: 768px) {
    right: 10px;
  }
`;

const GalleryListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const currentPage = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    const fetchGalleries = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await galleryAPI.getAll({
          page: currentPage,
          limit: 12,
        });
        setGalleries(response.data.data);
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
      } catch (error) {
        console.error('Failed to fetch galleries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, [currentPage]);

  const handlePageChange = (page: number): void => {
    setSearchParams({ page: page.toString() });
  };

  const openLightbox = (index: number): void => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = (): void => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const goToPrev = useCallback((): void => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToNext = useCallback((): void => {
    setCurrentIndex((prev) => (prev < galleries.length - 1 ? prev + 1 : prev));
  }, [galleries.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (!lightboxOpen) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrev();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, goToPrev, goToNext]);

  const renderPagination = (): React.ReactNode[] => {
    const pages: React.ReactNode[] = [];
    const { totalPages } = pagination;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    pages.push(
      <PageButton
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </PageButton>
    );

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageButton key={i} $active={i === currentPage} onClick={() => handlePageChange(i)}>
          {i}
        </PageButton>
      );
    }

    pages.push(
      <PageButton
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </PageButton>
    );

    return pages;
  };

  if (loading) {
    return (
      <PageContainer>
        <PageTitle>포토갤러리</PageTitle>
        <Divider />
        <LoadingMessage>로딩 중...</LoadingMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>포토갤러리</PageTitle>
      <Divider />

      {galleries.length === 0 ? (
        <EmptyMessage>등록된 사진이 없습니다.</EmptyMessage>
      ) : (
        <GalleryGrid>
          {galleries.map((gallery, index) => (
            <GalleryItem key={gallery._id} onClick={() => openLightbox(index)}>
              <GalleryImageWrapper>
                <GalleryImage src={gallery.imageUrl} alt={gallery.title} loading="lazy" />
              </GalleryImageWrapper>
              <GalleryTitle>{gallery.title}</GalleryTitle>
            </GalleryItem>
          ))}
        </GalleryGrid>
      )}

      {pagination.totalPages > 1 && <PaginationContainer>{renderPagination()}</PaginationContainer>}

      {/* Lightbox */}
      {lightboxOpen && galleries[currentIndex] && (
        <LightboxOverlay onClick={closeLightbox}>
          <LightboxContent onClick={(e) => e.stopPropagation()}>
            <LightboxCloseButton onClick={closeLightbox}>&times;</LightboxCloseButton>
            <LightboxPrevButton onClick={goToPrev} disabled={currentIndex === 0}>
              &#8249;
            </LightboxPrevButton>
            <LightboxImage
              src={galleries[currentIndex].imageUrl}
              alt={galleries[currentIndex].title}
            />
            <LightboxTitle>{galleries[currentIndex].title}</LightboxTitle>
            <LightboxNextButton onClick={goToNext} disabled={currentIndex === galleries.length - 1}>
              &#8250;
            </LightboxNextButton>
          </LightboxContent>
        </LightboxOverlay>
      )}
    </PageContainer>
  );
};

export default GalleryListPage;
