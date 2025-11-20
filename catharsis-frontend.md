# Catharsis Frontend - 구현 문서

## 프로젝트 개요

**프로젝트명**: catharsis-frontend
**설명**: 민액터스 연기학원 웹사이트를 참고한 카타르시스 학원 프론트엔드 프로젝트
**패키지 매니저**: yarn
**프레임워크**: React 19.2.0

## 기술 스택

### 주요 라이브러리
- **react**: ^19.2.0
- **react-dom**: ^19.2.0
- **react-router-dom**: ^7.9.6 - 라우팅
- **styled-components**: ^6.1.19 - CSS-in-JS 스타일링
- **@reduxjs/toolkit**: ^2.10.1 - 상태 관리
- **react-redux**: ^9.2.0 - Redux React 바인딩

### 개발 도구
- **prettier**: ^3.6.2 - 코드 포맷팅
- **eslint-config-prettier**: ^10.1.8 - ESLint와 Prettier 통합
- **eslint-plugin-prettier**: ^5.5.4 - Prettier를 ESLint 규칙으로 실행

## 프로젝트 구조

```
catharsis-frontend/
├── public/
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── Header.jsx
│   │   ├── HeroSection.jsx
│   │   ├── SchoolPassersSection.jsx
│   │   ├── AutoScrollSlider.jsx
│   │   ├── PassersListScroll.jsx
│   │   ├── InstagramGrid.jsx
│   │   ├── FloatingButton.jsx
│   │   └── ConsultationFooter.jsx
│   ├── pages/               # 페이지 컴포넌트
│   │   └── HomePage.jsx
│   ├── hooks/               # 커스텀 훅
│   ├── store/               # Redux 상태 관리
│   │   └── index.js
│   ├── assets/              # 이미지, 폰트 등 정적 파일
│   ├── App.jsx              # 메인 앱 컴포넌트
│   └── index.js             # 앱 진입점
├── .prettierrc              # Prettier 설정
└── package.json
```

## 구현된 컴포넌트

### 1. Header.jsx
**위치**: `src/components/Header.jsx`

**기능**:
- 고정 헤더 (fixed position)
- 마우스 오버 시 드롭다운 메뉴 표시
- React Router Link를 사용한 페이지 이동

**주요 메뉴**:
- 학원소개 (교육과정, 교육철학, 지원시설)
- 교육과정 (입시반, 실기반, 커리큘럼)
- 합격자현황 (실시간 합격 현황, 학교별 합격자, 포트폴리오)
- 카톡 스스
- 연기학원

### 2. HeroSection.jsx
**위치**: `src/components/HeroSection.jsx`

**기능**:
- 메인 히어로 섹션
- 그라디언트 배경 (보라색 계열)
- CTA 버튼 (2024 합격자 전체보기)
- 호버 애니메이션 효과

### 3. SchoolPassersSection.jsx
**위치**: `src/components/SchoolPassersSection.jsx`

**기능**:
- 학교별 합격자 카드 그리드
- 각 카드 클릭 시 해당 학교 페이지로 이동
- 반응형 그리드 레이아웃 (auto-fit, minmax)
- 호버 시 카드 상승 애니메이션

**표시 정보**:
- 학교명
- 합격자 수
- 대표 이미지 (현재는 텍스트로 대체)

### 4. AutoScrollSlider.jsx
**위치**: `src/components/AutoScrollSlider.jsx`

**기능**:
- 우에서 좌로 자동 스크롤
- 마우스 호버 시 일시 정지
- 무한 루프 스크롤
- 각 아이템 클릭 시 페이지 이동

**사용처**:
- 유튭 영상 섹션
- 강사진 섹션

### 5. PassersListScroll.jsx
**위치**: `src/components/PassersListScroll.jsx`

**기능**:
- 아래에서 위로 자동 스크롤
- 마우스 호버 시 일시 정지
- 각 합격자 row 클릭 시 상세 페이지 이동
- 다크 테마 배경

**표시 정보**:
- 합격자 이름
- 합격 학교
- 학년도

### 6. InstagramGrid.jsx
**위치**: `src/components/InstagramGrid.jsx`

**기능**:
- 1:1 비율 그리드 레이아웃 (aspect-ratio: 1)
- 1행에 3개 이미지 표시
- 호버 시 오버레이 표시
- 외부 링크로 인스타그램 연결
- 반응형 (모바일: 1열, 태블릿: 2열)

