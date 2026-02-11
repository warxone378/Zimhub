// ===========================================
// ZIMHUB - API CLIENT
// Created by Talent Hondo (TH7MEDIA)
// Day 4: API Integration
// ===========================================

class ZIMHUB_API {
    constructor() {
        this.baseURL = window.location.origin.includes('localhost') 
            ? 'http://localhost/zimhub/php/api' 
            : 'https://yourdomain.com/zimhub/php/api';
        
        this.endpoints = {
            news: '/news.php',
            jobs: '/jobs.php',
            sports: '/sports.php',
            scholarships: '/scholarships.php',
            business: '/business.php',
            contact: '/contact.php',
            newsletter: '/newsletter.php'
        };
    }
    
    // ===== GENERAL REQUEST METHOD =====
    async request(endpoint, method = 'GET', data = null) {
        const url = this.baseURL + endpoint;
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'same-origin'
        };
        
        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }
        
        try {
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.message || 'Request failed');
            }
            
            return result;
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }
    
    // ===== NEWS API =====
    async getNews(params = {}) {
        const queryString = this.buildQueryString(params);
        return await this.request(`${this.endpoints.news}${queryString}`);
    }
    
    async getNewsById(id) {
        return await this.request(`${this.endpoints.news}?id=${id}`);
    }
    
    async getNewsByCategory(category, limit = 10) {
        return await this.request(`${this.endpoints.news}?category=${category}&limit=${limit}`);
    }
    
    async getFeaturedNews(limit = 5) {
        return await this.request(`${this.endpoints.news}?featured=true&limit=${limit}`);
    }
    
    // ===== JOBS API =====
    async getJobs(params = {}) {
        const queryString = this.buildQueryString(params);
        return await this.request(`${this.endpoints.jobs}${queryString}`);
    }
    
    async getJobById(id) {
        return await this.request(`${this.endpoints.jobs}?id=${id}`);
    }
    
    async getFeaturedJobs(limit = 5) {
        return await this.request(`${this.endpoints.jobs}?featured=true&limit=${limit}`);
    }
    
    async applyForJob(jobId, applicationData) {
        return await this.request(`${this.endpoints.jobs}/apply`, 'POST', {
            job_id: jobId,
            ...applicationData
        });
    }
    
    // ===== SPORTS API =====
    async getSportsEvents(params = {}) {
        const queryString = this.buildQueryString(params);
        return await this.request(`${this.endpoints.sports}${queryString}`);
    }
    
    async getLiveEvents() {
        return await this.request(`${this.endpoints.sports}?status=live&limit=10`);
    }
    
    async getUpcomingEvents(sportType = null) {
        const params = { upcoming: true, limit: 10 };
        if (sportType) params.sport_type = sportType;
        return await this.request(`${this.endpoints.sports}?${this.buildQueryString(params)}`);
    }
    
    // ===== SCHOLARSHIPS API =====
    async getScholarships(params = {}) {
        const queryString = this.buildQueryString(params);
        return await this.request(`${this.endpoints.scholarships}${queryString}`);
    }
    
    async getScholarshipById(id) {
        return await this.request(`${this.endpoints.scholarships}?id=${id}`);
    }
    
    async getScholarshipsByType(type, limit = 10) {
        return await this.request(`${this.endpoints.scholarships}?type=${type}&limit=${limit}`);
    }
    
    async getUrgentScholarships(days = 7) {
        return await this.request(`${this.endpoints.scholarships}?urgent=true&days=${days}`);
    }
    
    // ===== BUSINESS TIPS API =====
    async getBusinessTips(params = {}) {
        const queryString = this.buildQueryString(params);
        return await this.request(`${this.endpoints.business}${queryString}`);
    }
    
    async getBusinessTipById(id) {
        return await this.request(`${this.endpoints.business}?id=${id}`);
    }
    
    async getBusinessTipsByCategory(category, limit = 10) {
        return await this.request(`${this.endpoints.business}?category=${category}&limit=${limit}`);
    }
    
    // ===== CONTACT API =====
    async sendContactMessage(messageData) {
        return await this.request(this.endpoints.contact, 'POST', messageData);
    }
    
    // ===== NEWSLETTER API =====
    async subscribeToNewsletter(email, name = '', frequency = 'weekly') {
        return await this.request(this.endpoints.newsletter, 'POST', {
            email: email,
            name: name,
            frequency: frequency
        });
    }
    
    // ===== SEARCH API =====
    async searchAll(query, limit = 20) {
        // Search across all content types
        const [news, jobs, scholarships, sports, business] = await Promise.all([
            this.getNews({ search: query, limit: Math.ceil(limit/5) }),
            this.getJobs({ search: query, limit: Math.ceil(limit/5) }),
            this.getScholarships({ search: query, limit: Math.ceil(limit/5) }),
            this.getSportsEvents({ search: query, limit: Math.ceil(limit/5) }),
            this.getBusinessTips({ search: query, limit: Math.ceil(limit/5) })
        ]);
        
        return {
            success: true,
            data: {
                news: news.data || [],
                jobs: jobs.data || [],
                scholarships: scholarships.data || [],
                sports: sports.data || [],
                business: business.data || []
            },
            counts: {
                news: news.pagination?.total || 0,
                jobs: jobs.pagination?.total || 0,
                scholarships: scholarships.pagination?.total || 0,
                sports: sports.pagination?.total || 0,
                business: business.pagination?.total || 0
            }
        };
    }
    
    // ===== STATISTICS API =====
    async getSiteStats(days = 30) {
        return await this.request(`/stats.php?days=${days}`);
    }
    
    // ===== UTILITY METHODS =====
    buildQueryString(params) {
        if (!params || Object.keys(params).length === 0) {
            return '';
        }
        
        const queryParams = new URLSearchParams();
        
        Object.entries(params).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                queryParams.append(key, value);
            }
        });
        
        return '?' + queryParams.toString();
    }
    
    // ===== CACHING METHODS =====
    async getWithCache(endpoint, params = {}, cacheKey = null, ttl = 300000) {
        // 5 minutes default cache
        if (!cacheKey) {
            cacheKey = endpoint + JSON.stringify(params);
        }
        
        const now = Date.now();
        const cached = localStorage.getItem(`cache_${cacheKey}`);
        
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            
            if (now - timestamp < ttl) {
                return {
                    success: true,
                    data: data,
                    cached: true,
                    timestamp: timestamp
                };
            }
        }
        
        try {
            const result = await this.request(endpoint + this.buildQueryString(params));
            
            if (result.success) {
                localStorage.setItem(`cache_${cacheKey}`, JSON.stringify({
                    data: result.data,
                    timestamp: now
                }));
            }
            
            return { ...result, cached: false, timestamp: now };
        } catch (error) {
            // Return cached data even if expired as fallback
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                return {
                    success: true,
                    data: data,
                    cached: true,
                    timestamp: timestamp,
                    error: 'Using cached data due to network error'
                };
            }
            
            throw error;
        }
    }
    
    clearCache() {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('cache_')) {
                localStorage.removeItem(key);
            }
        });
    }
    
    // ===== ERROR HANDLING =====
    handleApiError(error, fallbackData = []) {
        console.error('API Error:', error);
        
        // Show user-friendly error message
        const errorMessage = error.message || 'Unable to load data. Please check your connection.';
        
        // Return fallback data if available
        return {
            success: false,
            message: errorMessage,
            data: fallbackData
        };
    }
    
    // ===== FORM DATA HELPERS =====
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    validatePhone(phone) {
        const re = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        return re.test(phone);
    }
    
    validateRequired(fields, data) {
        const errors = [];
        
        fields.forEach(field => {
            if (!data[field] || data[field].toString().trim() === '') {
                errors.push(`${field} is required`);
            }
        });
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
    
    // ===== FILE UPLOAD =====
    async uploadFile(file, type = 'image') {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);
        
        const response = await fetch(`${this.baseURL}/upload.php`, {
            method: 'POST',
            body: formData,
            credentials: 'same-origin'
        });
        
        if (!response.ok) {
            throw new Error('File upload failed');
        }
        
        return await response.json();
    }
}

