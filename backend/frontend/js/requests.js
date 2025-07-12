// Requests module
class Requests {
    constructor() {
        this.baseURL = 'http://localhost:8000/api';
        this.userid = localStorage.getItem('userid');
        this.requests = { requests: [], requested: [] };

        if (!this.userid) {
            window.location.href = 'index.html';
            return;
        }

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadRequests();
    }

    setupEventListeners() {
        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('userid');
            window.location.href = 'index.html';
        });

        // Request modal close button
        document.getElementById('closeRequestModal').addEventListener('click', () => {
            this.closeRequestModal();
        });

        // Close modal when clicking outside
        document.getElementById('requestModal').addEventListener('click', (e) => {
            if (e.target.id === 'requestModal') {
                this.closeRequestModal();
            }
        });

        // Retry button
        document.getElementById('retryBtn').addEventListener('click', () => {
            this.loadRequests();
        });
    }

    async loadRequests() {
        this.showLoading();

        try {
            const response = await fetch(`${this.baseURL}/requests/${this.userid}/`);
            const data = await response.json();

            if (data.success) {
                this.requests = data;
                this.displayRequests();
            } else {
                this.showError('Failed to load requests');
            }
        } catch (error) {
            this.showError('Network error. Please check your connection.');
        }
    }

    displayRequests() {
        this.displayIncomingRequests();
        this.displayOutgoingRequests();
        this.hideLoading();
        document.getElementById('requestsContainer').classList.remove('hidden');
    }

    displayIncomingRequests() {
        const container = document.getElementById('incomingRequests');
        const noRequestsDiv = document.getElementById('noIncomingRequests');

        if (this.requests.requests.length === 0) {
            container.innerHTML = '';
            noRequestsDiv.classList.remove('hidden');
            return;
        }

        noRequestsDiv.classList.add('hidden');
        container.innerHTML = '';

        this.requests.requests.forEach(request => {
            const requestCard = this.createRequestCard(request, 'incoming');
            container.appendChild(requestCard);
        });
    }

    displayOutgoingRequests() {
        const container = document.getElementById('outgoingRequests');
        const noRequestsDiv = document.getElementById('noOutgoingRequests');

        if (this.requests.requested.length === 0) {
            container.innerHTML = '';
            noRequestsDiv.classList.remove('hidden');
            return;
        }

        noRequestsDiv.classList.add('hidden');
        container.innerHTML = '';

        this.requests.requested.forEach(request => {
            const requestCard = this.createRequestCard(request, 'outgoing');
            container.appendChild(requestCard);
        });
    }

    createRequestCard(request, type) {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md p-4 border-l-4 border-primary';

        const statusBadge = this.getStatusBadge(request.status);
        const actionButtons = type === 'incoming' ? this.getIncomingActionButtons(request) : this.getOutgoingActionButtons(request);

        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h4 class="text-lg font-medium text-gray-900">Exchange Request</h4>
                    <p class="text-sm text-gray-600">Request ID: ${request.id}</p>
                </div>
                ${statusBadge}
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <h5 class="font-medium text-gray-900 mb-2">Your Item</h5>
                    <div class="flex items-center space-x-3">
                        <img src="http://127.0.0.1:8000/media/${request.post1.images[0]}" alt="Your item" class="w-16 h-16 object-cover rounded">
                        <div>
                            <p class="font-medium text-gray-900">${request.post1.title}</p>
                            <p class="text-sm text-gray-600">Size: ${request.post1.size} | $${request.post1.price}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h5 class="font-medium text-gray-900 mb-2">Their Item</h5>
                    <div class="flex items-center space-x-3">
                        <img src="http://127.0.0.1:8000/media/${request.post2.images[0]}" alt="Their item" class="w-16 h-16 object-cover rounded">
                        <div>
                            <p class="font-medium text-gray-900">${request.post2.title}</p>
                            <p class="text-sm text-gray-600">Size: ${request.post2.size} | $${request.post2.price}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="flex justify-between items-center">
                <div class="text-sm text-gray-500">
                    Requested on ${new Date(request.created_at).toLocaleDateString()}
                </div>
                <div class="flex space-x-2">
                    <button class="view-details-btn px-3 py-1 text-sm font-medium text-primary bg-primary bg-opacity-10 rounded hover:bg-opacity-20" data-requestid="${request.id}">
                        View Details
                    </button>
                    ${actionButtons}
                </div>
            </div>
        `;

        // Add event listeners
        card.querySelector('.view-details-btn').addEventListener('click', () => {
            this.showRequestDetails(request);
        });

        if (type === 'incoming') {
            const acceptBtn = card.querySelector('.accept-btn');
            const rejectBtn = card.querySelector('.reject-btn');

            if (acceptBtn) {
                acceptBtn.addEventListener('click', () => {
                    this.handleRequestAction(request.id, 'accept');
                });
            }

            if (rejectBtn) {
                rejectBtn.addEventListener('click', () => {
                    this.handleRequestAction(request.id, 'reject');
                });
            }
        }

        return card;
    }

    getStatusBadge(status) {
        const statusConfig = {
            'pending': { class: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
            'accepted': { class: 'bg-green-100 text-green-800', text: 'Accepted' },
            'rejected': { class: 'bg-red-100 text-red-800', text: 'Rejected' },
            'completed': { class: 'bg-blue-100 text-blue-800', text: 'Completed' }
        };

        const config = statusConfig[status] || statusConfig.pending;

        return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.class}">${config.text}</span>`;
    }

    getIncomingActionButtons(request) {
        if (request.status === 'pending') {
            return `
                <button class="accept-btn px-3 py-1 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700">
                    Accept
                </button>
                <button class="reject-btn px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700">
                    Reject
                </button>
            `;
        }
        return '';
    }

    getOutgoingActionButtons(request) {
        if (request.status === 'pending') {
            return `
                <button class="cancel-btn px-3 py-1 text-sm font-medium text-white bg-gray-600 rounded hover:bg-gray-700">
                    Cancel
                </button>
            `;
        }
        return '';
    }

    async handleRequestAction(requestId, action) {
        try {
            // In a real implementation, you would have API endpoints for these actions
            const actionText = action === 'accept' ? 'accepted' : action === 'reject' ? 'rejected' : 'cancelled';

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            this.showMessage(`Request ${actionText} successfully!`, 'success');
            this.loadRequests(); // Reload to update status
        } catch (error) {
            this.showMessage('Failed to process request. Please try again.', 'error');
        }
    }

    showRequestDetails(request) {
        const modal = document.getElementById('requestModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');

        modalTitle.textContent = `Exchange Request #${request.id}`;

        modalContent.innerHTML = `
            <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-medium text-gray-900 mb-3">Your Item</h4>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <img src="http://127.0.0.1:8000/media/${request.post1.images[0]}" alt="Your item" class="w-full h-48 object-cover rounded-lg mb-3">
                            <h5 class="font-medium text-gray-900">${request.post1.title}</h5>
                            <p class="text-sm text-gray-600">${request.post1.description}</p>
                            <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                                <span>Size: ${request.post1.size}</span>
                                <span>Price: $${request.post1.price}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-medium text-gray-900 mb-3">Their Item</h4>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <img src="http://127.0.0.1:8000/media/${request.post2.images[0]}" alt="Their item" class="w-full h-48 object-cover rounded-lg mb-3">
                            <h5 class="font-medium text-gray-900">${request.post2.title}</h5>
                            <p class="text-sm text-gray-600">${request.post2.description}</p>
                            <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                                <span>Size: ${request.post2.size}</span>
                                <span>Price: $${request.post2.price}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="border-t pt-4">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-sm text-gray-600">Status: <span class="font-medium">${this.getStatusBadge(request.status).replace(/<[^>]*>/g, '').trim()}</span></p>
                            <p class="text-sm text-gray-600">Requested: ${new Date(request.created_at).toLocaleString()}</p>
                        </div>
                        <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200" onclick="requests.closeRequestModal()">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
    }

    closeRequestModal() {
        document.getElementById('requestModal').classList.add('hidden');
    }

    showMessage(text, type) {
        // Create a temporary message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `fixed top-4 right-4 z-50 rounded-md p-4 ${type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'
            }`;
        messageDiv.textContent = text;

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 5000);
    }

    showLoading() {
        document.getElementById('loading').classList.remove('hidden');
        document.getElementById('requestsContainer').classList.add('hidden');
        document.getElementById('errorState').classList.add('hidden');
    }

    hideLoading() {
        document.getElementById('loading').classList.add('hidden');
    }

    showError(message) {
        this.hideLoading();
        document.getElementById('requestsContainer').classList.add('hidden');
        document.getElementById('errorState').classList.remove('hidden');
        document.getElementById('errorMessage').textContent = message;
    }
}

// Initialize requests when DOM is loaded
let requests;
document.addEventListener('DOMContentLoaded', () => {
    requests = new Requests();
}); 