import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { initClickTracking } from './utils/analytics';

const container = document.getElementById('root') as HTMLElement;

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// react-snap prerendering 지원: 이미 렌더링된 콘텐츠가 있으면 hydrate 사용
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

// 모든 a/button 클릭 수집 (문의 전환 경로 포함) — 위임 리스너 1개, React 렌더링과 무관하게 동작
initClickTracking();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
