import { createContext, useContext, useMemo, useState } from 'react';
import { api } from '../api/backend';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('festivall_token') || '');
  const [username, setUsername] = useState(() => localStorage.getItem('festivall_username') || '');
  const [tmApiKey, setTmApiKey] = useState(() => localStorage.getItem('festivall_api_key') || '');

  function applySession(data) {
    localStorage.setItem('festivall_token', data.token);
    localStorage.setItem('festivall_username', data.username);
    localStorage.setItem('festivall_api_key', data.tmApiKey || '');
    setToken(data.token);
    setUsername(data.username);
    setTmApiKey(data.tmApiKey || '');
  }

  async function login(user, password) {
    applySession(await api.login(user, password));
  }

  async function register(user, password, apiKey) {
    applySession(await api.register(user, password, apiKey));
  }

  async function updateApiKey(newKey) {
    const result = await api.updateApiKey(newKey);
    localStorage.setItem('festivall_api_key', result.tmApiKey);
    setTmApiKey(result.tmApiKey);
  }

  function logout() {
    localStorage.removeItem('festivall_token');
    localStorage.removeItem('festivall_username');
    localStorage.removeItem('festivall_api_key');
    setToken('');
    setUsername('');
    setTmApiKey('');
  }

  const value = useMemo(
    () => ({ token, username, tmApiKey, isAuthenticated: Boolean(token), login, register, updateApiKey, logout }),
    [token, username, tmApiKey]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
