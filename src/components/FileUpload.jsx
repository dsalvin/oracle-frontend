import React, { useState } from 'react';
import { Button, Box, Typography, Alert, Card, CardContent } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import GlassCard from './GlassCard'; 
import { UploadCloud } from 'lucide-react';
import apiClient from '../api';

const FileUpload = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const { token } = useAuth(); // Get the token from our context

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setMessage('');
      setIsError(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
        setMessage('Please select a file first.');
        setIsError(true);
        return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
        // Use apiClient and access response.data directly
        const response = await apiClient.post('/upload-csv/', formData);
        const data = response.data; // The data is already JSON

        if (!response.status === 200) { // Check status for success
            throw new Error(data.detail || 'An unknown error occurred.');
        }

        setMessage(data.message);
        setIsError(false);
        onUploadSuccess(data.products, selectedFile.name);
    } catch (error) {
        const message = error.response?.data?.detail || error.message;
        setMessage(`Error: ${message}`);
        setIsError(true);
    }
};

 return (
    <GlassCard>
        <Typography variant="h6" gutterBottom>
          1. Upload Sales Data
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
          Please upload a CSV file with columns: date, product_id, units_sold, price.
        </Typography>
        <Box>
            <Button
                component="label"
                variant="outlined"
                startIcon={<UploadCloud size={20} />}
            >
                Select File
                <input type="file" accept=".csv" hidden onChange={handleFileChange} />
            </Button>
            {selectedFile && (
                <Typography variant="body2" sx={{ display: 'inline', ml: 2, verticalAlign: 'middle' }}>
                {selectedFile.name}
                </Typography>
            )}
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Upload and Validate
          </Button>
        </Box>
        {message && (
          <Alert severity={isError ? 'error' : 'success'} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
    </GlassCard>
  );
};

export default FileUpload;
