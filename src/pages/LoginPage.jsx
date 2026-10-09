import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Button from '../components/Button';
import TextField from '../components/TextField';

export default function LoginPage() {
  const { isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [alias, setAlias] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(alias.trim(), password);
      navigate(location.state?.from?.pathname ?? '/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="center">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <div className="mark-big" />
        <h2>Inicia sesión</h2>
        <p className="sub">Consulta tus resultados y estadísticas del torneo.</p>
        <TextField label="Alias" value={alias} autoComplete="username" maxLength={50} required
          onChange={(e) => setAlias(e.target.value)} />
        <TextField label="Contraseña" type="password" value={password} autoComplete="current-password" maxLength={100} required
          onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="msg lose" role="alert">{error}</p>}
        <Button type="submit" loading={loading}>Entrar</Button>
      </form>
    </main>
  );
}
