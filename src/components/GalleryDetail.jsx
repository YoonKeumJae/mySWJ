import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getAssetUrl } from '../utils/assets'

const GalleryDetail = () => {
  const { slug } = useParams()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadMarkdownFile = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(getAssetUrl(`/markdown/gallery/${slug}.md`))
        if (!response.ok) {
          throw new Error('갤러리 내용을 찾을 수 없습니다.')
        }
        
        const text = await response.text()
        setContent(text)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      loadMarkdownFile()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-gray-600">갤러리 내용을 불러오는 중...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <Link 
          to="/gallery"
          className="text-blue-600 hover:underline"
        >
          갤러리 목록으로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 상단 네비게이션 */}
      <nav className="mb-6">
        <Link 
          to="/gallery"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
        >
          <svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          갤러리 목록으로 돌아가기
        </Link>
      </nav>

      {/* 갤러리 내용 */}
      <article className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
              갤러리
            </span>
            <time className="text-sm text-gray-500">
              {new Date().toLocaleDateString('ko-KR')}
            </time>
          </div>
        </div>
        
        <div className="p-6">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-table:text-sm">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </article>

      {/* 하단 네비게이션 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link 
            to="/gallery"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            목록으로
          </Link>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            맨 위로
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* 관련 갤러리 추천 */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">다른 갤러리 보기</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link 
            to="/gallery/spring-exhibition-2024"
            className="block p-4 bg-white rounded-md hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-gray-800">2024년 봄 전시회</h4>
            <p className="text-sm text-gray-600 mt-1">새로운 시작, 봄의 이야기</p>
          </Link>
          <Link 
            to="/gallery/summer-workshop-2024"
            className="block p-4 bg-white rounded-md hover:shadow-md transition-shadow"
          >
            <h4 className="font-medium text-gray-800">여름 워크숍 작품전</h4>
            <p className="text-sm text-gray-600 mt-1">창작의 열정, 여름 워크숍 결과전</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GalleryDetail
