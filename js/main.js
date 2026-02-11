// ===========================================
// ZIMHUB - MAIN JAVASCRIPT FILE
// Created by Talent Hondo (TH7MEDIA)
// Day 3: Complete Functionality
// ===========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== GLOBAL VARIABLES =====
    const currentDay = 2; // Update this each day
    const projectName = 'ZIMHUB';
    const creator = 'Talent Hondo (TH7MEDIA)';
    
    console.log(`${projectName} - Day ${currentDay} of 7`);
    console.log(`Created by: ${creator}`);
    console.log('SO HELP ME GOD 🙏');
    
    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    function initMobileMenu() {
        if (mobileMenuBtn && navList) {
            mobileMenuBtn.addEventListener('click', function() {
                navList.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
                
                // Change icon based on state
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    if (navList.classList.contains('active')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    } else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                
                // Add animation class
                navList.classList.add('animated');
                setTimeout(() => {
                    navList.classList.remove('animated');
                }, 300);
            });
            
            // Close menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav-list a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navList.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                });
            });
        }
    }
    
    // ===== SEARCH FUNCTIONALITY =====
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    function initSearch() {
        if (!searchInput || !searchBtn) return;
        
        const performSearch = () => {
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (!searchTerm) {
                showNotification('Please enter a search term', 'warning');
                searchInput.focus();
                return;
            }
            
            // Show searching animation
            const originalBtnText = searchBtn.innerHTML;
            searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
            searchBtn.disabled = true;
            
            // Simulate search delay
            setTimeout(() => {
                // Get current page
                const currentPage = window.location.pathname.split('/').pop();
                const pageName = currentPage.replace('.html', '') || 'home';
                
                // Log search for analytics
                console.log(`Search performed on ${pageName}: "${searchTerm}"`);
                
                // Show search results notification
                showNotification(`Search results for "${searchTerm}" will be available soon!`, 'info');
                
                // Clear search input
                searchInput.value = '';
                
                // Reset button
                searchBtn.innerHTML = originalBtnText;
                searchBtn.disabled = false;
                
                // Add search to recent searches
                addToRecentSearches(searchTerm);
                
            }, 1500);
        };
        
        // Search button click
        searchBtn.addEventListener('click', performSearch);
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Add search suggestions
        searchInput.addEventListener('input', function() {
            const term = this.value.toLowerCase();
            if (term.length > 2) {
                showSearchSuggestions(term);
            } else {
                hideSearchSuggestions();
            }
        });
        
        // Clear suggestions on blur
        searchInput.addEventListener('blur', function() {
            setTimeout(hideSearchSuggestions, 200);
        });
    }
    
    // ===== SEARCH SUGGESTIONS =====
    function showSearchSuggestions(term) {
        let suggestionsContainer = document.getElementById('searchSuggestions');
        
        if (!suggestionsContainer) {
            suggestionsContainer = document.createElement('div');
            suggestionsContainer.id = 'searchSuggestions';
            suggestionsContainer.className = 'search-suggestions';
            searchInput.parentNode.appendChild(suggestionsContainer);
            
            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .search-suggestions {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: var(--onyx);
                    border: 1px solid var(--medium-gray);
                    border-radius: 0 0 10px 10px;
                    max-height: 200px;
                    overflow-y: auto;
                    z-index: 1000;
                    display: none;
                    box-shadow: var(--shadow-medium);
                }
                
                .search-suggestion {
                    padding: 10px 15px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    color: var(--light-gray);
                    border-bottom: 1px solid var(--medium-gray);
                }
                
                .search-suggestion:hover {
                    background-color: var(--onyx-light);
                }
                
                .search-suggestion:last-child {
                    border-bottom: none;
                }
                
                .suggestion-highlight {
                    color: var(--accent-teal);
                    font-weight: bold;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Generate suggestions based on term
        const suggestions = generateSuggestions(term);
        
        if (suggestions.length > 0) {
            suggestionsContainer.innerHTML = suggestions.map(suggestion => `
                <div class="search-suggestion" data-term="${suggestion}">
                    ${highlightMatch(suggestion, term)}
                </div>
            `).join('');
            
            suggestionsContainer.style.display = 'block';
            
            // Add click event to suggestions
            const suggestionItems = suggestionsContainer.querySelectorAll('.search-suggestion');
            suggestionItems.forEach(item => {
                item.addEventListener('click', function() {
                    const term = this.getAttribute('data-term');
                    searchInput.value = term;
                    searchInput.focus();
                    hideSearchSuggestions();
                    performSearch();
                });
            });
        } else {
            hideSearchSuggestions();
        }
    }
    
    function generateSuggestions(term) {
        const allSuggestions = [
            'Latest News Zimbabwe',
            'Sports Highlights',
            'Job Opportunities Harare',
            'Scholarships 2025',
            'Business Tips for Startups',
            'Football Scores',
            'Cricket Updates',
            'Tech Jobs',
            'Remote Work',
            'Financial Advice',
            'Entrepreneurship',
            'Stock Market',
            'Forex Trading',
            'Web Development',
            'Mobile Apps',
            'Digital Marketing',
            'Agriculture Business',
            'Mining News',
            'Tourism Zimbabwe',
            'Education Scholarships'
        ];
        
        return allSuggestions.filter(suggestion => 
            suggestion.toLowerCase().includes(term)
        ).slice(0, 5);
    }
    
    function highlightMatch(text, term) {
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<span class="suggestion-highlight">$1</span>');
    }
    
    function hideSearchSuggestions() {
        const suggestionsContainer = document.getElementById('searchSuggestions');
        if (suggestionsContainer) {
            suggestionsContainer.style.display = 'none';
        }
    }
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        // Set icon based on type
        let icon = 'info-circle';
        if (type === 'success') icon = 'check-circle';
        if (type === 'warning') icon = 'exclamation-circle';
        if (type === 'error') icon = 'times-circle';
        
        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add styles
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 15px 20px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    z-index: 9999;
                    animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
                    box-shadow: var(--shadow-medium);
                    max-width: 400px;
                }
                
                .notification-info {
                    background: var(--royale);
                    color: var(--pure-white);
                    border-left: 4px solid var(--accent-teal);
                }
                
                .notification-success {
                    background: var(--verdant);
                    color: var(--pure-white);
                    border-left: 4px solid var(--accent-gold);
                }
                
                .notification-warning {
                    background: #ff9800;
                    color: var(--onyx-dark);
                    border-left: 4px solid #ff5722;
                }
                
                .notification-error {
                    background: #f44336;
                    color: var(--pure-white);
                    border-left: 4px solid #d32f2f;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: inherit;
                    cursor: pointer;
                    margin-left: auto;
                    padding: 0;
                    font-size: 0.9rem;
                }
                
                @keyframes fadeOut {
                    from { opacity: 1; transform: translateX(0); }
                    to { opacity: 0; transform: translateX(100px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
    }
    
    // ===== RECENT SEARCHES =====
    function addToRecentSearches(term) {
        let recentSearches = JSON.parse(localStorage.getItem('zimhub_recent_searches') || '[]');
        
        // Remove if already exists
        recentSearches = recentSearches.filter(item => item !== term);
        
        // Add to beginning
        recentSearches.unshift(term);
        
        // Keep only last 5 searches
        recentSearches = recentSearches.slice(0, 5);
        
        // Save to localStorage
        localStorage.setItem('zimhub_recent_searches', JSON.stringify(recentSearches));
        
        // Update UI if on homepage
        updateRecentSearchesUI(recentSearches);
    }
    
    function updateRecentSearchesUI(searches) {
        const recentSearchesContainer = document.getElementById('recentSearches');
        if (!recentSearchesContainer) return;
        
        if (searches.length === 0) {
            recentSearchesContainer.innerHTML = '<p>No recent searches</p>';
            return;
        }
        
        recentSearchesContainer.innerHTML = searches.map(term => `
            <span class="recent-search-tag" data-term="${term}">
                ${term}
                <button class="remove-search" onclick="removeRecentSearch('${term}')">
                    <i class="fas fa-times"></i>
                </button>
            </span>
        `).join('');
    }
    
    // ===== BACK TO TOP BUTTON =====
    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        if (!backToTopBtn) return;
        
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
    }
    
    // ===== ANIMATION ON SCROLL =====
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Get animation type from data attribute
                    const animationType = entry.target.dataset.animation || 'fadeInUp';
                    const delay = entry.target.dataset.delay || '0';
                    
                    // Apply animation
                    entry.target.style.animation = `${animationType} 0.8s ease-out ${delay}s forwards`;
                    entry.target.style.opacity = '1';
                    
                    // Stop observing after animation
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements with data-animation attribute
        document.querySelectorAll('[data-animation]').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
        
        // Add parallax effect to hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
        }
    }
    
    // ===== TYPING EFFECT FOR HERO =====
    function initTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;
        
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
        let typingSpeed = 100;
        
        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                // Deleting text
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                // Typing text
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            // Check if we've finished typing a phrase
            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at the end of phrase
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next phrase
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start typing after a short delay
        setTimeout(type, 1000);
    }
    
    // ===== TRENDING TABS =====
    function initTrendingTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        if (tabBtns.length === 0) return;
        
        // Set active tab from localStorage or default to 'news'
        const activeTab = localStorage.getItem('zimhub_active_tab') || 'news';
        
        // Activate initial tab
        activateTab(activeTab);
        
        // Add click events to tab buttons
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                activateTab(tabId);
                localStorage.setItem('zimhub_active_tab', tabId);
            });
        });
    }
    
    function activateTab(tabId) {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        // Remove active class from all buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        const activePane = document.getElementById(`${tabId}-tab`);
        
        if (activeBtn) activeBtn.classList.add('active');
        if (activePane) activePane.classList.add('active');
        
        // Load content for active tab
        loadTrendingContent(tabId);
    }
    
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
        container.innerHTML = '<div class="loading-spinner"></div>';
        
        // Simulate API call delay
        setTimeout(() => {
            // Sample data - In production, this would come from an API
            const sampleData = {
                'news': [
                    {
                        title: 'New Economic Policies Announced',
                        category: 'Politics',
                        time: '2 hours ago',
                        description: 'Government unveils new economic recovery plan focused on digital transformation.',
                        reads: '1.2k'
                    },
                    {
                        title: 'Tech Hub Opening in Harare',
                        category: 'Technology',
                        time: '5 hours ago',
                        description: 'New innovation center to support local startups and tech entrepreneurs.',
                        reads: '850'
                    },
                    {
                        title: 'Education Reforms Discussion',
                        category: 'Education',
                        time: '1 day ago',
                        description: 'Stakeholders meet to discuss curriculum updates and digital learning.',
                        reads: '2.3k'
                    }
                ],
                'jobs': [
                    {
                        title: 'Software Developer - Remote',
                        company: 'TechCorp ZW',
                        location: 'Harare',
                        salary: '$2,500 - $3,500',
                        type: 'Full-time'
                    },
                    {
                        title: 'Marketing Manager',
                        company: 'Growth Ltd',
                        location: 'Bulawayo',
                        salary: '$1,800 - $2,500',
                        type: 'Contract'
                    },
                    {
                        title: 'Finance Analyst',
                        company: 'Bank of ZW',
                        location: 'Harare',
                        salary: '$2,000 - $3,000',
                        type: 'Full-time'
                    }
                ],
                'sports': [
                    {
                        title: 'Warriors Qualify for AFCON',
                        sport: 'Football',
                        time: 'Yesterday',
                        description: 'Zimbabwe national team secures spot in African Cup of Nations.',
                        views: '15k'
                    },
                    {
                        title: 'Cricket Team Wins Series',
                        sport: 'Cricket',
                        time: '2 days ago',
                        description: 'National cricket team defeats rivals in thrilling match series.',
                        views: '8.5k'
                    },
                    {
                        title: 'Local Boxer Wins Title',
                        sport: 'Boxing',
                        time: '3 days ago',
                        description: 'Zimbabwean boxer claims continental championship belt.',
                        views: '12.3k'
                    }
                ]
            };
            
            const data = sampleData[category] || [];
            
            // Clear container
            container.innerHTML = '';
            
            // Create trending items
            data.forEach((item, index) => {
                const trendingItem = document.createElement('div');
                trendingItem.className = 'trending-item hover-lift';
                trendingItem.style.animationDelay = `${index * 0.1}s`;
                trendingItem.style.opacity = '0';
                
                if (category === 'news') {
                    trendingItem.innerHTML = `
                        <div class="trending-badge news-bg">News</div>
                        <h4>${item.title}</h4>
                        <p class="trending-description">${item.description}</p>
                        <div class="trending-meta">
                            <span><i class="fas fa-tag"></i> ${item.category}</span>
                            <span><i class="fas fa-clock"></i> ${item.time}</span>
                            <span><i class="fas fa-eye"></i> ${item.reads} reads</span>
                        </div>
                        <button class="btn-read" onclick="readArticle('${item.title}')">
                            Read More <i class="fas fa-arrow-right"></i>
                        </button>
                    `;
                } else if (category === 'jobs') {
                    trendingItem.innerHTML = `
                        <div class="trending-badge jobs-bg">Job</div>
                        <h4>${item.title}</h4>
                        <div class="trending-meta">
                            <span><i class="fas fa-building"></i> ${item.company}</span>
                            <span><i class="fas fa-map-marker-alt"></i> ${item.location}</span>
                        </div>
                        <div class="job-details">
                            <span class="salary"><i class="fas fa-money-bill-wave"></i> ${item.salary}</span>
                            <span class="job-type">${item.type}</span>
                        </div>
                        <button class="btn-apply" onclick="applyForJob('${item.title}')">
                            Apply Now <i class="fas fa-paper-plane"></i>
                        </button>
                    `;
                } else if (category === 'sports') {
                    trendingItem.innerHTML = `
                        <div class="trending-badge sports-bg">Sports</div>
                        <h4>${item.title}</h4>
                        <p class="trending-description">${item.description}</p>
                        <div class="trending-meta">
                            <span><i class="fas fa-baseball-bat-ball"></i> ${item.sport}</span>
                            <span><i class="fas fa-calendar"></i> ${item.time}</span>
                            <span><i class="fas fa-eye"></i> ${item.views} views</span>
                        </div>
                        <button class="btn-view" onclick="viewSportsDetail('${item.title}')">
                            View Details <i class="fas fa-external-link-alt"></i>
                        </button>
                    `;
                }
                
                container.appendChild(trendingItem);
                
                // Animate item after adding to DOM
                setTimeout(() => {
                    trendingItem.style.animation = 'fadeInUp 0.5s ease forwards';
                    trendingItem.style.opacity = '1';
                }, index * 100);
            });
            
            // Add "View All" button
            const viewAllBtn = document.createElement('button');
            viewAllBtn.className = 'btn-view-all';
            viewAllBtn.innerHTML = `<i class="fas fa-list"></i> View All ${category}`;
            viewAllBtn.onclick = () => viewAllContent(category);
            container.appendChild(viewAllBtn);
            
        }, 1000); // Simulate 1 second loading time
    }
    
    // ===== GLOBAL FUNCTIONS (accessible from HTML onclick) =====
    window.readArticle = function(title) {
        showNotification(`Opening article: "${title}"`, 'info');
        // In production, this would navigate to article page
    };
    
    window.applyForJob = function(title) {
        showNotification(`Applying for: "${title}"`, 'success');
        // In production, this would open application form
    };
    
    window.viewSportsDetail = function(title) {
        showNotification(`Viewing details for: "${title}"`, 'info');
        // In production, this would navigate to sports detail page
    };
    
    window.viewAllContent = function(category) {
        showNotification(`Loading all ${category}...`, 'info');
        // In production, this would navigate to category page
        setTimeout(() => {
            window.location.href = `${category}.html`;
        }, 500);
    };
    
    window.removeRecentSearch = function(term) {
        let recentSearches = JSON.parse(localStorage.getItem('zimhub_recent_searches') || '[]');
        recentSearches = recentSearches.filter(item => item !== term);
        localStorage.setItem('zimhub_recent_searches', JSON.stringify(recentSearches));
        updateRecentSearchesUI(recentSearches);
        showNotification(`Removed "${term}" from recent searches`, 'success');
    };
    
    // ===== DAY COUNTER =====
    function updateDayCounter() {
        const dayElement = document.getElementById('currentDay');
        if (dayElement) {
            dayElement.textContent = currentDay;
            
            // Update timeline items
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, index) => {
                if (index < currentDay) {
                    item.classList.add('active');
                    const task = item.querySelector('.timeline-task');
                    if (task) {
                        task.innerHTML = task.textContent.replace('✓', '').trim() + ' ✓';
                    }
                }
            });
        }
    }
    
    // ===== CONTACT BUTTON =====
    function initContactButton() {
        const contactBtn = document.querySelector('.btn-contact');
        if (contactBtn) {
            contactBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create contact modal
                const modal = document.createElement('div');
                modal.className = 'contact-modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3><i class="fas fa-headset"></i> Contact TH7MEDIA</h3>
                            <button class="modal-close"><i class="fas fa-times"></i></button>
                        </div>
                        <div class="modal-body">
                            <div class="contact-info">
                                <div class="contact-item">
                                    <i class="fas fa-user"></i>
                                    <div>
                                        <strong>Talent Hondo</strong>
                                        <span>Full Stack Developer</span>
                                    </div>
                                </div>
                                <div class="contact-item">
                                    <i class="fas fa-envelope"></i>
                                    <div>
                                        <strong>Email</strong>
                                        <span>th7media@example.com</span>
                                    </div>
                                </div>
                                <div class="contact-item">
                                    <i class="fas fa-phone"></i>
                                    <div>
                                        <strong>Phone</strong>
                                        <span>+263 XXX XXX XXX</span>
                                    </div>
                                </div>
                                <div class="contact-item">
                                    <i class="fas fa-calendar"></i>
                                    <div>
                                        <strong>Project Timeline</strong>
                                        <span>Day ${currentDay} of 7</span>
                                    </div>
                                </div>
                            </div>
                            <form class="contact-form">
                                <input type="text" placeholder="Your Name" required>
                                <input type="email" placeholder="Your Email" required>
                                <textarea placeholder="Your Message" rows="4" required></textarea>
                                <button type="submit" class="btn-primary">
                                    <i class="fas fa-paper-plane"></i> Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                // Add modal styles
                if (!document.querySelector('#modal-styles')) {
                    const style = document.createElement('style');
                    style.id = 'modal-styles';
                    style.textContent = `
                        .contact-modal {
                            position: fixed;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: rgba(0, 0, 0, 0.8);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            z-index: 9999;
                            animation: fadeIn 0.3s ease;
                            backdrop-filter: blur(5px);
                        }
                        
                        .modal-content {
                            background: var(--onyx-light);
                            border-radius: 15px;
                            width: 90%;
                            max-width: 500px;
                            max-height: 90vh;
                            overflow-y: auto;
                            animation: zoomIn 0.3s ease;
                            border: 1px solid var(--accent-teal);
                        }
                        
                        .modal-header {
                            padding: 20px;
                            background: var(--gradient-royal-verdant);
                            border-radius: 15px 15px 0 0;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        }
                        
                        .modal-header h3 {
                            color: var(--pure-white);
                            margin: 0;
                        }
                        
                        .modal-close {
                            background: none;
                            border: none;
                            color: var(--pure-white);
                            font-size: 1.2rem;
                            cursor: pointer;
                            padding: 5px;
                        }
                        
                        .modal-body {
                            padding: 20px;
                        }
                        
                        .contact-info {
                            margin-bottom: 20px;
                        }
                        
                        .contact-item {
                            display: flex;
                            align-items: center;
                            gap: 15px;
                            padding: 10px 0;
                            border-bottom: 1px solid var(--medium-gray);
                        }
                        
                        .contact-item i {
                            color: var(--accent-teal);
                            font-size: 1.2rem;
                            width: 30px;
                        }
                        
                        .contact-form input,
                        .contact-form textarea {
                            width: 100%;
                            padding: 12px;
                            margin-bottom: 15px;
                            border: 1px solid var(--medium-gray);
                            border-radius: 8px;
                            background: var(--onyx);
                            color: var(--light-gray);
                        }
                        
                        .contact-form button {
                            width: 100%;
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                // Close modal
                const closeBtn = modal.querySelector('.modal-close');
                closeBtn.addEventListener('click', () => {
                    modal.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => modal.remove(), 300);
                });
                
                // Close on outside click
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.style.animation = 'fadeOut 0.3s ease forwards';
                        setTimeout(() => modal.remove(), 300);
                    }
                });
                
                // Form submission
                const form = modal.querySelector('.contact-form');
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    modal.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => modal.remove(), 300);
                });
            });
        }
    }
    
    // ===== PAGE LOADER =====
    function initPageLoader() {
        // Create loader if it doesn't exist
        if (!document.querySelector('#page-loader')) {
            const loader = document.createElement('div');
            loader.id = 'page-loader';
            loader.innerHTML = `
                <div class="loader-content">
                    <div class="spinner"></div>
                    <div class="loader-text">
                        <h3>ZIM<span>HUB</span></h3>
                        <p>Loading awesome content...</p>
                    </div>
                </div>
            `;
            
            // Add loader styles
            const style = document.createElement('style');
            style.textContent = `
                #page-loader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: var(--onyx-dark);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 99999;
                    transition: opacity 0.5s ease;
                }
                
                .loader-content {
                    text-align: center;
                }
                
                .spinner {
                    width: 60px;
                    height: 60px;
                    border: 5px solid var(--medium-gray);
                    border-top: 5px solid var(--accent-teal);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                }
                
                .loader-text h3 {
                    font-size: 2rem;
                    color: var(--pure-white);
                    margin-bottom: 10px;
                }
                
                .loader-text span {
                    color: var(--accent-gold);
                }
                
                .loader-text p {
                    color: var(--accent-teal);
                }
            `;
            document.head.appendChild(style);
            
            document.body.appendChild(loader);
            
            // Remove loader after page loads
            window.addEventListener('load', function() {
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        if (loader.parentNode) {
                            loader.remove();
                        }
                    }, 500);
                }, 1000);
            });
        }
    }
    
    // ===== INITIALIZE EVERYTHING =====
    function initializeApp() {
        initMobileMenu();
        initSearch();
        initBackToTop();
        initScrollAnimations();
        initTypingEffect();
        initTrendingTabs();
        updateDayCounter();
        initContactButton();
        initPageLoader();
        
        // Show welcome message
        setTimeout(() => {
            showNotification(`Welcome to ZIMHUB! Day ${currentDay} progress looking great!`, 'success');
        }, 2000);
        
        // Log initialization complete
        console.log('ZIMHUB JavaScript initialized successfully!');
    }
    
    // Start the app
    initializeApp();
    
});

// ===== PERFORM SEARCH GLOBAL FUNCTION =====
// This is needed for the search button in HTML
window.performSearch = function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (!searchInput || !searchBtn) return;
    
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        alert('Please enter a search term');
        searchInput.focus();
        return;
    }
    
    // Show searching animation
    const originalBtnText = searchBtn.innerHTML;
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    searchBtn.disabled = true;
    
    // Simulate search
    setTimeout(() => {
        alert(`Search feature coming soon!\nYou searched for: "${searchTerm}"`);
        searchInput.value = '';
        searchBtn.innerHTML = originalBtnText;
        searchBtn.disabled = false;
    }, 1000);
};
// ===========================================
// ZIMHUB - ENHANCED MAIN JAVASCRIPT
// Day 3: Complete Interactive Features
// ===========================================

// Global Variables
const ZIMHUB_CONFIG = {
    projectName: 'ZIMHUB',
    creator: 'Talent Hondo (TH7MEDIA)',
    currentDay: 3,
    totalDays: 7,
    version: '1.0.0'
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    console.log(`${ZIMHUB_CONFIG.projectName} v${ZIMHUB_CONFIG.version}`);
    console.log(`Day ${ZIMHUB_CONFIG.currentDay} of ${ZIMHUB_CONFIG.totalDays} - JavaScript Functionality`);
    console.log(`Created by: ${ZIMHUB_CONFIG.creator}`);
    console.log('SO HELP ME GOD 🙏');
    
    // Initialize all modules
    initializeAllModules();
    
    // Show welcome notification
    setTimeout(() => {
        showNotification(`Welcome to ${ZIMHUB_CONFIG.projectName}! Day ${ZIMHUB_CONFIG.currentDay} functionality loaded.`, 'success');
    }, 1000);
});

// ===== MAIN INITIALIZATION FUNCTION =====
function initializeAllModules() {
    initMobileMenu();
    initSearch();
    initNotifications();
    initBackToTop();
    initScrollAnimations();
    initThemeSwitcher();
    initPageLoader();
    initUserPreferences();
    initAnalytics();
    initCookieConsent();
    initPageSpecificFeatures();
    updateProjectTimeline();
}

// ===== ENHANCED MOBILE MENU =====
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (!mobileMenuBtn || !navList) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        navList.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        // Change icon based on state
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
        
        // Add animation
        navList.style.animation = navList.classList.contains('active') 
            ? 'slideInDown 0.3s ease' 
            : 'fadeOutUp 0.3s ease';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuBtn.contains(event.target) && !navList.contains(event.target)) {
            navList.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navList.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// ===== ENHANCED SEARCH FUNCTIONALITY =====
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (!searchInput || !searchBtn) return;
    
    // Advanced search suggestions
    const searchSuggestions = {
        'news': ['breaking news', 'politics', 'technology', 'business news', 'health updates'],
        'sports': ['football scores', 'cricket updates', 'rugby fixtures', 'live matches'],
        'jobs': ['software developer', 'marketing manager', 'remote jobs', 'part-time work'],
        'scholarships': ['undergraduate', 'postgraduate', 'international', 'STEM scholarships'],
        'business': ['startup funding', 'digital marketing', 'financial tips', 'entrepreneurship']
    };
    
    // Perform search function
    const performSearch = function() {
        const searchTerm = searchInput.value.trim();
        
        if (!searchTerm) {
            showNotification('Please enter a search term', 'warning');
            searchInput.focus();
            return;
        }
        
        // Show loading state
        const originalText = searchBtn.innerHTML;
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        searchBtn.disabled = true;
        
        // Log search
        logUserActivity('search', { term: searchTerm });
        
        // Simulate API call
        setTimeout(() => {
            // Determine page type for context-aware search
            const pageType = getCurrentPageType();
            const results = simulateSearch(searchTerm, pageType);
            
            // Display results
            displaySearchResults(results, searchTerm);
            
            // Save to recent searches
            saveToRecentSearches(searchTerm);
            
            // Reset button
            searchBtn.innerHTML = originalText;
            searchBtn.disabled = false;
            
        }, 1500);
    };
    
    // Event listeners
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });
    
    // Real-time suggestions
    searchInput.addEventListener('input', function() {
        const term = this.value.toLowerCase();
        if (term.length >= 2) {
            showRealTimeSuggestions(term);
        } else {
            hideSuggestions();
        }
    });
    
    // Clear suggestions on blur
    searchInput.addEventListener('blur', function() {
        setTimeout(hideSuggestions, 200);
    });
}

// ===== SEARCH HELPER FUNCTIONS =====
function getCurrentPageType() {
    const path = window.location.pathname;
    if (path.includes('news')) return 'news';
    if (path.includes('sports')) return 'sports';
    if (path.includes('jobs')) return 'jobs';
    if (path.includes('scholarships')) return 'scholarships';
    if (path.includes('business')) return 'business';
    return 'home';
}

function simulateSearch(term, pageType) {
    // Mock search results based on page type
    const mockResults = {
        'news': [
            { title: `Breaking: ${term} developments`, category: 'News', relevance: 95 },
            { title: 'Government announces new policies', category: 'Politics', relevance: 85 },
            { title: 'Tech innovations in Zimbabwe', category: 'Technology', relevance: 75 }
        ],
        'sports': [
            { title: `Live: ${term} match updates`, category: 'Sports', relevance: 92 },
            { title: 'Local team wins championship', category: 'Football', relevance: 88 },
            { title: 'Player transfer news', category: 'Updates', relevance: 80 }
        ],
        'jobs': [
            { title: `${term} positions available`, category: 'Jobs', relevance: 90 },
            { title: 'Remote opportunities', category: 'Work from home', relevance: 85 },
            { title: 'Urgent hiring', category: 'Immediate', relevance: 78 }
        ],
        'home': [
            { title: `Results for: ${term}`, category: 'General', relevance: 88 },
            { title: 'Popular content', category: 'Trending', relevance: 82 },
            { title: 'Related articles', category: 'Recommended', relevance: 75 }
        ]
    };
    
    return mockResults[pageType] || mockResults.home;
}

function displaySearchResults(results, term) {
    // Create results modal
    const modal = document.createElement('div');
    modal.className = 'search-results-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-search"></i> Search Results for "${term}"</h3>
                <button class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="results-stats">
                    Found ${results.length} results in ${getCurrentPageType()} category
                </div>
                <div class="results-list">
                    ${results.map((result, index) => `
                        <div class="result-item fade-in-up" style="animation-delay: ${index * 0.1}s">
                            <div class="result-relevance">
                                <div class="relevance-bar" style="width: ${result.relevance}%"></div>
                                <span>${result.relevance}% match</span>
                            </div>
                            <h4>${result.title}</h4>
                            <p class="result-category">${result.category}</p>
                            <button class="view-result-btn" onclick="viewSearchResult('${result.title}')">
                                <i class="fas fa-external-link-alt"></i> View
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="advancedSearch('${term}')">
                    <i class="fas fa-sliders-h"></i> Advanced Search
                </button>
                <button class="btn-primary" onclick="clearSearch()">
                    <i class="fas fa-times"></i> Clear Search
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles if not already present
    addSearchResultsStyles();
    
    // Close functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => modal.remove(), 300);
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

function addSearchResultsStyles() {
    if (!document.querySelector('#search-results-styles')) {
        const style = document.createElement('style');
        style.id = 'search-results-styles';
        style.textContent = `
            .search-results-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 99999;
                animation: fadeIn 0.3s ease;
                backdrop-filter: blur(5px);
            }
            
            .search-results-modal .modal-content {
                background: var(--onyx-light);
                border-radius: 15px;
                width: 90%;
                max-width: 800px;
                max-height: 90vh;
                overflow-y: auto;
                animation: zoomIn 0.3s ease;
                border: 2px solid var(--accent-teal);
            }
            
            .search-results-modal .modal-header {
                padding: 20px;
                background: var(--gradient-royal-verdant);
                border-radius: 15px 15px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .search-results-modal .modal-header h3 {
                color: var(--pure-white);
                margin: 0;
                font-size: 1.3rem;
            }
            
            .search-results-modal .modal-close {
                background: none;
                border: none;
                color: var(--pure-white);
                font-size: 1.2rem;
                cursor: pointer;
                padding: 5px;
            }
            
            .search-results-modal .modal-body {
                padding: 20px;
            }
            
            .results-stats {
                color: var(--accent-teal);
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 1px solid var(--medium-gray);
            }
            
            .results-list {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .result-item {
                background: var(--onyx);
                padding: 20px;
                border-radius: 10px;
                border: 1px solid var(--medium-gray);
                position: relative;
            }
            
            .result-relevance {
                position: absolute;
                top: 0;
                right: 0;
                background: var(--royale);
                padding: 5px 10px;
                border-radius: 0 10px 0 10px;
                font-size: 0.8rem;
                color: var(--accent-gold);
            }
            
            .relevance-bar {
                height: 3px;
                background: var(--accent-teal);
                margin-bottom: 3px;
            }
            
            .result-item h4 {
                margin: 10px 0 5px;
                color: var(--pure-white);
            }
            
            .result-category {
                color: var(--accent-teal);
                font-size: 0.9rem;
                margin-bottom: 15px;
            }
            
            .view-result-btn {
                padding: 8px 20px;
                background: var(--accent-teal);
                color: var(--onyx-dark);
                border: none;
                border-radius: 20px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .view-result-btn:hover {
                background: var(--accent-orange);
            }
            
            .search-results-modal .modal-footer {
                padding: 20px;
                display: flex;
                gap: 15px;
                border-top: 1px solid var(--medium-gray);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes zoomIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== NOTIFICATION SYSTEM =====
function initNotifications() {
    // Already implemented in Day 2
    // This function ensures notification system is ready
}

function showNotification(message, type = 'info', duration = 3000) {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close
    if (duration > 0) {
        setTimeout(() => closeNotification(notification), duration);
    }
}

function getNotificationIcon(type) {
    const icons = {
        'info': 'info-circle',
        'success': 'check-circle',
        'warning': 'exclamation-triangle',
        'error': 'times-circle'
    };
    return icons[type] || 'info-circle';
}

function closeNotification(notification) {
    notification.style.transform = 'translateY(-20px)';
    notification.style.opacity = '0';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// ===== USER PREFERENCES =====
function initUserPreferences() {
    // Load user preferences from localStorage
    const preferences = JSON.parse(localStorage.getItem('zimhub_preferences')) || {
        theme: 'dark',
        notifications: true,
        fontSize: 'medium',
        autoplay: false
    };
    
    // Apply preferences
    applyUserPreferences(preferences);
    
    // Save preferences on changes
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('zimhub_preferences', JSON.stringify(preferences));
    });
    
    return preferences;
}

function applyUserPreferences(preferences) {
    // Theme
    if (preferences.theme === 'light') {
        document.body.classList.add('light-theme');
    }
    
    // Font size
    document.body.style.fontSize = {
        'small': '14px',
        'medium': '16px',
        'large': '18px'
    }[preferences.fontSize] || '16px';
    
    // Notifications
    if (!preferences.notifications) {
        console.log('Notifications disabled by user preference');
    }
}

// ===== THEME SWITCHER =====
function initThemeSwitcher() {
    // Create theme switcher button if not exists
    if (!document.getElementById('themeSwitcher')) {
        const themeBtn = document.createElement('button');
        themeBtn.id = 'themeSwitcher';
        themeBtn.className = 'theme-switcher';
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        themeBtn.title = 'Toggle Theme';
        
        document.body.appendChild(themeBtn);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .theme-switcher {
                position: fixed;
                bottom: 90px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: var(--accent-teal);
                color: var(--onyx-dark);
                border: none;
                border-radius: 50%;
                font-size: 1.2rem;
                cursor: pointer;
                z-index: 999;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s;
                box-shadow: var(--shadow-medium);
            }
            
            .theme-switcher:hover {
                background: var(--accent-orange);
                transform: rotate(30deg);
            }
            
            .light-theme {
                --onyx: #f5f5f5;
                --onyx-light: #ffffff;
                --onyx-dark: #e0e0e0;
                --light-gray: #424242;
                --pure-white: #121212;
            }
        `;
        document.head.appendChild(style);
        
        // Event listener
        themeBtn.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('themeSwitcher');
    const icon = themeBtn.querySelector('i');
    
    body.classList.toggle('light-theme');
    
    if (body.classList.contains('light-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        showNotification('Switched to Light Theme', 'info');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        showNotification('Switched to Dark Theme', 'info');
    }
    
    // Save preference
    const preferences = JSON.parse(localStorage.getItem('zimhub_preferences')) || {};
    preferences.theme = body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('zimhub_preferences', JSON.stringify(preferences));
}

// ===== ANALYTICS =====
function initAnalytics() {
    // Simple analytics tracking
    const analyticsData = {
        pageViews: parseInt(localStorage.getItem('zimhub_page_views') || '0'),
        sessionStart: new Date().toISOString(),
        currentPage: window.location.pathname
    };
    
    // Increment page views
    analyticsData.pageViews++;
    localStorage.setItem('zimhub_page_views', analyticsData.pageViews.toString());
    
    // Log page view
    logUserActivity('page_view', {
        page: analyticsData.currentPage,
        timestamp: new Date().toISOString()
    });
    
    // Track time on page
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.floor((new Date() - new Date(analyticsData.sessionStart)) / 1000);
        logUserActivity('time_spent', {
            page: analyticsData.currentPage,
            seconds: timeSpent
        });
    });
    
    return analyticsData;
}

function logUserActivity(type, data) {
    const activities = JSON.parse(localStorage.getItem('zimhub_activities') || '[]');
    activities.push({
        type,
        data,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    });
    
    // Keep only last 100 activities
    if (activities.length > 100) {
        activities.shift();
    }
    
    localStorage.setItem('zimhub_activities', JSON.stringify(activities));
    
    // Debug logging
    console.log(`Activity logged: ${type}`, data);
}

// ===== COOKIE CONSENT =====
function initCookieConsent() {
    // Check if consent already given
    if (localStorage.getItem('zimhub_cookie_consent') === 'accepted') {
        return;
    }
    
    // Show consent banner after delay
    setTimeout(() => {
        showCookieConsent();
    }, 2000);
}

function showCookieConsent() {
    const banner = document.createElement('div');
    banner.className = 'cookie-consent fade-in-up';
    banner.innerHTML = `
        <div class="cookie-content">
            <h3><i class="fas fa-cookie-bite"></i> Cookie Consent</h3>
            <p>We use cookies to enhance your experience, analyze site traffic, and personalize content. By continuing to use this site, you consent to our use of cookies.</p>
            <div class="cookie-buttons">
                <button class="cookie-accept btn-primary">
                    <i class="fas fa-check"></i> Accept All
                </button>
                <button class="cookie-settings btn-secondary">
                    <i class="fas fa-cog"></i> Settings
                </button>
                <button class="cookie-reject">
                    <i class="fas fa-times"></i> Reject
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(banner);
    
    // Add styles
    addCookieConsentStyles();
    
    // Event listeners
    banner.querySelector('.cookie-accept').addEventListener('click', () => {
        acceptCookies();
        banner.remove();
    });
    
    banner.querySelector('.cookie-reject').addEventListener('click', () => {
        rejectCookies();
        banner.remove();
    });
    
    banner.querySelector('.cookie-settings').addEventListener('click', showCookieSettings);
}

function addCookieConsentStyles() {
    if (!document.querySelector('#cookie-styles')) {
        const style = document.createElement('style');
        style.id = 'cookie-styles';
        style.textContent = `
            .cookie-consent {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: var(--onyx-light);
                padding: 20px;
                border-top: 3px solid var(--accent-teal);
                z-index: 9999;
                box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.3);
            }
            
            .cookie-content {
                max-width: 1200px;
                margin: 0 auto;
            }
            
            .cookie-content h3 {
                color: var(--accent-gold);
                margin-bottom: 10px;
            }
            
            .cookie-content p {
                color: var(--light-gray);
                margin-bottom: 20px;
                line-height: 1.6;
            }
            
            .cookie-buttons {
                display: flex;
                gap: 15px;
                flex-wrap: wrap;
            }
            
            .cookie-reject {
                padding: 10px 20px;
                background: transparent;
                border: 1px solid var(--medium-gray);
                color: var(--light-gray);
                border-radius: 5px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
    }
}

function acceptCookies() {
    localStorage.setItem('zimhub_cookie_consent', 'accepted');
    showNotification('Cookie preferences saved. Thank you!', 'success');
}

function rejectCookies() {
    localStorage.setItem('zimhub_cookie_consent', 'rejected');
    showNotification('Cookies rejected. Some features may be limited.', 'warning');
}

function showCookieSettings() {
    alert('Cookie settings modal would open here.\n\nIn a full implementation, users could choose:\n1. Essential cookies (always on)\n2. Analytics cookies\n3. Marketing cookies\n4. Preference cookies');
}

// ===== PAGE LOADER ENHANCEMENT =====
function initPageLoader() {
    // Remove loader after page load
    window.addEventListener('load', function() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    if (loader.parentNode) {
                        loader.remove();
                    }
                }, 500);
            }, 500);
        }
    });
}

