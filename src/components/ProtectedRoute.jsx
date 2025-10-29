import React from 'react';
import { Navigate } from 'react-router-dom';
import { isUserLoggedIn } from '../services/authService';

export default function ProtectedRoute({ children }) {
  if (!isUserLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}