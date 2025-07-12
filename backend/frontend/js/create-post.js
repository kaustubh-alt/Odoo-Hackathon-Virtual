// Create Post module
class CreatePost {
    constructor() {
        this.baseURL = 'http://localhost:8000/api';
        this.userid = localStorage.getItem('userid');
        this.selectedImages = [];

        if (!this.userid) {
            window.location.href = 'index.html';
            return;
        }

        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('userid');
            window.location.href = 'index.html';
        });

        // Image upload
        document.getElementById('images').addEventListener('change', (e) => {
            this.handleImageUpload(e.target.files);
        });

        // Form submission
        document.getElementById('createPostForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Drag and drop functionality
        const dropZone = document.querySelector('.border-dashed');
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('border-primary', 'bg-blue-50');
        });

        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-primary', 'bg-blue-50');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-primary', 'bg-blue-50');
            const files = e.dataTransfer.files;
            this.handleImageUpload(files);
        });
    }

    handleImageUpload(files) {
        this.selectedImages = [];
        const imageGrid = document.getElementById('imageGrid');
        const imagePreview = document.getElementById('imagePreview');

        console.log('Files selected:', files.length);
        imageGrid.innerHTML = '';

        Array.from(files).forEach((file, index) => {
            console.log('Processing file:', file.name, file.type);
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    console.log('File loaded:', file.name);
                    this.selectedImages.push(e.target.result);

                    const previewDiv = document.createElement('div');
                    previewDiv.className = 'relative';
                    previewDiv.innerHTML = `
                        <img src="${e.target.result}" alt="Preview ${index + 1}" class="w-full h-24 object-cover rounded-lg">
                        <button type="button" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600" onclick="createPost.removeImage(${index})">
                            ×
                        </button>
                    `;
                    imageGrid.appendChild(previewDiv);
                };
                reader.onerror = (error) => {
                    console.error('Error reading file:', error);
                };
                reader.readAsDataURL(file);
            } else {
                console.log('Skipping non-image file:', file.name);
            }
        });

        console.log('Selected images count:', this.selectedImages.length);
        if (this.selectedImages.length > 0) {
            imagePreview.classList.remove('hidden');
            console.log('Showing image preview');
        } else {
            imagePreview.classList.add('hidden');
            console.log('Hiding image preview');
        }
    }

    removeImage(index) {
        this.selectedImages.splice(index, 1);
        this.updateImagePreview();
    }

    updateImagePreview() {
        const imageGrid = document.getElementById('imageGrid');
        const imagePreview = document.getElementById('imagePreview');

        imageGrid.innerHTML = '';

        this.selectedImages.forEach((image, index) => {
            const previewDiv = document.createElement('div');
            previewDiv.className = 'relative';
            previewDiv.innerHTML = `
                <img src="${image}" alt="Preview ${index + 1}" class="w-full h-24 object-cover rounded-lg">
                <button type="button" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600" onclick="createPost.removeImage(${index})">
                    ×
                </button>
            `;
            imageGrid.appendChild(previewDiv);
        });

        if (this.selectedImages.length > 0) {
            imagePreview.classList.remove('hidden');
        } else {
            imagePreview.classList.add('hidden');
        }
    }

    async handleFormSubmit() {
        const form = document.getElementById('createPostForm');
        const formData = new FormData(form);

        // Validate required fields
        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const size = formData.get('size');
        const price = parseFloat(formData.get('price'));
        const visible = formData.get('visible') === 'on';

        if (!title || !description || !size || !price || this.selectedImages.length === 0) {
            this.showMessage('Please fill in all required fields and upload at least one image.', 'error');
            return;
        }

        if (price <= 0) {
            this.showMessage('Price must be greater than 0.', 'error');
            return;
        }

        // Show loading overlay
        document.getElementById('loadingOverlay').classList.remove('hidden');

        try {
            // Convert base64 images to file objects for API
            const imageFiles = [];
            for (let i = 0; i < this.selectedImages.length; i++) {
                const base64Data = this.selectedImages[i];
                const byteString = atob(base64Data.split(',')[1]);
                const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let j = 0; j < byteString.length; j++) {
                    ia[j] = byteString.charCodeAt(j);
                }
                const blob = new Blob([ab], { type: mimeString });
                const file = new File([blob], `image_${i}.jpg`, { type: mimeString });
                imageFiles.push(file);
            }

            const postData = new FormData();
            postData.append('title', title);
            postData.append('description', description);
            postData.append('damage', formData.get('damage') || '');
            postData.append('size', size);
            postData.append('price', price.toFixed(2));
            postData.append('visible', visible);

            // Append each image file
            imageFiles.forEach((file, index) => {
                postData.append('images', file);
            });

            const response = await fetch(`${this.baseURL}/create-post/${this.userid}/`, {
                method: 'POST',
                body: postData
            });

            const data = await response.json();

            if (data.success) {
                this.showMessage('Post created successfully!', 'success');
                setTimeout(() => {
                    window.location.href = 'myposts.html';
                }, 1500);
            } else {
                this.showMessage('Failed to create post. Please try again.', 'error');
            }
        } catch (error) {
            this.showMessage('Network error. Please check your connection and try again.', 'error');
        } finally {
            document.getElementById('loadingOverlay').classList.add('hidden');
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
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 5000);
    }
}

// Initialize create post when DOM is loaded
let createPost;
document.addEventListener('DOMContentLoaded', () => {
    createPost = new CreatePost();
}); 
