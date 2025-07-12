// Feed module
class Feed {
    constructor() {
        this.baseURL = 'http://localhost:8000/api';
        this.userid = localStorage.getItem('userid');
        this.posts = [];

        if (!this.userid) {
            window.location.href = 'index.html';
            return;
        }

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadPosts();
    }

    setupEventListeners() {
        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('userid');
            window.location.href = 'index.html';
        });

        // Modal close button
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside
        document.getElementById('postModal').addEventListener('click', (e) => {
            if (e.target.id === 'postModal') {
                this.closeModal();
            }
        });

        // Retry button
        document.getElementById('retryBtn').addEventListener('click', () => {
            this.loadPosts();
        });
    }

    async loadPosts() {
        this.showLoading();

        try {
            // Load public posts (not user-specific)
            const response = await fetch(`${this.baseURL}/posts/${this.userid}/`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                this.posts = data.posts || [];
                this.displayPosts();
            } else {
                this.showError('Failed to load posts');
            }
        } catch (error) {
            console.error('Feed load error:', error);
            this.showError('Network error. Please check your connection.');
        }
    }

    displayPosts() {
        const postsGrid = document.getElementById('postsGrid');
        const postsContainer = document.getElementById('postsContainer');

        if (this.posts.length === 0) {
            this.showEmpty();
            return;
        }

        postsGrid.innerHTML = '';

        this.posts.forEach(post => {
            const postCard = this.createPostCard(post);
            postsGrid.appendChild(postCard);
        });

        this.hideLoading();
        postsContainer.classList.remove('hidden');
    }

    createPostCard(post) {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200';

        // Handle thumbnail - use thumbnail field if available, otherwise fallback
        const thumbnail = (post.thumbnail) ? "http://127.0.0.1:8000/" + post.thumbnail : ('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCAxMDBDNTAgNzIuODM1NyA3Mi44MzU3IDUwIDEwMCA1MEMxMjcuMTY0IDUwIDE1MCA3Mi44MzU3IDE1MCAxMEMxNTAgMTI3LjE2NCAxMjcuMTY0IDE1MCAxMDAgMTUwQzcyLjgzNTcgMTUwIDUwIDEyNy4xNjQgNTAgMTAwWiIgZmlsbD0iI0QxRDVETyIvPgo8L3N2Zz4K');

        console.log(post, thumbnail);

        card.innerHTML = `
            <div class="aspect-w-1 aspect-h-1 w-full">
                <img src="${thumbnail}" alt="${post.title}" class="w-full h-48 object-cover">
            </div>
            <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900 truncate">${post.title}</h3>
                <p class="text-sm text-gray-600 mt-1 line-clamp-2">${post.description}</p>
                <div class="mt-3 flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            ${post.size}
                        </span>
                        <span class="text-sm text-gray-500">$${post.price}</span>
                    </div>
                    <div class="flex space-x-2">
                        <button class="view-details-btn inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-primary bg-primary bg-opacity-10 hover:bg-opacity-20" data-postid="${post.id}">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        card.querySelector('.view-details-btn').addEventListener('click', () => {
            this.showPostDetails(post.id);
        });

        return card;
    }

    async showPostDetails(postId) {
        try {
            const response = await fetch(`${this.baseURL}/posts/${this.userid}/?postid=${postId}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success && data.post) {
                this.displayPostModal(data.post);
            } else {
                this.showError('Failed to load post details');
            }
        } catch (error) {
            console.error('Post details error:', error);
            this.showError('Network error loading post details');
        }
    }

    displayPostModal(post) {
        const modal = document.getElementById('postModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');

        modalTitle.textContent = post.title;

        // Handle the backend data format
        const thumbnail = post.thumbnail ?
            (post.thumbnail.startsWith('http') ? post.thumbnail : "http://127.0.0.1:8000" + post.thumbnail) : '';
        const gallery = post.gallery || [];
        const images = post.images || [];

        // Use thumbnail as main image, or first image from images array
        const mainImage = thumbnail || (images.length > 0 ? "http://127.0.0.1:8000/media/" + images[0] : '');

        modalContent.innerHTML = `
            <div class="space-y-4">
                ${mainImage ? `
                    <div class="aspect-w-16 aspect-h-9">
                        <img src="${mainImage}" alt="${post.title}" class="w-full h-64 object-cover rounded-lg">
                    </div>
                ` : ''}
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-medium text-gray-900">Description</h4>
                        <p class="text-sm text-gray-600">${post.description}</p>
                    </div>
                    <div>
                        <h4 class="font-medium text-gray-900">Damage</h4>
                        <p class="text-sm text-gray-600">${post.damage || 'None'}</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-3 gap-4">
                    <div>
                        <h4 class="font-medium text-gray-900">Size</h4>
                        <p class="text-sm text-gray-600">${post.size}</p>
                    </div>
                    <div>
                        <h4 class="font-medium text-gray-900">Price</h4>
                        <p class="text-sm text-gray-600">$${post.price}</p>
                    </div>
                    <div>
                        <h4 class="font-medium text-gray-900">Views</h4>
                        <p class="text-sm text-gray-600">${post.views || 0}</p>
                    </div>
                </div>
                
                ${gallery.length > 0 ? `
                    <div>
                        <h4 class="font-medium text-gray-900 mb-2">Gallery</h4>
                        <div class="grid grid-cols-4 gap-2">
                            ${gallery.map(img => `
                                <img src="${img}" alt="Gallery image" class="w-full h-20 object-cover rounded">
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div class="flex justify-end space-x-3 pt-4 border-t">
                    <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200" onclick="feed.closeModal()">
                        Close
                    </button>
                    <button class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700" onclick="feed.buyItem(${post.id})">
                        Buy Now
                    </button>
                    <button class="px-4 py-2 text-sm font-medium text-white bg-accent rounded-md hover:bg-yellow-600" onclick="feed.requestExchange(${post.id})">
                        Exchange
                    </button>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
    }

    closeModal() {
        document.getElementById('postModal').classList.add('hidden');
    }

    async buyItem(postId) {
        // For now, we'll just show a message
        // In a real implementation, you'd redirect to payment or show payment modal
        alert('Buy functionality: You would be redirected to payment processing for this item.');
    }

    async requestExchange(postId) {
        // For now, we'll just show a message
        // In a real implementation, you'd need to select one of your posts to exchange
        alert('Exchange functionality: You would select one of your posts to exchange with this item.');
    }

    showLoading() {
        document.getElementById('loading').classList.remove('hidden');
        document.getElementById('postsContainer').classList.add('hidden');
        document.getElementById('emptyState').classList.add('hidden');
        document.getElementById('errorState').classList.add('hidden');
    }

    hideLoading() {
        document.getElementById('loading').classList.add('hidden');
    }

    showEmpty() {
        this.hideLoading();
        document.getElementById('postsContainer').classList.add('hidden');
        document.getElementById('emptyState').classList.remove('hidden');
        document.getElementById('errorState').classList.add('hidden');
    }

    showError(message) {
        this.hideLoading();
        document.getElementById('postsContainer').classList.add('hidden');
        document.getElementById('emptyState').classList.add('hidden');
        document.getElementById('errorState').classList.remove('hidden');
        document.getElementById('errorMessage').textContent = message;
    }
}

// Initialize feed when DOM is loaded
let feed;
document.addEventListener('DOMContentLoaded', () => {
    feed = new Feed();
}); 