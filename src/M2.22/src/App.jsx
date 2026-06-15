import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Artists from './pages/Artists';
import Dashboard from './pages/Dashboard';
import EventDetail from './pages/EventDetail';
import Events from './pages/Events';
import Favorites from './pages/Favorites';
import History from './pages/History';
import Lists from './pages/Lists';
import Ratings from './pages/Ratings';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}

function AppShell() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <div className="app">
      {!isLogin && <NavBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/events" element={<RequireAuth><Events /></RequireAuth>} />
        <Route path="/events/:id" element={<RequireAuth><EventDetail /></RequireAuth>} />
        <Route path="/artists" element={<RequireAuth><Artists /></RequireAuth>} />
        <Route path="/favorites" element={<RequireAuth><Favorites /></RequireAuth>} />
        <Route path="/history" element={<RequireAuth><History /></RequireAuth>} />
        <Route path="/lists" element={<RequireAuth><Lists /></RequireAuth>} />
        <Route path="/ratings" element={<RequireAuth><Ratings /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isLogin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <AppShell />
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
