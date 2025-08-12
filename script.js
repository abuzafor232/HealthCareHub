// HealthCare AI Mobile App JavaScript

// Global variables
let currentScreen = 'authScreen';
let selectedRole = 'patient';

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    setupRoleSelector();
    setupLoginForm();
}

// Event listeners setup
function setupEventListeners() {
    // Navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const targetScreen = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showScreen(targetScreen);
        });
    });

    // Quick actions
    document.querySelectorAll('.quick-action').forEach(action => {
        action.addEventListener('click', function() {
            const onclick = this.getAttribute('onclick');
            if (onclick && onclick.includes('openModal')) {
                const modalId = onclick.match(/'([^']+)'/)[1];
                openModal(modalId);
            }
        });
    });

    // Back buttons
    document.querySelectorAll('button[onclick*="showScreen"]').forEach(button => {
        button.addEventListener('click', function() {
            const targetScreen = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showScreen(targetScreen);
        });
    });
}

// Role selector functionality
function setupRoleSelector() {
    const roleBtns = document.querySelectorAll('.role-btn');
    roleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            roleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedRole = this.getAttribute('data-role');
        });
    });
}

// Login form functionality
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
}

// Handle login
function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate login success
    console.log('Logging in as:', selectedRole, 'with email:', email);
    showScreen('appScreen');
}

// Screen navigation
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;
        
        // Update navigation active state
        updateNavigationActive(screenId);
    }
}

// Update navigation active state
function updateNavigationActive(screenId) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        
        const onclick = item.getAttribute('onclick');
        if (onclick && onclick.includes(screenId)) {
            item.classList.add('active');
        }
    });
}

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        setupModalClose(modal);
    } else {
        createModal(modalId);
    }
}

function closeModal(modal) {
    modal.style.display = 'none';
}

function setupModalClose(modal) {
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Close button
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeModal(modal);
        });
    }
}

