const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const S3_BASE_URL = process.env.REACT_APP_S3_URL || 'https://catharsis-image.s3.ap-northeast-2.amazonaws.com';

/**
 * 한글을 NFD (분해형)로 변환
 * Mac에서 S3에 업로드된 파일은 NFD 형식으로 저장됨
 * @param {string} str - 변환할 문자열
 * @returns {string} NFD로 변환된 문자열
 */
const toNFD = (str) => {
  return str.normalize('NFD');
};

/**
 * S3 이미지 URL 생성 (NFD 인코딩 적용)
 * @param {string} path - 이미지 경로 (예: '강사 사진/김동길 연기.jpg')
 * @returns {string} 전체 S3 URL
 */
export const getS3ImageUrl = (path) => {
  if (path.startsWith('http')) {
    return path;
  }
  // 한글을 NFD로 변환 후 URL 인코딩
  const nfdPath = toNFD(path);
  return `${S3_BASE_URL}/${encodeURIComponent(nfdPath).replace(/%2F/g, '/')}`;
};

/**
 * 이미지 업로드
 * @param {File} file - 업로드할 파일
 * @param {string} folder - S3 폴더 경로
 * @returns {Promise<{key: string, url: string}>}
 */
export const uploadImage = async (file, folder = 'images') => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('folder', folder);

  const response = await fetch(`${API_BASE_URL}/api/images/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  const result = await response.json();
  return result.data;
};

/**
 * 여러 이미지 업로드
 * @param {File[]} files - 업로드할 파일 배열
 * @param {string} folder - S3 폴더 경로
 * @returns {Promise<Array<{key: string, url: string}>>}
 */
export const uploadMultipleImages = async (files, folder = 'images') => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('images', file);
  });
  formData.append('folder', folder);

  const response = await fetch(`${API_BASE_URL}/api/images/upload-multiple`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload images');
  }

  const result = await response.json();
  return result.data;
};

/**
 * 이미지 목록 조회
 * @param {string} folder - S3 폴더 경로
 * @param {number} maxKeys - 최대 개수
 * @returns {Promise<Array<{key: string, url: string, size: number, lastModified: string}>>}
 */
export const getImageList = async (folder = 'images', maxKeys = 100) => {
  const response = await fetch(
    `${API_BASE_URL}/api/images/list?folder=${encodeURIComponent(toNFD(folder))}&maxKeys=${maxKeys}`
  );

  if (!response.ok) {
    throw new Error('Failed to get image list');
  }

  const result = await response.json();
  return result.data;
};

/**
 * 이미지 삭제
 * @param {string} key - S3 이미지 키
 * @returns {Promise<void>}
 */
export const deleteImage = async (key) => {
  const response = await fetch(`${API_BASE_URL}/api/images?key=${encodeURIComponent(toNFD(key))}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete image');
  }
};
