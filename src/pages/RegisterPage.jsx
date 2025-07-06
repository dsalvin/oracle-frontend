import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { TextField, Button, Box, Alert, Link, Grid } from '@mui/material';
import AuthLayout from '../layouts/AuthLayout';
import apiClient from '../api';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        try {
            // Use apiClient instead of fetch
            const response = await apiClient.post('/api/register', { 
                email: formData.email, 
                password: formData.password,
                first_name: formData.firstName,
                last_name: formData.lastName
            });

            // With Axios, a non-2xx response automatically throws an error
            navigate('/login');
        } catch (err) {
            const message = err.response?.data?.detail || err.message;
            setError(message);
        }
    };

    return (
        <AuthLayout title="Create Your Account">
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField name="firstName" required fullWidth label="First Name" value={formData.firstName} onChange={handleChange} autoComplete="given-name" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="lastName" required fullWidth label="Last Name" value={formData.lastName} onChange={handleChange} autoComplete="family-name" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="email" type="email" required fullWidth label="Email Address" value={formData.email} onChange={handleChange} autoComplete="email" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="password" type="password" required fullWidth label="Password" value={formData.password} onChange={handleChange} autoComplete="new-password" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name="confirmPassword" type="password" required fullWidth label="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
                <Link component={RouterLink} to="/login" variant="body2" sx={{display: 'block', textAlign: 'center'}}>
                    Already have an account? Sign In
                </Link>
            </Box>
        </AuthLayout>
    );
};
export default RegisterPage;