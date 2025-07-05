import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress, Alert, Stack } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts';
import { Download } from 'lucide-react';
import apiClient from '../api';
import GlassCard from './GlassCard';

const ForecastGenerator = ({ products, filename }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateForecast = async () => {
    if (!selectedProduct) {
      setError('Please select a product.');
      return;
    }
    setIsLoading(true);
    setError('');
    setForecastData(null);

    try {
      const response = await apiClient.get(`/forecast/${selectedProduct}?filename=${filename}`);
      setForecastData(response.data);
    } catch (err) {
      const message = err.response?.data?.detail || err.message;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- New function to handle the download ---
  const handleDownload = async () => {
    try {
      const response = await apiClient.get(`/export/forecast/?product_id=${selectedProduct}&filename=${filename}`, {
        responseType: 'blob', // Important: Tell Axios to expect a binary file blob
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `forecast_${selectedProduct}.csv`); // Set the download filename
      
      // Append to the document, click, and then remove
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

    } catch (err) {
      setError('Failed to download file.');
    }
  };


  const chartData = forecastData
    ? [
        ...forecastData.historical_data.map(p => ({ 
            date: p.ds.split('T')[0], 
            'Units Sold': p.y 
        })),
        ...forecastData.forecast_data.map(p => ({ 
            date: p.ds.split('T')[0], 
            'Predicted Sales': p.yhat,
            'Confidence Range': [p.yhat_lower, p.yhat_upper] 
        })),
      ]
    : [];

  return (
    <GlassCard>
      <Typography variant="h6" gutterBottom>
        2. Generate Forecast
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="product-select-label">Select a Product</InputLabel>
        <Select
          labelId="product-select-label"
          value={selectedProduct}
          label="Select a Product"
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          {products.map((product) => (
            <MenuItem key={product} value={product}>
              {product}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={handleGenerateForecast}
        disabled={!selectedProduct || isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Generate 30-Day Forecast'}
      </Button>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {forecastData && (
        <Box sx={{ mt: 4 }}>
            <Alert severity="info" sx={{mb: 2}}>{forecastData.insight}</Alert>
            
            {/* --- Header with Download Button --- */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb: 2}}>
                <Typography variant="h6" gutterBottom component="div">
                    Forecast for: {forecastData.product_id}
                </Typography>
                <Button 
                    variant="outlined" 
                    startIcon={<Download size={16}/>}
                    onClick={handleDownload}
                >
                    Download CSV
                </Button>
            </Stack>

            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3}/>
                    <XAxis dataKey="date" tick={{ fill: '#BDBDBD' }}/>
                    <YAxis tick={{ fill: '#BDBDBD' }}/>
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'rgba(30, 30, 30, 0.8)', 
                            borderColor: '#665DDE'
                        }}
                    />
                    <Legend />
                    <Area 
                        type="monotone" 
                        dataKey="Confidence Range" 
                        stroke={false} 
                        fill="#665DDE" 
                        fillOpacity={0.2} 
                    />
                    <Line type="monotone" dataKey="Units Sold" stroke="#00C896" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Predicted Sales" stroke="#665DDE" strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </Box>
      )}
    </GlassCard>
  );
};

export default ForecastGenerator;