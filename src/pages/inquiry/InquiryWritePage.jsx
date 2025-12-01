import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { consultationAPI } from '../../utils/api';

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

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #1a1a1a;
`;

const FormContainer = styled.form`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
`;

const InputRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const InputGroup = styled.div`
  flex: ${({ $flex }) => $flex || 1};
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  min-height: 250px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #7c3aed;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #7c3aed;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #333;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 12px 32px;
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

    &:hover:not(:disabled) {
      background: #6d28d9;
    }
  `
      : `
    background: white;
    color: #333;
    border: 1px solid #ddd;

    &:hover:not(:disabled) {
      border-color: #999;
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;

const CharCount = styled.span`
  font-size: 12px;
  color: ${({ $over }) => ($over ? '#dc3545' : '#999')};
  display: block;
  text-align: right;
  margin-top: 4px;
`;

const InquiryWritePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    writerId: '',
    password: '',
    title: '',
    content: '',
    isSecret: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.writerId.trim()) {
      newErrors.writerId = 'ID를 입력해주세요';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 4) {
      newErrors.password = '비밀번호는 4자 이상이어야 합니다';
    }

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요';
    }

    if (!formData.content.trim()) {
      newErrors.content = '내용을 입력해주세요';
    } else if (formData.content.trim().length < 10) {
      newErrors.content = '내용은 10자 이상 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await consultationAPI.create({
        ...formData,
        boardType: 'INQUIRY',
      });

      alert('게시글이 등록되었습니다.');
      navigate('/inquiries');
    } catch (error) {
      alert(error.response?.data?.message || '등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <BackLink to="/inquiries">← 목록으로</BackLink>
      <PageTitle>수강 문의 글쓰기</PageTitle>

      <FormContainer onSubmit={handleSubmit}>
        <InputRow>
          <InputGroup>
            <Label htmlFor="writerId">ID *</Label>
            <Input
              type="text"
              id="writerId"
              name="writerId"
              value={formData.writerId}
              onChange={handleChange}
              placeholder="아이디를 입력해주세요"
              maxLength={50}
            />
            {errors.writerId && <ErrorText>{errors.writerId}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">비밀번호 *</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호 (4자 이상)"
              maxLength={20}
            />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </InputGroup>
        </InputRow>

        <InputGroup style={{ marginBottom: '20px' }}>
          <Label htmlFor="title">제목 *</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="제목을 입력해주세요"
            maxLength={200}
          />
          {errors.title && <ErrorText>{errors.title}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label htmlFor="content">내용 *</Label>
          <TextArea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="문의 내용을 입력해주세요 (10자 이상)"
            maxLength={5000}
          />
          {errors.content && <ErrorText>{errors.content}</ErrorText>}
          <CharCount $over={formData.content.length > 4800}>
            {formData.content.length} / 5000
          </CharCount>
        </InputGroup>

        <CheckboxGroup>
          <Checkbox
            type="checkbox"
            id="isSecret"
            name="isSecret"
            checked={formData.isSecret}
            onChange={handleChange}
          />
          <CheckboxLabel htmlFor="isSecret">비밀글로 등록</CheckboxLabel>
        </CheckboxGroup>

        <ButtonGroup>
          <Button type="button" onClick={() => navigate('/inquiries')}>
            취소
          </Button>
          <Button type="submit" $variant="primary" disabled={isSubmitting}>
            {isSubmitting ? '등록 중...' : '등록하기'}
          </Button>
        </ButtonGroup>
      </FormContainer>
    </PageContainer>
  );
};

export default InquiryWritePage;
