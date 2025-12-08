import React, { useState } from 'react';
import styled from 'styled-components';
import { consultationAPI } from '../utils/api';

interface FormData {
  writerId: string;
  password: string;
  content: string;
  isSecret: boolean;
}

interface Errors {
  writerId?: string;
  password?: string;
  content?: string;
}

interface Message {
  type: 'success' | 'error';
  text: string;
}

interface MessageProps {
  $type: 'success' | 'error';
}

interface CharCountProps {
  $over: boolean;
}

const SectionContainer = styled.section`
  background: #f8f9fa;
  padding: 60px 20px;

  @media (max-width: 768px) {
    padding: 40px 15px;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  color: #1a1a1a;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 40px;
  font-size: 14px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const FormContainer = styled.form`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const InputRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const InputGroup = styled.div`
  flex: 1;
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
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
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
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
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

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #7c3aed;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.2s;
  margin-top: 10px;

  &:hover:not(:disabled) {
    background: #6d28d9;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const MessageBox = styled.div<MessageProps>`
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;

  ${({ $type }) =>
    $type === 'success'
      ? `
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  `
      : `
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  `}
`;

const ErrorText = styled.span`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;

const CharCount = styled.span<CharCountProps>`
  font-size: 12px;
  color: ${({ $over }) => ($over ? '#dc3545' : '#999')};
  display: block;
  text-align: right;
  margin-top: 4px;
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #7c3aed;
`;

const SecretHint = styled.span`
  font-size: 12px;
  color: #666;
  margin-left: 10px;
`;

const RealTimeConsultSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    writerId: '',
    password: '',
    content: '',
    isSecret: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<Message | null>(null);

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.writerId.trim()) {
      newErrors.writerId = 'ID를 입력해주세요';
    }

    // 비밀글일 때만 비밀번호 필수
    if (formData.isSecret) {
      if (!formData.password) {
        newErrors.password = '비밀글은 비밀번호를 입력해주세요';
      } else if (formData.password.length < 4) {
        newErrors.password = '비밀번호는 4자 이상이어야 합니다';
      }
    }

    if (!formData.content.trim()) {
      newErrors.content = '상담 내용을 입력해주세요';
    } else if (formData.content.trim().length < 10) {
      newErrors.content = '상담 내용은 10자 이상 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      await consultationAPI.create({
        title: `[실시간 상담] ${formData.writerId}`,
        content: formData.content,
        writerId: formData.writerId,
        password: formData.password || undefined,
        isSecret: formData.isSecret,
        boardType: 'INQUIRY' as any,
      });

      setMessage({
        type: 'success',
        text: '상담 문의가 등록되었습니다. 빠른 시일 내에 답변드리겠습니다.',
      });
      setFormData({ writerId: '', password: '', content: '', isSecret: false });
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || '등록 중 오류가 발생했습니다. 다시 시도해주세요.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionContainer>
      <Container>
        <SectionTitle>실시간 상담</SectionTitle>
        <SectionSubtitle>
          궁금한 점이 있으시면 아래 양식을 작성해 주세요. 빠르게 답변드리겠습니다.
        </SectionSubtitle>

        <FormContainer onSubmit={handleSubmit}>
          {message && <MessageBox $type={message.type}>{message.text}</MessageBox>}

          <InputRow>
            <InputGroup>
              <Label htmlFor="writerId">ID</Label>
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
              <Label htmlFor="password">
                비밀번호 {formData.isSecret && <span style={{ color: '#dc3545' }}>*</span>}
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={formData.isSecret ? '비밀번호 (4자 이상) - 필수' : '비밀번호 (선택)'}
                maxLength={20}
              />
              {errors.password && <ErrorText>{errors.password}</ErrorText>}
            </InputGroup>
          </InputRow>

          <CheckboxRow>
            <CheckboxLabel>
              <Checkbox
                type="checkbox"
                checked={formData.isSecret}
                onChange={e => {
                  setFormData(prev => ({ ...prev, isSecret: e.target.checked }));
                  if (!e.target.checked) {
                    setErrors(prev => ({ ...prev, password: undefined }));
                  }
                }}
              />
              비밀글로 작성
            </CheckboxLabel>
            {formData.isSecret && <SecretHint>(비밀번호 입력 필수)</SecretHint>}
          </CheckboxRow>

          <InputGroup>
            <Label htmlFor="content">상담내용</Label>
            <TextArea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="상담 내용을 입력해주세요 (10자 이상)"
              maxLength={2000}
            />
            {errors.content && <ErrorText>{errors.content}</ErrorText>}
            <CharCount $over={formData.content.length > 1900}>
              {formData.content.length} / 2000
            </CharCount>
          </InputGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? '전송 중...' : '상담 문의하기'}
          </SubmitButton>
        </FormContainer>
      </Container>
    </SectionContainer>
  );
};

export default RealTimeConsultSection;
