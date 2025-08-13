// 배포 환경에서의 디버깅을 위한 유틸리티

export const debugInfo = {
  // 현재 환경 정보
  getEnvironmentInfo: () => ({
    baseUrl: import.meta.env.BASE_URL,
    mode: import.meta.env.MODE,
    dev: import.meta.env.DEV,
    prod: import.meta.env.PROD,
    currentUrl: window.location.href,
    userAgent: navigator.userAgent
  }),

  // 리소스 로딩 상태 체크
  checkResourceLoading: () => {
    const resources = performance.getEntriesByType('resource')
    const failed = resources.filter(resource => resource.duration === 0 || resource.transferSize === 0)
    
    return {
      totalResources: resources.length,
      failedResources: failed.length,
      failedUrls: failed.map(r => r.name)
    }
  },

  // 콘솔에 디버그 정보 출력
  logDebugInfo: () => {
    console.group('🔍 소우주 디버그 정보')
    console.log('환경 정보:', debugInfo.getEnvironmentInfo())
    console.log('리소스 로딩:', debugInfo.checkResourceLoading())
    console.groupEnd()
  }
}

// 배포 환경에서만 디버그 정보 출력
if (import.meta.env.PROD) {
  window.sowoojooDebug = debugInfo
  console.log('🚀 소우주 웹사이트 로드됨 - window.sowoojooDebug로 디버그 정보 확인 가능')
}
