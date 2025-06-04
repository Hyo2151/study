// 전역 변수
let isLoading = false;
let mousePosition = { x: 0, y: 0 };

// DOM이 로드되면 실행
document.addEventListener('DOMContentLoaded', function() {
    // 초기 설정
    initializeTheme();
    initializeAnimations();
    initializeInteractions();
    initializeScrollEffects();
    
    // 페이지 로딩 애니메이션
    setTimeout(() => {
        document.body.classList.add('loaded');
        startTypeWriter();
    }, 500);

    // 파티클 애니메이션 생성
    createParticleAnimation();
    
    // 3D 틸트 효과 초기화
    initTiltEffect();
    
    // 커서 따라다니는 글로우 효과
    createCursorGlow();

    // 모바일 네비게이션 토글
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 네비게이션 링크 클릭 시 모바일 메뉴 닫기
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 스크롤 시 네비게이션 배경 변경
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 15, 35, 0.98)';
            navbar.style.boxShadow = '0 4px 32px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.9)';
            navbar.style.boxShadow = '0 4px 32px rgba(0, 0, 0, 0.3)';
        }
    });

    // 스무스 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 스크롤 시 패럴랙스 효과
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image');
        
        parallaxElements.forEach(element => {
            const speed = 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // 파티클 움직임
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const speed = 0.1 + (index * 0.02);
            particle.style.transform = `translateY(${-scrolled * speed}px)`;
        });
    });

    // 버튼 클릭 효과
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });

    // 스크롤 탑 버튼
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.classList.add('scroll-top-btn');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #64ffda, #4fc3f7);
        color: #0a0a0a;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s ease;
        z-index: 1000;
        box-shadow: 0 8px 25px rgba(100, 255, 218, 0.4);
        backdrop-filter: blur(10px);
        transform-style: preserve-3d;
    `;

    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
        this.style.boxShadow = '0 15px 35px rgba(100, 255, 218, 0.6)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 8px 25px rgba(100, 255, 218, 0.4)';
    });

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
});

// 파티클 애니메이션 함수
function createParticleAnimation() {
    const particlesContainer = document.querySelector('.particles-container');
    
    // 추가 파티클 생성
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 5 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// 3D 틸트 효과 함수
function initTiltEffect() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transition = 'transform 0.1s ease-out';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            this.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(20px)
                scale3d(1.05, 1.05, 1.05)
            `;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.5s ease-out';
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
        });
    });
}

// 커서 글로우 효과
function createCursorGlow() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(100, 255, 218, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        mix-blend-mode: screen;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // 링크나 버튼에 호버할 때 커서 확대
    document.querySelectorAll('a, button, .btn').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(3)';
            cursor.style.background = 'radial-gradient(circle, rgba(100, 255, 218, 0.3) 0%, transparent 70%)';
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, rgba(100, 255, 218, 0.8) 0%, transparent 70%)';
        });
    });
}

// 알림 메시지 함수
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
        color: white;
        border-radius: 15px;
        backdrop-filter: blur(10px);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.4s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        border: 1px solid ${type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 애니메이션으로 나타나기
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 3초 후 사라지기
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 400);
    }, 3000);
}

// 리플 효과를 위한 CSS 추가
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.8s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: #64ffda !important;
        text-shadow: 0 0 10px rgba(100, 255, 218, 0.5);
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }

    .cursor-glow {
        transition: all 0.3s ease;
    }

    /* 호버 상태에서 글로우 효과 */
    .tilt-card:hover {
        box-shadow: 
            0 25px 50px rgba(100, 255, 218, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            0 0 50px rgba(100, 255, 218, 0.1);
    }

    /* 스크롤바 커스터마이징 */
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: rgba(15, 15, 35, 0.5);
    }

    ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #64ffda, #4fc3f7);
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #4fc3f7, #8a2be2);
    }

    /* 선택 텍스트 스타일 */
    ::selection {
        background: rgba(100, 255, 218, 0.3);
        color: #ffffff;
    }

    ::-moz-selection {
        background: rgba(100, 255, 218, 0.3);
        color: #ffffff;
    }