// ===== PROJECT TIMELINE UPDATER =====
function updateProjectTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const currentDay = ZIMHUB_CONFIG.currentDay;
    
    timelineItems.forEach((item, index) => {
        const dayNumber = index + 1;
        
        if (dayNumber < currentDay) {
            item.classList.add('completed');
            const checkmark = document.createElement('span');
            checkmark.className = 'checkmark';
            checkmark.innerHTML = '<i class="fas fa-check"></i>';
            item.appendChild(checkmark);
        } else if (dayNumber === currentDay) {
            item.classList.add('current');
            const spinner = document.createElement('span');
            spinner.className = 'day-spinner';
            spinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            item.appendChild(spinner);
        }
    });
}

// ===== PAGE-SPECIFIC FEATURES DETECTION =====
function initPageSpecificFeatures() {
    const page = getCurrentPageType();
    
    switch(page) {
        case 'news':
            initNewsPage();
            break;
        case 'sports':
            initSportsPage();
            break;
        case 'jobs':
            initJobsPage();
            break;
        case 'scholarships':
            initScholarshipsPage();
            break;
        case 'business':
            initBusinessPage();
            break;
        default:
            initHomePage();
    }
}

// ===== HOME PAGE SPECIFIC =====
function initHomePage() {
    // Typing effect
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        initTypingEffect(typingElement);
    }
    
    // Trending tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns.length > 0) {
        initTrendingTabs();
    }
    
    // Stats counter animation
    const stats = document.querySelectorAll('.stat-value');
    if (stats.length > 0) {
        initStatsCounter();
    }
}

