import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole, isUserLoggedIn } from '../services/authService';

export default function RoleBasedRoute({ children, allowedRoles }) {
  if (!isUserLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  const userRole = getUserRole();

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    const roleRoutes = {
      'CUSTOMER': '/customer/dashboard',
      'AGENT': '/agent/dashboard',
      'ENGINEER': '/engineer/dashboard',
    };
    return <Navigate to={roleRoutes[userRole] || '/'} replace />;
  }

  return children;
}