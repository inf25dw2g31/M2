import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api/backend';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  async function loadPage(p = 1) {
    const res = await api.getFavorites(p);
    setFavorites(res.data);
    setTotal(res.total);
    setPage(res.page);
    setPages(res.pages);
  }

  useEffect(() => {
    if (!isAuthenticated) { setFavorites([]); setTotal(0); return; }
    loadPage(1);
  }, [isAuthenticated]);

  function isFavorite(eventId) {
    return favorites.some((e) => e.id === eventId);
  }

  async function toggleFavorite(event) {
    if (isFavorite(event.id)) {
      await api.removeFavorite(event.id);
      setFavorites((prev) => prev.filter((e) => e.id !== event.id));
      setTotal((t) => t - 1);
    } else {
      await api.addFavorite(event);
      setFavorites((prev) => [event, ...prev]);
      setTotal((t) => t + 1);
    }
  }

  const value = useMemo(
    () => ({ favorites, total, page, pages, loadPage, isFavorite, toggleFavorite }),
    [favorites, total, page, pages]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
