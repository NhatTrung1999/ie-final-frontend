import { Route, Routes } from 'react-router';
import { CycleTimePage, LoginPage } from '../pages';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route index element={<CycleTimePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
