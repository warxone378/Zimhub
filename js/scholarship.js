// Scholarships Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Scholarships page loaded');
    
    // Apply buttons
    const applyBtns = document.querySelectorAll('.apply-btn');
    applyBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const scholarship = this.closest('.scholarship-card').querySelector('h3').textContent;
            alert(`Starting application for: ${scholarship}\n\nYou will need:\n1. Academic transcripts\n2. Recommendation letters\n3. Personal statement\n4. Proof of citizenship`);
        });
    });
    
    // Category cards
    const categoryCards = document.querySelectorAll('[data-category]');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            alert(`Loading ${category} scholarships...\n\nFeature coming soon!`);
        });
    });
    
    // Get help button
    const helpBtn = document.querySelector('.help-btn');
    if (helpBtn) {
        helpBtn.addEventListener('click', function() {
            alert('Free scholarship advice service coming soon!\n\nOur advisors will help you:\n1. Find suitable scholarships\n2. Prepare applications\n3. Write compelling essays\n4. Prepare for interviews');
        });
    }
});