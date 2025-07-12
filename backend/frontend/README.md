# ReWear - Clothing Exchange Platform Frontend

A modern, responsive frontend for a clothing exchange platform built with HTML, Tailwind CSS, and vanilla JavaScript.

## Features

### 🔐 Authentication
- **Signup/Login System**: Clean tabbed interface for user registration and login
- **Session Management**: Automatic redirect to feed after successful login
- **Logout Functionality**: Secure logout with session cleanup

### 🏠 Feed Page
- **Public Posts Display**: Grid layout showing clothing items from other users
- **Post Cards**: Rich cards with thumbnails, titles, sizes, and prices
- **Quick Actions**: View details and request exchange buttons
- **Modal Details**: Detailed view with gallery images and full descriptions
- **Responsive Design**: Optimized for desktop, tablet, and mobile

### 📝 My Posts Management
- **Personal Posts**: View all your created posts
- **Edit Functionality**: Inline editing with modal forms
- **Visibility Toggle**: Show/hide posts from public feed
- **Status Indicators**: Visual badges for active/hidden posts
- **Real-time Updates**: Automatic refresh after edits

### ➕ Create Post
- **Comprehensive Form**: All required fields with validation
- **Image Upload**: Drag & drop or file picker with preview
- **Base64 Conversion**: Automatic image conversion for API
- **Form Validation**: Client-side validation with error messages
- **Loading States**: Visual feedback during submission

### 🔄 Exchange Requests
- **Incoming Requests**: View and manage requests from other users
- **Outgoing Requests**: Track your sent requests
- **Status Management**: Accept, reject, or cancel requests
- **Detailed Views**: Modal with full request information
- **Status Badges**: Visual indicators for request states

## Tech Stack

- **HTML5**: Semantic and accessible markup
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vanilla JavaScript**: No frameworks, pure ES6+ JavaScript
- **Fetch API**: Modern HTTP requests
- **LocalStorage**: Client-side session management

## File Structure

```
frontend/
├── index.html              # Login/Signup page
├── feed.html              # Main feed page
├── myposts.html           # User's posts management
├── create-post.html       # Create new post form
├── requests.html          # Exchange requests management
├── js/
│   ├── auth.js           # Authentication module
│   ├── feed.js           # Feed functionality
│   ├── myposts.js        # My posts management
│   ├── create-post.js    # Create post functionality
│   └── requests.js       # Requests management
└── README.md             # This file
```

## API Integration

The frontend integrates with a REST API with the following endpoints:

### Authentication
- `POST /signup/` - User registration
- `POST /login/` - User login

### Posts
- `GET /posts/<userid>/` - Get posts (public feed)
- `GET /posts/<userid>/?selfpost=true` - Get user's own posts
- `GET /posts/<userid>/?postid=<id>` - Get single post details
- `POST /create-post/<userid>/` - Create new post
- `POST /edit-post/<userid>/?postid=<id>` - Edit existing post

### Exchange Requests
- `POST /exchange/` - Create exchange request
- `GET /requests/<userid>/` - Get user's requests

## Setup Instructions

### Prerequisites
- A web server (local or hosted)
- Modern web browser with JavaScript enabled
- API backend running (default: `http://localhost:8000`)

### Installation

1. **Clone or download** the frontend files to your web server directory

2. **Configure API URL** (if needed):
   - Open any `.js` file in the `js/` directory
   - Update the `baseURL` variable to match your API endpoint
   - Default: `http://localhost:8000`

3. **Serve the files**:
   - Use any web server (Apache, Nginx, Python's `http.server`, etc.)
   - Or open `index.html` directly in a browser for local testing

### Example: Python Local Server
```bash
# Navigate to the frontend directory
cd frontend

# Start a simple HTTP server
python -m http.server 8080

# Open in browser: http://localhost:8080
```

### Example: Node.js Local Server
```bash
# Install a simple HTTP server
npm install -g http-server

# Navigate to the frontend directory
cd frontend

# Start server
http-server -p 8080

# Open in browser: http://localhost:8080
```

## Usage

### First Time Setup
1. Open the application in your browser
2. Click "Sign Up" to create a new account
3. Fill in username, email, and password
4. Click "Create Account"
5. Switch to "Login" tab and sign in with your credentials

### Creating Posts
1. Navigate to "Create Post" from the main menu
2. Fill in all required fields (title, description, size, price)
3. Upload at least one image (drag & drop supported)
4. Set visibility preference
5. Click "Create Post"

### Managing Posts
1. Go to "My Posts" to view your created posts
2. Click "Edit" to modify post details
3. Use "Show/Hide" to control visibility
4. Changes are saved automatically

### Browsing Feed
1. The main feed shows posts from other users
2. Click "View" to see detailed information
3. Click "Exchange" to request a trade
4. Use the modal to see full descriptions and galleries

### Managing Requests
1. Visit "Requests" to see incoming and outgoing requests
2. For incoming requests: Accept or reject pending requests
3. For outgoing requests: Cancel pending requests
4. Click "View Details" for full request information

## Features in Detail

### Image Handling
- **Base64 Conversion**: Images are automatically converted to base64 for API transmission
- **Preview System**: Real-time image previews during upload
- **Gallery Support**: Multiple images per post with thumbnail selection
- **Drag & Drop**: Intuitive file upload interface

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Grid Layouts**: Responsive card grids that adapt to screen size
- **Touch-Friendly**: Large touch targets for mobile users
- **Progressive Enhancement**: Works on all modern browsers

### Error Handling
- **Network Errors**: Graceful handling of API failures
- **Validation**: Client-side form validation with helpful messages
- **Loading States**: Visual feedback during API calls
- **Retry Mechanisms**: Easy retry options for failed operations

### User Experience
- **Intuitive Navigation**: Clear menu structure
- **Consistent Design**: Unified visual language throughout
- **Accessibility**: Semantic HTML and ARIA considerations
- **Performance**: Optimized for fast loading and smooth interactions

## Browser Support

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

## Development Notes

### Code Organization
- **Modular JavaScript**: Each page has its own module
- **Event-Driven**: Clean separation of concerns
- **Reusable Components**: Shared utilities and patterns
- **Error Boundaries**: Comprehensive error handling

### Performance Considerations
- **Lazy Loading**: Images load on demand
- **Efficient DOM**: Minimal DOM manipulation
- **Memory Management**: Proper cleanup of event listeners
- **Bundle Size**: No external dependencies

### Security Features
- **Input Validation**: Client-side validation for all forms
- **XSS Prevention**: Proper escaping of user content
- **CSRF Protection**: Ready for backend CSRF tokens
- **Secure Storage**: Proper use of localStorage

## Troubleshooting

### Common Issues

**API Connection Errors**
- Verify the API server is running
- Check the `baseURL` in JavaScript files
- Ensure CORS is properly configured on the backend

**Image Upload Issues**
- Check file size limits
- Verify image format support (JPG, PNG, GIF)
- Ensure JavaScript is enabled

**Login Problems**
- Clear browser cache and localStorage
- Check browser console for errors
- Verify API endpoint is accessible

### Debug Mode
To enable debug logging, add this to any JavaScript file:
```javascript
localStorage.setItem('debug', 'true');
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Verify API connectivity
4. Test with different browsers

---

**Built with ❤️ using HTML, Tailwind CSS, and Vanilla JavaScript** 