# 🚀 소우주 웹사이트 배포 가이드

## 🔧 해결된 하얀 화면 문제

### 주요 변경사항
1. **상대 경로 설정**: `vite.config.js`에서 `base: './'`로 변경
2. **에러 바운더리 추가**: React 에러 처리 강화
3. **로딩 상태 표시**: 초기 로딩 화면 및 에러 메시지
4. **디버깅 기능**: 배포 환경에서의 문제 진단 도구
5. **MIME 타입 설정**: `.htaccess`에서 파일 타입 명시

## 📁 배포 파일 구조

```
dist/
├── index.html              # 메인 HTML (로딩 화면 포함)
├── .htaccess              # 서버 설정 (SPA 라우팅, MIME 타입)
├── assets/                # JS/CSS 파일들 (상대 경로)
│   ├── index-*.js         # 메인 JavaScript 번들
│   ├── vendor-*.js        # 외부 라이브러리
│   ├── utils-*.js         # 유틸리티 함수들
│   └── index-*.css        # 스타일시트
├── robots.txt             # SEO 크롤러 설정
├── sitemap.xml            # 사이트맵
└── 기타 리소스 파일들...
```

## 🌐 배포 방법

### 1. 일반 웹 호스팅 (Apache/Nginx)

```bash
# 1. dist 폴더 내용을 웹서버 루트에 업로드
rsync -av dist/ your-server:/var/www/html/

# 2. 웹서버가 .htaccess를 지원하는지 확인
# Apache의 경우: AllowOverride All 설정 필요
```

### 2. GitHub Pages

```bash
# 1. 빌드 후 dist 폴더를 gh-pages 브랜치에 푸시
npm run build
git subtree push --prefix dist origin gh-pages

# 또는 GitHub Actions 사용 (권장)
```

### 3. Netlify

```bash
# 1. Netlify에서 빌드 설정
Build command: npm run build
Publish directory: dist

# 2. _redirects 파일 생성 (SPA 라우팅용)
echo "/*    /index.html   200" > dist/_redirects
```

### 4. Vercel

```bash
# vercel.json 설정 파일 생성
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## 🔍 배포 후 확인 사항

### 1. 브라우저에서 확인
```javascript
// 브라우저 콘솔에서 실행
window.sowoojooDebug.logDebugInfo()
```

### 2. 네트워크 탭 확인
- 모든 JS/CSS 파일이 200 상태로 로드되는지 확인
- 404 에러가 있는지 확인

### 3. SEO 도구 테스트
- Google PageSpeed Insights
- Google Search Console URL 검사
- 소셜 미디어 미리보기 (Facebook, Twitter)

## ⚠️ 문제 해결

### 하얀 화면이 계속 나오는 경우

1. **브라우저 콘솔 확인**
   ```javascript
   // F12 → Console 탭에서 에러 메시지 확인
   ```

2. **네트워크 탭 확인**
   ```
   - Failed to load resource 에러가 있는지 확인
   - 파일 경로가 올바른지 확인
   ```

3. **서버 설정 확인**
   ```apache
   # .htaccess가 적용되지 않는 경우
   # 서버에서 직접 설정
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

### 라우팅이 작동하지 않는 경우

1. **서버 설정 확인**
   - SPA 라우팅을 위한 fallback 설정 필요
   - 모든 경로가 index.html로 리다이렉션되어야 함

2. **base URL 확인**
   ```javascript
   // vite.config.js에서 base 설정 확인
   base: './'  // 상대 경로 (권장)
   // 또는
   base: '/'   // 루트 도메인용
   ```

### 이미지/리소스가 로드되지 않는 경우

1. **경로 확인**
   ```javascript
   // src/utils/assets.js에서 getAssetUrl 함수 사용
   import { getAssetUrl } from '../utils/assets'
   const imagePath = getAssetUrl('/images/logo.png')
   ```

2. **MIME 타입 확인**
   ```apache
   # .htaccess에 MIME 타입 추가
   AddType image/webp .webp
   AddType image/svg+xml .svg
   ```

## 📞 지원

문제가 지속되는 경우:
1. 브라우저 콘솔의 전체 에러 로그 확인
2. 네트워크 탭의 실패한 요청 확인
3. 서버 로그 확인 (500 에러 등)

## 🎯 성능 최적화 팁

1. **CDN 사용**: 정적 파일들을 CDN에 호스팅
2. **캐싱 설정**: .htaccess의 캐싱 규칙 활용
3. **압축 설정**: Gzip 압축 활성화
4. **이미지 최적화**: WebP 형식 사용 권장
