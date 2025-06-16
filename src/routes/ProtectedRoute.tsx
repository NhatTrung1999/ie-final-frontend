import { useAppSelector } from '../app/hooks';
import { Navigate } from 'react-router';
import AppLayout from '../components/layouts';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated ? <AppLayout /> : <Navigate to={'/login'} replace />;
};

export default ProtectedRoute;
