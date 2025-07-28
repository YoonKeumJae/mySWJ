import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAssetUrl } from '../utils/assets'

const Gallery = () => {
  const [galleries, setGalleries] = useState([])
  const [frontMatters, setFrontMatters] = useState([]) // 프론트매터 상태 관리
  const [loading, setLoading] = useState(true)

  // Front Matter를 파싱하는 함수
  const parseFrontMatter = (content) => {
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
    const match = content.match(frontMatterRegex)
    
    if (!match) {
      return { frontMatter: {}, content }
    }
    
    const [, yamlContent, markdownContent] = match
    const frontMatter = {}
    
    // 간단한 YAML 파싱 (key: "value" 형태)
    yamlContent.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':')
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim()
        const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '')
        frontMatter[key] = value
      }
    })
    
    return { frontMatter, content: markdownContent }
  }

  useEffect(() => {
    const loadGalleries = async () => {
      try {
        setLoading(true)
        
        // 빌드 시 생성된 갤러리 파일 목록 가져오기
        let galleryFiles = []
        
        try {
          const fileListResponse = await fetch(getAssetUrl('/data/gallery-files.json'))
          if (fileListResponse.ok) {
            const fileListData = await fileListResponse.json()
            galleryFiles = fileListData.galleries || []
            console.log('🖼️ 빌드 시 생성된 갤러리 파일 목록:', galleryFiles)
          } else {
            throw new Error('갤러리 파일 목록을 불러올 수 없습니다.')
          }
        } catch (error) {
          // 빌드 시 생성된 파일이 없으면 기본 목록 사용
          console.warn('빌드된 갤러리 파일 목록이 없어 기본 목록 사용:', error.message)
          galleryFiles = [
            'spring-exhibition-2024',
            'summer-workshop-2024',
            'youth-art-contest-2024'
          ]
        }
        
        // 각 파일에서 프론트매터 추출
        const frontMatterList = []
        const galleryList = []
        
        for (const fileName of galleryFiles) {
          try {
            const response = await fetch(getAssetUrl(`/markdown/gallery/${fileName}.md`))
            if (!response.ok) {
              console.warn(`갤러리 파일을 불러올 수 없습니다: ${fileName}`)
              continue
            }
            
            const content = await response.text()
            const { frontMatter } = parseFrontMatter(content)
            
            // 프론트매터 리스트에 추가
            frontMatterList.push({
              fileName,
              ...frontMatter
            })
            
            // 갤러리 리스트 생성
            const gallery = {
              slug: fileName,
              title: frontMatter.title || '제목 없음',
              excerpt: frontMatter.excerpt || '내용이 없습니다.',
              date: frontMatter.date || '날짜 없음',
              endDate: frontMatter.endDate || frontMatter.date || '날짜 없음',
              category: frontMatter.category || '일반',
              visitors: frontMatter.visitors || '방문자 정보 없음',
              image: frontMatter.image || '/images/gallery/default-thumb.jpg'
            }
            
            galleryList.push(gallery)
          } catch (err) {
            console.error(`갤러리 파일 로딩 실패: ${fileName}`, err)
          }
        }
        
        // 프론트매터 상태 업데이트
        setFrontMatters(frontMatterList)
        
        // 날짜순으로 정렬하여 갤러리 상태 업데이트
        const sortedGalleries = galleryList.sort((a, b) => new Date(b.date) - new Date(a.date))
        setGalleries(sortedGalleries)
        
      } catch (err) {
        console.error('갤러리 로딩 실패:', err)
        setGalleries([])
        setFrontMatters([])
      } finally {
        setLoading(false)
      }
    }

    loadGalleries()
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
    </div>
  )
}

export default Gallery