function initTypingEffect(element) {
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
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            element.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            element.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

function initTrendingTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active states
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
            
            // Load content for this tab
            loadTrendingContent(tabId);
        });
    });
    
    // Load initial content
    loadTrendingContent('news');
}

function loadTrendingContent(category) {
    const container = document.querySelector(`#${category}-tab .trending-grid`);
    if (!container) return;
    
    container.innerHTML = '<div class="loading-spinner"></div>';
    
    setTimeout(() => {
        const mockData = generateMockTrendingData(category);
        container.innerHTML = '';
        
        mockData.forEach((item, index) => {
            const itemElement = createTrendingItem(item, category, index);
            container.appendChild(itemElement);
        });
    }, 1000);
}

function generateMockTrendingData(category) {
    const data = {
        news: [
            { title: 'Economic Reforms Announced', category: 'Politics', time: '2h ago', reads: '1.2k' },
            { title: 'Tech Innovation Summit', category: 'Technology', time: '5h ago', reads: '850' },
            { title: 'Education Policy Changes', category: 'Education', time: '1d ago', reads: '2.3k' }
        ],
        jobs: [
            { title: 'Senior Developer', company: 'TechCorp', location: 'Harare', type: 'Full-time' },
            { title: 'Marketing Lead', company: 'Growth Ltd', location: 'Bulawayo', type: 'Contract' },
            { title: 'Finance Analyst', company: 'Bank ZW', location: 'Harare', type: 'Full-time' }
        ],
        sports: [
            { title: 'Warriors Win Match', sport: 'Football', time: 'Yesterday', views: '15k' },
            { title: 'Cricket Series Final', sport: 'Cricket', time: '2d ago', views: '8.5k' },
            { title: 'Boxing Championship', sport: 'Boxing', time: '3d ago', views: '12k' }
        ]
    };
    
    return data[category] || [];
}

