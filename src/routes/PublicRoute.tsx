import React from 'react';
import { useAppSelector } from '../app/hooks';
import { Navigate } from 'react-router';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return isAuthenticated ? <Navigate to={'/'} replace /> : children;
};

export default PublicRoute;
