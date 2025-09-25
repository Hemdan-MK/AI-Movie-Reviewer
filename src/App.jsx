import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OneTapProvider from './components/OneTapProvider';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <OneTapProvider>
          <div className="min-h-screen bg-slate-900 flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/movie/:id" element={<MovieDetails />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </OneTapProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
