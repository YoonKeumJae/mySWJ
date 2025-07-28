import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAssetUrl } from '../utils/assets'

const Notice = () => {
  const [notices, setNotices] = useState([])
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
    const loadNotices = async () => {
      try {
        setLoading(true)
        
        // 빌드 시 생성된 파일 목록 가져오기
        let noticeFiles = []
        
        try {
          const fileListResponse = await fetch(getAssetUrl('/data/notice-files.json'))
          if (fileListResponse.ok) {
            const fileListData = await fileListResponse.json()
            noticeFiles = fileListData.notices || []
            console.log('📂 빌드 시 생성된 파일 목록:', noticeFiles)
          } else {
            throw new Error('파일 목록을 불러올 수 없습니다.')
          }
        } catch (error) {
          // 빌드 시 생성된 파일이 없으면 기본 목록 사용
          console.warn('빌드된 파일 목록이 없어 기본 목록 사용:', error.message)
          noticeFiles = [
            'system-maintenance',
            'new-features', 
            'privacy-policy'
          ]
        }
        
        // 각 파일에서 프론트매터 추출
        const frontMatterList = []
        const noticeList = []
        
        for (const fileName of noticeFiles) {
          try {
            const response = await fetch(getAssetUrl(`/markdown/notice/${fileName}.md`))
            if (!response.ok) {
              console.warn(`파일을 불러올 수 없습니다: ${fileName}`)
              continue
            }
            
            const content = await response.text()
            const { frontMatter } = parseFrontMatter(content)
            
            // 프론트매터 리스트에 추가
            frontMatterList.push({
              fileName,
              ...frontMatter
            })
            
            // 게시글 리스트 생성
            const notice = {
              slug: fileName,
              title: frontMatter.title || '제목 없음',
              excerpt: frontMatter.excerpt || '내용이 없습니다.',
              date: frontMatter.date || '날짜 없음',
              category: frontMatter.category || '일반'
            }
            
            noticeList.push(notice)
          } catch (err) {
            console.error(`파일 로딩 실패: ${fileName}`, err)
          }
        }
        
        // 프론트매터 상태 업데이트
        setFrontMatters(frontMatterList)
        
        // 날짜순으로 정렬하여 게시글 상태 업데이트
        const sortedNotices = noticeList.sort((a, b) => new Date(b.date) - new Date(a.date))
        setNotices(sortedNotices)
        
      } catch (err) {
        console.error('공지사항 로딩 실패:', err)
        setNotices([])
        setFrontMatters([])
      } finally {
        setLoading(false)
      }
    }

    loadNotices()
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
                  notice.category === '정책' ? 'bg-gray-100 text-gray-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {notice.category}
                </span>
                <time className="text-sm text-gray-500">
                  {new Date(notice.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit', 
                    day: '2-digit'
                  })}
                </time>
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
