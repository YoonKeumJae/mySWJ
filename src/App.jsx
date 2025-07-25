import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import AboutInfo from './components/AboutInfo'
import AboutHistory from './components/AboutHistory'
import ProgramsLecture from './components/ProgramsLecture'
import ProgramsActivity from './components/ProgramsActivity'
import ProgramsPuppet from './components/ProgramsPuppet'
import Gallery from './components/Gallery'
import GalleryDetail from './components/GalleryDetail'
import Notice from './components/Notice'
import NoticeDetail from './components/NoticeDetail'
import Map from './components/Map'
import Navigation from './components/Navigation'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* 홈 페이지 */}
          <Route path="/" element={<Home />} />
          
          {/* About 라우트 - /about는 /about/info로 리다이렉션 */}
          <Route path="/about" element={<Navigate to="/about/info" replace />} />
          <Route path="/about/info" element={<AboutInfo />} />
          <Route path="/about/history" element={<AboutHistory />} />
          
          {/* Programs 라우트 - /programs는 /programs/lecture로 리다이렉션 */}
          <Route path="/programs" element={<Navigate to="/programs/lecture" replace />} />
          <Route path="/programs/lecture" element={<ProgramsLecture />} />
          <Route path="/programs/activity" element={<ProgramsActivity />} />
          <Route path="/programs/puppet" element={<ProgramsPuppet />} />
          
          {/* 갤러리 라우트 */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:slug" element={<GalleryDetail />} />
          
          {/* 공지사항 라우트 */}
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice/:slug" element={<NoticeDetail />} />
          
          {/* 찾아오는 길 라우트 */}
          <Route path="/map" element={<Map />} />
          
          {/* 404 페이지 */}
          <Route path="*" element={
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                페이지를 찾을 수 없습니다
              </h1>
              <p className="text-gray-600 mb-6">
                요청하신 페이지가 존재하지 않습니다.
              </p>
              <Navigate to="/" replace />
            </div>
          } />
        </Routes>
      </main>
    </div>
  )
}

export default App;
