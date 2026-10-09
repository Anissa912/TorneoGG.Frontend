import { useCallback, useEffect, useState } from 'react';
import { getDashboard, getResultados } from '../api/endpoints';
import { useAuth } from '../auth/AuthContext';
import AdminPanel from '../components/AdminPanel';
import Navbar from '../components/Navbar';
import ResultsTable from '../components/ResultsTable';
import Stat from '../components/Stat';

export default function DashboardPage() {
  const { session, isAdmin, logout } = useAuth();
  const [data, setData] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState('');

  const cargar = useCallback(async () => {
    try {
      const d = await getDashboard(session.token);
      setData(d);
      setResultados(d.jugador ? await getResultados(session.token, d.jugador.jugadorId) : []);
    } catch (err) {
      setError(err.message);
    }
  }, [session.token]);

  useEffect(() => { cargar(); }, [cargar]);

  const jugador = data?.jugador;

  return (
    <>
      <Navbar alias={session.alias} rol={session.rol} onLogout={logout} />
      <main className="dash">
        {error && <p className="msg lose" role="alert">{error}</p>}

        {jugador && (
          <div className="profile">
            <div>
              <div className="alias">{jugador.alias}</div>
              <div className="name">{jugador.nombre} {jugador.apellidos} · {jugador.equipo}</div>
            </div>
            <div className="stats-row">
              <Stat value={jugador.nivel} label="Nivel" />
              <Stat value={data.totalResultados} label="Partidas" />
            </div>
          </div>
        )}

        {isAdmin && data?.resumen && (
          <div className="profile">
            <div className="alias">Resumen del torneo</div>
            <div className="stats-row">
              <Stat value={data.resumen.jugadoresActivos} label="Jugadores" />
              <Stat value={data.resumen.resultadosRegistrados} label="Resultados" />
              <Stat value={data.resumen.loginsCorrectos24h} label="Logins 24 h" tone="win" />
              <Stat value={data.resumen.loginsFallidos24h} label="Fallidos 24 h" tone="lose" />
            </div>
          </div>
        )}

        {jugador && (
          <>
            <div className="section-title">Resultados</div>
            <ResultsTable rows={resultados} />
          </>
        )}

        {!jugador && !isAdmin && <p className="empty">Tu usuario no tiene una ficha de jugador asociada.</p>}

        {isAdmin && <AdminPanel token={session.token} onDataChanged={cargar} />}
      </main>
    </>
  );
}
