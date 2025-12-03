import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  min-height: 150px;
  white-space: pre-wrap;
  line-height: 1.8;
  color: #333;
  border-bottom: 1px solid #eee;
`;

const AdminAnswerSection = styled.div`
  margin-top: 30px;
  padding: 20px;
  border: 2px solid #bfbfbf;
  background: #fcfcfc;
`;

const AdminAnswerTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #ddd;
`;

const AdminAnswerContent = styled.div`
  white-space: pre-wrap;
  line-height: 1.8;
  color: #333;
  font-size: 14px;
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

// Password Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border: 2px solid #999;
  padding: 40px 50px;
  width: 90%;
  max-width: 400px;
`;

const ModalRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
`;

const ModalLabel = styled.label`
  font-size: 14px;
  color: #333;
  white-space: nowrap;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-bottom: 1px solid #333;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-bottom-color: #000;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ModalButton = styled.button`
  padding: 8px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;

  &:hover {
    border-color: #999;
  }

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
          navigate('/consultation/inquiry');
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
      navigate('/consultation/inquiry');
    } catch (error) {
      alert(error.response?.data?.message || '삭제에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <PageTitle>수강문의 게시판</PageTitle>
        <LoadingMessage>로딩 중...</LoadingMessage>
      </PageContainer>
    );
  }

  if (!post) {
    return (
      <PageContainer>
        <PageTitle>수강문의 게시판</PageTitle>
        <LoadingMessage>게시글을 찾을 수 없습니다.</LoadingMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>수강문의 게시판</PageTitle>

      <PostContainer>
        <PostHeader>
          <PostTitle>{post.title}</PostTitle>
          <PostMeta>
            <MetaLeft>
              <span>{post.writerId}</span>
              <span>{formatDate(post.createdAt)}</span>
            </MetaLeft>
            {post.viewCount !== undefined && <span>{post.viewCount}</span>}
          </PostMeta>
        </PostHeader>

        {!needPassword && post.content && <PostContent>{post.content}</PostContent>}

        {!needPassword && post.comments && post.comments.length > 0 && (
          <AdminAnswerSection>
            <AdminAnswerTitle>답변</AdminAnswerTitle>
            {post.comments.map((comment) => (
              <AdminAnswerContent key={comment._id}>
                {comment.content}
              </AdminAnswerContent>
            ))}
          </AdminAnswerSection>
        )}

        <ButtonGroup>
          <Button onClick={() => navigate('/consultation/inquiry')}>목록</Button>
          {!needPassword && (
            <>
              <Button onClick={() => navigate(`/consultation/inquiry/edit/${id}`)}>수정</Button>
              <Button onClick={handleDelete}>삭제</Button>
            </>
          )}
          <Button onClick={() => navigate('/consultation/inquiry/write')}>글쓰기</Button>
        </ButtonGroup>
      </PostContainer>

      {showPasswordModal && (
        <ModalOverlay>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {passwordError && <ErrorText>{passwordError}</ErrorText>}
            <ModalRow>
              <ModalLabel>비밀번호</ModalLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                autoFocus
              />
            </ModalRow>
            <ModalButtons>
              <ModalButton onClick={handlePasswordSubmit} disabled={isSubmitting}>
                {isSubmitting ? '확인 중...' : '확인'}
              </ModalButton>
              <ModalButton onClick={() => navigate('/consultation/inquiry')}>취소</ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default InquiryDetailPage;
