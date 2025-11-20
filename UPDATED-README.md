# Catharsis Frontend - 업데이트 문서

## 최신 업데이트 (2025-11-20)

### 주요 변경사항

#### 1. 레이아웃 개선
**ThreeColumnSection 컴포넌트 추가**
- 강사진, 역대 합격자, 인스타 썸네일을 1줄로 배치
- 데스크톱: 3열 그리드 레이아웃
- 모바일: 1열 스택 레이아웃
- 위치: `src/components/ThreeColumnSection.jsx`

#### 2. 모바일 반응형 구현

**모바일 헤더 (햄버거 메뉴)**
- 데스크톱 (>968px): 기존 드롭다운 메뉴 유지
- 모바일 (≤968px): 햄버거 메뉴 버튼 표시
- 사이드바 네비게이션 슬라이드 애니메이션
- 오버레이 배경 클릭 시 메뉴 닫기
- 서브메뉴 아코디언 방식 펼침/접힘
- 위치: `src/components/Header.jsx`

**반응형 브레이크포인트**
- 데스크톱: > 968px
- 태블릿: 768px - 968px
- 모바일: < 768px
- 소형 모바일: < 480px

#### 3. 컴포넌트별 모바일 최적화

**HeroSection**
- 높이 조정: 600px → 500px (태블릿) → 400px (모바일)
- 타이틀 폰트: 56px → 40px (태블릿) → 32px (모바일)
- 버튼 크기 및 패딩 반응형 조정

**SchoolPassersSection**
- 그리드 레이아웃: 3열 → 2열 (태블릿) → 1열 (모바일)
- 이미지 높이: 300px → 200px (태블릿) → 180px (모바일)
- 타이틀 폰트: 36px → 30px (태블릿) → 26px (모바일)

**ThreeColumnSection**
- 3열 그리드 → 1열 스택 (모바일)
- 강사진 카드 크기 조정
- 역대 합격자 스크롤 최대 높이 유지
- 인스타그램 썸네일 1:1 비율 유지

**ConsultationFooter**
- 연락처 그리드: 3열 → 1열 (모바일)
- 폰트 크기 반응형 조정
- 패딩 간격 최적화

**FloatingButton** (기존)
- 크기: 80px → 60px (모바일)
- 위치: bottom 40px/right 40px → 20px/20px (모바일)

## 프로젝트 구조

```
catharsis-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx                    # ✅ 모바일 햄버거 메뉴 추가
│   │   ├── HeroSection.jsx               # ✅ 모바일 반응형
│   │   ├── SchoolPassersSection.jsx      # ✅ 모바일 반응형
│   │   ├── AutoScrollSlider.jsx
│   │   ├── PassersListScroll.jsx
│   │   ├── InstagramGrid.jsx
│   │   ├── ThreeColumnSection.jsx        # 🆕 새로 추가
│   │   ├── FloatingButton.jsx
│   │   └── ConsultationFooter.jsx        # ✅ 모바일 반응형
│   ├── pages/
│   │   └── HomePage.jsx                  # ✅ 레이아웃 변경
│   ├── hooks/
│   ├── store/
│   │   └── index.js
│   ├── assets/
│   ├── App.jsx
│   └── index.js
├── .prettierrc
├── package.json
└── README.md
```

## 기술 스택

### 핵심 라이브러리
- **React**: ^19.2.0
- **react-router-dom**: ^7.9.6
- **styled-components**: ^6.1.19
- **@reduxjs/toolkit**: ^2.10.1
- **react-redux**: ^9.2.0

### 개발 도구
- **prettier**: ^3.6.2
- **eslint-config-prettier**: ^10.1.8
- **eslint-plugin-prettier**: ^5.5.4

## 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn start
# 서버 실행: http://localhost:3000

# 프로덕션 빌드
yarn build

