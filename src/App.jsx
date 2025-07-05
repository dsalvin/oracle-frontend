import React, { useEffect } from 'react'; // Add useEffect here
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './context/AuthContext';
import { setupInterceptors } from './api';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import AuthCallbackPage from './pages/AuthCallbackPage';

import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';

const AppRoutes = () => {
    const auth = useAuth();
    
    // This useEffect hook was causing the error because it wasn't imported
    useEffect(() => {
        setupInterceptors(auth);
    }, [auth]);

    return (
        <Routes>
            <Route path="/" element={!auth.token ? <LandingPage /> : <Navigate to="/dashboard" />} />
            <Route path="/login" element={!auth.token ? <LoginPage /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!auth.token ? <RegisterPage /> : <Navigate to="/dashboard" />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
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