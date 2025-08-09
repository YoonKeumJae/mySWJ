import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './utils/debug.js' // 디버그 유틸리티 로드

// 디버깅을 위한 로그
console.log('🚀 React 앱 시작')
console.log('📍 Base URL:', import.meta.env.BASE_URL)
console.log('🌍 Mode:', import.meta.env.MODE)

const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('❌ Root element not found!')
  document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>Root element not found</h1><p>앱을 시작할 수 없습니다.</p></div>'
} else {
  console.log('✅ Root element found, rendering app...')
  
  // 로더 숨기기
  const hideLoader = () => {
    const loader = document.getElementById('initial-loader')
    if (loader) {
      loader.style.display = 'none'
      console.log('✅ 초기 로더 숨김 완료')
    }
  }
  
  try {
    createRoot(rootElement).render(
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    )
    
    // React 앱이 렌더링된 후 로더 숨기기
    setTimeout(hideLoader, 100)
    
  } catch (error) {
    console.error('❌ React 앱 렌더링 실패:', error)
    hideLoader()
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; color: #e74c3c;">
        <h1>앱 로딩 실패</h1>
        <p>React 앱을 시작할 수 없습니다.</p>
        <button onclick="window.location.reload()" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
          새로고침
        </button>
        <details style="margin-top: 20px; text-align: left;">
          <summary>에러 정보</summary>
          <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto;">${error.message}</pre>
        </details>
      </div>
    `
  }
}
