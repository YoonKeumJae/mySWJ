import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Gallery = () => {
  const [galleries, setGalleries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 실제 프로젝트에서는 API나 파일 시스템에서 목록을 가져와야 합니다
    // 여기서는 하드코딩된 목록을 사용합니다
    const mockGalleries = [
      {
        slug: 'spring-exhibition-2024',
        title: '2024년 봄 전시회',
        excerpt: '새로운 시작, 봄의 이야기를 주제로 한 특별 전시회',
        date: '2024-03-15',
        endDate: '2024-05-15',
        category: '특별전시',
        visitors: '15,847명',
        image: '/images/gallery/spring-2024-thumb.jpg'
      },
      {
        slug: 'summer-workshop-2024',
        title: '여름 워크숍 작품 전시',
        excerpt: '2024년 여름 워크숍 참가자들의 창작 작품 결과전',
        date: '2024-07-01',
        endDate: '2024-08-31',
        category: '워크숍',
        visitors: '8,234명',
        image: '/images/gallery/workshop-2024-thumb.jpg'
      },
      {
        slug: 'youth-art-contest-2024',
        title: '청소년 미술 대회',
        excerpt: '꿈을 그리다 - 제5회 청소년 미술 대회 수상작 전시',
        date: '2024-09-14',
        endDate: '2024-10-15',
        category: '대회',
        visitors: '12,456명',
        image: '/images/gallery/youth-contest-2024-thumb.jpg'
      }
    ]

    // 로딩 시뮬레이션
    setTimeout(() => {
      setGalleries(mockGalleries)
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-gray-600">갤러리를 불러오는 중...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">갤러리</h1>
        <p className="text-lg text-gray-600">
          다양한 전시회와 문화 행사의 생생한 현장을 만나보세요.
        </p>
      </header>

      {/* 갤러리 그리드 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleries.map((gallery) => (
          <article 
            key={gallery.slug}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* 이미지 영역 (실제로는 이미지가 있어야 함) */}
            <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">
                  {gallery.category === '특별전시' ? '🎨' : 
                   gallery.category === '워크숍' ? '🖌️' : '🏆'}
                </div>
                <p className="text-sm text-gray-600">대표 이미지</p>
              </div>
            </div>

            <div className="p-6">
              {/* 카테고리와 날짜 */}
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  gallery.category === '특별전시' ? 'bg-purple-100 text-purple-800' :
                  gallery.category === '워크숍' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {gallery.category}
                </span>
                <time className="text-sm text-gray-500">
                  {gallery.date} ~ {gallery.endDate}
                </time>
              </div>
              
              {/* 제목 */}
              <h2 className="text-xl font-semibold mb-3">
                <Link 
                  to={`/gallery/${gallery.slug}`}
                  className="text-gray-800 hover:text-blue-600 transition-colors"
                >
                  {gallery.title}
                </Link>
              </h2>
              
              {/* 설명 */}
              <p className="text-gray-600 mb-4 line-clamp-2">{gallery.excerpt}</p>
              
              {/* 관람객 수 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  관람객 {gallery.visitors}
                </div>
                
                <Link 
                  to={`/gallery/${gallery.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  자세히 보기
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {galleries.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">등록된 갤러리가 없습니다.</div>
        </div>
      )}

      {/* 하단 정보 */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">갤러리 이용 안내</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">관람 시간</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• 평일: 09:00 - 18:00</li>
              <li>• 주말: 10:00 - 17:00</li>
              <li>• 휴관일: 매주 월요일, 공휴일</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">관람료</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• 성인: 5,000원</li>
              <li>• 청소년/학생: 3,000원</li>
              <li>• 어린이/시니어: 2,000원</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery
