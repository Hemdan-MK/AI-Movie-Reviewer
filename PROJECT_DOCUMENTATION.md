# AI Movie Reviewer - Project Documentation

## 1. Project Overview

**AI Movie Reviewer** is a modern, full-stack web application that provides comprehensive movie discovery and review capabilities powered by artificial intelligence. The platform combines professional movie data from The Movie Database (TMDB) with user-generated reviews and AI-powered insights to help users discover their next favorite movie.

### Purpose
- **Movie Discovery**: Browse and search through thousands of movies across different categories (Popular, Top Rated, Now Playing, Upcoming)
- **AI-Powered Insights**: Generate intelligent summaries of movie reviews using Google's Gemini AI
- **Community Reviews**: Allow authenticated users to write and share their own movie reviews
- **Professional Reviews**: Display official reviews from TMDB's professional critics

### Goals
- Create an intuitive and visually appealing movie discovery experience
- Provide AI-enhanced insights to help users make informed movie choices
- Build a community-driven review system
- Deliver a responsive, modern user interface with smooth animations

## 2. Features

### User-Side Features

#### **Movie Discovery**
- **Browse Movies**: View movies across 4 categories (Popular, Top Rated, Now Playing, Upcoming)
- **Search Functionality**: Real-time search with instant results
- **Pagination**: Load more movies with infinite scroll capability
- **Movie Details**: Comprehensive movie information including cast, crew, ratings, and plot

#### **Review System**
- **Write Reviews**: Authenticated users can write detailed movie reviews
- **One Review Per Movie**: Users can only write one review per movie to ensure quality
- **Real-time Updates**: Reviews appear instantly using Firestore real-time listeners
- **Professional Reviews**: Display official TMDB critic reviews alongside user reviews

#### **AI-Powered Features**
- **Smart Summaries**: Google Gemini AI generates comprehensive summaries of all reviews
- **Sentiment Analysis**: AI analyzes overall sentiment and common themes
- **Professional vs User Insights**: Compare professional critic opinions with user reviews

#### **User Experience**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion powered animations for enhanced UX
- **Dark Theme**: Modern dark theme with gradient accents
- **Loading States**: Skeleton loaders and smooth transitions

### Admin-Side Features
*Note: This is a client-side application with Firebase backend. Admin features would require additional implementation.*

## 3. Tech Stack

### Frontend
- **React 19.1.1** - Modern React with latest features
- **Vite 7.1.12** - Fast build tool and development server
- **React Router DOM 7.9.1** - Client-side routing
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **Framer Motion 12.23.20** - Animation library
- **GSAP 3.13.0** - Advanced animations

### UI Components
- **Radix UI** - Accessible component primitives
  - Dialog, Dropdown Menu, Tabs, Toast, Slot
- **Lucide React 0.544.0** - Icon library
- **Headless UI 2.2.8** - Unstyled accessible components

### Backend & Database
- **Firebase 12.3.0** - Backend-as-a-Service
  - **Firestore** - NoSQL database for reviews and user data
  - **Authentication** - Google OAuth integration
- **Google AI (Gemini)** - AI-powered review summarization

### External APIs
- **The Movie Database (TMDB) API** - Movie data and professional reviews
- **Google Identity Services** - One-tap sign-in experience

### Development Tools
- **ESLint 9.36.0** - Code linting
- **Babel React Compiler** - React optimization
- **TypeScript Support** - Type definitions for React

## 4. Architecture

### Client-Server Architecture
The application follows a **Single Page Application (SPA)** architecture with the following components:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │   Firebase      │    │  External APIs  │
│                 │    │   Backend       │    │                 │
│ • Components    │◄──►│ • Firestore     │    │ • TMDB API      │
│ • State Mgmt    │    │ • Auth          │    │ • Google AI     │
│ • Routing       │    │ • Real-time     │    │ • Google OAuth  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Component Architecture
- **Context Pattern**: Global state management with React Context (AuthContext)
- **Service Layer**: Separate API services for TMDB and Google AI
- **Component Composition**: Reusable UI components with Radix UI primitives
- **Custom Hooks**: Reusable logic (useAuth, useAnimatedCounter)

### Data Flow
1. **User Authentication**: Google OAuth → Firebase Auth → Context State
2. **Movie Data**: TMDB API → React State → UI Components
3. **Reviews**: User Input → Firestore → Real-time Updates → UI
4. **AI Summaries**: Review Data → Google AI → Generated Summary → UI

## 5. Setup Instructions

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd ai-movie-reviewer
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Environment Configuration
1. Copy the environment template:
   ```bash
   cp env.example .env
   ```

2. Configure the following environment variables in `.env`:
   ```env
   # TMDB API Configuration
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   
   # Google AI Configuration
   VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key_here
   
   # Google OAuth Configuration
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### Step 4: API Keys Setup

#### TMDB API Key
1. Visit [TMDB API](https://www.themoviedb.org/settings/api)
2. Create an account and request an API key
3. Add the key to your `.env` file

#### Google AI API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key for Gemini
3. Add the key to your `.env` file

#### Firebase Configuration
1. Create a new project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication with Google provider
3. Create a Firestore database
4. Copy the configuration values to your `.env` file

#### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add your domain to authorized origins
4. Copy the Client ID to your `.env` file

### Step 5: Run the Application
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## 6. Deployment Guide

### Netlify Deployment
The project includes `netlify.toml` configuration:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Deployment Steps:**
1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on git push

### Vercel Deployment
The project includes `vercel.json` configuration:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

**Deployment Steps:**
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Configure environment variables
4. Deploy with `vercel --prod`

### Manual Deployment
1. Build the project: `npm run build`
2. Upload the `dist` folder to your web server
3. Configure server to serve `index.html` for all routes (SPA routing)

## 7. API Documentation

### TMDB API Endpoints
The application uses the following TMDB API endpoints:

#### Movies
- `GET /movie/popular` - Get popular movies
- `GET /movie/top_rated` - Get top-rated movies
- `GET /movie/now_playing` - Get currently playing movies
- `GET /movie/upcoming` - Get upcoming movies
- `GET /movie/{id}` - Get movie details
- `GET /movie/{id}/images` - Get movie images
- `GET /movie/{id}/reviews` - Get movie reviews
- `GET /search/movie` - Search movies

#### Image URLs
- Base URL: `https://image.tmdb.org/t/p/`
- Sizes: `w500`, `w1280`, `original`

