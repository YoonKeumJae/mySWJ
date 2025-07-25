import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Notice = () => {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 실제 프로젝트에서는 API나 파일 시스템에서 목록을 가져와야 합니다
    // 여기서는 하드코딩된 목록을 사용합니다
    const mockNotices = [
      {
        slug: 'system-maintenance',
        title: '시스템 정기 점검 안내',
        excerpt: '2024년 2월 15일 정기 점검이 예정되어 있습니다.',
        date: '2024-02-10',
        category: '시스템'
      },
      {
        slug: 'new-features',
        title: '새로운 기능 업데이트 출시',
        excerpt: '다크모드, 실시간 알림 등 다양한 신기능이 추가되었습니다.',
        date: '2024-02-05',
        category: '업데이트'
      },
      {
        slug: 'privacy-policy',
        title: '개인정보 처리방침 변경 안내',
        excerpt: '개인정보보호법 개정에 따른 처리방침 변경사항을 안내드립니다.',
        date: '2024-02-01',
        category: '정책'
      }
    ]

    // 로딩 시뮬레이션
    setTimeout(() => {
      setNotices(mockNotices)
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-gray-600">공지사항을 불러오는 중...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">공지사항</h1>
        <p className="text-gray-600">
          중요한 안내사항과 업데이트 정보를 확인하세요.
        </p>
      </header>

      <div className="space-y-4">
        {notices.map((notice) => (
          <article 
            key={notice.slug}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  notice.category === '시스템' ? 'bg-red-100 text-red-800' :
                  notice.category === '업데이트' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {notice.category}
                </span>
                <time className="text-sm text-gray-500">{notice.date}</time>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-2">
              <Link 
                to={`/notice/${notice.slug}`}
                className="text-gray-800 hover:text-blue-600 transition-colors"
              >
                {notice.title}
              </Link>
            </h2>
            
            <p className="text-gray-600 mb-4">{notice.excerpt}</p>
            
            <Link 
              to={`/notice/${notice.slug}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              자세히 보기
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </article>
        ))}
      </div>

      {notices.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">등록된 공지사항이 없습니다.</div>
        </div>
      )}
    </div>
  )
}

export default Notice
