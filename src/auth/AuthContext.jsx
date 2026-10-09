import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { login as apiLogin } from '../api/endpoints';

const AuthContext = createContext(null);
const KEY = 'torneogg.session';

function loadSession() {
  try {
    const s = JSON.parse(sessionStorage.getItem(KEY));
    if (s && new Date(s.expiraUtc) > new Date()) return s;
  } catch { /* sesión corrupta: se descarta */ }
  sessionStorage.removeItem(KEY);
  return null;
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(loadSession);

  const logout = useCallback(() => {
    sessionStorage.removeItem(KEY);
    setSession(null);
  }, []);

  const signIn = useCallback(async (alias, password) => {
    const data = await apiLogin(alias, password);
    sessionStorage.setItem(KEY, JSON.stringify(data));
    setSession(data);
  }, []);

  // La sesión se cierra sola cuando el token expira.
  useEffect(() => {
    if (!session) return;
    const ms = new Date(session.expiraUtc) - Date.now();
    const t = setTimeout(logout, Math.max(ms, 0));
    return () => clearTimeout(t);
  }, [session, logout]);

  // El backend respondió 401 a una petición con token.
  useEffect(() => {
    window.addEventListener('auth:expired', logout);
    return () => window.removeEventListener('auth:expired', logout);
  }, [logout]);

  const value = useMemo(
    () => ({ session, isAuthenticated: !!session, isAdmin: session?.rol === 'Admin', signIn, logout }),
    [session, signIn, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
