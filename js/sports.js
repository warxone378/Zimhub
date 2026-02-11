// Sports Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sports page loaded');
    
    // Simulate live score updates
    function updateLiveScores() {
        const scores = document.querySelectorAll('.score');
        scores.forEach(score => {
            if (Math.random() > 0.7) {
                const current = parseInt(score.textContent.split(' - ')[0]);
                const newScore = `${current + 1} - ${score.textContent.split(' - ')[1]}`;
                score.textContent = newScore;
                score.classList.add('pulse');
                setTimeout(() => score.classList.remove('pulse'), 1000);
            }
        });
    }
    
    // Update scores every 30 seconds
    setInterval(updateLiveScores, 30000);
    
    // Watch highlights buttons
    const highlightBtns = document.querySelectorAll('.match-highlights');
    highlightBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Highlights feature coming soon! Would link to video highlights.');
        });
    });
});
// ZIMHUB - Sports Page JavaScript
// Day 3: Advanced Sports Features

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sports page loaded - Advanced features enabled');
    
    // Sports data
    const sportsData = {
        football: {
            liveMatches: [
                { id: 1, team1: 'Dynamos FC', team2: 'Highlanders FC', score1: 2, score2: 1, minute: '65\'', status: 'live' },
                { id: 2, team1: 'CAPS United', team2: 'FC Platinum', score1: 1, score2: 0, minute: '45\'', status: 'live' }
            ],
            upcoming: [
                { id: 3, team1: 'Warriors', team2: 'Zambia', date: '20 Feb 2025', time: '15:00', venue: 'National Stadium' },
                { id: 4, team1: 'Chicken Inn', team2: 'Ngezi Platinum', date: '22 Feb 2025', time: '18:00', venue: 'Barbourfields' }
            ],
            results: [
                { id: 5, team1: 'Manica Diamonds', team2: 'Bulawayo Chiefs', score1: 3, score2: 2, status: 'FT' },
                { id: 6, team1: 'Triangle United', team2: 'Harare City', score1: 1, score2: 1, status: 'FT' }
            ]
        },
        cricket: {
            liveMatches: [
                { id: 7, team1: 'Mountaineers', team2: 'Rhinos', score1: '245/6', score2: '198/8', over: '40', status: 'live' }
            ],
            upcoming: [
                { id: 8, team1: 'Zimbabwe', team2: 'India', date: '25 Feb 2025', time: '10:00', venue: 'Harare Sports Club' }
            ]
        },
        rugby: {
            upcoming: [
                { id: 9, team1: 'Sables', team2: 'Kenya', date: '15 Feb 2025', time: '14:30', venue: 'Hartsfield' }
            ]
        }
    };
    
    // Initialize
    initSportsPage();
    
    function initSportsPage() {
        setupLiveScores();
        setupMatchFilters();
        setupTeamFollow();
        setupSportsCalendar();
        setupHighlightVideos();
    }
    
    // ===== LIVE SCORES =====
    function setupLiveScores() {
        const ticker = document.querySelector('.live-scores-ticker');
        if (!ticker) return;
        
        function updateLiveScores() {
            const liveMatches = [
                ...sportsData.football.liveMatches,
                ...sportsData.cricket.liveMatches
            ];
            
            if (liveMatches.length === 0) {
                ticker.style.display = 'none';
                return;
            }
            
            const match = liveMatches[0]; // Show first live match
            const content = ticker.querySelector('.ticker-content');
            
            if (content) {
                content.innerHTML = `
                    <div class="live-match">
                        <span class="team">${match.team1}</span>
                        <span class="score">${match.score1} - ${match.score2}</span>
                        <span class="team">${match.team2}</span>
                        <span class="match-status">
                            ${match.minute ? `⚽ ${match.minute}` : `🏏 Over ${match.over}`}
                        </span>
                    </div>
                `;
            }
            
            // Simulate score updates
            if (Math.random() > 0.7 && match.status === 'live') {
                simulateScoreUpdate(match);
            }
        }
        
        // Update every 30 seconds
        updateLiveScores();
        setInterval(updateLiveScores, 30000);
        
        // Add click to view details
        ticker.addEventListener('click', function() {
            showMatchDetails(sportsData.football.liveMatches[0]);
        });
    }
    
    function simulateScoreUpdate(match) {
        // Randomly update scores for simulation
        if (Math.random() > 0.5) {
            match.score1++;
        } else {
            match.score2++;
        }
        
        // Update minute/over
        if (match.minute) {
            const currentMin = parseInt(match.minute);
            if (currentMin < 90) match.minute = (currentMin + 1) + "'";
        }
        
        if (match.over) {
            const currentOver = parseInt(match.over);
            if (currentOver < 50) match.over = currentOver + 1;
        }
    }
    
    // ===== MATCH DETAILS MODAL =====
    function showMatchDetails(match) {
        const modal = document.createElement('div');
        modal.className = 'match-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-futbol"></i> Match Details</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="match-teams">
                        <div class="team">
                            <div class="team-logo">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <span class="team-name">${match.team1}</span>
                        </div>
                        <div class="match-score">
                            <span class="score">${match.score1} - ${match.score2}</span>
                            <span class="match-status">${match.status}</span>
                        </div>
                        <div class="team">
                            <div class="team-logo">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <span class="team-name">${match.team2}</span>
                        </div>
                    </div>
                    
                    <div class="match-stats">
                        <div class="stat">
                            <span>Possession</span>
                            <div class="stat-bar">
                                <div class="stat-fill team1" style="width: 55%">55%</div>
                                <div class="stat-fill team2" style="width: 45%">45%</div>
                            </div>
                        </div>
                        <div class="stat">
                            <span>Shots on Target</span>
                            <div class="stat-numbers">
                                <span class="team1">6</span>
                                <span class="team2">4</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="match-actions">
                        <button class="btn-primary" onclick="watchLive()">
                            <i class="fas fa-play-circle"></i> Watch Live
                        </button>
                        <button class="btn-secondary" onclick="viewHighlights()">
                            <i class="fas fa-video"></i> Highlights
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        addMatchModalStyles();
        
        // Close modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => modal.remove(), 300);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => modal.remove(), 300);
            }
        });
    }
    
    // ===== SPORTS CALENDAR =====
    function setupSportsCalendar() {
        const calendar = document.querySelector('.calendar-events');
        if (!calendar) return;
        
        // Get all upcoming matches
        const upcomingMatches = [
            ...sportsData.football.upcoming,
            ...sportsData.cricket.upcoming,
            ...sportsData.rugby.upcoming
        ];
        
        // Sort by date
        upcomingMatches.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Display next 3 matches
        const nextMatches = upcomingMatches.slice(0, 3);
        
        calendar.innerHTML = nextMatches.map(match => `
            <div class="event" data-id="${match.id}">
                <span class="event-date">${match.date.split(' ')[0]}</span>
                <span class="event-name">${match.team1} vs ${match.team2}</span>
                <button class="remind-btn" title="Set Reminder">
                    <i class="far fa-bell"></i>
                </button>
            </div>
        `).join('');
        
        // Add reminder functionality
        calendar.querySelectorAll('.remind-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const event = this.closest('.event');
                const matchId = event.dataset.id;
                setMatchReminder(matchId);
            });
        });
    }
    
    function setMatchReminder(matchId) {
        // Find match
        const allMatches = [
            ...sportsData.football.upcoming,
            ...sportsData.cricket.upcoming,
            ...sportsData.rugby.upcoming
        ];
        
        const match = allMatches.find(m => m.id == matchId);
        if (!match) return;
        
        // Save reminder
        let reminders = JSON.parse(localStorage.getItem('zimhub_reminders') || '[]');
        reminders.push({
            matchId,
            teams: `${match.team1} vs ${match.team2}`,
            date: match.date,
            time: match.time,
            setAt: new Date().toISOString()
        });
        
        localStorage.setItem('zimhub_reminders', JSON.stringify(reminders));
        
        showNotification(`Reminder set for ${match.team1} vs ${match.team2}`, 'success');
    }
    
    // ===== TEAM FOLLOW SYSTEM =====
    function setupTeamFollow() {
        const followBtns = document.querySelectorAll('.follow-btn');
        followBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const team = this.dataset.team;
                toggleTeamFollow(team, this);
            });
        });
        
        // Load followed teams
        loadFollowedTeams();
    }
    
    function toggleTeamFollow(team, button) {
        let followedTeams = JSON.parse(localStorage.getItem('zimhub_followed_teams') || '[]');
        const icon = button.querySelector('i');
        
        if (followedTeams.includes(team)) {
            // Unfollow
            followedTeams = followedTeams.filter(t => t !== team);
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.innerHTML = '<i class="far fa-heart"></i> Follow';
            showNotification(`Unfollowed ${team}`, 'info');
        } else {
            // Follow
            followedTeams.push(team);
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.innerHTML = '<i class="fas fa-heart"></i> Following';
            showNotification(`Now following ${team}`, 'success');
        }
        
        localStorage.setItem('zimhub_followed_teams', JSON.stringify(followedTeams));
    }
    
    function loadFollowedTeams() {
        const followedTeams = JSON.parse(localStorage.getItem('zimhub_followed_teams') || '[]');
        followedTeams.forEach(team => {
            const btn = document.querySelector(`.follow-btn[data-team="${team}"]`);
            if (btn) {
                btn.innerHTML = '<i class="fas fa-heart"></i> Following';
            }
        });
    }
    
    // ===== HIGHLIGHT VIDEOS =====
    function setupHighlightVideos() {
        const videoBtns = document.querySelectorAll('.match-highlights, .watch-highlights');
        videoBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showVideoPlayer();
            });
        });
    }
    
    function showVideoPlayer() {
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-video"></i> Match Highlights</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="video-placeholder">
                        <i class="fas fa-play-circle"></i>
                        <p>Highlights would play here</p>
                    </div>
                    <div class="video-info">
                        <h4>Warriors vs Ghana Highlights</h4>
                        <p>AFCON Qualifiers - 15 Feb 2025</p>
                        <div class="video-stats">
                            <span><i class="fas fa-eye"></i> 15,234 views</span>
                            <span><i class="fas fa-clock"></i> 5:32 duration</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        addVideoModalStyles();
        
        // Close modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => modal.remove(), 300);
        });
    }
    
    // ===== STYLES =====
    function addMatchModalStyles() {
        if (!document.querySelector('#match-modal-styles')) {
            const style = document.createElement('style');
            style.id = 'match-modal-styles';
            style.textContent = `
                .match-modal {
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
                }
                
                .match-modal .modal-content {
                    background: var(--onyx-light);
                    border-radius: 15px;
                    width: 90%;
                    max-width: 500px;
                    animation: zoomIn 0.3s ease;
                }
                
                .match-modal .modal-body {
                    padding: 30px;
                }
                
                .match-teams {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                }
                
                .match-score .score {
                    font-size: 2.5rem;
                    font-weight: bold;
                    color: var(--accent-gold);
                }
                
                .match-stats {
                    margin: 30px 0;
                }
                
                .stat {
                    margin-bottom: 20px;
                }
                
                .stat-bar {
                    display: flex;
                    height: 20px;
                    background: var(--onyx);
                    border-radius: 10px;
                    overflow: hidden;
                    margin-top: 5px;
                }
                
                .stat-fill {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 0.8rem;
                    font-weight: bold;
                }
                
                .stat-fill.team1 {
                    background: var(--accent-teal);
                }
                
                .stat-fill.team2 {
                    background: var(--accent-orange);
                }
                
                .stat-numbers {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 5px;
                }
                
                .match-actions {
                    display: flex;
                    gap: 15px;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function addVideoModalStyles() {
        if (!document.querySelector('#video-modal-styles')) {
            const style = document.createElement('style');
            style.id = 'video-modal-styles';
            style.textContent = `
                .video-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.95);
                    z-index: 99999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.3s ease;
                }
                
                .video-modal .modal-content {
                    background: var(--onyx-light);
                    border-radius: 15px;
                    width: 90%;
                    max-width: 800px;
                    animation: zoomIn 0.3s ease;
                }
                
                .video-placeholder {
                    width: 100%;
                    height: 400px;
                    background: var(--onyx-dark);
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;
                }
                
                .video-placeholder i {
                    font-size: 5rem;
                    color: var(--accent-gold);
                    margin-bottom: 20px;
                }
                
                .video-info {
                    text-align: center;
                }
                
                .video-stats {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin-top: 10px;
                    color: var(--accent-teal);
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Global functions
    window.watchLive = function() {
        showNotification('Live streaming feature coming soon!', 'info');
    };
    
    window.viewHighlights = function() {
        showNotification('Highlights feature coming soon!', 'info');
    };
});