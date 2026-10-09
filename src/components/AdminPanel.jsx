import { useCallback, useEffect, useState } from 'react';
import { getAuditoria, getJugadores } from '../api/endpoints';
import AuditTable from './AuditTable';
import PlayersTable from './PlayersTable';
import RegisterResultForm from './RegisterResultForm';
import TextField from './TextField';

// Todo lo que solo ve un administrador. El backend lo vuelve a verificar con el rol del token.
export default function AdminPanel({ token, onDataChanged }) {
  const [jugadores, setJugadores] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState('');

  const cargarAuditoria = useCallback(
    () => getAuditoria(token).then(setEventos).catch((e) => setError(e.message)), [token]);

  useEffect(() => { cargarAuditoria(); }, [cargarAuditoria]);
  useEffect(() => {
    const t = setTimeout(() => getJugadores(token, filtro).then(setJugadores).catch((e) => setError(e.message)), 250);
    return () => clearTimeout(t);
  }, [token, filtro]);

  return (
    <>
      {error && <p className="msg lose" role="alert">{error}</p>}

      <div className="section-title">Jugadores</div>
      <TextField label="Buscar por alias o nombre" value={filtro} onChange={(e) => setFiltro(e.target.value)} />
      <PlayersTable rows={jugadores} />

      <RegisterResultForm token={token} onRegistered={() => { cargarAuditoria(); onDataChanged?.(); }} />

      <div className="section-title">Bitácora de auditoría</div>
      <AuditTable rows={eventos} />
    </>
  );
}
