import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 마크다운 파일 목록을 생성하는 플러그인
const generateMarkdownFileList = () => {
  return {
    name: 'generate-markdown-file-list',
    buildStart() {
      // notice 폴더의 마크다운 파일 목록 생성
      const noticeDir = path.join(__dirname, 'public/markdown/notice')
      const galleryDir = path.join(__dirname, 'public/markdown/gallery')
      const publicDataDir = path.join(__dirname, 'public/data')
      
      try {
        // data 폴더가 없으면 생성
        if (!fs.existsSync(publicDataDir)) {
          fs.mkdirSync(publicDataDir, { recursive: true })
        }
        
        // notice 폴더의 .md 파일 목록 가져오기
        const noticeFiles = fs.readdirSync(noticeDir)
        const noticeMarkdownFiles = noticeFiles
          .filter(file => file.endsWith('.md'))
          .map(file => file.replace('.md', ''))
        
        // gallery 폴더의 .md 파일 목록 가져오기
        const galleryFiles = fs.readdirSync(galleryDir)
        const galleryMarkdownFiles = galleryFiles
          .filter(file => file.endsWith('.md'))
          .map(file => file.replace('.md', ''))
        
        // Notice 파일 목록 JSON 저장
        const noticeFileListData = {
          notices: noticeMarkdownFiles,
          generatedAt: new Date().toISOString()
        }
        
        fs.writeFileSync(
          path.join(publicDataDir, 'notice-files.json'),
          JSON.stringify(noticeFileListData, null, 2)
        )
        
        // Gallery 파일 목록 JSON 저장
        const galleryFileListData = {
          galleries: galleryMarkdownFiles,
          generatedAt: new Date().toISOString()
        }
        
        fs.writeFileSync(
          path.join(publicDataDir, 'gallery-files.json'),
          JSON.stringify(galleryFileListData, null, 2)
        )
        
        console.log('📝 Notice 파일 목록 생성:', noticeMarkdownFiles)
        console.log('🖼️ Gallery 파일 목록 생성:', galleryMarkdownFiles)
      } catch (error) {
        console.error('마크다운 파일 목록 생성 실패:', error)
      }
    }
  }
}

export default defineConfig({
  base: '/', // SEO를 위해 루트 경로로 변경
  plugins: [
    tailwindcss(),
    react(),
    generateMarkdownFileList()
  ],
  build: {
    // SEO 최적화를 위한 빌드 설정
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          utils: ['react-markdown']
        }
      }
    },
    // 소스맵 생성 (디버깅용)
    sourcemap: false,
    // 최적화
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
