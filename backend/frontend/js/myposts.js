// My Posts module
class MyPosts {
    constructor() {
        this.baseURL = 'http://localhost:8000/api';
        this.userid = localStorage.getItem('userid');
        this.posts = [];
        this.currentEditPost = null;
        this.userInfo = null;

        if (!this.userid) {
            window.location.href = 'index.html';
            return;
        }

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadUserInfo();
        this.loadPosts();
    }

    setupEventListeners() {
        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('userid');
            window.location.href = 'index.html';
        });

        // Edit modal close button
        document.getElementById('closeEditModal').addEventListener('click', () => {
            this.closeEditModal();
        });

        // Close modal when clicking outside
        document.getElementById('editModal').addEventListener('click', (e) => {
            if (e.target.id === 'editModal') {
                this.closeEditModal();
            }
        });

        // Post details modal close button
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        // Close post details modal when clicking outside
        document.getElementById('postModal').addEventListener('click', (e) => {
            if (e.target.id === 'postModal') {
                this.closeModal();
            }
        });

        // Edit form submission
        document.getElementById('editForm').addEventListener('submit', (e) => {
            console.log('Edit form submitted');
            e.preventDefault();
            this.handleEditSubmit();
        });

        // Retry button
        document.getElementById('retryBtn').addEventListener('click', () => {
            this.loadPosts();
        });

        // Filter buttons
        document.getElementById('allPostsBtn').addEventListener('click', () => {
            this.filterPosts('all');
        });

        document.getElementById('activePostsBtn').addEventListener('click', () => {
            this.filterPosts('active');
        });

        document.getElementById('hiddenPostsBtn').addEventListener('click', () => {
            this.filterPosts('hidden');
        });
    }

    async loadUserInfo() {
        try {
            console.log('Loading user info for userid:', this.userid);
            const response = await fetch(`${this.baseURL}/user/${this.userid}/?userid=${this.userid}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('User info API response:', data);

            if (data.success) {
                this.userInfo = data;
                console.log('User info set:', this.userInfo);
                this.updateUserProfile();
            } else {
                console.error('Failed to load user info:', data.message);
            }
        } catch (error) {
            console.error('User info load error:', error);
        }
    }

    updateUserProfile() {
        if (!this.userInfo) return;

        console.log('Updating profile with user info:', this.userInfo);

        // Update profile name with username
        const profileName = document.getElementById('username');
        if (profileName && this.userInfo.username) {
            profileName.textContent = this.userInfo.username;
        }
        profileName.textContent = this.userInfo.username;
        // Update profile description with email
        const profileDesc = document.querySelector('p.text-gray-600.mt-1');
        if (profileDesc && this.userInfo.email) {
            profileDesc.textContent = this.userInfo.email;
        }

        // Update avatar with first letter of username
        const avatar = document.querySelector('.w-24.h-24');
        if (avatar && this.userInfo.username) {
            // Use first letter of username as avatar
            avatar.textContent = this.userInfo.username.charAt(0).toUpperCase();
        }

        // Update rating from API
        if (this.userInfo.rating !== undefined) {
            document.getElementById('rating').textContent = this.userInfo.rating.toFixed(1);
        }

        // Update points from API
        if (this.userInfo.points !== undefined) {
            document.getElementById('points').textContent = this.userInfo.points;
        }

        // Add visibility status if needed
        if (this.userInfo.visibility !== undefined) {
            const visibilityStatus = this.userInfo.visibility ? 'Active' : 'Inactive';
            // You can add this to the profile if needed
            console.log('User visibility:', visibilityStatus);
        }

        // Add block status if needed
        if (this.userInfo.block !== undefined) {
            const blockStatus = this.userInfo.block ? 'Blocked' : 'Active';
            // You can add this to the profile if needed
            console.log('User block status:', blockStatus);
        }
    }

    async loadPosts() {
        this.showLoading();

        try {
            const response = await fetch(`${this.baseURL}/posts/${this.userid}/?selfpost=true`);
            const data = await response.json();

            if (data.success) {
                this.posts = data.posts || [];
                this.displayPosts();
            } else {
                this.showError('Failed to load posts');
            }
        } catch (error) {
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

        // Update profile statistics
        this.updateProfileStats();

        this.hideLoading();
        postsContainer.classList.remove('hidden');
    }

    updateProfileStats() {
        const totalPosts = this.posts.length;
        const activePosts = this.posts.filter(post => post.visible).length;
        const totalViews = this.posts.reduce((sum, post) => sum + (post.views || 0), 0);

        // Always use API data if available, otherwise use calculated values
        let avgRating, points;

        if (this.userInfo) {
            // Use data from API
            avgRating = this.userInfo.rating !== undefined ? this.userInfo.rating : this.calculateRating();
            points = this.userInfo.points !== undefined ? this.userInfo.points : this.calculatePoints();
            console.log('Using API data - Rating:', this.userInfo.rating, 'Points:', this.userInfo.points);
        } else {
            // Calculate based on posts
            avgRating = this.calculateRating();
            points = this.calculatePoints();
            console.log('Using calculated data - Rating:', avgRating, 'Points:', points);
        }

        console.log('Final values - Rating:', avgRating, 'Points:', points);
        document.getElementById('totalPosts').textContent = totalPosts;
        document.getElementById('activePosts').textContent = activePosts;
        document.getElementById('totalViews').textContent = totalViews;
        document.getElementById('rating').textContent = avgRating.toFixed(1);
        document.getElementById('points').textContent = points;
    }

    calculateRating() {
        // Example rating calculation based on post performance
        // In a real app, this would come from user reviews/feedback
        if (this.posts.length === 0) return 0;

        const totalViews = this.posts.reduce((sum, post) => sum + (post.views || 0), 0);
        const avgViews = totalViews / this.posts.length;

        // Simple rating calculation based on average views
        // Higher views = higher rating (example logic)
        if (avgViews >= 50) return 5.0;
        if (avgViews >= 30) return 4.5;
        if (avgViews >= 20) return 4.0;
        if (avgViews >= 10) return 3.5;
        return 3.0;
    }

    calculatePoints() {
        // Example points calculation based on user activity
        let points = 0;

        // Base points for each post
        points += this.posts.length * 50;

        // Bonus points for active posts
        const activePosts = this.posts.filter(post => post.visible).length;
        points += activePosts * 25;

        // Bonus points for total views
        const totalViews = this.posts.reduce((sum, post) => sum + (post.views || 0), 0);
        points += totalViews * 2;

        // Bonus for being active (having posts)
        if (this.posts.length > 0) points += 100;

        return points;
    }

    filterPosts(filter) {
        // Update button states
        document.getElementById('allPostsBtn').className = 'px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-700';
        document.getElementById('activePostsBtn').className = 'px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-700';
        document.getElementById('hiddenPostsBtn').className = 'px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-700';

        // Highlight active filter
        if (filter === 'all') {
            document.getElementById('allPostsBtn').className = 'px-3 py-1 text-sm font-medium text-primary bg-primary bg-opacity-10 rounded-md';
        } else if (filter === 'active') {
            document.getElementById('activePostsBtn').className = 'px-3 py-1 text-sm font-medium text-primary bg-primary bg-opacity-10 rounded-md';
        } else if (filter === 'hidden') {
            document.getElementById('hiddenPostsBtn').className = 'px-3 py-1 text-sm font-medium text-primary bg-primary bg-opacity-10 rounded-md';
        }

        // Filter posts
        let filteredPosts = this.posts;
        if (filter === 'active') {
            filteredPosts = this.posts.filter(post => post.visible);
        } else if (filter === 'hidden') {
            filteredPosts = this.posts.filter(post => !post.visible);
        }

        // Display filtered posts
        const postsGrid = document.getElementById('postsGrid');
        postsGrid.innerHTML = '';

        if (filteredPosts.length === 0) {
            postsGrid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-900">No ${filter} posts</h3>
                    <p class="mt-1 text-sm text-gray-500">No posts match your current filter.</p>
                </div>
            `;
        } else {
            filteredPosts.forEach(post => {
                const postCard = this.createPostCard(post);
                postsGrid.appendChild(postCard);
            });
        }
    }
    createPostCard(post) {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200';

        // Handle thumbnail - use thumbnail field if available, otherwise fallback
        const thumbnail = (post.thumbnail) ? "http://127.0.0.1:8000/" + post.thumbnail : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCAxMDBDNTAgNzIuODM1NyA3Mi44MzU3IDUwIDEwMCA1MEMxMjcuMTY0IDUwIDE1MCA3Mi44MzU3IDE1MCAxMEMxNTAgMTI3LjE2NCAxMjcuMTY0IDE1MCAxMDAgMTUwQzcyLjgzNTcgMTUwIDUwIDEyNy4xNjQgNTAgMTAwWiIgZmlsbD0iI0QxRDVETyIvPgo8L3N2Zz4K';

        console.log(post, thumbnail);

        const statusBadge = post.visible ?
            '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>' :
            '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Hidden</span>';

        card.innerHTML = `
            <div class="aspect-w-1 aspect-h-1 w-full">
                <img src="${thumbnail}" alt="${post.title}" class="w-full h-48 object-cover">
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg font-semibold text-gray-900 truncate">${post.title}</h3>
                    ${statusBadge}
                </div>
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
                        <button class="edit-btn inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-primary bg-primary bg-opacity-10 hover:bg-opacity-20" data-postid="${post.id}">
                            Edit
                        </button>
                        <button class="toggle-visibility-btn inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded ${post.visible ? 'text-red-600 bg-red-100 hover:bg-red-200' : 'text-green-600 bg-green-100 hover:bg-green-200'}" data-postid="${post.id}" data-visible="${post.visible}">
                            ${post.visible ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        card.querySelector('.view-details-btn').addEventListener('click', () => {
            this.showPostDetails(post.id);
        });

        card.querySelector('.edit-btn').addEventListener('click', () => {
            this.openEditModal(post);
        });

        card.querySelector('.toggle-visibility-btn').addEventListener('click', () => {
            this.toggleVisibility(post.id, !post.visible);
        });

        return card;
    }

    openEditModal(post) {
        console.log('Opening edit modal for post:', post);
        this.currentEditPost = post;
        const modal = document.getElementById('editModal');
        const form = document.getElementById('editForm');

        // Populate form fields
        document.getElementById('edit-title').value = post.title;
        document.getElementById('edit-description').value = post.description;
        document.getElementById('edit-damage').value = post.damage || '';
        document.getElementById('edit-size').value = post.size;
        document.getElementById('edit-price').value = post.price;
        document.getElementById('edit-visible').checked = post.visible;

        console.log('Form fields populated');
        modal.classList.remove('hidden');
        console.log('Modal should be visible now');
    }

    closeEditModal() {
        document.getElementById('editModal').classList.add('hidden');
        this.currentEditPost = null;
    }

    async handleEditSubmit() {
        console.log('handleEditSubmit called');

        if (!this.currentEditPost) {
            console.log('No current edit post');
            return;
        }

        const formData = new FormData(document.getElementById('editForm'));
        const updateData = {
            title: formData.get('title'),
            description: formData.get('description'),
            damage: formData.get('damage'),
            size: formData.get('size'),
            price: parseFloat(formData.get('price')),
            visible: formData.get('visible') === 'on'
        };

        console.log('Update data:', updateData);
        console.log('Post ID:', this.currentEditPost.id);

        try {
            console.log('Sending request to:', `${this.baseURL}/edit-post/${this.userid}/?postid=${this.currentEditPost.id}`);

            const response = await fetch(`${this.baseURL}/edit-post/${this.userid}/?postid=${this.currentEditPost.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData)
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (data.success) {
                this.closeEditModal();
                this.loadPosts(); // Reload posts to show updated data
                this.showMessage('Post updated successfully!', 'success');
            } else {
                this.showMessage('Failed to update post', 'error');
            }
        } catch (error) {
            console.error('Edit submit error:', error);
            this.showMessage('Network error. Please try again.', 'error');
        }
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
                this.showMessage('Failed to load post details', 'error');
            }
        } catch (error) {
            console.error('Post details error:', error);
            this.showMessage('Network error loading post details', 'error');
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

        // Create all images array: thumbnail first, then gallery images
        const allImages = [];
        if (thumbnail) {
            allImages.push(thumbnail);
        }
        allImages.push(...gallery);

        // Use first image as main image
        const mainImage = allImages.length > 0 ? allImages[0] : '';

        modalContent.innerHTML = `
            <div class="space-y-6">
                <!-- Main Image Section -->
                ${mainImage ? `
                    <div class="relative">
                        <img id="mainImage" src="${mainImage}" alt="${post.title}" 
                             class="w-full h-80 object-contain rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
                        <div class="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                            Click to enlarge
                        </div>
                    </div>
                ` : ''}
                
                <!-- Product Details -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div>
                            <h4 class="font-medium text-gray-900 mb-2">Description</h4>
                            <p class="text-sm text-gray-600 leading-relaxed">${post.description}</p>
                        </div>
                        <div>
                            <h4 class="font-medium text-gray-900 mb-2">Damage</h4>
                            <p class="text-sm text-gray-600">${post.damage || 'None'}</p>
                        </div>
                    </div>
                    <div class="space-y-4">
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
                    </div>
                </div>
                
                <!-- Horizontal Scrolling Gallery -->
                ${allImages.length > 1 ? `
                    <div class="border-t pt-6">
                        <h4 class="font-medium text-gray-900 mb-4">All Images</h4>
                        <div class="flex space-x-3 overflow-x-auto pb-2">
                            ${allImages.map((img, index) => `
                                <div class="flex-shrink-0 relative group">
                                    <img src="${img}" 
                                         alt="Image ${index + 1}" 
                                         class="w-32 h-32 object-contain rounded-lg cursor-pointer hover:opacity-90 transition-opacity gallery-thumbnail"
                                         data-image="${img}"
                                         data-index="${index}">
                                    ${index === 0 ? '<div class="absolute top-1 left-1 bg-blue-500 text-white px-1 py-0.5 rounded text-xs">Main</div>' : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <!-- Action Buttons -->
                <div class="flex justify-end space-x-3 pt-4 border-t">
                    <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200" onclick="myPosts.closeModal()">
                        Close
                    </button>
                </div>
            </div>
        `;

        // Add event listeners for gallery functionality
        this.setupGalleryEventListeners();

        modal.classList.remove('hidden');
    }

    setupGalleryEventListeners() {
        // Main image click to enlarge
        const mainImage = document.getElementById('mainImage');
        if (mainImage) {
            mainImage.addEventListener('click', () => {
                this.showLightbox(mainImage.src, mainImage.alt);
            });
        }

        // Gallery thumbnails click to switch main image and enlarge
        const thumbnails = document.querySelectorAll('.gallery-thumbnail');
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const newMainImage = thumbnail.getAttribute('data-image');
                const mainImage = document.getElementById('mainImage');
                if (mainImage) {
                    mainImage.src = newMainImage;
                }
                this.showLightbox(newMainImage, thumbnail.alt);
            });
        });
    }

    showLightbox(imageSrc, imageAlt) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4';
        lightbox.id = 'lightbox';

        lightbox.innerHTML = `
            <div class="relative max-w-4xl max-h-full">
                <img src="${imageSrc}" alt="${imageAlt}" class="max-w-full max-h-full object-contain">
                <button class="absolute top-4 right-4 text-white text-2xl hover:text-gray-300" onclick="myPosts.closeLightbox()">
                    ×
                </button>
                <div class="absolute bottom-4 left-4 text-white text-sm">
                    Click outside to close
                </div>
            </div>
        `;

        // Close lightbox when clicking outside
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeLightbox();
            }
        });

        document.body.appendChild(lightbox);
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.remove();
        }
    }

    closeModal() {
        document.getElementById('postModal').classList.add('hidden');
    }

    async toggleVisibility(postId, newVisibility) {
        try {
            const response = await fetch(`${this.baseURL}/edit-post/${this.userid}/?postid=${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ visible: newVisibility })
            });

            const data = await response.json();

            if (data.success) {
                this.loadPosts(); // Reload posts to show updated data
                this.showMessage(`Post ${newVisibility ? 'made visible' : 'hidden'} successfully!`, 'success');
            } else {
                this.showMessage('Failed to update post visibility', 'error');
            }
        } catch (error) {
            this.showMessage('Network error. Please try again.', 'error');
        }
    }

    showMessage(text, type) {
        // Create a temporary message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `fixed top-4 right-4 z-50 rounded-md p-4 ${type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'
            }`;
        messageDiv.textContent = text;

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 3000);
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

// Initialize my posts when DOM is loaded
let myPosts;
document.addEventListener('DOMContentLoaded', () => {
    myPosts = new MyPosts();
}); 