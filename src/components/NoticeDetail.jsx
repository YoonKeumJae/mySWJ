import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getAssetUrl } from '../utils/assets'

const NoticeDetail = () => {
  const { slug } = useParams()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadMarkdownFile = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(getAssetUrl(`/markdown/notice/${slug}.md`))
        if (!response.ok) {
          throw new Error('공지사항을 찾을 수 없습니다.')
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
        <div className="text-gray-600">공지사항을 불러오는 중...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <Link 
          to="/notice"
          className="text-blue-600 hover:underline"
        >
          공지사항 목록으로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 상단 네비게이션 */}
      <nav className="mb-6">
        <Link 
          to="/notice"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
        >
          <svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          공지사항 목록으로 돌아가기
        </Link>
      </nav>

      {/* 공지사항 내용 */}
      <article className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              공지사항
            </span>
            <time className="text-sm text-gray-500">
              {new Date().toLocaleDateString('ko-KR')}
            </time>
          </div>
        </div>
        
        <div className="p-6">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </article>

      {/* 하단 네비게이션 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link 
            to="/notice"
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
    </div>
  )
}

export default NoticeDetail