`;

document.head.appendChild(rippleStyle);

// 테마 시스템 초기화
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // 초기 테마 설정
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initialTheme);
    
    // 테마 토글 이벤트
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // 시스템 테마 변경 감지
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

// 테마 토글 함수
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // 토글 애니메이션
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.style.transform = 'scale(0.8)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);
    
    // 네비게이션 테마 업데이트
    updateNavbarTheme();
}

// 네비게이션 테마 업데이트 함수
function updateNavbarTheme() {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const currentScrollY = window.scrollY;
    
    if (navbar) {
        if (currentScrollY > 100) {
            // 스크롤된 상태
            if (currentTheme === 'light') {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                navbar.style.boxShadow = '0 4px 32px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.backgroundColor = 'rgba(15, 15, 35, 0.95)';
                navbar.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                navbar.style.boxShadow = '0 4px 32px rgba(0, 0, 0, 0.5)';
            }
        } else {
            // 최상단
            if (currentTheme === 'light') {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                navbar.style.boxShadow = '0 4px 32px rgba(0, 0, 0, 0.05)';
            } else {
                navbar.style.backgroundColor = 'rgba(15, 15, 35, 0.8)';
                navbar.style.boxShadow = '0 4px 32px rgba(0, 0, 0, 0.3)';
            }
        }
    }
}

// 애니메이션 시스템 초기화
function initializeAnimations() {
    // 커서 글로우 효과
    initCursorGlow();
    
    // 플로팅 요소들
    initFloatingElements();
    
    // Intersection Observer로 스크롤 애니메이션
    initScrollAnimations();
    
    // 페럴렉스 효과
    initParallaxEffects();
}

// 플로팅 요소들 초기화
function initFloatingElements() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        // 랜덤한 시작 위치와 애니메이션 설정
        const size = Math.random() * 60 + 20;
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + size;
        const duration = Math.random() * 10 + 15;
        
        shape.style.width = size + 'px';
        shape.style.height = size + 'px';
        shape.style.left = x + 'px';
        shape.style.top = y + 'px';
        shape.style.animationDuration = duration + 's';
        shape.style.animationDelay = Math.random() * 5 + 's';
    });
}

// 스크롤 애니메이션 초기화
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // 카운터 애니메이션
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                
                // 프로그레스 바 애니메이션
                if (entry.target.classList.contains('skill-bar')) {
                    animateProgressBar(entry.target);
                }
                
                // 스킬 섹션 애니메이션
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들 관찰
    document.querySelectorAll('.hero-content > *, .profile-card, .section-header, .animate-on-scroll, .about-card, .skill-item, .timeline-item, .project-card, .skills, .stat-number').forEach(el => {
        observer.observe(el);
    });
}

// 카운터 애니메이션
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 이징 함수 (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeOut);
        
        element.textContent = current + '+';
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// 프로그레스 바 애니메이션 (개별)
function animateProgressBar(element) {
    const level = element.getAttribute('data-level');
    if (level) {
        setTimeout(() => {
            element.style.width = level + '%';
        }, 300);
    }
}

// 스킬바 전체 애니메이션
function animateSkillBars(skillsSection) {
    const skillBars = skillsSection.querySelectorAll('.skill-bar');
    
    skillBars.forEach((bar, index) => {
        const level = bar.getAttribute('data-level');
        if (level) {
            setTimeout(() => {
                bar.style.width = level + '%';
            }, index * 200 + 500); // 순차적으로 애니메이션
        }
    });
}

// 인터랙션 초기화
function initializeInteractions() {
    // 네비게이션
    initNavigation();
    
    // 폼 처리
    initForms();
    
    // 카드 3D 효과
    init3DCards();
    
    // 소셜 링크 효과
    initSocialLinks();
}

// 네비게이션 초기화
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 햄버거 메뉴 토글
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // 네비게이션 링크 클릭
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 부드러운 스크롤
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 모바일 메뉴 닫기
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
                
                // 액티브 링크 표시
                updateActiveNavLink(link);
            }
        });
    });
    
    // 스크롤 시 네비게이션 스타일 변경
    let lastScrollY = 0;
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const currentScrollY = window.scrollY;
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (navbar) {
            if (currentScrollY > 100) {
                navbar.style.transform = 'translateX(-50%) translateY(0)';
                // 테마에 따른 배경색 설정
                if (currentTheme === 'light') {
                    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                    navbar.style.boxShadow = '0 4px 32px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.style.backgroundColor = 'rgba(15, 15, 35, 0.95)';
                    navbar.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    navbar.style.boxShadow = '0 4px 32px rgba(0, 0, 0, 0.5)';
                }
            } else {
                // 테마에 따른 투명 배경
                if (currentTheme === 'light') {
                    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                    navbar.style.boxShadow = '0 4px 32px rgba(0, 0, 0, 0.05)';
                } else {
                    navbar.style.backgroundColor = 'rgba(15, 15, 35, 0.8)';
                    navbar.style.boxShadow = '0 4px 32px rgba(0, 0, 0, 0.3)';
                }
            }
            
            // 스크롤 방향에 따른 네비게이션 숨김/표시
            if (currentScrollY > lastScrollY && currentScrollY > 300) {
                navbar.style.transform = 'translateX(-50%) translateY(-100%)';
            } else {
                navbar.style.transform = 'translateX(-50%) translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
        
        // 현재 섹션 하이라이트
        highlightCurrentSection();
    });
    
    // 초기 네비게이션 스타일 설정
    updateNavbarTheme();
}

// 현재 섹션 하이라이트
function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// 액티브 네비게이션 링크 업데이트
function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// 폼 초기화
function initForms() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // 입력 필드 애니메이션
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

// 폼 제출 처리
async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (isLoading) return;
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // 로딩 상태
    isLoading = true;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 전송 중...';
    
    try {
        // 유효성 검사
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        if (!name || !email || !message) {
            throw new Error('모든 필드를 입력해주세요.');
        }
        
        if (!isValidEmail(email)) {
            throw new Error('올바른 이메일 주소를 입력해주세요.');
        }
        
        // 시뮬레이션된 전송 (실제로는 백엔드 API 호출)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 성공 처리
        showNotification('메시지가 성공적으로 전송되었습니다! 빠른 시일 내에 답변드리겠습니다.', 'success');
        form.reset();
        
    } catch (error) {
        showNotification(error.message, 'error');
    } finally {
        isLoading = false;
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>메시지 보내기</span><i class="fas fa-paper-plane"></i>';
    }
}

// 이메일 유효성 검사
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 3D 카드 효과
function init3DCards() {
    const cards = document.querySelectorAll('.profile-card, .glass-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const rotateX = (e.clientY - centerY) / 10;
            const rotateY = (centerX - e.clientX) / 10;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(20px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// 소셜 링크 효과
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // 파티클 효과 생성
            createParticleEffect(link);
        });
    });
}

// 파티클 효과 생성
function createParticleEffect(element) {
    const particles = [];
    const particleCount = 6;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        const rect = element.getBoundingClientRect();
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        document.body.appendChild(particle);
        
        // 애니메이션
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 50;
        const endX = startX + Math.cos(angle) * distance;
        const endY = startY + Math.sin(angle) * distance;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)', 
                opacity: 1 
            },
            { 
                transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`, 
                opacity: 0 
            }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => {
            particle.remove();
        };
    }
}

