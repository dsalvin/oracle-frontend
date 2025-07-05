import React from 'react';
import { Box } from '@mui/material';

const GlassCard = ({ children, sx }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(40, 40, 60, 0.4)', // Semi-transparent background
        backdropFilter: 'blur(12px)',              // The magic frosted glass effect
        borderRadius: '16px',                       // Softer, modern corners
        border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle edge to catch the light
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)', // Deeper shadow for depth
        p: 3,                                       // Internal padding
        ...sx,                                      // Allow for additional custom styles
      }}
    >
      {children}
    </Box>
  );
};

export default GlassCard;