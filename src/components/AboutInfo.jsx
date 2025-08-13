import { useState, useEffect } from 'react'
import Markdown from './Markdown'
import { getAssetUrl } from '../utils/assets'
import { updatePageSEO, seoData } from '../utils/seo'

const AboutInfo = () => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // SEO 설정
    updatePageSEO(
      seoData.aboutInfo.title,
      seoData.aboutInfo.description,
      seoData.aboutInfo.keywords,
      '/about/info'
    )

    const loadMarkdownFile = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(getAssetUrl('/markdown/about/info.md'))
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
        <Markdown>        
          {content}
        </Markdown>
      </div>
    </article>
  )
}

export default AboutInfo
