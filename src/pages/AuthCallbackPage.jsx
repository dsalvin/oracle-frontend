import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

const AuthCallbackPage = () => {
    const { saveToken } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Get the token from the URL query parameters
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            // Save the token and redirect to the dashboard
            saveToken(token);
            navigate('/dashboard', { replace: true });
        } else {
            // If no token is found, redirect to login with an error
            navigate('/login', { replace: true });
        }
    }, [location, saveToken, navigate]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Completing sign-in...</Typography>
        </Box>
    );
};

export default AuthCallbackPage;