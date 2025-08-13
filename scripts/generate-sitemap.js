#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 사이트맵 생성 함수
function generateSitemap() {
  const baseUrl = 'https://sowoojoo.org'
  const currentDate = new Date().toISOString().split('T')[0]
  
  // 기본 페이지들
  const staticPages = [
    { url: '/', changefreq: 'weekly', priority: '1.0' },
    { url: '/about', changefreq: 'monthly', priority: '0.8' },
    { url: '/about/info', changefreq: 'monthly', priority: '0.7' },
    { url: '/about/history', changefreq: 'yearly', priority: '0.6' },
    { url: '/programs', changefreq: 'monthly', priority: '0.9' },
    { url: '/programs/lecture', changefreq: 'monthly', priority: '0.8' },
    { url: '/programs/activity', changefreq: 'monthly', priority: '0.8' },
    { url: '/programs/puppet', changefreq: 'monthly', priority: '0.8' },
    { url: '/gallery', changefreq: 'weekly', priority: '0.7' },
    { url: '/notice', changefreq: 'weekly', priority: '0.6' },
    { url: '/map', changefreq: 'yearly', priority: '0.5' }
  ]

  // 갤러리 페이지들 추가
  const galleryDir = path.join(__dirname, '..', 'public', 'markdown', 'gallery')
  let galleryPages = []
  
  try {
    if (fs.existsSync(galleryDir)) {
      const files = fs.readdirSync(galleryDir)
      galleryPages = files
        .filter(file => file.endsWith('.md'))
        .map(file => ({
          url: `/gallery/${file.replace('.md', '')}`,
          changefreq: 'monthly',
          priority: '0.6'
        }))
    }
  } catch (error) {
    console.warn('갤러리 페이지 스캔 실패:', error.message)
  }

  // 공지사항 페이지들 추가
  const noticeDir = path.join(__dirname, '..', 'public', 'markdown', 'notice')
  let noticePages = []
  
  try {
    if (fs.existsSync(noticeDir)) {
      const files = fs.readdirSync(noticeDir)
      noticePages = files
        .filter(file => file.endsWith('.md'))
        .map(file => ({
          url: `/notice/${file.replace('.md', '')}`,
          changefreq: 'monthly',
          priority: '0.5'
        }))
    }
  } catch (error) {
    console.warn('공지사항 페이지 스캔 실패:', error.message)
  }

  // 모든 페이지 합치기
  const allPages = [...staticPages, ...galleryPages, ...noticePages]

  // XML 생성
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  allPages.forEach(page => {
    sitemap += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
  })

  sitemap += `</urlset>`

  // 파일 저장
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml')
  fs.writeFileSync(sitemapPath, sitemap)
  
  console.log(`✅ 사이트맵 생성 완료: ${allPages.length}개 페이지`)
  console.log(`📄 저장 위치: ${sitemapPath}`)
}

// 스크립트 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap()
}

export { generateSitemap }