function createTrendingItem(data, type, index) {
    const div = document.createElement('div');
    div.className = 'trending-item hover-lift fade-in-up';
    div.style.animationDelay = `${index * 0.1}s`;
    
    if (type === 'news') {
        div.innerHTML = `
            <div class="trending-badge news-bg">News</div>
            <h4>${data.title}</h4>
            <div class="trending-meta">
                <span><i class="fas fa-tag"></i> ${data.category}</span>
                <span><i class="fas fa-clock"></i> ${data.time}</span>
                <span><i class="fas fa-eye"></i> ${data.reads} reads</span>
            </div>
            <button class="btn-read" onclick="viewContent('news', '${data.title}')">
                Read More <i class="fas fa-arrow-right"></i>
            </button>
        `;
    } else if (type === 'jobs') {
        div.innerHTML = `
            <div class="trending-badge jobs-bg">Job</div>
            <h4>${data.title}</h4>
            <div class="trending-meta">
                <span><i class="fas fa-building"></i> ${data.company}</span>
                <span><i class="fas fa-map-marker-alt"></i> ${data.location}</span>
            </div>
            <button class="btn-apply" onclick="applyForJob('${data.title}')">
                Apply Now <i class="fas fa-paper-plane"></i>
            </button>
        `;
    } else if (type === 'sports') {
        div.innerHTML = `
            <div class="trending-badge sports-bg">Sports</div>
            <h4>${data.title}</h4>
            <div class="trending-meta">
                <span><i class="fas fa-baseball-bat-ball"></i> ${data.sport}</span>
                <span><i class="fas fa-calendar"></i> ${data.time}</span>
                <span><i class="fas fa-eye"></i> ${data.views} views</span>
            </div>
            <button class="btn-view" onclick="viewSports('${data.title}')">
                View Details <i class="fas fa-external-link-alt"></i>
            </button>
        `;
    }
    
    return div;
}

