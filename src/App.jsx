import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import OneTapProvider from './components/OneTapProvider';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <OneTapProvider>
          <div className="min-h-screen bg-slate-900">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </OneTapProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
