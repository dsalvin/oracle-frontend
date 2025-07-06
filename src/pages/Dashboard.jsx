import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box, Stack, Divider } from '@mui/material'; // Import Divider

import FileUpload from '../components/FileUpload';
import ForecastGenerator from '../components/ForecastGenerator';
import WelcomeIllustration from '../components/WelcomeIllustration';
import HistoricalAnalysis from '../components/HistoricalAnalysis'; // Import the new component
import { Link as RouterLink } from 'react-router-dom';

const Dashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [uploadedFilename, setUploadedFilename] = useState('');
    const [isDataUploaded, setIsDataUploaded] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    const handleUploadSuccess = (productList, filename) => {
        setProducts(productList);
        setUploadedFilename(filename);
        setIsDataUploaded(true);
    };

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            background: 'radial-gradient(circle at top, hsl(240, 15%, 15%), hsl(240, 15%, 10%))',
            p: 4
        }}>
            <Container maxWidth="xl">
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                    <RouterLink to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="h4" component="h1" sx={{fontWeight: 700}}>
                            Dashboard
                        </Typography>
                    </RouterLink>
                    <Button variant="outlined" onClick={handleLogout}>Logout</Button>
                </Stack>

                <Stack spacing={4}>
                    {!isDataUploaded && <WelcomeIllustration />}
                    <FileUpload onUploadSuccess={handleUploadSuccess} />
                    
                    {isDataUploaded && (
                        <>
                            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', my: 2 }} />
                            <HistoricalAnalysis filename={uploadedFilename} />
                            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', my: 2 }} />
                            <ForecastGenerator products={products} filename={uploadedFilename} />
                        </>
                    )}
                </Stack>
            </Container>
        </Box>
    );
};

export default Dashboard;