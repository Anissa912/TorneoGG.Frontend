import { request } from './client';

export const login = (alias, password) =>
  request('/auth/login', { method: 'POST', body: { alias, password } });

export const getDashboard = (token) => request('/dashboard', { token });

// 404 = "aún no hay resultados": se trata como lista vacía.
export async function getResultados(token, jugadorId) {
  try {
    return await request(`/resultados/${jugadorId}`, { token });
  } catch (err) {
    if (err.status === 404) return [];
    throw err;
  }
}

export const registrarResultado = (token, payload) =>
  request('/resultados', { method: 'POST', body: payload, token });

export const getJugadores = (token, filtro = '') =>
  request(`/jugadores${filtro ? `?filtro=${encodeURIComponent(filtro)}` : ''}`, { token });

export const getAuditoria = (token, top = 50) => request(`/auditoria?top=${top}`, { token });
