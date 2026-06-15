const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function authHeaders() {
  const token = localStorage.getItem('festivall_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...authHeaders(), ...options.headers },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro na API');
  return data;
}

export const api = {
  // Auth
  register: (username, password, tmApiKey) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify({ username, password, tmApiKey }) }),
  login: (username, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  updateApiKey: (tmApiKey) =>
    request('/auth/api-key', { method: 'PUT', body: JSON.stringify({ tmApiKey }) }),

  // Favorites
  getFavorites: (page = 1, limit = 20) => request(`/favorites?page=${page}&limit=${limit}`),
  addFavorite: (event) => request('/favorites', { method: 'POST', body: JSON.stringify({ event }) }),
  removeFavorite: (eventId) => request(`/favorites/${eventId}`, { method: 'DELETE' }),

  // History
  getHistory: (page = 1, limit = 20) => request(`/history?page=${page}&limit=${limit}`),
  addHistory: (event) => request('/history', { method: 'POST', body: JSON.stringify({ event }) }),

  // Saved searches
  getSavedSearches: () => request('/searches'),
  saveSearch: (label, filters) => request('/searches', { method: 'POST', body: JSON.stringify({ label, filters }) }),
  deleteSearch: (id) => request(`/searches/${id}`, { method: 'DELETE' }),

  // Ratings
  getRatings: () => request('/ratings'),
  rateEvent: (eventId, eventName, stars, note) =>
    request('/ratings', { method: 'POST', body: JSON.stringify({ eventId, eventName, stars, note }) }),
  deleteRating: (eventId) => request(`/ratings/${eventId}`, { method: 'DELETE' }),

  // Lists
  getLists: () => request('/lists'),
  createList: (name) => request('/lists', { method: 'POST', body: JSON.stringify({ name }) }),
  deleteList: (id) => request(`/lists/${id}`, { method: 'DELETE' }),
  getListEvents: (id) => request(`/lists/${id}/events`),
  addToList: (id, event) => request(`/lists/${id}/events`, { method: 'POST', body: JSON.stringify({ event }) }),
  removeFromList: (id, eventId) => request(`/lists/${id}/events/${eventId}`, { method: 'DELETE' }),
};
