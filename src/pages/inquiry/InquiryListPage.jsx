import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { consultationAPI } from '../../utils/api';
import { formatDate } from '../../utils/dateFormat';

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
  background: #333;
  color: white;
  border-radius: 4px;
  border: 1px solid #333;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background: #555;
    border-color: #555;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 30px 0;
`;

const SearchSelect = styled.select`
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #333;
  }
`;

const SearchInput = styled.input`
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 300px;

  &:focus {
    outline: none;
    border-color: #333;
  }

  @media (max-width: 600px) {
    width: 100%;
    flex: 1;
  }
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background: #333;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #555;
  }
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
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
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;

  ${({ $status }) =>
    $status === 'ANSWERED'
      ? `
    background: #333;
    color: white;
  `
      : `
    background: #f5f5f5;
    color: #666;
    border: 1px solid #ddd;
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
  const [searchType, setSearchType] = useState('title');
  const [searchKeyword, setSearchKeyword] = useState('');

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const urlSearchType = searchParams.get('searchType') || '';
  const urlSearchKeyword = searchParams.get('keyword') || '';

  useEffect(() => {
    if (urlSearchType) setSearchType(urlSearchType);
    if (urlSearchKeyword) setSearchKeyword(urlSearchKeyword);
  }, [urlSearchType, urlSearchKeyword]);

  useEffect(() => {
    const fetchConsultations = async () => {
      setLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: 10,
          boardType: 'INQUIRY',
        };

        if (urlSearchKeyword) {
          params.searchType = urlSearchType || 'title';
          params.keyword = urlSearchKeyword;
        }

        const response = await consultationAPI.getAll(params);
        setConsultations(response.data.data);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error('Failed to fetch consultations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, [currentPage, urlSearchType, urlSearchKeyword]);

  const handlePageChange = (page) => {
    const params = { page: page.toString() };
    if (urlSearchKeyword) {
      params.searchType = urlSearchType;
      params.keyword = urlSearchKeyword;
    }
    setSearchParams(params);
  };

  const handleSearch = () => {
    if (searchKeyword.trim()) {
      setSearchParams({
        page: '1',
        searchType,
        keyword: searchKeyword.trim()
      });
    } else {
      setSearchParams({ page: '1' });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleRowClick = (id) => {
    navigate(`/consultation/inquiry/${id}`);
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
        <PageTitle>수강문의 게시판</PageTitle>
        <LoadingMessage>로딩 중...</LoadingMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>수강문의 게시판</PageTitle>

      {consultations.length === 0 ? (
        <EmptyMessage>등록된 게시글이 없습니다.</EmptyMessage>
      ) : (
        <>
          <DesktopTable>
            <Table>
              <thead>
                <tr>
                  <Th $align="center" style={{ width: '80px' }}>
                    NO.
                  </Th>
                  <Th>제목</Th>
                  <Th $align="center" style={{ width: '100px' }}>
                    작성자
                  </Th>
                  <Th $align="center" style={{ width: '120px' }}>
                    작성일
                  </Th>
                  <Th $align="center" style={{ width: '100px' }}>
                    상태
                  </Th>
                </tr>
              </thead>
              <tbody>
                {consultations.map((item, index) => (
                  <Tr key={item._id} onClick={() => handleRowClick(item._id)}>
                    <Td $align="center" style={{ color: '#999' }}>
                      NO. {pagination.totalItems - (currentPage - 1) * 10 - index}
                    </Td>
                    <Td className="title-cell">
                      <TitleLink>
                        {item.isSecret && <SecretIcon>🔒</SecretIcon>}
                        {item.title}
                      </TitleLink>
                    </Td>
                    <Td $align="center">{item.writerId}</Td>
                    <Td $align="center" style={{ color: '#999' }}>{formatDate(item.createdAt)}</Td>
                    <Td $align="center">
                      <StatusBadge $status={item.status}>
                        {item.status === 'ANSWERED' ? '답변완료' : '답변대기'}
                      </StatusBadge>
                    </Td>
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
        </>
      )}

      {/* Search Area */}
      <SearchContainer>
        <SearchSelect
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="writerId">작성자</option>
        </SearchSelect>
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </SearchContainer>

      {/* Pagination */}
      {pagination.totalPages > 1 && <Pagination>{renderPagination()}</Pagination>}

      {/* Write Button */}
      <BottomBar>
        <WriteButton to="/consultation/inquiry/write">글쓰기</WriteButton>
      </BottomBar>
    </PageContainer>
  );
};

export default InquiryListPage;
