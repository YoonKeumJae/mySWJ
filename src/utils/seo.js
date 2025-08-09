// SEO 최적화를 위한 유틸리티 함수들

export const updatePageSEO = (title, description, keywords, url = '') => {
  // Title 업데이트
  document.title = title;
  
  // Meta description 업데이트
  updateMetaTag('name', 'description', description);
  updateMetaTag('name', 'keywords', keywords);
  
  // Open Graph 태그 업데이트
  updateMetaTag('property', 'og:title', title);
  updateMetaTag('property', 'og:description', description);
  updateMetaTag('property', 'og:url', `https://sowoojoo.org${url}`);
  
  // Twitter Card 태그 업데이트
  updateMetaTag('name', 'twitter:title', title);
  updateMetaTag('name', 'twitter:description', description);
  
  // Canonical URL 설정
  updateCanonicalUrl(`https://sowoojoo.org${url}`);
};

const updateMetaTag = (attribute, name, content) => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    element.setAttribute('content', content);
    document.getElementsByTagName('head')[0].appendChild(element);
  }
};

const updateCanonicalUrl = (url) => {
  let element = document.querySelector('link[rel="canonical"]');
  if (element) {
    element.setAttribute('href', url);
  } else {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', url);
    document.getElementsByTagName('head')[0].appendChild(element);
  }
};

// 페이지별 SEO 데이터
export const seoData = {
  home: {
    title: '소우주 성문화 인권센터 - 성평등과 인권을 위한 전문기관',
    description: '소우주 성문화 인권센터는 성평등과 인권 증진을 위한 전문기관입니다. 성교육, 상담, 연구 활동을 통해 건강한 성문화를 만들어 갑니다.',
    keywords: '소우주, 소우주 성문화 인권센터, 성교육, 성평등, 인권, 성문화, 상담'
  },
  about: {
    title: '소우주 소개 - 소우주 성문화 인권센터',
    description: '소우주 성문화 인권센터의 설립 목적, 비전, 미션을 소개합니다. 성평등과 인권을 위한 우리의 활동을 알아보세요.',
    keywords: '소우주 소개, 성문화 인권센터, 설립목적, 비전, 미션'
  },
  aboutInfo: {
    title: '센터 소개 - 소우주 성문화 인권센터',
    description: '소우주는 성평등과 인권 증진을 위해 설립된 전문기관입니다. 우리의 미션과 비전을 확인해보세요.',
    keywords: '소우주 센터 소개, 성문화 인권센터, 미션, 비전, 전문기관'
  },
  aboutHistory: {
    title: '연혁 - 소우주 성문화 인권센터',
    description: '소우주 성문화 인권센터의 설립부터 현재까지의 주요 연혁과 발자취를 소개합니다.',
    keywords: '소우주 연혁, 성문화 인권센터 역사, 발자취, 주요 활동'
  },
  programs: {
    title: '프로그램 - 소우주 성문화 인권센터',
    description: '소우주에서 진행하는 다양한 성교육 프로그램을 만나보세요. 강의, 체험활동, 인형극 등 다채로운 교육 프로그램을 제공합니다.',
    keywords: '성교육 프로그램, 강의, 체험활동, 인형극, 워크샵, 교육'
  },
  programsLecture: {
    title: '강의 프로그램 - 소우주 성문화 인권센터',
    description: '소우주의 전문적인 성교육 강의 프로그램을 소개합니다. 체계적이고 과학적인 성교육을 제공합니다.',
    keywords: '성교육 강의, 프로그램, 교육과정, 전문 강의'
  },
  programsActivity: {
    title: '체험활동 프로그램 - 소우주 성문화 인권센터',
    description: '참여형 체험활동을 통한 성교육 프로그램입니다. 직접 참여하며 배우는 효과적인 교육을 경험하세요.',
    keywords: '체험활동, 참여형 교육, 성교육 활동, 워크샵'
  },
  programsPuppet: {
    title: '인형극 프로그램 - 소우주 성문화 인권센터',
    description: '어린이와 청소년을 위한 인형극을 통한 성교육 프로그램입니다. 재미있고 교육적인 내용으로 구성되어 있습니다.',
    keywords: '인형극, 어린이 성교육, 청소년 교육, 교육 인형극'
  },
  gallery: {
    title: '갤러리 - 소우주 성문화 인권센터',
    description: '소우주의 다양한 활동 모습과 전시회, 워크샵 현장을 갤러리에서 확인하세요.',
    keywords: '갤러리, 전시회, 워크샵, 활동사진, 전시'
  },
  notice: {
    title: '공지사항 - 소우주 성문화 인권센터',
    description: '소우주 성문화 인권센터의 최신 소식과 공지사항을 확인하세요.',
    keywords: '공지사항, 소식, 안내'
  },
  map: {
    title: '오시는 길 - 소우주 성문화 인권센터',
    description: '소우주 성문화 인권센터의 위치와 찾아오는 방법을 안내합니다.',
    keywords: '위치, 오시는 길, 주소, 교통편'
  }
};

// 구조화된 데이터 생성 함수
export const createStructuredData = (type, data) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };
  
  let script = document.querySelector('#structured-data');
  if (script) {
    script.innerHTML = JSON.stringify(structuredData);
  } else {
    script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(structuredData);
    document.getElementsByTagName('head')[0].appendChild(script);
  }
};
