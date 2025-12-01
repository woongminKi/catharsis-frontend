import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { consultationAPI } from '../../utils/api';
import { formatDate } from '../../utils/dateFormat';

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 200px);
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #1a1a1a;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
`;

const TotalCount = styled.span`
  color: #666;
  font-size: 14px;
`;

const WriteButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  background: #7c3aed;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background: #6d28d9;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const Th = styled.th`
  padding: 15px 10px;
  background: #f8f9fa;
  border-bottom: 2px solid #eee;
  text-align: ${({ $align }) => $align || 'left'};
  font-weight: 600;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 15px 10px;
  border-bottom: 1px solid #eee;
  text-align: ${({ $align }) => $align || 'left'};
  font-size: 14px;
  color: #333;

  &.title-cell {
    max-width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Tr = styled.tr`
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f8f9fa;
  }
`;

const TitleLink = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #333;

  &:hover {
    color: #7c3aed;
  }
`;

const SecretIcon = styled.span`
  color: #999;
  font-size: 14px;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;

  ${({ $status }) =>
    $status === 'ANSWERED'
      ? `
    background: #d4edda;
    color: #155724;
  `
      : `
    background: #fff3cd;
    color: #856404;
  `}
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 30px;
`;

const PageButton = styled.button`
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

const MobileCard = styled.div`
  display: none;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 10px;
  padding: 15px;
  cursor: pointer;

  @media (max-width: 600px) {
    display: block;
  }

  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

const MobileTitle = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const MobileMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #666;
`;

const DesktopTable = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
`;

const InquiryListPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [consultations, setConsultations] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const [loading, setLoading] = useState(true);

  const currentPage = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchConsultations = async () => {
      setLoading(true);
      try {
        const response = await consultationAPI.getAll({
          page: currentPage,
          limit: 15,
          boardType: 'INQUIRY',
        });
        setConsultations(response.data.data);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error('Failed to fetch consultations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() });
  };

  const handleRowClick = (id) => {
    navigate(`/inquiries/${id}`);
  };

  const renderPagination = () => {
    const pages = [];
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
        <PageTitle>수강 문의</PageTitle>
        <LoadingMessage>로딩 중...</LoadingMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>수강 문의</PageTitle>

      <TopBar>
        <TotalCount>총 {pagination.totalItems}개의 게시글</TotalCount>
        <WriteButton to="/inquiries/write">글쓰기</WriteButton>
      </TopBar>

      {consultations.length === 0 ? (
        <EmptyMessage>등록된 게시글이 없습니다.</EmptyMessage>
      ) : (
        <>
          <DesktopTable>
            <Table>
              <thead>
                <tr>
                  <Th $align="center" style={{ width: '60px' }}>
                    번호
                  </Th>
                  <Th>제목</Th>
                  <Th $align="center" style={{ width: '100px' }}>
                    작성자
                  </Th>
                  <Th $align="center" style={{ width: '80px' }}>
                    상태
                  </Th>
                  <Th $align="center" style={{ width: '100px' }}>
                    작성일
                  </Th>
                </tr>
              </thead>
              <tbody>
                {consultations.map((item, index) => (
                  <Tr key={item._id} onClick={() => handleRowClick(item._id)}>
                    <Td $align="center">
                      {pagination.totalItems - (currentPage - 1) * 15 - index}
                    </Td>
                    <Td className="title-cell">
                      <TitleLink>
                        {item.isSecret && <SecretIcon>🔒</SecretIcon>}
                        {item.title}
                        {item.commentsCount > 0 && (
                          <span style={{ color: '#7c3aed', fontSize: '12px' }}>
                            [{item.commentsCount}]
                          </span>
                        )}
                      </TitleLink>
                    </Td>
                    <Td $align="center">{item.writerId}</Td>
                    <Td $align="center">
                      <StatusBadge $status={item.status}>
                        {item.status === 'ANSWERED' ? '답변완료' : '답변대기'}
                      </StatusBadge>
                    </Td>
                    <Td $align="center">{formatDate(item.createdAt)}</Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </DesktopTable>

          {/* Mobile Cards */}
          {consultations.map((item) => (
            <MobileCard key={item._id} onClick={() => handleRowClick(item._id)}>
              <MobileTitle>
                {item.isSecret && <SecretIcon>🔒</SecretIcon>}
                {item.title}
                {item.commentsCount > 0 && (
                  <span style={{ color: '#7c3aed', fontSize: '12px' }}>[{item.commentsCount}]</span>
                )}
              </MobileTitle>
              <MobileMeta>
                <span>{item.writerId}</span>
                <StatusBadge $status={item.status}>
                  {item.status === 'ANSWERED' ? '답변완료' : '답변대기'}
                </StatusBadge>
                <span>{formatDate(item.createdAt)}</span>
              </MobileMeta>
            </MobileCard>
          ))}

          {pagination.totalPages > 1 && <Pagination>{renderPagination()}</Pagination>}
        </>
      )}
    </PageContainer>
  );
};

export default InquiryListPage;