function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-value');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current).toLocaleString();
        }, 30);
    });
}

// ===== GLOBAL FUNCTIONS (accessible from HTML) =====
window.viewContent = function(type, title) {
    showNotification(`Opening ${type}: "${title}"`, 'info');
    // In production: navigate to content page
};

window.applyForJob = function(title) {
    showNotification(`Starting application for: "${title}"`, 'success');
    // In production: open application form
};

window.viewSports = function(title) {
    showNotification(`Loading sports details: "${title}"`, 'info');
    // In production: navigate to sports details
};

window.advancedSearch = function(term) {
    showNotification(`Advanced search for "${term}" coming soon!`, 'info');
};

window.clearSearch = function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
    }
    showNotification('Search cleared', 'info');
};

window.saveToRecentSearches = function(term) {
    let searches = JSON.parse(localStorage.getItem('zimhub_recent_searches') || '[]');
    searches = searches.filter(t => t !== term);
    searches.unshift(term);
    if (searches.length > 5) searches.pop();
    localStorage.setItem('zimhub_recent_searches', JSON.stringify(searches));
};

// ===== BACK TO TOP =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
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
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.dataset.animation || 'fadeInUp';
                const delay = entry.target.dataset.delay || '0';
                
                entry.target.style.animation = `${animation} 0.6s ease-out ${delay}s forwards`;
                entry.target.style.opacity = '1';
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('[data-animation]').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ===== REAL-TIME SUGGESTIONS =====
function showRealTimeSuggestions(term) {
    let container = document.getElementById('searchSuggestions');
    
    if (!container) {
        container = document.createElement('div');
        container.id = 'searchSuggestions';
        container.className = 'search-suggestions';
        document.querySelector('.search-wrapper').appendChild(container);
    }
    
    const suggestions = generateSuggestions(term);
    container.innerHTML = suggestions.map(s => `
        <div class="suggestion-item" data-term="${s}">
            <i class="fas fa-search"></i>
            <span>${highlightMatch(s, term)}</span>
        </div>
    `).join('');
    
    container.style.display = 'block';
    
    // Add click events
    container.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', function() {
            const term = this.getAttribute('data-term');
            document.getElementById('searchInput').value = term;
            hideSuggestions();
            // Trigger search
            document.getElementById('searchBtn').click();
        });
    });
}

