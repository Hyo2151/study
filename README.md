# 개발자 포트폴리오 웹사이트

현대적이고 반응형인 개발자 포트폴리오 웹사이트입니다. 깔끔한 디자인과 인터랙티브한 애니메이션으로 개발자의 역량을 효과적으로 어필할 수 있습니다.

## 🌟 주요 기능

### 📱 반응형 디자인
- 모바일, 태블릿, 데스크톱 모든 기기에서 최적화된 화면 제공
- 햄버거 메뉴를 통한 모바일 네비게이션

### 🎨 현대적인 UI/UX
- 그라디언트 배경과 글래스모피즘 효과
- 부드러운 애니메이션과 호버 효과
- 시각적으로 매력적인 카드 레이아웃

### ⚡ 인터랙티브 요소
- 스무스 스크롤링
- 스킬바 프로그레스 애니메이션
- 카운터 애니메이션
- 타이핑 효과
- 버튼 리플 효과

### 📝 섹션별 구성
- **홈**: 개발자 소개 및 프로필 카드
- **소개**: 상세한 자기소개 및 통계 정보
- **기술스택**: 시각적인 스킬 레벨 표시
- **경력**: 타임라인 형태의 경력 사항
- **프로젝트**: 주요 프로젝트 포트폴리오
- **연락처**: 연락처 정보 및 문의 폼

## 🛠️ 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: 
  - Flexbox & Grid 레이아웃
  - CSS 애니메이션 & 트랜지션
  - 반응형 미디어 쿼리
  - 그라디언트 & 백드롭 필터
- **JavaScript (ES6+)**:
  - DOM 조작
  - Intersection Observer API
  - 이벤트 리스너
  - 로컬 스토리지

## 🚀 시작하기

### 1. 파일 다운로드
```bash
# 저장소 클론 또는 파일 다운로드
git clone [repository-url]
```

### 2. 브라우저에서 실행
```bash
# index.html 파일을 브라우저에서 열기
open index.html
```

### 3. 라이브 서버 실행 (권장)
```bash
# VS Code Live Server 확장 프로그램 사용
# 또는 Python 간이 서버
python -m http.server 8000
```

## 📁 파일 구조

```
portfolio-website/
│
├── index.html          # 메인 HTML 파일
├── styles.css          # CSS 스타일시트
├── script.js           # JavaScript 파일
└── README.md           # 프로젝트 설명서
```

## ⚙️ 커스터마이징 가이드

### 개인 정보 수정
1. `index.html`에서 다음 정보를 수정하세요:
   - 이름 및 직책
   - 자기소개 내용
   - 연락처 정보
   - 소셜 미디어 링크

### 기술 스택 수정
```html
<!-- skills 섹션에서 기술 추가/수정 -->
<div class="skill-item">
    <i class="fab fa-react"></i>
    <span>React</span>
    <div class="skill-level">
        <div class="skill-bar" data-level="80"></div>
    </div>
</div>
```

### 색상 테마 변경
`styles.css`에서 주요 색상 변수를 수정하세요:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #fbbf24;
    --background-color: #f9fafb;
    --text-color: #1f2937;
}
```

### 프로젝트 추가
```html
<!-- projects 섹션에 새 프로젝트 카드 추가 -->
<div class="project-card">
    <div class="project-image">
        <i class="fas fa-project-icon"></i>
    </div>
    <div class="project-content">
        <h3>프로젝트 제목</h3>
        <p>프로젝트 설명...</p>
        <!-- 기술 태그 및 링크 추가 -->
    </div>
</div>
```

## 🎯 주요 특징

### 성능 최적화
- 최소한의 외부 의존성
- 효율적인 CSS 애니메이션
- 이미지 없이 아이콘 기반 디자인

### 접근성
- 시맨틱 HTML 구조
- 키보드 네비게이션 지원
- 고대비 색상 조합

### SEO 친화적
- 메타 태그 최적화
- 구조화된 데이터
- 빠른 로딩 속도

## 📱 반응형 브레이크포인트

- **모바일**: 768px 이하
- **태블릿**: 769px - 1024px
- **데스크톱**: 1025px 이상

## 🌐 브라우저 지원

- Chrome (최신 2개 버전)
- Firefox (최신 2개 버전)
- Safari (최신 2개 버전)
- Edge (최신 2개 버전)

## 📞 연락처 폼 설정

현재 연락처 폼은 클라이언트 사이드 유효성 검사만 포함되어 있습니다. 실제 이메일 전송을 위해서는:

1. **EmailJS 사용** (권장):
```javascript
// EmailJS 라이브러리 추가 후
emailjs.send('service_id', 'template_id', formData)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
    });
```

2. **백엔드 서버 연동**:
   - Node.js + Express
   - PHP 메일 스크립트
   - Netlify Forms

## 🚀 배포 방법

### GitHub Pages
1. GitHub 저장소에 코드 업로드
2. Settings → Pages에서 소스 선택
3. 자동 배포 완료

### Netlify
1. 프로젝트 폴더를 Netlify에 드래그 앤 드롭
2. 자동 배포 및 도메인 제공

### Vercel
```bash
npm i -g vercel
vercel --prod
```

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자유롭게 사용하고 수정하실 수 있습니다.

## 🙏 기여하기

포트폴리오 웹사이트 개선을 위한 제안이나 버그 리포트는 언제든 환영합니다!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Happy Coding! 🚀**

*이 포트폴리오 템플릿으로 당신의 개발자 여정을 멋지게 어필해보세요!* 