// 환경에 따른 base URL 유틸리티
export const getAssetUrl = (path) => {
  const base = import.meta.env.BASE_URL || '/'
  // path가 이미 /로 시작하면 base와 결합
  if (path.startsWith('/')) {
    return base === '/' ? path : base + path.slice(1)
  }
  return base + path
}
