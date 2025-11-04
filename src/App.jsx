import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation, Footer } from './components';
import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedRoute from './components/RoleBasedRoute';
import AgentLayout from './layouts/AgentLayout';
import { HomePage, LoginPage, SignupPage, DashboardPage, AgentDashboard } from './pages';
import CreateCustomerTicket from './pages/CreateCustomerTicket';
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
              <Navigate to="/customer/dashboard" replace />
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
              <Navigate to="/customer/dashboard" replace />
            ) : (
              <>
                <Navigation />
                <LoginPage />
                <Footer />
              </>
            )
          }
        />

        {/* Customer Route */}
        <Route
          path="/customer/dashboard"
          element={
            <RoleBasedRoute allowedRoles={['CUSTOMER']}>
              <DashboardPage />
            </RoleBasedRoute>
          }
        />

        {/* Agent Routes - Nested with Layout */}
        <Route
          path="/agent"
          element={
            <RoleBasedRoute allowedRoles={['AGENT']}>
              <AgentLayout />
            </RoleBasedRoute>
          }
        >
          <Route path="dashboard" element={<AgentDashboard />} />
          <Route path="create-ticket" element={<CreateCustomerTicket />} />
        </Route>

        {/* Engineer Route */}
        <Route
          path="/engineer/dashboard"
          element={
            <RoleBasedRoute allowedRoles={['ENGINEER']}>
              {/* <EngineerDashboard /> - Create this next */}
            </RoleBasedRoute>
          }
        />

        {/* Redirect old route */}
        <Route path="/user/dashboard" element={<Navigate to="/customer/dashboard" replace />} />

        {/* ProtectedRoute example if needed */}
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <div>Protected Content</div>
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}