import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation, Footer } from './components';
import ProtectedRoute from './components/ProtectedRoute';
import { HomePage, LoginPage, SignupPage, DashboardPage } from './pages';
import { isUserLoggedIn } from './services/authService';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page - Always accessible */}
        <Route
          path="/"
          element={
            <>
              <Navigation />
              <HomePage />
              <Footer />
            </>
          }
        />

        {/* Signup Page - Redirect to dashboard if already logged in */}
        <Route
          path="/signup"
          element={
            isUserLoggedIn() ? (
              <Navigate to="/user/dashboard" replace />
            ) : (
              <>
                <Navigation />
                <SignupPage />
                <Footer />
              </>
            )
          }
        />

        {/* Login Page - Redirect to dashboard if already logged in */}
        <Route
          path="/login"
          element={
            isUserLoggedIn() ? (
              <Navigate to="/user/dashboard" replace />
            ) : (
              <>
                <Navigation />
                <LoginPage />
                <Footer />
              </>
            )
          }
        />

        {/* Protected Dashboard Route */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}