// ===== CREATE GLOBAL INSTANCE =====
const zimhubAPI = new ZIMHUB_API();

// ===== EXPORT FOR MODULE USE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ZIMHUB_API, zimhubAPI };
}

// ===== GLOBAL EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
    // Auto-initialize API for all pages
    if (typeof window.zimhubAPI === 'undefined') {
        window.zimhubAPI = zimhubAPI;
        console.log('ZIMHUB API initialized');
    }
    
    // Handle contact forms automatically
    document.querySelectorAll('.contact-form').forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Get submit button
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                const result = await zimhubAPI.sendContactMessage(data);
                
                if (result.success) {
                    // Show success message
                    showNotification(result.message, 'success');
                    
                    // Reset form
                    this.reset();
                    
                    // Add success class
                    this.classList.add('submitted');
                } else {
                    showNotification(result.message, 'error');
                }
            } catch (error) {
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    });
    
    // Handle newsletter subscriptions
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            if (!emailInput || !submitBtn) return;
            
            const email = emailInput.value.trim();
            
            if (!zimhubAPI.validateEmail(email)) {
                showNotification('Please enter a valid email address', 'warning');
                emailInput.focus();
                return;
            }
            
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            try {
                const result = await zimhubAPI.subscribeToNewsletter(email);
                
                if (result.success) {
                    showNotification('Successfully subscribed to newsletter!', 'success');
                    emailInput.value = '';
                    
                    // Update button to show success
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                    submitBtn.style.background = 'var(--verdant)';
                    
                    // Reset after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    showNotification(result.message, 'error');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            } catch (error) {
                showNotification('Subscription failed. Please try again.', 'error');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    });
});

// ===== HELPER FUNCTION =====
function showNotification(message, type = 'info') {
    // Use existing notification function or create simple alert
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
    } else {
        alert(`${type.toUpperCase()}: ${message}`);
    }
}