// Create modals dynamically
function createModal(modalId) {
    let modalContent = '';
    
    switch(modalId) {
        case 'scheduleModal':
            modalContent = `
                <div class="modal" id="${modalId}">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title">Schedule Appointment</h2>
                            <button class="close-modal">&times;</button>
                        </div>
                        <form id="scheduleForm">
                            <div class="form-group">
                                <label>Select Doctor</label>
                                <select class="form-control">
                                    <option>Dr. Sarah Johnson</option>
                                    <option>Dr. Michael Chen</option>
                                    <option>Dr. Emily Davis</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Date</label>
                                <input type="date" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label>Time</label>
                                <input type="time" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label>Appointment Type</label>
                                <select class="form-control">
                                    <option>General Consultation</option>
                                    <option>Follow-up</option>
                                    <option>Lab Results</option>
                                </select>
                            </div>
                            <button type="submit" class="btn-primary">Schedule</button>
                        </form>
                    </div>
                </div>
            `;
            break;
            
        case 'symptomModal':
            modalContent = `
                <div class="modal" id="${modalId}">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title">Symptom Checker</h2>
                            <button class="close-modal">&times;</button>
                        </div>
                        <div class="form-group">
                            <label>Describe your symptoms</label>
                            <textarea class="form-control" rows="4" placeholder="Enter your symptoms..."></textarea>
                        </div>
                        <div class="symptom-list">
                            <div class="symptom-item">Headache</div>
                            <div class="symptom-item">Fever</div>
                            <div class="symptom-item">Cough</div>
                            <div class="symptom-item">Fatigue</div>
                            <div class="symptom-item">Nausea</div>
                        </div>
                        <button class="btn-primary">Check Symptoms</button>
                    </div>
                </div>
            `;
            break;
            
        case 'telehealthModal':
            modalContent = `
                <div class="modal" id="${modalId}">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title">Video Consultation</h2>
                            <button class="close-modal">&times;</button>
                        </div>
                        <div class="video-container">
                            <div class="video-placeholder">📹</div>
                            <div class="video-controls">
                                <button class="video-btn mute">🔇</button>
                                <button class="video-btn video">📹</button>
                                <button class="video-btn end">📞</button>
                            </div>
                        </div>
                        <p style="text-align: center; color: #666;">Waiting for doctor to join...</p>
                    </div>
                </div>
            `;
            break;
            
        case 'aiModal':
            modalContent = `
                <div class="modal" id="${modalId}">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title">AI Health Assistant</h2>
                            <button class="close-modal">&times;</button>
                        </div>
                        <div class="form-group">
                            <label>Ask me anything about your health</label>
                            <textarea class="form-control" rows="3" placeholder="Type your question..."></textarea>
                        </div>
                        <button class="btn-primary">Ask AI</button>
                        <div id="aiResponse" style="margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 8px; display: none;">
                            <p style="color: #666;">AI response will appear here...</p>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'paymentModal':
            modalContent = `
                <div class="modal" id="${modalId}">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title">Payment</h2>
                            <button class="close-modal">&times;</button>
                        </div>
                        <div class="payment-methods">
                            <div class="payment-method">
                                <strong>Credit Card</strong>
                                <p style="color: #666; font-size: 14px;">Visa, Mastercard, Amex</p>
                            </div>
                            <div class="payment-method">
                                <strong>PayPal</strong>
                                <p style="color: #666; font-size: 14px;">Pay with PayPal account</p>
                            </div>
                            <div class="payment-method">
                                <strong>Insurance</strong>
                                <p style="color: #666; font-size: 14px;">Use insurance coverage</p>
                            </div>
                        </div>
                        <button class="btn-primary">Proceed to Payment</button>
                    </div>
                </div>
            `;
            break;
    }
    
    if (modalContent) {
        document.body.insertAdjacentHTML('beforeend', modalContent);
        const newModal = document.getElementById(modalId);
        setupModalClose(newModal);
        
        // Setup form submissions
        if (modalId === 'scheduleForm') {
            const form = newModal.querySelector('form');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Appointment scheduled successfully!');
                closeModal(newModal);
            });
        }
    }
}

// Symptom checker functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('symptom-item')) {
        e.target.classList.toggle('selected');
    }
});

// Payment method selection
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('payment-method') || e.target.closest('.payment-method')) {
        const method = e.target.closest('.payment-method');
        document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
        method.classList.add('selected');
    }
});

// AI Assistant functionality
document.addEventListener('click', function(e) {
    if (e.target.textContent === 'Ask AI' && e.target.closest('#aiModal')) {
        const textarea = e.target.closest('#aiModal').querySelector('textarea');
        const responseDiv = document.getElementById('aiResponse');
        
        if (textarea.value.trim()) {
            responseDiv.style.display = 'block';
            responseDiv.innerHTML = `<p style="color: #667eea;"><strong>AI Response:</strong> Based on your symptoms, I recommend scheduling a consultation with your healthcare provider. This could be related to your current medications or may require further evaluation.</p>`;
        }
    }
});

// Video call controls
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('video-btn')) {
        const action = e.target.textContent;
        switch(action) {
            case '🔇':
                e.target.textContent = '🔊';
                break;
            case '🔊':
                e.target.textContent = '🔇';
                break;
            case '📹':
                e.target.textContent = '📷';
                break;
            case '📷':
                e.target.textContent = '📹';
                break;
            case '📞':
                alert('Call ended');
                const modal = e.target.closest('.modal');
                if (modal) closeModal(modal);
                break;
        }
    }
});

// Form submissions
document.addEventListener('submit', function(e) {
    if (e.target.id === 'scheduleForm') {
        e.preventDefault();
        alert('Appointment scheduled successfully!');
        const modal = e.target.closest('.modal');
        if (modal) closeModal(modal);
    }
});

// Logout functionality
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Reset form fields
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        
        // Reset role selection
        document.querySelectorAll('.role-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.role-btn[data-role="patient"]').classList.add('active');
        selectedRole = 'patient';
        
        // Show auth screen and hide others
        showScreen('authScreen');
    }
}

// Responsive navigation
window.addEventListener('resize', function() {
    // Handle responsive adjustments if needed
});

// Initialize
console.log('HealthCare AI app initialized');
