// 환경에 따른 base URL 유틸리티
export const getAssetUrl = (path) => {
  const base = import.meta.env.BASE_URL || './'
  
  // path가 이미 /로 시작하면 적절히 처리
  if (path.startsWith('/')) {
    // base가 './'인 경우 (상대 경로)
    if (base === './') {
      return '.' + path
    }
    // base가 '/'인 경우 (절대 경로)
    if (base === '/') {
      return path
    }
    // base가 다른 값인 경우
    return base + path.slice(1)
  }
  
  // path가 /로 시작하지 않는 경우
  return base + path
}
