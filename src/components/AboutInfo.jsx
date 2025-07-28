import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

const AboutInfo = () => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadMarkdownFile = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/markdown/about/info.md')
        if (!response.ok) {
          throw new Error('정보 페이지를 불러올 수 없습니다.')
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
    <article className="max-w-4xl mx-auto p-6">
      <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-8">
        <ReactMarkdown
          components={{
            h1: (props) => <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-8" {...props} />,
            h2: (props) => <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6" {...props} />,
            h3: (props) => <h3 className="text-xl font-medium text-gray-800 mb-3 mt-4" {...props} />,
            p: (props) => <p className="text-gray-600 mb-4 leading-relaxed" {...props} />,
            img: (props) => <img className="w-full h-auto my-6 rounded-lg shadow-md" {...props} />
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  )
}

export default AboutInfo
