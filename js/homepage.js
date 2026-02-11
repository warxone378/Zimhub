// ZIMHUB - Homepage JavaScript
// Day 2: Homepage animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== TYPING TEXT ANIMATION =====
    const typingText = document.querySelector('.typing-text');
    const phrases = [
        'news and updates',
        'sports highlights', 
        'job opportunities',
        'scholarship programs',
        'business insights',
        'Zimbabwean content'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    
    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isEnd = true;
            isDeleting = true;
            setTimeout(typeWriter, 2000); // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex++;
            if (phraseIndex === phrases.length) phraseIndex = 0;
            setTimeout(typeWriter, 500); // Pause before next phrase
        } else {
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeWriter, speed);
        }
    }
    
    if (typingText) {
        setTimeout(typeWriter, 1000);
    }
    
    // ===== TRENDING TABS =====
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
            
            // Load trending content for this tab
            loadTrendingContent(tabId);
        });
    });
    
    // ===== LOAD TRENDING CONTENT =====
    function loadTrendingContent(category) {
        const containers = {
            'news': document.querySelector('#news-tab .trending-grid'),
            'jobs': document.querySelector('#jobs-tab .trending-grid'),
            'sports': document.querySelector('#sports-tab .trending-grid')
        };
        
        const container = containers[category];
        if (!container) return;
        
        // Clear loading spinner
        container.innerHTML = '';
        
        // Sample data (will be replaced with real data later)
        const sampleData = {
            'news': [
                {title: 'New Economic Policies Announced', category: 'Politics', time: '2 hours ago'},
                {title: 'Tech Hub Opening in Harare', category: 'Technology', time: '5 hours ago'},
                {title: 'Education Reforms Discussion', category: 'Education', time: '1 day ago'}
            ],
            'jobs': [
                {title: 'Software Developer - Remote', company: 'TechCorp ZW', location: 'Harare'},
                {title: 'Marketing Manager', company: 'Growth Ltd', location: 'Bulawayo'},
                {title: 'Finance Analyst', company: 'Bank of ZW', location: 'Harare'}
            ],
            'sports': [
                {title: 'Warriors Qualify for AFCON', sport: 'Football', time: 'Yesterday'},
                {title: 'Cricket Team Wins Series', sport: 'Cricket', time: '2 days ago'},
                {title: 'Local Boxer Wins Title', sport: 'Boxing', time: '3 days ago'}
            ]
        };
        
        const data = sampleData[category] || [];
        
        // Create trending items
        data.forEach((item, index) => {
            const trendingItem = document.createElement('div');
            trendingItem.className = 'trending-item hover-lift animate-fade-up';
            trendingItem.style.animationDelay = `${index * 0.1}s`;
            
            if (category === 'news') {
                trendingItem.innerHTML = `
                    <div class="trending-badge news-bg">News</div>
                    <h4>${item.title}</h4>
                    <div class="trending-meta">
                        <span><i class="fas fa-tag"></i> ${item.category}</span>
                        <span><i class="fas fa-clock"></i> ${item.time}</span>
                    </div>
                    <button class="btn-read">Read More <i class="fas fa-arrow-right"></i></button>
                `;
            } else if (category === 'jobs') {
                trendingItem.innerHTML = `
                    <div class="trending-badge jobs-bg">Job</div>
                    <h4>${item.title}</h4>
                    <div class="trending-meta">
                        <span><i class="fas fa-building"></i> ${item.company}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${item.location}</span>
                    </div>
                    <button class="btn-apply">Apply Now <i class="fas fa-paper-plane"></i></button>
                `;
            } else if (category === 'sports') {
                trendingItem.innerHTML = `
                    <div class="trending-badge sports-bg">Sports</div>
                    <h4>${item.title}</h4>
                    <div class="trending-meta">
                        <span><i class="fas fa-baseball-bat-ball"></i> ${item.sport}</span>
                        <span><i class="fas fa-calendar"></i> ${item.time}</span>
                    </div>
                    <button class="btn-view">View Details <i class="fas fa-external-link-alt"></i></button>
                `;
            }
            
            container.appendChild(trendingItem);
        });
        
        // Add trending item styles dynamically
        if (!document.querySelector('#trending-styles')) {
            const style = document.createElement('style');
            style.id = 'trending-styles';
            style.textContent = `
                .trending-item {
                    background: var(--onyx);
                    padding: 25px;
                    border-radius: 12px;
                    border: 1px solid var(--medium-gray);
                    position: relative;
                }
                
                .trending-badge {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    padding: 5px 15px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: var(--onyx-dark);
                }
                
                .trending-item h4 {
                    margin: 10px 0 15px;
                    font-size: 1.2rem;
                    color: var(--pure-white);
                }
                
                .trending-meta {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                    font-size: 0.9rem;
                    color: var(--accent-teal);
                }
                
                .btn-read, .btn-apply, .btn-view {
                    width: 100%;
                    padding: 12px;
                    background: var(--accent-teal);
                    color: var(--onyx-dark);
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: all 0.3s;
                }
                
                .btn-read:hover, .btn-apply:hover, .btn-view:hover {
                    background: var(--accent-orange);
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Load initial trending content
    loadTrendingContent('news');
    
    // ===== BACK TO TOP BUTTON =====
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== DAY COUNTER =====
    const startDate = new Date('2025-02-08'); // Adjust to your actual start date
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const dayCounter = document.getElementById('currentDay');
    if (dayCounter) {
        dayCounter.textContent = Math.min(diffDays, 7); // Cap at 7 days
    }
    
    // ===== CONTACT BUTTON =====
    const contactBtn = document.querySelector('.btn-contact');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            alert('Contact feature will be implemented in Day 3!\nEmail: th7media@example.com\nPhone: +263 XXX XXX XXX');
        });
    }
    
    // ===== ANIMATE ON SCROLL ENHANCEMENT =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationType = entry.target.dataset.animation || 'fadeInUp';
                const delay = entry.target.dataset.delay || '0';
                
                entry.target.style.animation = `${animationType} 0.8s ease-out ${delay}s forwards`;
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe elements with data-animation attribute
    document.querySelectorAll('[data-animation]').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    console.log('ZIMHUB Homepage loaded successfully! Day 2 complete.');
});