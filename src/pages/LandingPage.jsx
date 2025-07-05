import React from 'react';
import { Box, Button, Container, Typography, Stack, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BarChart, BrainCircuit, ShieldCheck, UploadCloud, Target, LineChart as LineChartIcon } from 'lucide-react';

// Reusable Feature Card component (No changes needed here)
const FeatureCard = ({ icon, title, description }) => (
    <Stack direction="row" spacing={2} alignItems="center">
        <Box sx={{color: 'primary.main'}}>{icon}</Box>
        <Box>
            <Typography variant="h6" sx={{fontWeight: 'bold'}}>{title}</Typography>
            <Typography color="text.secondary">{description}</Typography>
        </Box>
    </Stack>
);

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ background: 'radial-gradient(circle at top, hsl(240, 15%, 15%), hsl(240, 15%, 10%))', color: 'white' }}>
            
            {/* Hero Section */}
            <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Container maxWidth="md">
                    <Stack spacing={4} alignItems="center">
                        <Stack spacing={2}>
                            <Typography variant="h2" component="h1" sx={{ fontWeight: 700 }}>
                                Stop Guessing. Start Forecasting.
                            </Typography>
                            <Typography variant="h5" color="text.secondary">
                                Oracle transforms your historical sales data into actionable, AI-powered forecasts. Make smarter inventory, marketing, and supply chain decisions today.
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center">
                            <Button variant="contained" color="primary" size="large" onClick={() => navigate('/register')}>Get Started for Free</Button>
                            <Button variant="outlined" color="secondary" size="large" onClick={() => navigate('/login')}>Sign In</Button>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            {/* Features Section */}
            <Box sx={{ py: 12, backgroundColor: 'background.default' }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center', mb: 8 }}>Why Choose Oracle?</Typography>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4}><FeatureCard icon={<BrainCircuit size={40}/>} title="AI-Powered Forecasts" description="Leverage proven time-series models to predict future sales with confidence."/></Grid>
                        <Grid item xs={12} md={4}><FeatureCard icon={<BarChart size={40}/>} title="Interactive Dashboards" description="Visualize historical trends and future predictions in a clean, modern interface."/></Grid>
                        <Grid item xs={12} md={4}><FeatureCard icon={<ShieldCheck size={40}/>} title="Secure & Private" description="Your data is your data. Secure user accounts and private file storage."/></Grid>
                    </Grid>
                </Container>
            </Box>

            {/* How It Works Section */}
            <Box sx={{ py: 12, backgroundColor: 'background.paper' }}>
                <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 8 }}>Get Insights in 3 Simple Steps</Typography>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={3}><Stack alignItems="center" spacing={1}><UploadCloud size={48} color="#665DDE"/><Typography variant="h6">1. Upload Data</Typography><Typography color="text.secondary">Securely upload your CSV sales file.</Typography></Stack></Grid>
                        <Grid item xs={12} md={3}><Stack alignItems="center" spacing={1}><Target size={48} color="#665DDE"/><Typography variant="h6">2. Select Product</Typography><Typography color="text.secondary">Choose the product you want to forecast.</Typography></Stack></Grid>
                        <Grid item xs={12} md={3}><Stack alignItems="center" spacing={1}><LineChartIcon size={48} color="#665DDE"/><Typography variant="h6">3. Get Insight</Typography><Typography color="text.secondary">Receive a 30-day forecast and an actionable summary.</Typography></Stack></Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Testimonial Section */}
            <Box sx={{ py: 12, backgroundColor: 'background.default' }}>
                <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                    <Paper elevation={0} sx={{ p: 4, backgroundColor: 'rgba(40, 40, 60, 0.2)', borderRadius: '16px' }}>
                        <Typography variant="h6" color="text.secondary" sx={{fontStyle: 'italic'}}>
                            "This is the 'check engine' light for my business's inventory. I can see problems before they happen."
                        </Typography>
                        <Typography sx={{mt: 2, fontWeight: 'bold'}}>- Shonzix, CEO of DsShonzix</Typography>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;