// 스크롤 효과 초기화
function initializeScrollEffects() {
    // 스크롤 진행도 표시
    createScrollProgress();
    
    // 페럴렉스 효과
    window.addEventListener('scroll', handleScrollEffects);
}

// 스크롤 진행도 생성
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--accent-gradient);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(scrolled, 100) + '%';
    });
}

// 스크롤 효과 처리
function handleScrollEffects() {
    const scrollY = window.scrollY;
    
    // 플로팅 도형들 페럴렉스
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
    
    // 배경 그래디언트 효과
    const bgGradient = document.querySelector('.bg-gradient');
    if (bgGradient) {
        bgGradient.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
}

// 페럴렉스 효과 초기화
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// 타이핑 효과 시작
function startTypeWriter() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.classList.add('typing');
        
        let index = 0;
        function typeNext() {
            if (index < text.length) {
                subtitle.textContent += text[index];
                index++;
                setTimeout(typeNext, 100);
            } else {
                subtitle.classList.remove('typing');
                subtitle.classList.add('typing-complete');
            }
        }
        
        setTimeout(typeNext, 1000);
    }
}

// 성능 최적화: 리사이즈 이벤트 디바운싱
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // 리사이즈 후 재초기화가 필요한 경우
        initFloatingElements();
    }, 250);
});

// 페이지 언로드 시 정리
window.addEventListener('beforeunload', () => {
    // 이벤트 리스너 정리
    window.removeEventListener('scroll', handleScrollEffects);
    window.removeEventListener('mousemove', initCursorGlow);
});

// 디버그 모드 (개발용)
if (window.location.search.includes('debug=true')) {
    console.log('Debug mode activated');
    window.portfolioDebug = {
        mousePosition,
        toggleTheme,
        showNotification,
        createParticleEffect
    };
}

// 커서 글로우 효과
function initCursorGlow() {
    const cursorGlow = document.querySelector('.cursor-glow');
    
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            mousePosition.x = e.clientX;
            mousePosition.y = e.clientY;
            
            requestAnimationFrame(() => {
                cursorGlow.style.left = mousePosition.x - 150 + 'px';
                cursorGlow.style.top = mousePosition.y - 150 + 'px';
            });
        });
        
        // 호버 효과
        document.querySelectorAll('a, button, .interactive').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorGlow.style.transform = 'scale(1.5)';
                cursorGlow.style.opacity = '0.8';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorGlow.style.transform = 'scale(1)';
                cursorGlow.style.opacity = '0.6';
            });
        });
    }
}

// 알림 표시
function showNotification(message, type = 'info') {
    // 기존 알림 제거
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 새 알림 생성
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // 스타일 적용
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: 12px;
        padding: 1rem 1.5rem;
        backdrop-filter: var(--glass-backdrop);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        box-shadow: var(--glass-shadow);
        color: var(--text-primary);
    `;
    
    // DOM에 추가
    document.body.appendChild(notification);
    
    // 애니메이션
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // 닫기 버튼 이벤트
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // 자동 제거
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// 기존 파티클 애니메이션 함수 (하위 호환성을 위해 유지)
function createParticleAnimation() {
    // 이제 CSS와 HTML로 처리되므로 빈 함수로 유지
    console.log('Particle animation initialized via CSS');
}

// 기존 틸트 효과 함수 (하위 호환성을 위해 유지)
function initTiltEffect() {
    // 이제 init3DCards로 처리되므로 빈 함수로 유지
    console.log('Tilt effect initialized via init3DCards');
}

// 기존 커서 글로우 함수 (하위 호환성을 위해 유지)
function createCursorGlow() {
    // 이제 initCursorGlow로 처리되므로 빈 함수로 유지
    console.log('Cursor glow initialized via initCursorGlow');
} 