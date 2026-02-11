// Business Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Business page loaded');
    
    // Financial tools
    const toolBtns = document.querySelectorAll('.use-tool-btn');
    toolBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const toolName = this.closest('.tool-card').querySelector('h3').textContent;
            alert(`${toolName} launching soon!\n\nThis tool will help you make informed financial decisions for your business.`);
        });
    });
    
    // Article links
    const articleBtns = document.querySelectorAll('.read-article-btn');
    articleBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const articleTitle = this.closest('.article-card').querySelector('h3').textContent;
            alert(`Opening article: ${articleTitle}\n\nFull article feature coming soon with detailed business insights and strategies.`);
        });
    });
    
    // Consultation booking
    const consultBtn = document.querySelector('.consult-btn');
    if (consultBtn) {
        consultBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Business consultation booking feature coming soon!\n\nYou will be able to:\n1. Choose consultation type\n2. Select time slot\n3. Meet with business experts\n4. Get personalized advice');
        });
    }
    
    // Subscribe to newsletter
    const subscribeBtn = document.querySelector('.subscribe-btn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function() {
            const emailInput = this.previousElementSibling;
            if (emailInput.value.includes('@')) {
                this.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                this.style.background = 'var(--verdant)';
                alert('Thank you for subscribing to business insights!\n\nYou will receive weekly tips and market analysis.');
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});