# 테스트 실행
yarn test
```

## 컴포넌트 상세

### ThreeColumnSection
**Props**:
- `instructors`: 강사 데이터 배열
- `passers`: 합격자 데이터 배열
- `instagramPosts`: 인스타그램 포스트 데이터 배열

**기능**:
- 1행 3열 레이아웃 (데스크톱)
- 강사진: 카드 형식, 최대 3개 표시
- 역대 합격자: 세로 스크롤 리스트
- 인스타 썸네일: 1:1 비율, 최대 3개 표시
- 모바일: 각 섹션을 세로로 스택

### Header (모바일 버전)
**기능**:
- 데스크톱: 기존 드롭다운 메뉴
- 모바일: 햄버거 아이콘 클릭 → 우측 사이드바
- 햄버거 아이콘 애니메이션 (X 모양 전환)
- 사이드바 슬라이드 인/아웃 애니메이션
- 서브메뉴 아코디언 (▼ 아이콘 회전)
- 오버레이 배경 (rgba(0, 0, 0, 0.5))

**메뉴 구조**:
- 학원소개 (시스템, 강사소개, 시설안내)
- 교육과정 (입시반, 실기반, 커리큘럼)
- 민액터스 합격자
- 커뮤니티 (공지사항, 후기)
- 상담문의
- 오시는 길

## 스타일링 특징

### 반응형 디자인
**미디어 쿼리 브레이크포인트**:
```css
@media (max-width: 968px)  /* 태블릿 */
@media (max-width: 768px)  /* 모바일 */
@media (max-width: 480px)  /* 소형 모바일 */
```

### 애니메이션
- 햄버거 메뉴 아이콘 rotation 애니메이션
- 사이드바 슬라이드 애니메이션 (right: -100% → 0)
- 오버레이 페이드 인/아웃
- 서브메뉴 max-height 애니메이션 (아코디언)
- 화살표 아이콘 rotation (0deg → 180deg)

### 색상 팔레트
- 메인 컬러: #667eea, #764ba2, #7c3aed
- 배경: #ffffff, #f9fafb, #1a1a1a
- 텍스트: #333, #666, rgba(255, 255, 255, 0.7)
- 오버레이: rgba(0, 0, 0, 0.5)

## 페이지 구성

### HomePage 레이아웃
```
1. HeroSection (히어로 배너)
2. SchoolPassersSection (학교별 합격자)
3. AutoScrollSlider (유튭 영상)
4. ThreeColumnSection
   - 강사진
   - 역대 합격자
   - 인스타 썸네일
5. ConsultationFooter (상담 문의)
+ FloatingButton (플로팅 버튼)
```

## 향후 개발 계획

### TypeScript 마이그레이션 (예정)
- [ ] TypeScript 설치 및 설정
- [ ] .jsx → .tsx 파일 변환
- [ ] Props 타입 정의
- [ ] 타입 안정성 확보

### 추가 기능
- [ ] 실제 이미지 추가 및 최적화
- [ ] API 연동
- [ ] 페이지 라우팅 완성
- [ ] SEO 최적화
- [ ] 성능 최적화 (코드 스플리팅, 이미지 lazy loading)

## 모바일 테스트 가이드

### 테스트 해야 할 항목
1. **헤더**
   - 햄버거 메뉴 클릭 시 사이드바 오픈
   - 오버레이 클릭 시 닫힘
   - 서브메뉴 펼침/접힘
   - 로고 클릭 시 홈으로 이동

2. **컴포넌트**
   - 모든 섹션의 레이아웃이 모바일에서 올바르게 표시되는지
   - 폰트 크기가 읽기 편한지
   - 버튼 클릭 영역이 충분한지 (최소 44x44px)

3. **성능**
   - 스크롤 부드러움
   - 애니메이션 끊김 없음
   - 이미지 로딩 속도

## 브라우저 호환성

- Chrome (최신)
- Safari (최신)
- Firefox (최신)
- Edge (최신)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 8+)

## 레퍼런스

- 디자인 참고: https://www.mynactors.com/
- React: https://react.dev/
- Styled Components: https://styled-components.com/
- React Router: https://reactrouter.com/

## 라이선스

교육 목적으로 제작된 프로젝트입니다.

---

**마지막 업데이트**: 2025-11-20
**버전**: 1.1.0
