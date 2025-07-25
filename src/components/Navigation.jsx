import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const Navigation = () => {
  const location = useLocation()
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isProgramsOpen, setIsProgramsOpen] = useState(false)

  // 현재 경로가 활성 상태인지 확인하는 함수
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-600">
            문화센터
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`transition-colors ${
                isActive('/') && location.pathname === '/' 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              홈
            </Link>
            
            {/* About 드롭다운 메뉴 */}
            <div className="relative group">
              <button 
                className={`flex items-center transition-colors ${
                  isActive('/about') 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
              >
                소개
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 transition-all duration-200 z-50 ${
                  isAboutOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
              >
                <Link 
                  to="/about/info"
                  className={`block px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    location.pathname === '/about/info' 
                      ? 'text-blue-600 font-medium' 
                      : 'text-gray-700'
                  }`}
                >
                  회사 정보
                </Link>
                <Link 
                  to="/about/history"
                  className={`block px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    location.pathname === '/about/history' 
                      ? 'text-blue-600 font-medium' 
                      : 'text-gray-700'
                  }`}
                >
                  회사 연혁
                </Link>
              </div>
            </div>

            {/* Programs 드롭다운 메뉴 */}
            <div className="relative group">
              <button 
                className={`flex items-center transition-colors ${
                  isActive('/programs') 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
                onMouseEnter={() => setIsProgramsOpen(true)}
                onMouseLeave={() => setIsProgramsOpen(false)}
              >
                프로그램
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 transition-all duration-200 z-50 ${
                  isProgramsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onMouseEnter={() => setIsProgramsOpen(true)}
                onMouseLeave={() => setIsProgramsOpen(false)}
              >
                <Link 
                  to="/programs/lecture"
                  className={`block px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    location.pathname === '/programs/lecture' 
                      ? 'text-blue-600 font-medium' 
                      : 'text-gray-700'
                  }`}
                >
                  강의 프로그램
                </Link>
                <Link 
                  to="/programs/activity"
                  className={`block px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    location.pathname === '/programs/activity' 
                      ? 'text-blue-600 font-medium' 
                      : 'text-gray-700'
                  }`}
                >
                  체험 활동
                </Link>
                <Link 
                  to="/programs/puppet"
                  className={`block px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                    location.pathname === '/programs/puppet' 
                      ? 'text-blue-600 font-medium' 
                      : 'text-gray-700'
                  }`}
                >
                  인형극
                </Link>
              </div>
            </div>
            
            <Link 
              to="/gallery" 
              className={`transition-colors ${
                isActive('/gallery') 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              갤러리
            </Link>
            
            <Link 
              to="/notice" 
              className={`transition-colors ${
                isActive('/notice') 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              공지사항
            </Link>

            <Link 
              to="/map" 
              className={`transition-colors ${
                isActive('/map') 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              찾아오는 길
            </Link>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
