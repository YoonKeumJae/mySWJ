import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

const Map = () => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadMarkdownFile = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/markdown/map/map.md')
        if (!response.ok) {
          throw new Error('찾아오는 길 페이지를 불러올 수 없습니다.')
        }
        
        const text = await response.text()
        setContent(text)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadMarkdownFile()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* 지도 영역 (실제로는 Google Maps나 Naver Maps API 사용) */}
      <div className="mb-8 bg-gray-200 rounded-lg h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <p className="text-gray-600">여기에 실제 지도가 표시됩니다</p>
          <p className="text-sm text-gray-500 mt-2">
            (Google Maps, Naver Maps, Kakao Maps API 연동 필요)
          </p>
        </div>
      </div>

      {/* 마크다운 콘텐츠 */}
      <article className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-table:text-sm">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </article>

      {/* 빠른 연락처 정보 */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <div className="text-3xl mb-3">📞</div>
          <h3 className="font-semibold text-gray-800 mb-2">전화 문의</h3>
          <p className="text-blue-600 font-medium">02-1234-5682</p>
          <p className="text-sm text-gray-600 mt-1">평일 09:00-18:00</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <div className="text-3xl mb-3">📧</div>
          <h3 className="font-semibold text-gray-800 mb-2">이메일</h3>
          <p className="text-green-600 font-medium">info@company.com</p>
          <p className="text-sm text-gray-600 mt-1">24시간 접수</p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-6 text-center">
          <div className="text-3xl mb-3">🅿️</div>
          <h3 className="font-semibold text-gray-800 mb-2">주차 안내</h3>
          <p className="text-purple-600 font-medium">지하 1-3층</p>
          <p className="text-sm text-gray-600 mt-1">방문객 2시간 무료</p>
        </div>
      </div>
    </div>
  )
}

export default Map
