# ReWear - Community Clothing Exchange Platform

A sustainable fashion platform that enables users to exchange unused clothing through direct swaps or a point-based redemption system. Built with React, JSX, and JavaScript following Google's Material Design principles.

## 🌟 Features

### User Authentication
- Email/password signup and login
- User profile management
- Points system for item redemption

### Landing Page
- Platform introduction with hero section
- Call-to-action buttons: "Start Swapping", "Browse Items", "List an Item"
- Featured items carousel with auto-advance
- How it works section
- Community statistics
- Responsive design

### User Dashboard
- Profile details and points balance
- Uploaded items overview
- Ongoing and completed swaps list
- Recent activity feed
- Quick actions for common tasks

### Item Management
- Browse items with advanced filtering (category, type, size, condition)
- Search functionality with tags and descriptions
- Item detail pages with image galleries
- Add new items with image upload
- Item status tracking

### Swap System
- Request swaps with custom messages
- Redeem items using points
- Swap status tracking (pending, accepted, rejected, completed)
- Swap history and management

### Admin Panel
- Platform overview with statistics
- Moderate and approve/reject item listings
- User management
- Swap monitoring
- Content moderation tools

## 🎨 Design System

### Material Design Implementation
- **Colors**: Primary blue (#1976d2), secondary pink (#dc004e), and neutral grays
- **Typography**: Roboto font family with proper hierarchy
- **Elevation**: Paper-like cards with subtle shadows
- **Components**: Buttons with ripple effects, floating labels, and consistent spacing
- **Responsive**: Mobile-first design with breakpoints

### Key Design Features
- Consistent grid system with proper spacing
- Smooth transitions and micro-interactions
- Accessible color contrast ratios
- Touch-friendly interface elements
- Progressive disclosure patterns

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rewear
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.js       # Navigation bar
│   ├── LandingPage.js  # Home page
│   ├── Login.js        # Login form
│   ├── Register.js     # Registration form
│   ├── Dashboard.js    # User dashboard
│   ├── BrowseItems.js  # Item browsing
│   ├── ItemDetail.js   # Item details
│   ├── AddItem.js      # Add new item
│   └── AdminPanel.js   # Admin interface
├── contexts/           # React contexts
│   └── AuthContext.js  # Authentication state
├── data/              # Mock data
│   └── mockData.js    # Sample data for development
├── types/             # Type definitions
│   └── index.js       # Constants and enums
├── App.js             # Main app component
├── App.css            # App-specific styles
├── index.js           # App entry point
└── index.css          # Global styles and design system
```

## 🔧 Technical Implementation

### State Management
- React Context API for authentication
- Local state for component-specific data
- LocalStorage for user session persistence

### Routing
- React Router v6 for navigation
- Protected routes for authenticated users
- Admin-only routes with role-based access

### Styling
- CSS custom properties for design tokens
- Material Design-inspired component styles
- Responsive grid system
- Mobile-first approach

### Data Flow
- Mock data for development
- Simulated API calls with timeouts
- Form validation and error handling
- Optimistic UI updates

## 👥 Demo Accounts

### Regular Users
- **Email**: john@example.com
- **Email**: jane@example.com
- **Password**: Any password (demo mode)

### Admin User
- **Email**: admin@rewear.com
- **Password**: Any password (demo mode)

## 🎯 Key Features in Detail

### Authentication System
- Email/password registration and login
- Session persistence with localStorage
- Protected routes and role-based access
- User profile management

### Item Management
- Multi-image upload with preview
- Comprehensive item details (category, type, size, condition)
- Tag-based search and filtering
- Points-based valuation system

### Swap System
- Direct item-to-item swaps
- Points-based redemption
- Message-based communication
- Status tracking throughout the process

### Admin Features
- Item moderation and approval
- User management and monitoring
- Platform statistics and analytics
- Content moderation tools

## 🔮 Future Enhancements

### Planned Features
- Real-time notifications
- Chat system for swap negotiations
- Advanced search with filters
- Image recognition for automatic tagging
- Mobile app development
- Payment integration for premium features

### Technical Improvements
- Backend API integration
- Database implementation
- Real-time updates with WebSockets
- Image optimization and CDN
- Progressive Web App (PWA) features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Material Design for design inspiration
- React community for excellent documentation
- Unsplash for placeholder images
- Font Awesome for icons

---

**ReWear** - Making sustainable fashion accessible to everyone! 🌱👕 