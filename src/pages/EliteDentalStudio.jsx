import React from "react";
import {
  Toolbar,
  Button,
  Typography,
  Container,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Appbar from "../components/Appbar"; // ✅ Make sure the path is correct
import Footer from "../components/Footer";

// Image Imports
import bgImage from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";

const highlightColor = "#E0C097";

const services = [
  {
    title: "Teeth Cleanings and Checkups",
    description:
      "From your first appointment, enjoy fast service in our comfortable, boutique-style exam rooms...",
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
    description: "If your smile is healthy but could use a little help getting aligned...",
    image: img5,
  },
  {
    title: "Dental Care Service",
    description: "Sometimes your teeth need some extra TLC...",
    image: img6,
    offer: "Limited offer!",
  },
];

const EliteDentalStudio = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
        overflowX: "hidden",
        fontFamily: "'Roboto Slab', serif",
      }}
    >
      {/* ✅ Custom Navbar */}
      <Appbar />

      {/* Hero Section */}
      <Container
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "800px",
          px: 3,
          mt: 15,
        }}
      >
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "medium",
              mb: 10,
              fontSize: "1.25rem",
            }}
          >
            A dentist experience that finally puts you at the center.
          </Typography>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
          </motion.div>
        </motion.div>
      </Container>

      {/* Our Service Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ width: "100%" }}
      >
        <Container sx={{ py: 5 }}>
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom sx={{ color: "white", mb: 4 }}>
            Our Service
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {services.map((service, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} style={{ cursor: "pointer" }}>
                <Box
                  sx={{
                    width: 280,
                    minHeight: 420,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: 5,
                    textAlign: "center",
                    color: "white",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <img src={service.image} alt={service.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {service.description}
                    </Typography>
                    {service.offer && (
                      <Typography variant="caption" sx={{ color: highlightColor }}>
                        {service.offer}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
        <Footer />
      </motion.div>
    </Box>
  );
};

export default EliteDentalStudio;