### 7. FloatingButton.jsx
**위치**: `src/components/FloatingButton.jsx`

**기능**:
- 우하단 고정 플로팅 버튼
- 실시간 상담 페이지로 이동
- 호버 시 상승 애니메이션
- 반응형 크기 조정

### 8. ConsultationFooter.jsx
**위치**: `src/components/ConsultationFooter.jsx`

**기능**:
- 상담 문의 정보 표시
- 전화, 카카오톡, 인스타그램 연락처
- 각 연락 수단별 액션 버튼
- 학원 정보 (주소, 사업자번호 등)
- 다크 배경 테마

### 9. HomePage.jsx
**위치**: `src/pages/HomePage.jsx`

**기능**:
- 모든 섹션 컴포넌트 조합
- 메인 페이지 구성

**섹션 순서**:
1. HeroSection
2. SchoolPassersSection
3. AutoScrollSlider (유튭 영상)
4. AutoScrollSlider (강사진)
5. PassersListScroll
6. InstagramGrid

## 라우팅 구조

**위치**: `src/App.jsx`

```javascript
BrowserRouter
├── Header (모든 페이지에 표시)
├── Routes
│   └── Route "/" -> HomePage
├── ConsultationFooter (모든 페이지에 표시)
└── FloatingButton (모든 페이지에 표시)
```

## 상태 관리

**위치**: `src/store/index.js`

Redux Toolkit을 사용한 상태 관리 설정
- 현재는 기본 store 구조만 설정
- 필요 시 슬라이스 추가 가능

## 스타일링 특징

### Styled Components 사용
- CSS-in-JS 방식
- 컴포넌트 스코프 스타일링
- props 기반 동적 스타일링
- keyframes를 사용한 애니메이션

### 주요 디자인 요소
- **색상**:
  - 메인 컬러: 보라색 계열 (#667eea, #764ba2, #7c3aed)
  - 배경: 화이트, 라이트 그레이, 다크 (#1a1a1a, #1a1a2e)

- **애니메이션**:
  - 호버 효과 (transform, box-shadow)
  - 자동 스크롤 애니메이션 (translate)
  - 부드러운 전환 효과 (transition)

- **반응형**:
  - 모바일 퍼스트 접근
  - 미디어 쿼리를 통한 브레이크포인트
  - 유연한 그리드 레이아웃

## ESLint & Prettier 설정

### .prettierrc
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "avoid"
}
```

### package.json의 eslintConfig
```json
{
  "extends": [
    "react-app",
    "react-app/jest",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "prettier/prettier": "warn"
  }
}
```

## 설치 및 실행

### 의존성 설치
```bash
yarn install
```

### 개발 서버 실행
```bash
yarn start
```
개발 서버가 http://localhost:3000 에서 실행됩니다.

### 프로덕션 빌드
```bash
yarn build
```

### 테스트 실행
```bash
yarn test
```

## 추가 개선 사항

### 현재 구현에서 개선 가능한 부분:

1. **이미지 처리**
   - 현재 이미지는 플레이스홀더로 대체됨
   - 실제 이미지 파일 추가 필요
   - 이미지 최적화 (lazy loading, WebP 포맷 등)

2. **데이터 관리**
   - 하드코딩된 데이터를 별도 파일로 분리
   - API 연동 준비
   - Redux 슬라이스 추가

3. **페이지 추가**
   - 각 섹션별 상세 페이지 구현
   - 404 페이지
   - 로딩 페이지

4. **접근성 개선**
   - ARIA 레이블 추가
   - 키보드 네비게이션 지원
   - 스크린 리더 최적화

5. **성능 최적화**
   - 코드 스플리팅
   - 컴포넌트 메모이제이션
   - 이미지 최적화

6. **SEO**
   - 메타 태그 추가
   - Open Graph 태그
   - 시맨틱 HTML 개선

## 참고 사항

- **레퍼런스 사이트**: https://www.mynactors.com/
- **React Router v7** 사용으로 최신 라우팅 기능 활용
- **Styled Components v6** 사용으로 성능 개선
- **Redux Toolkit** 사용으로 간편한 상태 관리

## 라이선스

이 프로젝트는 교육 목적으로 제작되었습니다.
