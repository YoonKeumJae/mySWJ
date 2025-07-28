# 소우주 성문화인권센터 웹사이트

React + Vite로 구축된 소우주 성문화인권센터의 공식 웹사이트입니다.

## 🚀 배포

이 프로젝트는 GitHub Pages를 통해 자동 배포됩니다.
- **배포 URL**: https://yoonkeumjae.github.io/mySWJ/
- **자동 배포**: main 브랜치에 push할 때마다 자동으로 배포됩니다.

## 🔧 환경 설정

### GitHub Secrets 설정

GitHub Pages 배포를 위해 다음 Secrets을 GitHub 저장소 설정에서 추가해야 합니다:

1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. 다음 Secrets 추가:
   - `VITE_GOOGLE_MAPS_API_KEY`: Google Maps API 키
   - `VITE_GOOGLE_MAPS_MAP_ID`: Google Maps 맵 ID

### 로컬 개발 환경

1. 저장소 클론:
```bash
git clone https://github.com/YoonKeumJae/mySWJ.git
cd mySWJ
```

2. 의존성 설치:
```bash
npm install
```

3. 환경 변수 설정:
```bash
cp .env.example .env
# .env 파일을 편집하여 실제 API 키 입력
```

4. 개발 서버 실행:
```bash
npm run dev
```

## 📁 프로젝트 구조

```
src/
├── components/         # React 컴포넌트
├── pages/             # 페이지 컴포넌트
public/
├── markdown/          # 마크다운 콘텐츠 파일
│   ├── about/         # 소개 페이지
│   ├── programs/      # 프로그램 페이지
│   ├── gallery/       # 갤러리 페이지
│   ├── notice/        # 공지사항 페이지
│   └── map/           # 찾아오는 길
└── data/              # 자동 생성되는 데이터 파일
```

## 🛠️ 기술 스택

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Maps**: Google Maps API
- **Markdown**: React Markdown
- **Deploy**: GitHub Pages + GitHub Actions

## 📝 콘텐츠 관리

### 새로운 공지사항 추가

1. `public/markdown/notice/` 폴더에 새 마크다운 파일 생성
2. Front Matter 형식으로 메타데이터 추가:
```yaml
---
title: "공지사항 제목"
date: "2024-07-28"
category: "카테고리"
excerpt: "짧은 설명"
---
```
3. 마크다운 내용 작성
4. 커밋 후 push하면 자동 배포

### 새로운 갤러리 추가

1. `public/markdown/gallery/` 폴더에 새 마크다운 파일 생성
2. Front Matter 형식으로 메타데이터 추가:
```yaml
---
title: "갤러리 제목"
date: "2024-07-28"
endDate: "2024-08-28"
category: "카테고리"
excerpt: "짧은 설명"
visitors: "방문자 수"
image: "/images/gallery/thumb.jpg"
---
```

## 🔄 자동화된 빌드 프로세스

프로젝트는 빌드 시 다음 작업을 자동으로 수행합니다:

1. **파일 목록 생성**: `public/markdown/` 폴더를 스캔하여 파일 목록 생성
2. **Front Matter 파싱**: 각 마크다운 파일의 메타데이터 추출
3. **동적 콘텐츠**: 새로운 파일이 추가되면 자동으로 웹사이트에 반영

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
