import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

const MarkdownRenderer = () => {
  const { slug } = useParams()
  const location = useLocation()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadMarkdownFile = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // 경로에 따라 다른 마크다운 파일 로드
        let filePath
        if (location.pathname === '/about') {
          filePath = '/markdown/about.md'
        } else if (slug) {
          filePath = `/markdown/posts/${slug}.md`
        }
        
        const response = await fetch(filePath)
        if (!response.ok) {
          throw new Error('마크다운 파일을 찾을 수 없습니다.')
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
  }, [slug, location.pathname])

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
        <button 
          onClick={() => window.history.back()}
          className="text-blue-600 hover:underline"
        >
          뒤로 가기
        </button>
      </div>
    )
  }

  return (
    <article className="max-w-4xl mx-auto">
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </article>
  )
}

export default MarkdownRenderer
