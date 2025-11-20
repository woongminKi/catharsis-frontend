import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import FloatingButton from './components/FloatingButton';
import ConsultationFooter from './components/ConsultationFooter';
import HomePage from './pages/HomePage';
import GreetingPage from './pages/about/GreetingPage';
import FeaturesPage from './pages/about/FeaturesPage';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
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

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about/greeting" element={<GreetingPage />} />
        <Route path="/about/features" element={<FeaturesPage />} />
        {/* Add more routes here as needed */}
      </Routes>
      <ConsultationFooter />
      <FloatingButton />
    </BrowserRouter>
  );
}

export default App;
