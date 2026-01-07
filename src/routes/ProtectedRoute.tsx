import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.tsx';
import ROUTE_CONFIG from '../core/constants/routes.ts';
import { ROUTES } from '../core/types/routes.ts';

type ProtectedRouteProps = {
  children: React.ReactElement;
  fallback?: React.ReactElement;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, fallback }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      fallback ?? (
        <div className='flex min-h-screen items-center justify-center'>
          <div className='text-center'>Loading...</div>
        </div>
      )
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTE_CONFIG[ROUTES.HOME].path} replace />;
  }

  return children;
};

export default ProtectedRoute;
