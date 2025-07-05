import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '../context/AuthContext';
import GlassCard from './GlassCard';
import apiClient from '../api';

const HistoricalAnalysis = ({ filename }) => {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!filename) return;

      setIsLoading(true);
      setError('');

      try {
       const response = await apiClient.get(`/analysis/?filename=${filename}`);
        setAnalysisData(response.data);
      } catch (err) {
        const message = err.response?.data?.detail || err.message;
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filename]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!analysisData) {
    return null;
  }

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Historical Analysis</Typography>
      <GlassCard sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Total Revenue Over Time</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analysisData.revenue_over_time}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
            <XAxis dataKey="date" tick={{ fill: '#BDBDBD' }} />
            <YAxis tick={{ fill: '#BDBDBD' }} tickFormatter={(value) => `$${value.toLocaleString()}`} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 30, 30, 0.8)', borderColor: '#00C896' }}/>
            <Legend />
            <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#00C896" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard>
        <Typography variant="h6" gutterBottom>Top 5 Selling Products</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analysisData.top_products} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="product_id" width={100} tick={{ fill: '#BDBDBD' }} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 30, 30, 0.8)', borderColor: '#00C896' }} cursor={{fill: 'rgba(255, 255, 255, 0.1)'}}/>
            <Legend />
            <Bar dataKey="units_sold" name="Units Sold" fill="#00C896" />
          </BarChart>
        </ResponsiveContainer>
      </GlassCard>
    </>
  );
};

export default HistoricalAnalysis;