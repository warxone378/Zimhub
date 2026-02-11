// Jobs Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Jobs page loaded');
    
    // Apply buttons
    const applyBtns = document.querySelectorAll('.apply-btn');
    applyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const jobTitle = this.closest('.job-card').querySelector('h3').textContent;
            alert(`Application process for "${jobTitle}" will open in a new window.\n\nFeature coming soon!`);
        });
    });
    
    // Save buttons
    const saveBtns = document.querySelectorAll('.save-btn');
    saveBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const jobTitle = this.closest('.job-card').querySelector('h3').textContent;
            this.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
            this.style.background = 'var(--accent-teal)';
            this.style.color = 'var(--onyx-dark)';
            alert(`"${jobTitle}" saved to your favorites!`);
        });
    });
    
    // Filter jobs
    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Filtering...';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-search"></i> Filter Jobs';
                alert('Jobs filtered based on your criteria!');
            }, 1500);
        });
    }
    
    // CV Builder
    const cvBtn = document.querySelector('.cv-builder-btn');
    if (cvBtn) {
        cvBtn.addEventListener('click', function() {
            alert('CV Builder feature coming soon!\n\nYou will be able to:\n1. Choose professional templates\n2. Fill in your details\n3. Download PDF\n4. Share with employers');
        });
    }
});
// ZIMHUB - Jobs Page JavaScript
// Day 3: Advanced Job Features

