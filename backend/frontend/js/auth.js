// Authentication module
class Auth {
    constructor() {
        this.baseURL = 'http://localhost:8000/api'; // Update with your API base URL
        this.init();
    }

    init() {
        this.setupTabSwitching();
        this.setupFormHandlers();
        this.checkAuthStatus();
    }

    setupTabSwitching() {
        const loginTab = document.getElementById('loginTab');
        const signupTab = document.getElementById('signupTab');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');

        loginTab.addEventListener('click', () => {
            loginTab.className = 'flex-1 py-2 px-4 text-sm font-medium rounded-md bg-white text-gray-900 shadow-sm';
            signupTab.className = 'flex-1 py-2 px-4 text-sm font-medium rounded-md text-gray-500 hover:text-gray-700';
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
        });

        signupTab.addEventListener('click', () => {
            signupTab.className = 'flex-1 py-2 px-4 text-sm font-medium rounded-md bg-white text-gray-900 shadow-sm';
            loginTab.className = 'flex-1 py-2 px-4 text-sm font-medium rounded-md text-gray-500 hover:text-gray-700';
            signupForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        });
    }

    setupFormHandlers() {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup();
        });
    }

    async handleLogin() {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch(`${this.baseURL}/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('userid', data.userid);
                this.showMessage('Login successful!', 'success');
                setTimeout(() => {
                    window.location.href = 'feed.html';
                }, 1000);
            } else {
                this.showMessage('Login failed. Please check your credentials.', 'error');
            }
        } catch (error) {
            this.showMessage('Network error. Please try again.', 'error');
        }
    }

    async handleSignup() {
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        try {
            const response = await fetch(`${this.baseURL}/signup/`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (data.success) {
                this.showMessage('Account created successfully! Please login.', 'success');
                // Switch to login tab
                document.getElementById('loginTab').click();
            } else {
                this.showMessage('Signup failed. Please try again.', 'error');
            }
        } catch (error) {
            this.showMessage('Network error. Please try again.', 'error');
        }
    }

    showMessage(text, type) {
        const messageDiv = document.getElementById('message');
        const messageText = document.getElementById('message-text');
        const messageIcon = document.getElementById('message-icon');

        messageText.textContent = text;

        if (type === 'success') {
            messageDiv.className = 'hidden rounded-md p-4 bg-green-50 border border-green-200';
            messageIcon.setAttribute('class', 'h-5 w-5 text-green-400');
            messageIcon.innerHTML = `
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            `;
        } else {
            messageDiv.className = 'hidden rounded-md p-4 bg-red-50 border border-red-200';
            messageIcon.setAttribute('class', 'h-5 w-5 text-red-400');
            messageIcon.innerHTML = `
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            `;
        }

        messageDiv.classList.remove('hidden');
        setTimeout(() => {
            messageDiv.classList.add('hidden');
        }, 5000);
    }

    checkAuthStatus() {
        const userid = localStorage.getItem('userid');
        if (userid) {
            window.location.href = 'feed.html';
        }
    }
}

// Initialize auth when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Auth();
}); 