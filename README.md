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
- **APIs**: TMDB API, OpenAI API
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
VITE_OPENAI_API_KEY=your_openai_api_key_here
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
2. Create an account and request an API key
3. Add the API key to your `.env` file

#### OpenAI API
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account and generate an API key
3. Add the API key to your `.env` file

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