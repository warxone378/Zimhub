// News Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('News page loaded');
    
    // Category filter
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.category;
            loadNews(category);
        });
    });
    
    // Load more news
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreNews);
    }
    
    function loadNews(category) {
        const newsGrid = document.querySelector('.news-grid');
        newsGrid.innerHTML = '<div class="loading-spinner"></div>';
        
        setTimeout(() => {
            // Simulate loading news
            newsGrid.innerHTML = `
                <article class="news-item hover-lift fade-in-up">
                    <div class="news-image">
                        <div class="image-placeholder">
                            <i class="fas fa-chart-line"></i>
                        </div>
                    </div>
                    <div class="news-content">
                        <h3>New ${category.charAt(0).toUpperCase() + category.slice(1)} Development</h3>
                        <p class="news-excerpt">Latest updates and analysis on current events in this category.</p>
                        <div class="news-meta">
                            <span><i class="fas fa-user"></i> ZIMHUB Reporter</span>
                            <span><i class="fas fa-clock"></i> Just now</span>
                        </div>
                        <a href="#" class="read-more-btn">Read Story</a>
                    </div>
                </article>
                <article class="news-item hover-lift fade-in-up delay-1">
                    <div class="news-image">
                        <div class="image-placeholder">
                            <i class="fas fa-users"></i>
                        </div>
                    </div>
                    <div class="news-content">
                        <h3>Community Impact Report</h3>
                        <p class="news-excerpt">How recent developments are affecting local communities across Zimbabwe.</p>
                        <div class="news-meta">
                            <span><i class="fas fa-user"></i> Community Desk</span>
                            <span><i class="fas fa-clock"></i> 2 hours ago</span>
                        </div>
                        <a href="#" class="read-more-btn">Read Story</a>
                    </div>
                </article>
            `;
        }, 1000);
    }
    
    function loadMoreNews() {
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        setTimeout(() => {
            loadMoreBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Load More News';
            alert('More news articles loaded!');
        }, 1500);
    }
    
    // Initialize
    loadNews('all');
});
// ZIMHUB - News Page JavaScript
// Day 3: Advanced News Features

