import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { resourceAPI, Resource } from '../../utils/api';
import { formatDate } from '../../utils/dateFormat';

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

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background: white;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f9f9f9;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const ListItemInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ItemCategory = styled.span`
  color: #999;
  font-size: 14px;
  min-width: 40px;
`;

const ItemTitle = styled.span`
  font-size: 15px;
  color: #333;
  font-weight: 500;
  flex: 1;

  &:hover {
    color: #7c3aed;
  }
`;

const ItemMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 13px;
  color: #999;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 40px;
`;

const PageButton = styled.button<PageButtonProps>`
  padding: 8px 14px;
  border: 1px solid ${({ $active }) => ($active ? '#7c3aed' : '#ddd')};
  background: ${({ $active }) => ($active ? '#7c3aed' : 'white')};
  color: ${({ $active }) => ($active ? 'white' : '#333')};
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: #7c3aed;
    color: ${({ $active }) => ($active ? 'white' : '#7c3aed')};
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

const ResourcesListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [resources, setResources] = useState<Resource[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const currentPage = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    const fetchResources = async (): Promise<void> => {
      setLoading(true);
      try {
        const response = await resourceAPI.getAll({
          page: currentPage,
          limit: 10,
        });
        setResources(response.data.data);
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
      } catch (error) {
        console.error('Failed to fetch resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [currentPage]);

  const handlePageChange = (page: number): void => {
    setSearchParams({ page: page.toString() });
  };

  const handleRowClick = (id: string): void => {
    navigate(`/community/archive/${id}`);
  };

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
        이전
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
        다음
      </PageButton>
    );

    return pages;
  };

  if (loading) {
    return (
      <PageContainer>
        <PageTitle>입시자료실</PageTitle>
        <LoadingMessage>로딩 중...</LoadingMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>입시자료실</PageTitle>

      {resources.length === 0 ? (
        <EmptyMessage>등록된 자료가 없습니다.</EmptyMessage>
      ) : (
        <ListContainer>
          {resources.map(resource => (
            <ListItem key={resource._id} onClick={() => handleRowClick(resource._id)}>
              <ListItemInfo>
                <ItemCategory>자료</ItemCategory>
                <ItemTitle>{resource.title}</ItemTitle>
              </ListItemInfo>
              <ItemMeta>
                <span>최고관리자</span>
                <span>{formatDate(resource.createdAt)}</span>
                <span>{resource.viewCount}</span>
              </ItemMeta>
            </ListItem>
          ))}
        </ListContainer>
      )}

      {pagination.totalPages > 1 && <PaginationContainer>{renderPagination()}</PaginationContainer>}
    </PageContainer>
  );
};

export default ResourcesListPage;
