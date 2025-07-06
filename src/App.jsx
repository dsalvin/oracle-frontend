import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './context/AuthContext';
import { setupInterceptors } from './api';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import AuthCallbackPage from './pages/AuthCallbackPage';

// This component handles the main routing logic
const AppRoutes = () => {
    const auth = useAuth();
    
    useEffect(() => {
        setupInterceptors(auth);
    }, [auth]);

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />

            {/* Protected Route */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all for any other path */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;