document.addEventListener('DOMContentLoaded', function() {
    console.log('News page loaded - Advanced features enabled');
    
    // Initialize news data
    const newsData = [
        {
            id: 1,
            title: 'Government Unveils 2025 Digital Transformation Plan',
            category: 'politics',
            excerpt: 'New policies aim to boost tech startups and digital infrastructure across the country with $50M investment fund.',
            author: 'John Moyo',
            time: '2 hours ago',
            reads: '1.2k',
            tags: ['Digital', 'Policy', 'Technology'],
            content: 'Full article content would appear here...',
            image: 'fas fa-landmark',
            priority: 'high'
        },
        {
            id: 2,
            title: 'Tech Hub Opening in Harare Creates 500 Jobs',
            category: 'technology',
            excerpt: 'New innovation center launched to support local entrepreneurs with co-working spaces and mentorship programs.',
            author: 'Sarah Chikomo',
            time: '5 hours ago',
            reads: '850',
            tags: ['Startups', 'Employment', 'Innovation'],
            content: 'Full article content would appear here...',
            image: 'fas fa-mobile-alt',
            priority: 'medium'
        },
        {
            id: 3,
            title: 'Education Reforms Focus on Digital Skills',
            category: 'education',
            excerpt: 'Stakeholders meet to discuss curriculum updates and digital learning initiatives across schools.',
            author: 'David Zhou',
            time: '1 day ago',
            reads: '2.3k',
            tags: ['Education', 'Digital', 'Curriculum'],
            content: 'Full article content would appear here...',
            image: 'fas fa-graduation-cap',
            priority: 'high'
        },
        {
            id: 4,
            title: 'Healthcare System Receives Major Upgrade',
            category: 'health',
            excerpt: 'New medical equipment and digital systems installed in major hospitals across the country.',
            author: 'Dr. Tariro',
            time: '2 days ago',
            reads: '3.1k',
            tags: ['Health', 'Technology', 'Infrastructure'],
            content: 'Full article content would appear here...',
            image: 'fas fa-heartbeat',
            priority: 'medium'
        },
        {
            id: 5,
            title: 'Agriculture Sector Sees Record Growth',
            category: 'business',
            excerpt: 'Favorable weather and new farming techniques lead to bumper harvests across the country.',
            author: 'Agriculture Desk',
            time: '3 days ago',
            reads: '1.5k',
            tags: ['Agriculture', 'Growth', 'Economy'],
            content: 'Full article content would appear here...',
            image: 'fas fa-tractor',
            priority: 'low'
        },
        {
            id: 6,
            title: 'New Sports Complex Approved for Harare',
            category: 'sports',
            excerpt: 'City council approves construction of a new multi-purpose sports complex with Olympic standards.',
            author: 'Sports Reporter',
            time: '4 days ago',
            reads: '2.0k',
            tags: ['Sports', 'Infrastructure', 'Development'],
            content: 'Full article content would appear here...',
            image: 'fas fa-running',
            priority: 'medium'
        }
    ];
    
    // DOM Elements
    const newsGrid = document.querySelector('.news-grid');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const breakingNews = document.querySelector('.breaking-news');
    
    // State
    let currentCategory = 'all';
    let displayedCount = 3;
    const itemsPerLoad = 3;
    
    // Initialize
    initNewsPage();
    
    // ===== INITIALIZATION =====
    function initNewsPage() {
        renderNewsGrid();
        setupEventListeners();
        startBreakingNewsTicker();
        setupReadLaterFeature();
    }
    
    // ===== RENDER FUNCTIONS =====
    function renderNewsGrid() {
        if (!newsGrid) return;
        
        const filteredNews = filterNewsByCategory();
        const newsToShow = filteredNews.slice(0, displayedCount);
        
        if (newsToShow.length === 0) {
            newsGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-newspaper"></i>
                    <h3>No news found</h3>
                    <p>Try selecting a different category</p>
                </div>
            `;
            return;
        }
        
        newsGrid.innerHTML = newsToShow.map((news, index) => createNewsCard(news, index)).join('');
        
        // Update load more button
        if (loadMoreBtn) {
            if (displayedCount >= filteredNews.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
                loadMoreBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Load More News';
            }
        }
    }
    
    function createNewsCard(news, index) {
        return `
            <article class="news-item hover-lift" data-animation="fadeInUp" data-delay="${index * 0.1}">
                <div class="news-image">
                    <div class="image-placeholder ${news.priority}">
                        <i class="${news.image}"></i>
                    </div>
                    <span class="news-tag ${news.category}-tag">${news.category}</span>
                    <button class="bookmark-btn" data-id="${news.id}" title="Save for later">
                        <i class="far fa-bookmark"></i>
                    </button>
                </div>
                <div class="news-content">
                    <h3>${news.title}</h3>
                    <p class="news-excerpt">${news.excerpt}</p>
                    <div class="news-meta">
                        <span><i class="fas fa-user"></i> ${news.author}</span>
                        <span><i class="fas fa-clock"></i> ${news.time}</span>
                        <span><i class="fas fa-eye"></i> ${news.reads} reads</span>
                    </div>
                    <div class="news-tags">
                        ${news.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="news-actions">
                        <button class="read-full-btn" data-id="${news.id}">
                            <i class="fas fa-book-open"></i> Read Full Story
                        </button>
                        <button class="share-btn" data-id="${news.id}">
                            <i class="fas fa-share-alt"></i> Share
                        </button>
                    </div>
                </div>
            </article>
        `;
    }
    
    // ===== FILTERING =====
    function filterNewsByCategory() {
        if (currentCategory === 'all') return newsData;
        return newsData.filter(news => news.category === currentCategory);
    }
    
    // ===== EVENT HANDLERS =====
    function setupEventListeners() {
        // Category filter buttons
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.dataset.category;
                currentCategory = category;
                displayedCount = 3;
                
                // Update active button
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Re-render grid
                renderNewsGrid();
                
                // Log filter activity
                logUserActivity('news_filter', { category });
            });
        });
        
        // Load more button
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                displayedCount += itemsPerLoad;
                renderNewsGrid();
                
                // Show notification
                showNotification(`Loaded ${itemsPerLoad} more news articles`, 'info');
            });
        }
        
        // Bookmark buttons (delegated)
        document.addEventListener('click', function(e) {
            if (e.target.closest('.bookmark-btn')) {
                const btn = e.target.closest('.bookmark-btn');
                const newsId = parseInt(btn.dataset.id);
                toggleBookmark(newsId, btn);
            }
            
            if (e.target.closest('.read-full-btn')) {
                const btn = e.target.closest('.read-full-btn');
                const newsId = parseInt(btn.dataset.id);
                readFullStory(newsId);
            }
            
            if (e.target.closest('.share-btn')) {
                const btn = e.target.closest('.share-btn');
                const newsId = parseInt(btn.dataset.id);
                shareNews(newsId);
            }
        });
        
        // Newsletter subscription
        const subscribeBtn = document.querySelector('.subscribe-btn');
        if (subscribeBtn) {
            subscribeBtn.addEventListener('click', handleNewsletterSubscription);
        }
    }
    
    // ===== FEATURE FUNCTIONS =====
    function toggleBookmark(newsId, button) {
        const news = newsData.find(n => n.id === newsId);
        if (!news) return;
        
        let bookmarks = JSON.parse(localStorage.getItem('zimhub_bookmarks') || '[]');
        const icon = button.querySelector('i');
        
        if (bookmarks.includes(newsId)) {
            // Remove bookmark
            bookmarks = bookmarks.filter(id => id !== newsId);
            icon.classList.remove('fas');
            icon.classList.add('far');
            showNotification(`Removed "${news.title}" from bookmarks`, 'info');
        } else {
            // Add bookmark
            bookmarks.push(newsId);
            icon.classList.remove('far');
            icon.classList.add('fas');
            showNotification(`Saved "${news.title}" to bookmarks`, 'success');
        }
        
        localStorage.setItem('zimhub_bookmarks', JSON.stringify(bookmarks));
        
        // Pulse animation
        button.classList.add('pulse');
        setTimeout(() => button.classList.remove('pulse'), 1000);
    }
    
    function readFullStory(newsId) {
        const news = newsData.find(n => n.id === newsId);
        if (!news) return;
        
        // Create modal with full story
        const modal = document.createElement('div');
        modal.className = 'news-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                    <div class="modal-category">${news.category.toUpperCase()}</div>
                </div>
                <div class="modal-body">
                    <h2>${news.title}</h2>
                    <div class="article-meta">
                        <span><i class="fas fa-user"></i> ${news.author}</span>
                        <span><i class="fas fa-clock"></i> ${news.time}</span>
                        <span><i class="fas fa-eye"></i> ${news.reads} reads</span>
                    </div>
                    <div class="article-image">
                        <i class="${news.image}"></i>
                    </div>
                    <div class="article-content">
                        <p>${news.content}</p>
                        <p>This is a detailed news article. In a real implementation, this would contain the full story content with images, videos, and detailed analysis.</p>
                        <p>The government's new digital transformation plan includes initiatives for broadband expansion, digital literacy programs, and support for tech startups.</p>
                    </div>
                    <div class="article-tags">
                        ${news.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="article-actions">
                        <button class="btn-primary" onclick="printArticle()">
                            <i class="fas fa-print"></i> Print
                        </button>
                        <button class="btn-secondary" onclick="downloadArticle()">
                            <i class="fas fa-download"></i> Save PDF
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        addNewsModalStyles();
        
        // Close modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => modal.remove(), 300);
        });
        
        // Track reading
        logUserActivity('news_read', { 
            id: newsId, 
            title: news.title,
            duration: 0 
        });
        
        // Start reading timer
        const startTime = Date.now();
        modal.addEventListener('click', () => {
            const duration = Math.floor((Date.now() - startTime) / 1000);
            logUserActivity('news_read_complete', { 
                id: newsId, 
                title: news.title,
                duration 
            });
        }, { once: true });
    }
    
    function shareNews(newsId) {
        const news = newsData.find(n => n.id === newsId);
        if (!news) return;
        
        if (navigator.share) {
            navigator.share({
                title: news.title,
                text: news.excerpt,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            const text = `${news.title}\n\n${news.excerpt}\n\nRead more on ZIMHUB`;
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Link copied to clipboard!', 'success');
            });
        }
        
        logUserActivity('news_share', { id: newsId, title: news.title });
    }
    
    function startBreakingNewsTicker() {
        if (!breakingNews) return;
        
        const breakingItems = [
            'BREAKING: New economic policies announced by government',
            'LIVE: Tech innovation summit underway in Harare',
            'ALERT: Major infrastructure project approved',
            'UPDATE: Education reforms to be implemented next month'
        ];
        
        let currentIndex = 0;
        
        function updateBreakingNews() {
            const content = breakingNews.querySelector('.breaking-content');
            if (content) {
                content.innerHTML = `
                    <span class="breaking-text">${breakingItems[currentIndex]}</span>
                    <a href="#" class="breaking-link">Read More <i class="fas fa-arrow-right"></i></a>
                `;
                
                currentIndex = (currentIndex + 1) % breakingItems.length;
            }
        }
        
        // Update every 10 seconds
        updateBreakingNews();
        setInterval(updateBreakingNews, 10000);
        
        // Pulse animation
        setInterval(() => {
            breakingNews.classList.add('pulse');
            setTimeout(() => breakingNews.classList.remove('pulse'), 1000);
        }, 5000);
    }
    
    function setupReadLaterFeature() {
        // Check bookmarks and update UI
        const bookmarks = JSON.parse(localStorage.getItem('zimhub_bookmarks') || '[]');
        bookmarks.forEach(id => {
            const btn = document.querySelector(`.bookmark-btn[data-id="${id}"]`);
            if (btn) {
                const icon = btn.querySelector('i');
                icon.classList.remove('far');
                icon.classList.add('fas');
            }
        });
    }
    
    function handleNewsletterSubscription() {
        const emailInput = document.querySelector('.newsletter-form input[type="email"]');
        if (!emailInput) return;
        
        const email = emailInput.value.trim();
        
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading
        const originalText = subscribeBtn.innerHTML;
        subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        
        setTimeout(() => {
            // Simulate API call
            subscribeBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            subscribeBtn.style.background = 'var(--verdant)';
            
            // Save subscription
            let subscriptions = JSON.parse(localStorage.getItem('zimhub_subscriptions') || '[]');
            subscriptions.push({
                email,
                date: new Date().toISOString(),
                type: 'newsletter'
            });
            localStorage.setItem('zimhub_subscriptions', JSON.stringify(subscriptions));
            
            showNotification('Successfully subscribed to newsletter!', 'success');
            
            // Reset after 2 seconds
            setTimeout(() => {
                subscribeBtn.innerHTML = originalText;
                subscribeBtn.style.background = '';
                emailInput.value = '';
            }, 2000);
        }, 1500);
    }
    
    // ===== UTILITIES =====
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function addNewsModalStyles() {
        if (!document.querySelector('#news-modal-styles')) {
            const style = document.createElement('style');
            style.id = 'news-modal-styles';
            style.textContent = `
                .news-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.9);
                    z-index: 99999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                    backdrop-filter: blur(5px);
                }
                
                .news-modal .modal-content {
                    background: var(--onyx-light);
                    border-radius: 15px;
                    width: 90%;
                    max-width: 800px;
                    max-height: 90vh;
                    overflow-y: auto;
                    animation: zoomIn 0.3s ease;
                }
                
                .news-modal .modal-header {
                    padding: 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid var(--medium-gray);
                }
                
                .modal-category {
                    padding: 5px 15px;
                    background: var(--accent-teal);
                    color: var(--onyx-dark);
                    border-radius: 20px;
                    font-weight: 600;
                    font-size: 0.8rem;
                }
                
                .news-modal .modal-body {
                    padding: 30px;
                }
                
                .news-modal h2 {
                    font-size: 2rem;
                    margin-bottom: 20px;
                    color: var(--pure-white);
                }
                
                .article-meta {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 30px;
                    color: var(--accent-teal);
                }
                
                .article-image {
                    width: 100%;
                    height: 300px;
                    background: linear-gradient(135deg, var(--royale), var(--verdant));
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 30px;
                }
                
                .article-image i {
                    font-size: 8rem;
                    color: var(--accent-gold);
                }
                
                .article-content {
                    line-height: 1.8;
                    margin-bottom: 30px;
                    color: var(--light-gray);
                }
                
                .article-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-bottom: 30px;
                }
                
                .article-actions {
                    display: flex;
                    gap: 15px;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Global functions for modal
    window.printArticle = function() {
        showNotification('Print feature coming soon!', 'info');
    };
    
    window.downloadArticle = function() {
        showNotification('PDF download feature coming soon!', 'info');
    };
});