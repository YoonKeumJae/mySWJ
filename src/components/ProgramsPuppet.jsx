import { useState, useEffect } from 'react'
import Markdown from './Markdown'

const ProgramsPuppet = () => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadMarkdownFile = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/markdown/programs/puppet.md')
        if (!response.ok) {
          throw new Error('인형극 프로그램 페이지를 불러올 수 없습니다.')
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
    <article className="max-w-4xl mx-auto">
      <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-table:text-sm">
        <Markdown>{content}</Markdown>
      </div>
    </article>
  )
}

export default ProgramsPuppet
