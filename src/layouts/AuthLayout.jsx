import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { BarChart2 } from 'lucide-react'; // Using a sleek icon

const AuthLayout = ({ children, title }) => {
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid 
                item 
                xs={false} 
                sm={4} 
                md={7} 
                sx={{
                    background: 'radial-gradient(circle at top right, hsl(240, 25%, 20%), hsl(240, 25%, 12%))',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4,
                    color: 'white'
                }}
            >
                <Box sx={{
                    border: '2px solid #665DDE',
                    borderRadius: '50%',
                    p: 3,
                    mb: 3
                }}>
                    <BarChart2 size={48} color="#665DDE" />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    Unlock Your Data's Potential
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    "The goal is to turn data into information, and information into insight." - Carly Fiorina
                </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{
                 backgroundColor: 'background.paper',
                 display: 'flex',
                 flexDirection: 'column',
                 alignItems: 'center',
                 justifyContent: 'center'
            }}>
                <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 400 }}>
                    <Typography component="h1" variant="h5" sx={{fontWeight: 'bold', mb: 3}}>{title}</Typography>
                    {children}
                </Box>
            </Grid>
        </Grid>
    );
};

export default AuthLayout;