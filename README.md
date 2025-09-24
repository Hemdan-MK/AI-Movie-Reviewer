# AI Movie Reviewer

A modern web application that allows users to discover movies, read reviews, and get AI-powered summaries of movie reviews using OpenAI's API.

## Features

- 🎬 Browse popular movies from TMDB API
- 🔍 Search for movies
- 🔐 Google Authentication with Firebase
- ✍️ Write and read movie reviews
- 🤖 AI-generated review summaries using OpenAI
- 📱 Responsive design with Tailwind CSS
- ⚡ Fast development with Vite

## Tech Stack

- **Frontend**: Vite + React + Tailwind CSS
- **Authentication**: Firebase Auth (Google)
- **Database**: Firestore
- **APIs**: TMDB API, Hugging Face API
- **Icons**: Lucide React
- **Deployment**: Vercel/Netlify ready

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key_here
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Get API Keys

#### TMDB API
1. Go to [TMDB](https://www.themoviedb.org/settings/api)

#### Google OAuth Setup (IMPORTANT!)

**The Google Client ID is required for authentication to work. Follow these steps carefully:**

1. **Go to Google Cloud Console**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Google Identity Services**
   - Go to "APIs & Services" → "Library"
   - Search for "Google Identity Services" and enable it

3. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Choose "Web application" as the application type

4. **Configure Authorized Origins** ⚠️ **CRITICAL STEP**
   - Add these origins to "Authorized JavaScript origins":
   ```
   http://localhost:5173
   http://127.0.0.1:5173
   http://localhost:3000
   https://yourdomain.com (for production)
   ```
   - **Note**: The port number should match your development server port
   - **Common Vite ports**: 5173, 3000, 8080

5. **Copy the Client ID**
   - After creating the credentials, copy the "Client ID"
   - Add it to your `.env` file as `VITE_GOOGLE_CLIENT_ID`

6. **Troubleshooting Common Issues**
   - **403 Error**: "The given origin is not allowed"
     - Check that your current origin matches the authorized origins
     - Make sure you've saved the OAuth client configuration
     - Try both `localhost` and `127.0.0.1` with your port
   - **Button not showing**: Check browser console for error messages
   - **Development vs Production**: Remember to add your production domain

**Example Origins Setup:**
```
Development:
- http://localhost:5173
- http://127.0.0.1:5173

Production:
- https://your-app.vercel.app
- https://your-domain.com
```

#### Firebase Authentication Setup

**⚠️ CRITICAL: The Google Client ID must match your Firebase project!**

**Option A: Get Client ID from Firebase (Recommended)**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project → Authentication → Sign-in method
3. Click "Google" and enable it if not already enabled
4. Copy the "Web SDK configuration" → Client ID
5. Use this Client ID in your `.env` file

**Option B: Link existing Google Client ID to Firebase**
1. In Firebase Console → Authentication → Sign-in method → Google
2. Click "Web SDK configuration" 
3. Enter your existing Google Client ID
4. Save the configuration

**Common Error: `auth/invalid-credential`**
```
Firebase: Invalid Idp Response: the Google id_token is not allowed 
to be used with this application. Its audience (OAuth 2.0 client ID) 
is [YOUR_CLIENT_ID], which is not authorized to be used in the project 
with project_number: [PROJECT_NUMBER].
```

**Solution:** Your Google Client ID doesn't match your Firebase project. Follow Option A above.
2. Create an account and request an API key
3. Add the API key to your `.env` file

#### Hugging Face API
1. Go to [Hugging Face Settings](https://huggingface.co/settings/tokens)
2. Create an account and generate an access token
3. Add the token to your `.env` file

#### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Google provider)
4. Enable Firestore Database
5. Get your config values and add them to your `.env` file

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation bar
│   ├── MovieCard.jsx   # Movie card component
│   ├── ReviewBox.jsx   # Review form component
│   └── SummaryBox.jsx  # AI summary component
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication context
├── firebase/           # Firebase configuration
│   └── config.js       # Firebase setup
├── pages/              # Page components
│   ├── Home.jsx        # Home page with movie grid
│   ├── MovieDetails.jsx # Movie details and reviews
│   └── Login.jsx       # Login page
├── services/           # API services
│   ├── tmdbApi.js      # TMDB API integration
│   └── openaiApi.js    # OpenAI API integration
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles with Tailwind
```

## Deployment

### Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy

## Usage

1. **Browse Movies**: Visit the home page to see popular movies
2. **Search**: Use the search bar to find specific movies
3. **Login**: Click "Login with Google" to authenticate
4. **View Details**: Click on any movie to see details and reviews
5. **Write Reviews**: Logged-in users can write reviews
6. **AI Summary**: Get AI-powered summaries of all reviews

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License