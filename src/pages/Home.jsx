import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* 메인 히어로 섹션 */}
      <section className="text-center py-16 flex flex-col items-center">
        {/* <h1 className="text-5xl font-bold text-gray-800 mb-6">
          소우주에 오신 것을 환영합니다
        </h1> */}
        <img src='/sowoojoo.png' alt='sowoojoo logo' className='h-30'></img>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          소중한 우리 몸의 주인은 바로 나! 소우주에 오신 것을 환영합니다. 
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/programs/lecture"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            프로그램 보기
          </Link>
          <Link 
            to="/gallery"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            갤러리 둘러보기
          </Link>
        </div>
      </section>

      {/* 주요 프로그램 섹션 */}
      <section className="grid md:grid-cols-3 gap-8 py-16">
        {/* 강의 프로그램 카드 */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">강의 프로그램</h3>
          <p className="text-gray-600 mb-4">
            체계적인 커리큘럼과 전문 강사진이 함께하는 다양한 강의 과정을 만나보세요.
          </p>
          <Link 
            to="/programs/lecture"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            자세히 보기 →
          </Link>
        </div>

        {/* 체험 활동 카드 */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">체험 활동</h3>
          <p className="text-gray-600 mb-4">
            직접 참여하고 만들어보는 다양한 체험 활동으로 창의성을 키워보세요.
          </p>
          <Link 
            to="/programs/activity"
            className="text-green-600 hover:text-green-800 font-medium"
          >
            자세히 보기 →
          </Link>
        </div>

        {/* 인형극 카드 */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">인형극</h3>
          <p className="text-gray-600 mb-4">
            인형극 공연과 함께하는 특별한 체험을 경험해보세요.
          </p>
          <Link 
            to="/programs/puppet"
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            자세히 보기 →
          </Link>
        </div>
      </section>

      {/* 추가 정보 섹션 */}
      <section className="grid md:grid-cols-2 gap-8 py-16">
        {/* 갤러리 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">갤러리</h3>
          </div>
          <p className="text-gray-600 mb-4">
            프로그램 활동 모습과 소중한 추억들을 담은 사진들을 확인해보세요.
          </p>
          <Link 
            to="/gallery"
            className="text-orange-600 hover:text-orange-800 font-medium"
          >
            갤러리 둘러보기 →
          </Link>
        </div>

        {/* 찾아오는 길 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">찾아오는 길</h3>
          </div>
          <p className="text-gray-600 mb-4">
            소우주로 오는 길을 확인해보세요.
          </p>
          <Link 
            to="/map"
            className="text-red-600 hover:text-red-800 font-medium"
          >
            길찾기 정보 →
          </Link>
        </div>
      </section>

      {/* 최신 공지사항 및 갤러리 미리보기 */}
      <section className="grid md:grid-cols-2 gap-8 py-16">
        {/* 최신 공지사항 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">최신 공지사항</h2>
            <Link 
              to="/notice"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              전체 보기 →
            </Link>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <h3 className="font-medium text-gray-800 text-sm">시스템 정기 점검 안내</h3>
                <p className="text-xs text-gray-500">2024-02-10</p>
              </div>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                시스템
              </span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <h3 className="font-medium text-gray-800 text-sm">새로운 기능 업데이트</h3>
                <p className="text-xs text-gray-500">2024-02-05</p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                업데이트
              </span>
            </div>
          </div>
        </div>

        {/* 최신 갤러리 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">최신 갤러리</h2>
            <Link 
              to="/gallery"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              전체 보기 →
            </Link>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <h3 className="font-medium text-gray-800 text-sm">청소년 미술 대회</h3>
                <p className="text-xs text-gray-500">2024-09-14</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                대회
              </span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <h3 className="font-medium text-gray-800 text-sm">여름 워크숍 작품전</h3>
                <p className="text-xs text-gray-500">2024-07-01</p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                워크숍
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home