import { useState, useEffect } from 'react'
import Markdown from './Markdown';
import {APIProvider, Map, AdvancedMarker, Pin} from '@vis.gl/react-google-maps';
import { getAssetUrl } from '../utils/assets'
import { updatePageSEO, seoData } from '../utils/seo'


const MapPage = () => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // SEO 설정
    updatePageSEO(
      seoData.map.title,
      seoData.map.description,
      seoData.map.keywords,
      '/map'
    )

    const loadMarkdownFile = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(getAssetUrl('/markdown/map/map.md'))
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

  const location = { lat: 35.846239, lng: 128.595696 };

  // 환경 변수에서 Google Maps 설정 가져오기
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const googleMapsMapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID

  if (!googleMapsApiKey) {
    console.error('Google Maps API 키가 설정되지 않았습니다. .env 파일을 확인하세요.')
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 bg-gray-200 rounded-lg h-96 flex items-center justify-center">
        <APIProvider apiKey={googleMapsApiKey} onLoad={() => console.log('Maps API has loaded.')}>
            <Map
                defaultZoom={13}
                defaultCenter={ location }
                mapId={googleMapsMapId}
                >
                <AdvancedMarker position={location}>
                    <Pin></Pin>
                </AdvancedMarker>
            </Map>
        </APIProvider>
      </div>

      {/* 마크다운 콘텐츠 */}
      <article className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-table:text-sm">
          <Markdown>{content}</Markdown>
        </div>
      </article>

      {/* 빠른 연락처 정보 */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <div className="text-3xl mb-3">📞</div>
          <h3 className="font-semibold text-gray-800 mb-2">전화 문의</h3>
          <p className="text-blue-600 font-medium">053-653-0057 </p>
          <p className="text-sm text-gray-600 mt-1">평일 09:00-18:00</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <div className="text-3xl mb-3">📧</div>
          <h3 className="font-semibold text-gray-800 mb-2">이메일</h3>
          <p className="text-green-600 font-medium">swjcenter@hanmail.net</p>
          <p className="text-sm text-gray-600 mt-1">24시간 접수</p>
        </div>
        
        
      </div>
    </div>
  )
}

export default MapPage;
