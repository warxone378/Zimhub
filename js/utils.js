// ZIMHUB - Utility Functions
// Common functions used across the website

// ===== DATE & TIME UTILITIES =====
const DateUtils = {
    formatDate: (date, format = 'medium') => {
        const d = new Date(date);
        const options = {
            'short': { day: 'numeric', month: 'short' },
            'medium': { day: 'numeric', month: 'long', year: 'numeric' },
            'long': { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
        };
        
        return d.toLocaleDateString('en-US', options[format] || options.medium);
    },
    
    timeAgo: (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + ' years ago';
        
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + ' months ago';
        
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + ' days ago';
        
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + ' hours ago';
        
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + ' minutes ago';
        
        return Math.floor(seconds) + ' seconds ago';
    },
    
    getCurrentDay: () => {
        const startDate = new Date('2025-02-09');
        const today = new Date();
        const diffTime = Math.abs(today - startDate);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
};

// ===== STRING UTILITIES =====
const StringUtils = {
    truncate: (text, length = 100) => {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    },
    
    capitalize: (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },
    
    slugify: (text) => {
        return text.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-')
            .trim();
    },
    
    highlight: (text, term) => {
        if (!term) return text;
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }
};

// ===== VALIDATION UTILITIES =====
const ValidationUtils = {
    email: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    phone: (phone) => {
        const re = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        return re.test(phone);
    },
    
    password: (password) => {
        return password.length >= 8;
    },
    
    url: (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
};

// ===== STORAGE UTILITIES =====
const StorageUtils = {
    set: (key, value) => {
        try {
            localStorage.setItem(`zimhub_${key}`, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    },
    
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(`zimhub_${key}`);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Storage error:', error);
            return defaultValue;
        }
    },
    
    remove: (key) => {
        localStorage.removeItem(`zimhub_${key}`);
    },
    
    clear: () => {
        localStorage.clear();
    }
};

// ===== DOM UTILITIES =====
const DOMUtils = {
    createElement: (tag, attributes = {}, children = []) => {
        const element = document.createElement(tag);
        
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'textContent') {
                element.textContent = value;
            } else if (key === 'innerHTML') {
                element.innerHTML = value;
            } else {
                element.setAttribute(key, value);
            }
        });
        
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        });
        
        return element;
    },
    
    fadeIn: (element, duration = 300) => {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let opacity = 0;
        const interval = 10;
        const increment = interval / duration;
        
        const fade = setInterval(() => {
            opacity += increment;
            element.style.opacity = opacity;
            
            if (opacity >= 1) {
                clearInterval(fade);
            }
        }, interval);
    },
    
    fadeOut: (element, duration = 300) => {
        let opacity = 1;
        const interval = 10;
        const decrement = interval / duration;
        
        const fade = setInterval(() => {
            opacity -= decrement;
            element.style.opacity = opacity;
            
            if (opacity <= 0) {
                clearInterval(fade);
                element.style.display = 'none';
            }
        }, interval);
    }
};

// ===== NETWORK UTILITIES =====
const NetworkUtils = {
    fetchJSON: async (url, options = {}) => {
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    },
    
    postJSON: async (url, data, options = {}) => {
        return NetworkUtils.fetchJSON(url, {
            method: 'POST',
            body: JSON.stringify(data),
            ...options
        });
    }
};

// ===== PERFORMANCE UTILITIES =====
const PerformanceUtils = {
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    throttle: (func, limit) => {
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
    },
    
    measure: (label, func) => {
        console.time(label);
        const result = func();
        console.timeEnd(label);
        return result;
    }
};

// ===== EXPORT =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DateUtils,
        StringUtils,
        ValidationUtils,
        StorageUtils,
        DOMUtils,
        NetworkUtils,
        PerformanceUtils
    };
}