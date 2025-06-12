import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Footer from '../Components/Footer';
import Appbar from '../Components/Appbar';
import insuranceImg from "../assets/12.png";

const highlightColor = "#E0C097";

const CheckInsurancePage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    provider: '',
    policyNumber: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store in localStorage
    localStorage.setItem('insuranceInfo', JSON.stringify(formData));
    alert('Insurance details saved successfully!');
    
    // Clear form
    setFormData({
      fullName: '',
      email: '',
      provider: '',
      policyNumber: ''
    });
  };

  return (
    <Box sx={{ backgroundColor: '#f1eae2', minHeight: '100vh' }}>
      <Appbar />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          px: { xs: 3, md: 10 },
          pt: 12,
          gap: 6,
        }}
      >
        {/* Form Section */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ flex: 1, maxWidth: { xs: '100%', md: '45%' } }}
        >
          <Typography variant="h3" fontWeight={700} color="#333" mb={2}>
            Check Insurance
          </Typography>
          <Typography color="#000" mb={3}>
            Enter your insurance details and we'll verify your coverage.
          </Typography>

          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Insurance Provider"
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Policy Number"
              name="policyNumber"
              value={formData.policyNumber}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#3E362E',
                color: '#fff',
                borderRadius: 10,
                py: 1.5,
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: highlightColor,
                  color: '#000',
                },
              }}
            >
              Submit for Verification
            </Button>
          </Box>
        </Box>

        {/* Image Section */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          sx={{
            flex: 1,
            maxWidth: { xs: '100%', md: '45%' },
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 500 }}>
            <img
              src={insuranceImg}
              alt="Insurance verification"
              style={{
                width: '100%',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
            />
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default CheckInsurancePage;