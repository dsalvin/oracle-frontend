import React from 'react';
import { Box, Typography } from '@mui/material';

// In a real project, you would get an SVG from a designer or a site like undraw.co
// For now, we'll create a placeholder with CSS to represent the illustration.
const IllustrationPlaceholder = () => (
    <Box sx={{
        height: 160,
        width: '100%',
        background: 'linear-gradient(45deg, #665DDE 30%, #00C896 90%)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    }}>
        <Typography sx={{fontWeight: 500}}>Your Welcome Illustration Here</Typography>
    </Box>
)


const WelcomeIllustration = () => {
  return (
    <Box sx={{ textAlign: 'center', p: 4 }}>
      <IllustrationPlaceholder />
      <Typography variant="h5" sx={{ mt: 3, fontWeight: 500 }}>
        Welcome to Oracle
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Get started by uploading your sales data below. Let's uncover some insights!
      </Typography>
    </Box>
  );
};

export default WelcomeIllustration;