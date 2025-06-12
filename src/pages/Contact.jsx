import React, { useState } from 'react';
import {
  AppBar,
  Button,
  Typography,
  TextField,
  Box,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import Footer from '../Components/Footer';
import Appbar from "../Components/Appbar";
import dentalImage from "../assets/9.png";

const highlightColor = "#E0C097";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors({});
    setSuccess(false);
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if (!nameRegex.test(formData.firstName))
      newErrors.firstName = "First name should contain only letters.";

    if (!nameRegex.test(formData.lastName))
      newErrors.lastName = "Last name should contain only letters.";

    if (!passwordRegex.test(formData.password))
      newErrors.password =
        "Password must be at least 6 characters and include uppercase, lowercase, number, and special character.";

    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.message) newErrors.message = "Message cannot be empty.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Save to local storage
      localStorage.setItem("contactFormData", JSON.stringify(formData));
      setSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        password: '',
      });
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f1eae2', minHeight: '100vh' }}>
      {/* NAVBAR */}
      <AppBar />

      {/* MAIN CONTENT */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'flex-start',
          justifyContent: 'center',
          pt: 12,
          px: { xs: 2, md: 10 },
          gap: 6,
        }}
      >
        {/* FORM */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ flex: 1, maxWidth: { xs: '100%', md: '45%' } }}
        >
          <Typography variant="h3" fontWeight={700} mb={2} color="#333">
            Contact Us
          </Typography>
          <Typography mb={2} color="#000">
            Ready to join the dental revolution? Find an appointment that fits your schedule for the services you need.
          </Typography>
          <Typography fontWeight={500} color="#000">
            Dental@Clinic.com
          </Typography>
          <Typography mb={3} fontWeight={500} color="#000">
            (555) 557-6666
          </Typography>

          {success && <Alert severity="success" sx={{ mb: 2 }}>Form submitted successfully!</Alert>}

          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              label="First Name"
              name="firstName"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={formData.firstName}
              onChange={handleChange}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
            />
            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={formData.lastName}
              onChange={handleChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              label="Message"
              name="message"
              fullWidth
              required
              multiline
              rows={4}
              sx={{ mb: 2 }}
              value={formData.message}
              onChange={handleChange}
              error={Boolean(errors.message)}
              helperText={errors.message}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              required
              sx={{ mb: 3 }}
              value={formData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#3E362E',
                color: '#fff',
                borderRadius: 10,
                py: 1.5,
                fontWeight: 'bold',
                "&:hover": {
                  backgroundColor: highlightColor,
                  color: "#000"
                }
              }}
            >
              SEND
            </Button>
          </Box>
        </Box>

        {/* IMAGE */}
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
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '500px' }}>
            <img
              src={dentalImage}
              alt="Dental"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* FOOTER */}
      <Footer />
    </Box>
  );
};

export default ContactPage;