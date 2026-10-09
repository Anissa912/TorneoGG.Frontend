import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Sin sesión válida el Dashboard no se muestra: se redirige al login.
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return isAuthenticated ? children : <Navigate to="/login" replace state={{ from: location }} />;
}
