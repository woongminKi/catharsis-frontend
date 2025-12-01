import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { consultationAPI } from '../../utils/api';
import { formatDateTime } from '../../utils/dateFormat';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 200px);
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #666;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 20px;

  &:hover {
    color: #7c3aed;
  }
`;

const PostContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const PostHeader = styled.div`
  padding: 25px;
  border-bottom: 1px solid #eee;
`;

const PostTitle = styled.h1`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SecretIcon = styled.span`
  color: #999;
`;

const PostMeta = styled.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #666;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
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

const PostContent = styled.div`
  padding: 25px;
  min-height: 200px;
  white-space: pre-wrap;
  line-height: 1.8;
  color: #333;
`;

const CommentsSection = styled.div`
  border-top: 1px solid #eee;
  padding: 25px;
  background: #f8f9fa;
`;

const CommentsTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
`;

const Comment = styled.div`
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  border-left: 3px solid #7c3aed;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 13px;
`;

const CommentAuthor = styled.span`
  font-weight: 600;
  color: #7c3aed;
`;

const CommentDate = styled.span`
  color: #999;
`;

const CommentContent = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 25px;
  border-top: 1px solid #eee;
`;

const Button = styled.button`
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $variant }) =>
    $variant === 'primary'
      ? `
    background: #7c3aed;
    color: white;
    border: none;

    &:hover {
      background: #6d28d9;
    }
  `
      : $variant === 'danger'
        ? `
    background: white;
    color: #dc3545;
    border: 1px solid #dc3545;

    &:hover {
      background: #dc3545;
      color: white;
    }
  `
        : `
    background: white;
    color: #333;
    border: 1px solid #ddd;

    &:hover {
      border-color: #999;
    }
  `}
`;

// Password Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  width: 90%;
  max-width: 400px;
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 15px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #7c3aed;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ModalButton = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $primary }) =>
    $primary
      ? `
    background: #7c3aed;
    color: white;
    border: none;

    &:hover {
      background: #6d28d9;
    }
  `
      : `
    background: white;
    color: #333;
    border: 1px solid #ddd;

    &:hover {
      border-color: #999;
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: #dc3545;
  font-size: 13px;
  text-align: center;
  margin-bottom: 15px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`;

const InquiryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [needPassword, setNeedPassword] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await consultationAPI.getOne(id);
        const data = response.data.data;

        if (data.needPassword) {
          setNeedPassword(true);
          setShowPasswordModal(true);
          setPost(data);
        } else {
          setPost(data);
          setNeedPassword(false);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          alert('게시글을 찾을 수 없습니다.');
          navigate('/inquiries');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handlePasswordSubmit = async () => {
    if (!password.trim()) {
      setPasswordError('비밀번호를 입력해주세요');
      return;
    }

    setIsSubmitting(true);
    setPasswordError('');

    try {
      const response = await consultationAPI.checkPassword(id, password);
      setPost(response.data.data);
      setNeedPassword(false);
      setShowPasswordModal(false);
    } catch (error) {
      setPasswordError(error.response?.data?.message || '비밀번호가 일치하지 않습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    let deletePassword = password;
    if (!deletePassword) {
      deletePassword = prompt('비밀번호를 입력해주세요');
      if (!deletePassword) return;
    }

    try {
      await consultationAPI.delete(id, deletePassword);
      alert('삭제되었습니다.');
      navigate('/inquiries');
    } catch (error) {
      alert(error.response?.data?.message || '삭제에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingMessage>로딩 중...</LoadingMessage>
      </PageContainer>
    );
  }

  if (!post) {
    return (
      <PageContainer>
        <LoadingMessage>게시글을 찾을 수 없습니다.</LoadingMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackLink to="/inquiries">← 목록으로</BackLink>

      <PostContainer>
        <PostHeader>
          <PostTitle>
            {post.isSecret && <SecretIcon>🔒</SecretIcon>}
            {post.title}
          </PostTitle>
          <PostMeta>
            <MetaItem>작성자: {post.writerId}</MetaItem>
            <MetaItem>작성일: {formatDateTime(post.createdAt)}</MetaItem>
            {post.viewCount !== undefined && <MetaItem>조회: {post.viewCount}</MetaItem>}
            <StatusBadge $status={post.status}>
              {post.status === 'ANSWERED' ? '답변완료' : '답변대기'}
            </StatusBadge>
          </PostMeta>
        </PostHeader>

        {!needPassword && post.content && <PostContent>{post.content}</PostContent>}

        {!needPassword && post.comments && post.comments.length > 0 && (
          <CommentsSection>
            <CommentsTitle>관리자 답변 ({post.comments.length})</CommentsTitle>
            {post.comments.map((comment) => (
              <Comment key={comment._id}>
                <CommentHeader>
                  <CommentAuthor>{comment.author}</CommentAuthor>
                  <CommentDate>{formatDateTime(comment.createdAt)}</CommentDate>
                </CommentHeader>
                <CommentContent>{comment.content}</CommentContent>
              </Comment>
            ))}
          </CommentsSection>
        )}

        <ButtonGroup>
          <Button onClick={() => navigate('/inquiries')}>목록</Button>
          {!needPassword && (
            <Button $variant="danger" onClick={handleDelete}>
              삭제
            </Button>
          )}
        </ButtonGroup>
      </PostContainer>

      {showPasswordModal && (
        <ModalOverlay onClick={() => navigate('/inquiries')}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>비밀글입니다</ModalTitle>
            <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
              비밀번호를 입력해주세요
            </p>
            {passwordError && <ErrorText>{passwordError}</ErrorText>}
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              autoFocus
            />
            <ModalButtons>
              <ModalButton onClick={() => navigate('/inquiries')}>취소</ModalButton>
              <ModalButton $primary onClick={handlePasswordSubmit} disabled={isSubmitting}>
                {isSubmitting ? '확인 중...' : '확인'}
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default InquiryDetailPage;
