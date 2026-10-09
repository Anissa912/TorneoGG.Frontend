const BASE = '/api';

// Cliente HTTP único: agrega el JWT y avisa si la sesión ya no es válida.
export async function request(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(BASE + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (res.status === 401 && token) window.dispatchEvent(new Event('auth:expired'));

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(data?.mensaje ?? data?.title ?? 'No se pudo completar la solicitud.');
    err.status = res.status;
    throw err;
  }
  return data;
}
