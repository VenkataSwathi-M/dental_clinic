import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const Appbar = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight="bold" sx={{ color: '#E0C097' }}>
          Dental Clinic
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* Add Home link first */}
          <Button
            component={Link}
            to="/"
            sx={{
              color: '#E0C097',
              textTransform: 'none',
              fontWeight: 'bold',
              backgroundColor: 'transparent',
              transition: 'all 0.3s',
              '&:hover': { textDecoration: 'underline', backgroundColor: 'transparent' },
            }}
          >
            Home
          </Button>

          {/* Loop through other navigation items */}
          {['Services', 'About Us', 'Contact', 'Account'].map((text, i) => (
            <Button
              key={i}
              component={Link}
              to={`/${text.replace(' ', '').toLowerCase()}`}
              sx={{
                color: '#E0C097',
                textTransform: 'none',
                fontWeight: 'bold',
                backgroundColor: 'transparent',
                transition: 'all 0.3s',
                '&:hover': { textDecoration: 'underline', backgroundColor: 'transparent' },
              }}
            >
              {text}
            </Button>
          ))}

          <Button
            component={Link}
            to="/bookappointment"
            variant="contained"
            sx={{
              backgroundColor: '#3E362E',
              color: '#E0C097',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#E0C097',
                color: '#000',
              },
            }}
          >
            Book Now
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;