document.addEventListener('DOMContentLoaded', function() {
    console.log('Jobs page loaded - Advanced features enabled');
    
    // Jobs data
    const jobsData = [
        {
            id: 1,
            title: 'Senior Software Developer',
            company: 'TechCorp Zimbabwe',
            location: 'Harare',
            type: 'fulltime',
            salary: '$2,500 - $3,500',
            description: 'We\'re looking for an experienced developer to join our growing team. Must have 3+ years experience with React and Node.js.',
            requirements: ['3+ years React', 'Node.js experience', 'AWS knowledge', 'Team leadership'],
            skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'Git'],
            posted: '2 days ago',
            applications: 45,
            remote: true,
            urgent: true
        },
        {
            id: 2,
            title: 'Marketing Manager',
            company: 'Growth Ltd',
            location: 'Bulawayo',
            type: 'fulltime',
            salary: '$2,000 - $2,800',
            description: 'Lead our marketing team and develop strategies to expand our market presence in the financial sector.',
            requirements: ['5+ years marketing', 'Digital marketing expertise', 'Team management', 'Analytics'],
            skills: ['Digital Marketing', 'SEO', 'Social Media', 'Analytics', 'Strategy'],
            posted: '1 week ago',
            applications: 32,
            remote: false,
            urgent: false
        },
        {
            id: 3,
            title: 'Finance Analyst',
            company: 'Bank of ZW',
            location: 'Harare',
            type: 'contract',
            salary: '$1,800 - $2,300',
            description: 'Analyze financial data and prepare reports for management decision making.',
            requirements: ['Finance degree', '2+ years experience', 'Excel advanced', 'Reporting skills'],
            skills: ['Financial Analysis', 'Excel', 'Reporting', 'Data Analysis'],
            posted: '3 days ago',
            applications: 28,
            remote: true,
            urgent: true
        },
        {
            id: 4,
            title: 'Graphic Designer',
            company: 'Creative Studio',
            location: 'Remote',
            type: 'parttime',
            salary: '$1,200 - $1,800',
            description: 'Create visual content for digital and print media for various clients.',
            requirements: ['Design portfolio', 'Adobe Creative Suite', '2+ years experience', 'Creativity'],
            skills: ['Photoshop', 'Illustrator', 'UI/UX', 'Branding'],
            posted: '5 days ago',
            applications: 19,
            remote: true,
            urgent: false
        }
    ];
    
    // State
    let filteredJobs = [...jobsData];
    let savedJobs = JSON.parse(localStorage.getItem('zimhub_saved_jobs') || '[]');
    let appliedJobs = JSON.parse(localStorage.getItem('zimhub_applied_jobs') || '[]');
    
    // Initialize
    initJobsPage();
    
    function initJobsPage() {
        renderJobs();
        setupFilters();
        setupJobApplications();
        setupCVBuilder();
        setupJobAlerts();
        loadUserData();
    }
    
    // ===== RENDER JOBS =====
    function renderJobs() {
        const container = document.querySelector('.jobs-grid') || document.querySelector('.jobs-list');
        if (!container) return;
        
        if (filteredJobs.length === 0) {
            container.innerHTML = `
                <div class="no-jobs">
                    <i class="fas fa-search"></i>
                    <h3>No jobs found</h3>
                    <p>Try adjusting your filters or search terms</p>
                    <button class="btn-primary" onclick="clearFilters()">
                        Clear Filters
                    </button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = filteredJobs.map((job, index) => createJobCard(job, index)).join('');
        
        // Update stats
        updateJobStats();
    }
    
    function createJobCard(job, index) {
        const isSaved = savedJobs.includes(job.id);
        const isApplied = appliedJobs.includes(job.id);
        
        return `
            <div class="job-card hover-lift" data-animation="fadeInUp" data-delay="${index * 0.1}">
                ${job.urgent ? '<div class="urgent-badge">URGENT</div>' : ''}
                <div class="job-header">
                    <div class="company-logo">
                        <i class="fas fa-building"></i>
                    </div>
                    <div class="job-title">
                        <h3>${job.title}</h3>
                        <p class="company-name">${job.company}</p>
                    </div>
                    <span class="job-type ${job.type}">${job.type}</span>
                </div>
                
                <div class="job-details">
                    <p class="job-description">${job.description}</p>
                    
                    <div class="job-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${job.location} ${job.remote ? '(Remote Available)' : ''}</span>
                        <span><i class="fas fa-money-bill-wave"></i> ${job.salary}/month</span>
                        <span><i class="fas fa-calendar"></i> ${job.posted}</span>
                        <span><i class="fas fa-users"></i> ${job.applications} applicants</span>
                    </div>
                    
                    <div class="job-skills">
                        ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                    
                    <div class="job-requirements">
                        <h4><i class="fas fa-list-check"></i> Requirements:</h4>
                        <ul>
                            ${job.requirements.map(req => `<li>${req}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="job-actions">
                    <button class="apply-btn ${isApplied ? 'applied' : ''}" data-id="${job.id}">
                        <i class="fas fa-paper-plane"></i> 
                        ${isApplied ? 'Applied' : 'Apply Now'}
                    </button>
                    <button class="save-btn ${isSaved ? 'saved' : ''}" data-id="${job.id}">
                        <i class="${isSaved ? 'fas' : 'far'} fa-bookmark"></i> 
                        ${isSaved ? 'Saved' : 'Save'}
                    </button>
                    <button class="details-btn" data-id="${job.id}">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                </div>
            </div>
        `;
    }
    
    // ===== FILTER SYSTEM =====
    function setupFilters() {
        const filterSelects = document.querySelectorAll('.filter-select');
        const filterBtn = document.querySelector('.filter-btn');
        
        filterSelects.forEach(select => {
            select.addEventListener('change', applyFilters);
        });
        
        if (filterBtn) {
            filterBtn.addEventListener('click', applyFilters);
        }
        
        // Quick filter chips
        const filterChips = document.querySelectorAll('.field-tag, .skill-tag');
        filterChips.forEach(chip => {
            chip.addEventListener('click', function() {
                const filterText = this.textContent;
                applyQuickFilter(filterText);
            });
        });
    }
    
    function applyFilters() {
        const location = document.querySelector('[data-filter="location"]')?.value;
        const type = document.querySelector('[data-filter="type"]')?.value;
        const industry = document.querySelector('[data-filter="industry"]')?.value;
        
        filteredJobs = jobsData.filter(job => {
            let match = true;
            
            if (location && location !== 'all') {
                if (location === 'remote') {
                    match = match && job.remote;
                } else {
                    match = match && job.location.toLowerCase().includes(location);
                }
            }
            
            if (type && type !== 'all') {
                match = match && job.type === type;
            }
            
            if (industry && industry !== 'all') {
                // Simple industry matching based on title/description
                const industryKeywords = {
                    'tech': ['software', 'developer', 'tech', 'programmer'],
                    'finance': ['finance', 'bank', 'analyst', 'accounting'],
                    'marketing': ['marketing', 'sales', 'advertising'],
                    'design': ['design', 'creative', 'graphic']
                };
                
                const keywords = industryKeywords[industry] || [];
                const jobText = (job.title + job.description).toLowerCase();
                match = match && keywords.some(keyword => jobText.includes(keyword));
            }
            
            return match;
        });
        
        renderJobs();
        
        // Show filter results
        showNotification(`Found ${filteredJobs.length} jobs matching your criteria`, 'info');
    }
    
    function applyQuickFilter(filterText) {
        filteredJobs = jobsData.filter(job => {
            const jobText = (job.title + job.description + job.skills.join(' ')).toLowerCase();
            return jobText.includes(filterText.toLowerCase());
        });
        
        renderJobs();
        
        showNotification(`Filtered by: ${filterText}`, 'info');
    }
    
    // ===== JOB APPLICATIONS =====
    function setupJobApplications() {
        // Use event delegation for dynamic buttons
        document.addEventListener('click', function(e) {
            if (e.target.closest('.apply-btn')) {
                const btn = e.target.closest('.apply-btn');
                const jobId = parseInt(btn.dataset.id);
                
                if (btn.classList.contains('applied')) {
                    showApplicationDetails(jobId);
                } else {
                    startApplicationProcess(jobId, btn);
                }
            }
            
            if (e.target.closest('.save-btn')) {
                const btn = e.target.closest('.save-btn');
                const jobId = parseInt(btn.dataset.id);
                toggleSaveJob(jobId, btn);
            }
            
            if (e.target.closest('.details-btn')) {
                const btn = e.target.closest('.details-btn');
                const jobId = parseInt(btn.dataset.id);
                showJobDetails(jobId);
            }
        });
    }
    
    function startApplicationProcess(jobId, button) {
        const job = jobsData.find(j => j.id === jobId);
        if (!job) return;
        
        // Show application modal
        const modal = document.createElement('div');
        modal.className = 'application-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-paper-plane"></i> Apply for ${job.title}</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <form class="application-form" id="applicationForm">
                        <div class="form-section">
                            <h4>Personal Information</h4>
                            <div class="form-group">
                                <label>Full Name *</label>
                                <input type="text" required>
                            </div>
                            <div class="form-group">
                                <label>Email *</label>
                                <input type="email" required>
                            </div>
                            <div class="form-group">
                                <label>Phone Number *</label>
                                <input type="tel" required>
                            </div>
                        </div>
                        
                        <div class="form-section">
                            <h4>Application Documents</h4>
                            <div class="form-group">
                                <label>Upload CV/Resume *</label>
                                <div class="file-upload">
                                    <input type="file" accept=".pdf,.doc,.docx" required>
                                    <span><i class="fas fa-upload"></i> Choose File</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Cover Letter (Optional)</label>
                                <textarea rows="4" placeholder="Tell us why you're the right candidate..."></textarea>
                            </div>
                        </div>
                        
                        <div class="form-section">
                            <h4>Additional Information</h4>
                            <div class="form-group">
                                <label>Expected Salary</label>
                                <input type="text" value="${job.salary}" readonly>
                            </div>
                            <div class="form-group">
                                <label>Notice Period</label>
                                <select>
                                    <option>Immediately</option>
                                    <option>2 weeks</option>
                                    <option>1 month</option>
                                    <option>2 months</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-actions">
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-paper-plane"></i> Submit Application
                            </button>
                            <button type="button" class="btn-secondary" onclick="saveDraft()">
                                <i class="fas fa-save"></i> Save Draft
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        addApplicationModalStyles();
        
        // Form submission
        const form = modal.querySelector('#applicationForm');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitApplication(jobId, form);
        });
        
        // Close modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => modal.remove(), 300);
        });
    }
    
    function submitApplication(jobId, form) {
        const job = jobsData.find(j => j.id === jobId);
        if (!job) return;
        
        // Simulate API call
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Success
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Application Sent!';
            submitBtn.style.background = 'var(--verdant)';
            
            // Update job applications count
            job.applications++;
            
            // Save to applied jobs
            appliedJobs.push(jobId);
            localStorage.setItem('zimhub_applied_jobs', JSON.stringify(appliedJobs));
            
            // Update UI
            const applyBtn = document.querySelector(`.apply-btn[data-id="${jobId}"]`);
            if (applyBtn) {
                applyBtn.classList.add('applied');
                applyBtn.innerHTML = '<i class="fas fa-check"></i> Applied';
            }
            
            // Show success message
            showNotification(`Application submitted for ${job.title}!`, 'success');
            
            // Close modal after delay
            setTimeout(() => {
                const modal = document.querySelector('.application-modal');
                if (modal) {
                    modal.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => modal.remove(), 300);
                }
            }, 2000);
            
            // Log activity
            logUserActivity('job_application', {
                jobId,
                title: job.title,
                company: job.company,
                timestamp: new Date().toISOString()
            });
            
        }, 2000);
    }
    
    function toggleSaveJob(jobId, button) {
        const job = jobsData.find(j => j.id === jobId);
        if (!job) return;
        
        const icon = button.querySelector('i');
        
        if (savedJobs.includes(jobId)) {
            // Remove from saved
            savedJobs = savedJobs.filter(id => id !== jobId);
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.innerHTML = '<i class="far fa-bookmark"></i> Save';
            button.classList.remove('saved');
            
            showNotification(`Removed ${job.title} from saved jobs`, 'info');
        } else {
            // Add to saved
            savedJobs.push(jobId);
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
            button.classList.add('saved');
            
            showNotification(`Saved ${job.title}`, 'success');
        }
        
        localStorage.setItem('zimhub_saved_jobs', JSON.stringify(savedJobs));
        
        // Update saved jobs count
        updateSavedJobsCount();
    }
    
    function showJobDetails(jobId) {
        const job = jobsData.find(j => j.id === jobId);
        if (!job) return;
        
        const modal = document.createElement('div');
        modal.className = 'job-details-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${job.title} at ${job.company}</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="job-overview">
                        <div class="overview-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <span>Location</span>
                                <strong>${job.location} ${job.remote ? '(Remote Available)' : ''}</strong>
                            </div>
                        </div>
                        <div class="overview-item">
                            <i class="fas fa-money-bill-wave"></i>
                            <div>
                                <span>Salary</span>
                                <strong>${job.salary}/month</strong>
                            </div>
                        </div>
                        <div class="overview-item">
                            <i class="fas fa-briefcase"></i>
                            <div>
                                <span>Job Type</span>
                                <strong>${job.type}</strong>
                            </div>
                        </div>
                        <div class="overview-item">
                            <i class="fas fa-users"></i>
                            <div>
                                <span>Applicants</span>
                                <strong>${job.applications}</strong>
                            </div>
                        </div>
                    </div>
                    
                    <div class="job-description-full">
                        <h4>Job Description</h4>
                        <p>${job.description}</p>
                        
                        <h4>Requirements</h4>
                        <ul>
                            ${job.requirements.map(req => `<li>${req}</li>`).join('')}
                        </ul>
                        
                        <h4>Required Skills</h4>
                        <div class="skills-list">
                            ${job.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="company-info">
                        <h4>About ${job.company}</h4>
                        <p>Leading company in their sector with excellent growth opportunities and employee benefits.</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" onclick="startApplicationProcess(${jobId})">
                        <i class="fas fa-paper-plane"></i> Apply Now
                    </button>
                    <button class="btn-secondary" onclick="toggleSaveJob(${jobId})">
                        <i class="${savedJobs.includes(jobId) ? 'fas' : 'far'} fa-bookmark"></i> 
                        ${savedJobs.includes(jobId) ? 'Saved' : 'Save Job'}
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        addJobDetailsStyles();
        
        // Close modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => modal.remove(), 300);
        });
    }
    
    // ===== CV BUILDER =====
    function setupCVBuilder() {
        const cvBtn = document.querySelector('.cv-builder-btn');
        if (!cvBtn) return;
        
        cvBtn.addEventListener('click', function() {
            showCVBuilder();
        });
    }
    
    function showCVBuilder() {
        const modal = document.createElement('div');
        modal.className = 'cv-builder-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-file-alt"></i> CV Builder</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="cv-templates">
                        <h4>Choose a Template</h4>
                        <div class="templates-grid">
                            <div class="template selected" data-template="modern">
                                <div class="template-preview modern-preview"></div>
                                <span>Modern</span>
                            </div>
                            <div class="template" data-template="professional">
                                <div class="template-preview professional-preview"></div>
                                <span>Professional</span>
                            </div>
                            <div class="template" data-template="creative">
                                <div class="template-preview creative-preview"></div>
                                <span>Creative</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="cv-sections">
                        <h4>Fill Your Information</h4>
                        <div class="section">
                            <h5>Personal Details</h5>
                            <div class="form-row">
                                <input type="text" placeholder="Full Name">
                                <input type="text" placeholder="Job Title">
                            </div>
                        </div>
                        
                        <div class="section">
                            <h5>Work Experience</h5>
                            <textarea placeholder="Describe your work experience..."></textarea>
                        </div>
                        
                        <div class="section">
                            <h5>Education</h5>
                            <textarea placeholder="List your education..."></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" onclick="generateCV()">
                        <i class="fas fa-download"></i> Generate CV
                    </button>
                    <button class="btn-secondary" onclick="previewCV()">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        addCVBuilderStyles();
        
        // Template selection
        modal.querySelectorAll('.template').forEach(template => {
            template.addEventListener('click', function() {
                modal.querySelectorAll('.template').forEach(t => t.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
        
        // Close modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => modal.remove(), 300);
        });
    }
    
    // ===== JOB ALERTS =====
    function setupJobAlerts() {
        const alertBtn = document.querySelector('.alert-subscribe');
        if (!alertBtn) return;
        
        alertBtn.addEventListener('click', function() {
            const emailInput = this.previousElementSibling;
            const email = emailInput.value.trim();
            
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email', 'error');
                return;
            }
            
            // Save job alert subscription
            let alerts = JSON.parse(localStorage.getItem('zimhub_job_alerts') || '[]');
            alerts.push({
                email,
                frequency: 'daily',
                categories: ['all'],
                created: new Date().toISOString()
            });
            
            localStorage.setItem('zimhub_job_alerts', JSON.stringify(alerts));
            
            showNotification('Job alerts subscription activated!', 'success');
            emailInput.value = '';
        });
    }
    
    // ===== UTILITY FUNCTIONS =====
    function updateJobStats() {
        const stats = {
            total: jobsData.length,
            remote: jobsData.filter(j => j.remote).length,
            urgent: jobsData.filter(j => j.urgent).length,
            saved: savedJobs.length
        };
        
        // Update stats display if exists
        const statsElement = document.querySelector('.job-stats');
        if (statsElement) {
            statsElement.innerHTML = `
                <div class="stat">
                    <i class="fas fa-briefcase"></i>
                    <span>${stats.total} Jobs</span>
                </div>
                <div class="stat">
                    <i class="fas fa-home"></i>
                    <span>${stats.remote} Remote</span>
                </div>
                <div class="stat">
                    <i class="fas fa-bell"></i>
                    <span>${stats.urgent} Urgent</span>
                </div>
                <div class="stat">
                    <i class="fas fa-bookmark"></i>
                    <span>${stats.saved} Saved</span>
                </div>
            `;
        }
    }
    
    function updateSavedJobsCount() {
        savedJobs = JSON.parse(localStorage.getItem('zimhub_saved_jobs') || '[]');
        updateJobStats();
    }
    
    function loadUserData() {
        // Load saved and applied jobs
        savedJobs = JSON.parse(localStorage.getItem('zimhub_saved_jobs') || '[]');
        appliedJobs = JSON.parse(localStorage.getItem('zimhub_applied_jobs') || '[]');
        
        updateJobStats();
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ===== STYLES =====
    function addApplicationModalStyles() {
        if (!document.querySelector('#application-modal-styles')) {
            const style = document.createElement('style');
            style.id = 'application-modal-styles';
            style.textContent = `
                .application-modal {
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
                    overflow-y: auto;
                    padding: 20px;
                }
                
                .application-modal .modal-content {
                    background: var(--onyx-light);
                    border-radius: 15px;
                    width: 100%;
                    max-width: 700px;
                    max-height: 90vh;
                    overflow-y: auto;
                    animation: zoomIn 0.3s ease;
                }
                
                .application-modal .modal-body {
                    padding: 30px;
                }
                
                .form-section {
                    margin-bottom: 30px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid var(--medium-gray);
                }
                
                .form-section h4 {
                    color: var(--accent-gold);
                    margin-bottom: 20px;
                }
                
                .form-group {
                    margin-bottom: 20px;
                }
                
                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    color: var(--accent-teal);
                    font-weight: 500;
                }
                
                .form-group input,
                .form-group textarea,
                .form-group select {
                    width: 100%;
                    padding: 12px;
                    background: var(--onyx);
                    border: 1px solid var(--medium-gray);
                    border-radius: 5px;
                    color: var(--light-gray);
                }
                
                .file-upload {
                    position: relative;
                }
                
                .file-upload input[type="file"] {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    cursor: pointer;
                }
                
                .file-upload span {
                    display: inline-block;
                    padding: 12px 20px;
                    background: var(--royale);
                    border-radius: 5px;
                    color: var(--accent-teal);
                    cursor: pointer;
                }
                
                .form-row {
                    display: flex;
                    gap: 15px;
                }
                
                .form-row .form-group {
                    flex: 1;
                }
                
                .form-actions {
                    display: flex;
                    gap: 15px;
                    margin-top: 30px;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function addJobDetailsStyles() {
        if (!document.querySelector('#job-details-styles')) {
            const style = document.createElement('style');
            style.id = 'job-details-styles';
            style.textContent = `
                .job-details-modal {
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
                    padding: 20px;
                }
                
                .job-details-modal .modal-content {
                    background: var(--onyx-light);
                    border-radius: 15px;
                    width: 100%;
                    max-width: 800px;
                    max-height: 90vh;
                    overflow-y: auto;
                    animation: zoomIn 0.3s ease;
                }
                
                .job-details-modal .modal-body {
                    padding: 30px;
                }
                
                .job-overview {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid var(--medium-gray);
                }
                
                .overview-item {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                
                .overview-item i {
                    font-size: 1.5rem;
                    color: var(--accent-teal);
                }
                
                .overview-item span {
                    display: block;
                    color: var(--accent-teal);
                    font-size: 0.9rem;
                }
                
                .overview-item strong {
                    color: var(--pure-white);
                    font-size: 1.1rem;
                }
                
                .job-description-full h4 {
                    color: var(--accent-gold);
                    margin: 20px 0 10px;
                }
                
                .skills-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-top: 10px;
                }
                
                .skill {
                    padding: 5px 15px;
                    background: var(--royale);
                    color: var(--accent-teal);
                    border-radius: 20px;
                    font-size: 0.9rem;
                }
                
                .company-info {
                    margin-top: 30px;
                    padding: 20px;
                    background: var(--onyx);
                    border-radius: 10px;
                }
                
                .job-details-modal .modal-footer {
                    padding: 20px 30px;
                    border-top: 1px solid var(--medium-gray);
                    display: flex;
                    gap: 15px;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function addCVBuilderStyles() {
        if (!document.querySelector('#cv-builder-styles')) {
            const style = document.createElement('style');
            style.id = 'cv-builder-styles';
            style.textContent = `
                .cv-builder-modal {
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
                    padding: 20px;
                }
                
                .cv-builder-modal .modal-content {
                    background: var(--onyx-light);
                    border-radius: 15px;
                    width: 100%;
                    max-width: 900px;
                    max-height: 90vh;
                    overflow-y: auto;
                    animation: zoomIn 0.3s ease;
                }
                
                .cv-templates {
                    margin-bottom: 30px;
                }
                
                .templates-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 20px;
                    margin-top: 20px;
                }
                
                .template {
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                
                .template.selected {
                    transform: translateY(-5px);
                }
                
                .template-preview {
                    height: 200px;
                    border-radius: 10px;
                    margin-bottom: 10px;
                    border: 3px solid transparent;
                }
                
                .template.selected .template-preview {
                    border-color: var(--accent-teal);
                }
                
                .modern-preview {
                    background: linear-gradient(45deg, #4776E6, #8E54E9);
                }
                
                .professional-preview {
                    background: linear-gradient(45deg, #4ecdc4, #44a08d);
                }
                
                .creative-preview {
                    background: linear-gradient(45deg, #ff6b6b, #ff8e53);
                }
                
                .cv-sections {
                    margin-top: 30px;
                }
                
                .section {
                    margin-bottom: 25px;
                }
                
                .section h5 {
                    color: var(--accent-teal);
                    margin-bottom: 15px;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Global functions
    window.clearFilters = function() {
        filteredJobs = [...jobsData];
        renderJobs();
        showNotification('Filters cleared', 'info');
    };
    
    window.generateCV = function() {
        showNotification('CV generation feature coming soon!', 'info');
    };
    
    window.previewCV = function() {
        showNotification('CV preview feature coming soon!', 'info');
    };
    
    window.showApplicationDetails = function(jobId) {
        showNotification('Application details feature coming soon!', 'info');
    };
});