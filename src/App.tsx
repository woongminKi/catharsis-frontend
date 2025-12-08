import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import FloatingButton from './components/FloatingButton';
import ConsultationFooter from './components/ConsultationFooter';
import HomePage from './pages/HomePage';
import GreetingPage from './pages/about/GreetingPage';
import FeaturesPage from './pages/about/FeaturesPage';
import InstructorsPage from './pages/about/InstructorsPage';
import FacilitiesPage from './pages/about/FacilitiesPage';
import LocationPage from './pages/about/LocationPage';
import AdmissionPage from './pages/curriculum/AdmissionPage';
import PreAdmissionPage from './pages/curriculum/PreAdmissionPage';

// Inquiry pages
import InquiryListPage from './pages/inquiry/InquiryListPage';
import InquiryDetailPage from './pages/inquiry/InquiryDetailPage';
import InquiryWritePage from './pages/inquiry/InquiryWritePage';

// Passers pages
import PassersListPage from './pages/passers/PassersListPage';
import PasserDetailPage from './pages/passers/PasserDetailPage';

// Notices pages
import NoticesListPage from './pages/notices/NoticesListPage';
import NoticeDetailPage from './pages/notices/NoticeDetailPage';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    font-weight: 100;
    src: url('/fonts/Pretendard-Thin.woff') format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 200;
    src: url('/fonts/Pretendard-ExtraLight.woff') format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 300;
    src: url('/fonts/Pretendard-Light.woff') format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    src: url('/fonts/Pretendard-Regular.woff') format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    src: url('/fonts/Pretendard-Medium.woff') format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    src: url('/fonts/Pretendard-SemiBold.woff') format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    src: url('/fonts/Pretendard-Bold.woff') format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 800;
    src: url('/fonts/Pretendard-ExtraBold.woff') format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 900;
    src: url('/fonts/Pretendard-Black.woff') format('woff');
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about/greeting" element={<GreetingPage />} />
        <Route path="/about/features" element={<FeaturesPage />} />
        <Route path="/about/instructors" element={<InstructorsPage />} />
        <Route path="/about/facilities" element={<FacilitiesPage />} />
        <Route path="/about/location" element={<LocationPage />} />
        <Route path="/curriculum/admission" element={<AdmissionPage />} />
        <Route path="/curriculum/pre-admission" element={<PreAdmissionPage />} />

        {/* Inquiry routes */}
        <Route path="/consultation/inquiry" element={<InquiryListPage />} />
        <Route path="/consultation/inquiry/write" element={<InquiryWritePage />} />
        <Route path="/consultation/inquiry/:id" element={<InquiryDetailPage />} />

        {/* Passers routes */}
        <Route path="/passers" element={<PassersListPage />} />
        <Route path="/passers/:id" element={<PasserDetailPage />} />

        {/* Notices routes */}
        <Route path="/community/notice" element={<NoticesListPage />} />
        <Route path="/community/notice/:id" element={<NoticeDetailPage />} />
      </Routes>
      <ConsultationFooter />
      <FloatingButton />
    </BrowserRouter>
  );
}

export default App;
