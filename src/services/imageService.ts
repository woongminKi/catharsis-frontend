import { ImageUploadResult, ImageListItem } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

// AWS 계정 정지로 죽은 옛 S3 버킷 prefix들
// DB에 박힌 옛 URL을 로컬 public/images로 우회시키기 위한 매핑
const LEGACY_S3_PREFIXES = [
  'https://catharsis-image.s3.ap-northeast-2.amazonaws.com',
  'http://catharsis-image.s3.ap-northeast-2.amazonaws.com',
];

const toNFD = (str: string): string => str.normalize('NFD');

/**
 * URL의 path 부분을 NFD → NFC 정규화.
 * Mac에서 S3로 업로드한 한글 키는 NFD인데 Vercel CDN은 NFC 매칭이라 둘이 안 맞음.
 * decode → normalize('NFC') → encode 로 변환.
 */
const normalizePathToNFC = (path: string): string => {
  try {
    const decoded = decodeURIComponent(path);
    const nfc = decoded.normalize('NFC');
    // encodeURI는 path 구분자(/)를 유지하면서 인코딩
    return encodeURI(nfc);
  } catch {
    return path;
  }
};

/**
 * 옛 S3 URL을 public/images로 우회시킴.
 * - DB의 NFD-encoded URL을 NFC로 정규화해서 Vercel이 파일을 찾을 수 있게 함
 * - 매칭되는 로컬 이미지가 있으면 표시됨
 * - 없으면 깨진 채로 노출 (학원에서 원본 받아 보완 대상)
 */
export const rewriteImageUrl = (url?: string | null): string => {
  if (!url) return '';
  for (const prefix of LEGACY_S3_PREFIXES) {
    if (url.startsWith(prefix)) {
      return '/images' + normalizePathToNFC(url.slice(prefix.length));
    }
  }
  return url;
};

/**
 * Quill HTML 본문 안의 옛 S3 URL을 일괄 치환
 */
export const rewriteImagesInHtml = (html?: string | null): string => {
  if (!html) return '';
  // 옛 S3 URL을 모두 찾아서 각각 NFC 정규화 (단순 split.join은 인코딩 정규화 못 함)
  let result = html;
  for (const prefix of LEGACY_S3_PREFIXES) {
    const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped + '([^"\'\\s)<>]*)', 'g');
    result = result.replace(regex, (_match, path) => '/images' + normalizePathToNFC(path));
  }
  return result;
};

/**
 * 이미지 URL 생성 (상대경로 → /images로 라우팅, http URL은 리라이트 적용)
 * 옛 S3가 죽어서 로컬 public/images 기반으로 통합.
 * @param {string} path - 이미지 경로 (예: '강사 사진/김동길 연기.jpg')
 */
export const getS3ImageUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http')) {
    return rewriteImageUrl(path);
  }
  return `/images/${encodeURIComponent(path).replace(/%2F/g, '/')}`;
};

/**
 * 이미지 업로드
 * @param {File} file - 업로드할 파일
 * @param {string} folder - S3 폴더 경로
 * @returns {Promise<{key: string, url: string}>}
 */
export const uploadImage = async (
  file: File,
  folder: string = 'images'
): Promise<ImageUploadResult> => {
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
export const uploadMultipleImages = async (
  files: File[],
  folder: string = 'images'
): Promise<ImageUploadResult[]> => {
  const formData = new FormData();
  files.forEach(file => {
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
export const getImageList = async (
  folder: string = 'images',
  maxKeys: number = 100
): Promise<ImageListItem[]> => {
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
export const deleteImage = async (key: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/images?key=${encodeURIComponent(toNFD(key))}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete image');
  }
};
