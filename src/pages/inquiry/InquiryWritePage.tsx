import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { consultationAPI } from '../../utils/api';

interface FormData {
  writerId: string;
  password: string;
  title: string;
  content: string;
  isSecret: boolean;
}

interface Files {
  file1: File | null;
  file2: File | null;
}

interface Errors {
  writerId?: string;
  password?: string;
  title?: string;
  content?: string;
}

interface InputGroupProps {
  $flex?: number;
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

const FormContainer = styled.form`
  background: white;
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

const InputGroup = styled.div<InputGroupProps>`
  flex: ${({ $flex }) => $flex || 1};
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  font-size: 14px;
  transition: border-color 0.2s;
  box-sizing: border-box;
  background: #fafafa;

  &:focus {
    outline: none;
    border-color: #333;
  }

  &::placeholder {
    color: #999;
  }
`;

const TitleInput = styled(Input)`
  margin-bottom: 15px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #333;
  cursor: pointer;
`;

const EditorWrapper = styled.div`
  margin-bottom: 20px;

  .ql-container {
    min-height: 400px;
    font-size: 14px;
  }

  .ql-editor {
    min-height: 400px;
  }

  .ql-toolbar {
    border: 1px solid #ddd;
    border-bottom: none;
  }

  .ql-container {
    border: 1px solid #ddd;
  }
`;

const FileInputRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const FileInputGroup = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  background: #fafafa;
`;

const FileInputButton = styled.label`
  padding: 10px 15px;
  background: #f0f0f0;
  border-right: 1px solid #ddd;
  cursor: pointer;
  font-size: 13px;
  white-space: nowrap;

  &:hover {
    background: #e5e5e5;
  }
`;

const FileInputText = styled.span`
  padding: 10px 15px;
  color: #999;
  font-size: 13px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
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

  &:hover:not(:disabled) {
    border-color: #999;
  }

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

const InquiryWritePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    writerId: '',
    password: '',
    title: '',
    content: '',
    isSecret: false,
  });
  const [files, setFiles] = useState<Files>({ file1: null, file2: null });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ script: 'sub' }, { script: 'super' }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['blockquote'],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
    }),
    []
  );

  const quillFormats: string[] = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'script',
    'list',
    'bullet',
    'indent',
    'blockquote',
    'align',
    'color',
    'background',
    'link',
    'image',
    'video',
  ];

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.writerId.trim()) {
      newErrors.writerId = 'ID를 입력해주세요';
    }

    if (formData.isSecret) {
      if (!formData.password) {
        newErrors.password = '비밀번호를 입력해주세요';
      } else if (formData.password.length < 4) {
        newErrors.password = '비밀번호는 4자 이상이어야 합니다';
      }
    }

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요';
    }

    const plainContent = formData.content.replace(/<[^>]*>/g, '').trim();
    if (!plainContent) {
      newErrors.content = '내용을 입력해주세요';
    } else if (plainContent.length < 10) {
      newErrors.content = '내용은 10자 이상 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name as keyof Errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleContentChange = (value: string): void => {
    setFormData(prev => ({ ...prev, content: value }));
    if (errors.content) {
      setErrors(prev => ({ ...prev, content: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileKey: keyof Files): void => {
    const file = e.target.files?.[0] || null;
    setFiles(prev => ({ ...prev, [fileKey]: file }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await consultationAPI.create({
        ...formData,
        boardType: 'INQUIRY',
      });

      alert('게시글이 등록되었습니다.');
      navigate('/consultation/inquiry');
    } catch (error: any) {
      alert(error.response?.data?.message || '등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <PageTitle>수강문의 게시판</PageTitle>

      <FormContainer onSubmit={handleSubmit}>
        <InputRow>
          <InputGroup>
            <Input
              type="text"
              id="writerId"
              name="writerId"
              value={formData.writerId}
              onChange={handleChange}
              placeholder="작성자"
              maxLength={50}
            />
            {errors.writerId && <ErrorText>{errors.writerId}</ErrorText>}
          </InputGroup>

          <InputGroup>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호"
              maxLength={20}
            />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </InputGroup>
        </InputRow>

        <TitleInput
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="제목"
          maxLength={200}
        />
        {errors.title && <ErrorText>{errors.title}</ErrorText>}

        <CheckboxGroup>
          <Checkbox
            type="checkbox"
            id="isSecret"
            name="isSecret"
            checked={formData.isSecret}
            onChange={handleChange}
          />
          <CheckboxLabel htmlFor="isSecret">비밀글</CheckboxLabel>
        </CheckboxGroup>

        <EditorWrapper>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={handleContentChange}
            modules={quillModules}
            formats={quillFormats}
            placeholder="내용을 입력해주세요"
          />
        </EditorWrapper>
        {errors.content && <ErrorText>{errors.content}</ErrorText>}

        <FileInputRow>
          <FileInputGroup>
            <FileInputButton htmlFor="file1">파일 선택</FileInputButton>
            <FileInputText>{files.file1 ? files.file1.name : '선택된 파일 없음'}</FileInputText>
            <HiddenFileInput type="file" id="file1" onChange={e => handleFileChange(e, 'file1')} />
          </FileInputGroup>

          <FileInputGroup>
            <FileInputButton htmlFor="file2">파일 선택</FileInputButton>
            <FileInputText>{files.file2 ? files.file2.name : '선택된 파일 없음'}</FileInputText>
            <HiddenFileInput type="file" id="file2" onChange={e => handleFileChange(e, 'file2')} />
          </FileInputGroup>
        </FileInputRow>

        <ButtonGroup>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '등록 중...' : '작성완료'}
          </Button>
          <Button type="button" onClick={() => navigate('/consultation/inquiry')}>
            목록
          </Button>
        </ButtonGroup>
      </FormContainer>
    </PageContainer>
  );
};

export default InquiryWritePage;