function generateSuggestions(term) {
    const allSuggestions = [
        'Latest News Zimbabwe',
        'Sports Highlights',
        'Job Opportunities Harare',
        'Scholarships 2025',
        'Business Tips for Startups',
        'Football Scores',
        'Cricket Updates',
        'Tech Jobs',
        'Remote Work',
        'Financial Advice'
    ];
    
    return allSuggestions
        .filter(s => s.toLowerCase().includes(term))
        .slice(0, 5);
}

function highlightMatch(text, term) {
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<span class="match">$1</span>');
}

function hideSuggestions() {
    const container = document.getElementById('searchSuggestions');
    if (container) {
        container.style.display = 'none';
    }
}

// ===== PAGE-SPECIFIC INITIALIZERS =====
function initNewsPage() {
    console.log('Initializing News page features');
    // News-specific features will be handled in news.js
}

function initSportsPage() {
    console.log('Initializing Sports page features');
    // Sports-specific features will be handled in sports.js
}

function initJobsPage() {
    console.log('Initializing Jobs page features');
    // Jobs-specific features will be handled in jobs.js
}

function initScholarshipsPage() {
    console.log('Initializing Scholarships page features');
    // Scholarships-specific features will be handled in scholarships.js
}

function initBusinessPage() {
    console.log('Initializing Business page features');
    // Business-specific features will be handled in business.js
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== EXPORT FOR MODULE USE (Future) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ZIMHUB_CONFIG,
        showNotification,
        logUserActivity,
        debounce,
        throttle
    };
}