### Google AI API
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent`
- **Method**: POST
- **Models**: `gemini-1.5-flash`, `gemini-1.5-pro`, `gemini-pro`
- **Purpose**: Generate AI summaries of movie reviews

### Firebase Firestore Collections

#### Reviews Collection
```javascript
{
  id: "auto-generated-id",
  userId: "firebase-user-id",
  userEmail: "user@example.com",
  userName: "User Display Name",
  movieId: "tmdb-movie-id",
  content: "Review text content",
  createdAt: "Firebase Timestamp",
  upvotes: 0,
  downvotes: 0
}
```

## 8. Database Schema

### Firestore Collections

#### `reviews`
- **Purpose**: Store user-generated movie reviews
- **Security Rules**: Users can only read/write their own reviews
- **Indexes**: 
  - `movieId` (for filtering by movie)
  - `createdAt` (for sorting by date)
  - `userId` (for user-specific queries)

#### `users` (Future Enhancement)
- **Purpose**: Store additional user profile information
- **Fields**: Display name, preferences, review history

### Data Relationships
```
User (Firebase Auth)
├── Reviews (1:many)
    └── Movie (TMDB ID reference)
```

## 9. Authentication & Security

### Authentication Flow
1. **Google OAuth**: Users sign in with Google accounts
2. **Firebase Auth**: Handles authentication state management
3. **Context Provider**: Provides auth state to entire application
4. **Protected Routes**: Certain features require authentication

### Security Features
- **One Review Per User**: Prevents spam and ensures quality
- **Input Validation**: Client and server-side validation
- **CORS Protection**: Proper API configuration
- **Environment Variables**: Sensitive data stored securely

### Firebase Security Rules (Recommended)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reviews/{reviewId} {
      allow read: if true; // Public read access
      allow write: if request.auth != null 
        && request.auth.uid == resource.data.userId; // Only owner can write
    }
  }
}
```

## 10. Usage Guide

### For End Users

#### Getting Started
1. **Visit the Application**: Open the deployed URL
2. **Browse Movies**: Use the category filters or search functionality
3. **View Movie Details**: Click on any movie to see detailed information
4. **Sign In**: Click "Sign In" to access review features

#### Writing Reviews
1. **Navigate to Movie**: Go to any movie's detail page
2. **Sign In**: Use Google account to authenticate
3. **Write Review**: Enter your thoughts in the review box
4. **Submit**: Click "Submit Review" to publish

#### Using AI Features
1. **View AI Summary**: AI summaries appear automatically on movie pages
2. **Compare Reviews**: See both professional and user reviews
3. **Get Insights**: AI provides sentiment analysis and key themes

### For Developers

#### Adding New Features
1. **Components**: Create new components in `src/components/`
2. **Pages**: Add new pages in `src/pages/`
3. **Services**: Extend API services in `src/services/`
4. **Styling**: Use Tailwind CSS classes

#### State Management
- **Global State**: Use React Context for authentication
- **Local State**: Use useState/useEffect for component state
- **Real-time Data**: Use Firestore listeners for live updates

## 11. Contributing Guidelines

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Standards
- **ESLint**: Follow the configured linting rules
- **Prettier**: Use consistent code formatting
- **Component Structure**: Follow existing patterns
- **Naming**: Use descriptive variable and function names
- **Comments**: Document complex logic

### Pull Request Process
1. **Description**: Clearly describe changes
2. **Testing**: Include test results
3. **Screenshots**: For UI changes
4. **Breaking Changes**: Document any breaking changes

## 12. Future Enhancements

### Planned Features

#### User Experience
- **User Profiles**: Detailed user profiles with review history
- **Watchlists**: Save movies to watch later
- **Recommendations**: AI-powered movie recommendations
- **Social Features**: Follow other users, like reviews
- **Mobile App**: React Native mobile application

#### AI Enhancements
- **Sentiment Analysis**: More detailed sentiment breakdown
- **Genre Recommendations**: AI suggestions based on preferences
- **Review Quality Scoring**: AI-powered review quality assessment
- **Multi-language Support**: AI summaries in multiple languages

#### Technical Improvements
- **Performance Optimization**: Code splitting and lazy loading
- **Caching**: Implement Redis caching for API responses
- **Analytics**: User behavior tracking and insights
- **Testing**: Comprehensive test suite (Jest, Cypress)
- **PWA Features**: Offline support and push notifications

#### Admin Features
- **Content Moderation**: Admin panel for review management
- **Analytics Dashboard**: User engagement and movie popularity metrics
- **API Management**: Rate limiting and usage monitoring
- **Bulk Operations**: Mass data operations and cleanup

### Technical Debt
- **Error Boundaries**: Implement React error boundaries
- **Loading States**: Improve loading state management
- **Accessibility**: Enhanced ARIA support and keyboard navigation
- **SEO**: Server-side rendering for better search engine optimization

---

## Support

For questions, issues, or contributions, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation for common solutions

---

*Last updated: December 2024*
*Version: 1.0.0*
