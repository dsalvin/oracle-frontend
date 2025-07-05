import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert, Link, InputAdornment, IconButton } from '@mui/material';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { Divider } from '@mui/material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');

    const { saveToken } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // This useEffect hook safely checks for the session expired message
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('sessionExpired')) {
            setInfo('Your session has expired. Please log in again.');
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setInfo('');
        try {
            const response = await fetch('http://localhost:8000/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ 'username': email, 'password': password }),
            });
            const data = await response.json(); // fetch still needs .json()
            if (!response.ok) throw new Error(data.detail || 'Login failed');
            saveToken(data.access_token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <AuthLayout title="Welcome Back">
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                {/* Display info or error messages */}
                {info && !error && <Alert severity="info" sx={{ width: '100%', mb: 2 }}>{info}</Alert>}
                {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                
                <TextField 
                    margin="normal" 
                    required 
                    fullWidth 
                    label="Email Address" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    autoComplete="email"
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><Mail size={20} color="gray" /></InputAdornment>,
                    }}
                />
                <TextField 
                    margin="normal" 
                    required 
                    fullWidth 
                    label="Password" 
                    type={showPassword ? 'text' : 'password'}
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    autoComplete="current-password"
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><Lock size={20} color="gray" /></InputAdornment>,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
                <Divider sx={{ my: 2 }}>OR</Divider>
                <GoogleLoginButton />
                <Link component={RouterLink} to="/register" variant="body2" sx={{display: 'block', textAlign: 'center', mt: 2}}>
                    Don't have an account? Sign Up
                </Link>
            </Box>
        </AuthLayout>
    );
};

export default LoginPage;