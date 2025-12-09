import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { noticeAPI, Notice } from '../../utils/api';
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

const PostContainer = styled.div`
  background: white;
  overflow: hidden;
`;

const PostHeader = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #333;
`;

const PostTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #1a1a1a;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #999;
`;

const MetaLeft = styled.div`
  display: flex;
  gap: 15px;
`;

const PostContent = styled.div`
  padding: 30px 0;
  min-height: 200px;
  border-bottom: 1px solid #eee;
  line-height: 1.8;
  font-size: 15px;
  color: #333;

  img {
    max-width: 100%;
    height: auto;
    margin: 10px 0;
  }

  p {
    margin-bottom: 15px;
  }

  h1,
  h2,
  h3 {
    margin: 20px 0 10px;
  }

  ul,
  ol {
    margin: 10px 0;
    padding-left: 20px;
  }

  a {
    color: #7c3aed;
    text-decoration: underline;
  }
`;

const ThumbnailImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
`;

const Button = styled.button`
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

const LoadingMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`;

const NoticeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchNotice = async (): Promise<void> => {
      try {
        const response = await noticeAPI.getOne(id!);
        setNotice(response.data.data);
      } catch (error: any) {
        if (error.response?.status === 404) {
          alert('게시글을 찾을 수 없습니다.');
          navigate('/community/notice');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [id, navigate]);

  if (loading) {
    return (
      <PageContainer>
        <PageTitle>공지사항</PageTitle>
        <LoadingMessage>로딩 중...</LoadingMessage>
      </PageContainer>
    );
  }

  if (!notice) {
    return (
      <PageContainer>
        <PageTitle>공지사항</PageTitle>
        <LoadingMessage>게시글을 찾을 수 없습니다.</LoadingMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>공지사항</PageTitle>

      <PostContainer>
        <PostHeader>
          <PostTitle>{notice.title}</PostTitle>
          <PostMeta>
            <MetaLeft>
              <span>최고관리자</span>
              <span>{formatDate(notice.createdAt)}</span>
            </MetaLeft>
            <span>{notice.viewCount}</span>
          </PostMeta>
        </PostHeader>

        <PostContent>
          {notice.thumbnailUrl && <ThumbnailImage src={notice.thumbnailUrl} alt={notice.title} />}
          <div dangerouslySetInnerHTML={{ __html: notice.content }} />
        </PostContent>

        <ButtonGroup>
          <Button onClick={() => navigate('/community/notice')}>목록</Button>
        </ButtonGroup>
      </PostContainer>
    </PageContainer>
  );
};

export default NoticeDetailPage;
