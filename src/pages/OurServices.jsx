import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// ✅ Correct import of your custom Appbar and Footer
import Appbar from "../Components/Appbar";
import Footer from "../Components/Footer";

// 🖼 Import local images
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";
import img7 from "../assets/7.png";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const floatImage = {
  animate: {
    y: [0, -10, 0],
    transition: {
      repeat: Infinity,
      duration: 3,
    },
  },
};

// Services Data
const services = [
  {
    title: "Teeth Cleanings and Checkups",
    description: "Fast service in boutique-style exam rooms...",
    image: img2,
    offer: "Limited offer!",
  },
  {
    title: "Teeth Whitening",
    description: "Get the glow-up you’ve desired for your teeth...",
    image: img3,
  },
  {
    title: "Clear Aligner Therapy",
    description: "If your smile is healthy but could use help...",
    image: img5,
  },
  {
    title: "Dental Care Service",
    description: "Sometimes your teeth need some extra TLC...",
    image: img6,
    offer: "Limited offer!",
  },
];

// Navigation Tags
const navLinks = [
  "Teeth Cleanings & Check Ups",
  "Dental Work",
  "Teeth Whitening",
  "Teeth Straightening",
  "Veneers",
  "Implants",
  "Emergencies",
];

const OurServices = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <Box
        sx={{
          minHeight: "100vh",
          fontFamily: "'Playfair Display', serif",
          background: "linear-gradient(135deg, #f5f2ed 0%, #e6e2dd 100%)",
        }}
      >
        {/* ✅ Custom Appbar */}
        <Appbar />

        <Container sx={{ py: isSmallScreen ? 4 : 6 }}>
          {/* Overview Section */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={4} alignItems="center" justifyContent="center">
              <motion.img
                variants={floatImage}
                animate="animate"
                src={img7}
                alt="Dental Overview"
                style={{
                  width: isSmallScreen ? "100%" : "400px",
                  height: isSmallScreen ? "auto" : "400px",
                  objectFit: "cover",
                  borderRadius: 16,
                  boxShadow: 3,
                }}
              />
              <Box maxWidth={{ xs: "100%", md: "60%" }} textAlign="left">
                <Typography
                  variant={isSmallScreen ? "h5" : "h4"}
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: "#3E362E" }}
                >
                  Services Overview
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  Finding the dental care services you need at a price you can afford shouldn’t be a struggle. When you
                  join the dental revolution, routine cleanings, veneers, and even emergency appointments are available
                  at your fingertips with the click of a button. Plus, we won’t get in the way of your schedule. With
                  night and weekend appointments, keeping your smile shining has never been easier.
                </Typography>
              </Box>
            </Stack>
          </motion.div>

          {/* Section Title */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant={isSmallScreen ? "h5" : "h4"}
              fontWeight="bold"
              textAlign="center"
              sx={{ color: "#3E362E", mt: 8 }}
            >
              Our Services
            </Typography>
            <Divider sx={{ width: 80, borderBottom: "3px solid #3E362E", mx: "auto", my: 2 }} />
          </motion.div>

          {/* Navigation Buttons */}
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} mb={6}>
            {navLinks.map((label) => (
              <motion.div whileHover={{ scale: 1.05 }} key={label} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/services")}
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    fontWeight: "bold",
                    px: 3,
                    py: 1,
                    color: "#3E362E",
                    borderColor: "#3E362E",
                    fontFamily: "'Playfair Display', serif",
                    "&:hover": { bgcolor: "#3E362E", color: "#fff" },
                  }}
                >
                  {label}
                </Button>
              </motion.div>
            ))}
          </Box>

          {/* Service Cards */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Grid container spacing={4} justifyContent="center">
              {services.map((service, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <motion.div variants={fadeUp} whileHover={{ scale: 1.05 }}>
                    <Paper elevation={4} sx={{ borderRadius: 4, p: 2, height: "100%", position: "relative" }}>
                      {service.offer && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            backgroundColor: "#ff4d4d",
                            color: "white",
                            fontSize: "0.7rem",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "12px",
                            zIndex: 2,
                          }}
                        >
                          {service.offer}
                        </Box>
                      )}
                      <Box
                        component="img"
                        src={service.image}
                        alt={service.title}
                        sx={{
                          width: "100%",
                          height: 140,
                          objectFit: "cover",
                          borderRadius: 2,
                          mb: 2,
                        }}
                      />
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {service.title}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {service.description}
                      </Typography>
                      <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => navigate("/BookAppointment")}
                          startIcon={<CalendarTodayIcon />}
                          sx={{
                            bgcolor: "#3E362E",
                            color: "#ffffff",
                            borderRadius: "20px",
                            fontWeight: "bold",
                            mt: "auto",
                            fontFamily: "'Playfair Display', serif",
                            "&:hover": { bgcolor: "#2C271F" },
                          }}
                        >
                          Book Now
                        </Button>
                      </motion.div>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>

        {/* ✅ Footer */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
          <Footer />
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default OurServices;