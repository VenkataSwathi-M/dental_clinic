import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  useMediaQuery,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../Components/Footer";
import dentalImage from "../assets/8.png" // ✅ Imported image
import Appbar from "../Components/Appbar"; // ✅ Adjust the path if necessary
const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const AboutUs = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100vw", overflowX: "hidden" }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          fontFamily: "'Playfair Display', serif",
          background: "linear-gradient(to right, #f3f2ef, #eae7e2)",
          color: "#3E362E",
        }}
      >
        {/* AppBar */}
        <Appbar />

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ py: isSmallScreen ? 4 : 8 }}>
          <motion.div
            variants={sectionVariant}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={6}
              alignItems="center"
              justifyContent="center"
            >
              {/* Image Right Side on large screens */}
              <Box
                component="img"
                src={dentalImage}
                alt="Dental Overview"
                sx={{
                  width: { xs: "100%", md: "60%" },
                  height: { xs: "auto", md: 400 },
                  objectFit: "cover",
                  borderRadius: 5,
                  boxShadow: 3,
                  order: { xs: 1, md: 2 },
                }}
              />

              {/* Text Content */}
              <Box
                maxWidth={{ xs: "100%", md: "60%" }}
                textAlign="left"
                sx={{ order: { xs: 2, md: 1 } }}
              >
                <Typography
                  variant={isSmallScreen ? "h5" : "h4"}
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: "#3E362E" }}
                >
                  Our Story
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 4 }}>
                  With so much on the plates of busy people in today’s busy world, many take their dental health for
                  granted. Squeezing in an afternoon teeth cleaning after Thursday’s power lunch can feel impossible.
                  So, when it comes to smiles or schedules, most people don’t choose to sit in a dentist’s chair. What
                  if you didn’t have to choose? Dental services should work with you—not against you.
                  <br />
                  Convenient, transparent service is what so many people are missing from their dentist. You deserve
                  the very best dental care—but the dental industry just doesn’t work for you. We are dntl bar—and
                  we’re the people’s dentist. We’re revolutionizing dental care to put you at the very center—and to
                  bring care to more people than ever before.
                </Typography>

                <Typography
                  variant={isSmallScreen ? "h5" : "h4"}
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: "#3E362E" }}
                >
                  Dental for the People
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 4 }}>
                  Dental Clinic is a new kind of dental experience—one that’s designed around you. We offer convenient,
                  transparent service and world-class dental care. But we’re so much more than that. We’re a way to
                  ensure everyone has access to the high-quality dental care they deserve.
                  <br />
                  We believe dental care should be convenient and we’re on a mission to make that happen.
                  <br />
                  If you’re looking for a new kind of dental experience—one that’s designed around you—you’ve come to
                  the right place.
                </Typography>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/bookappointment")}
                    sx={{
                      bgcolor: "#3E362E",
                      color: "#fff",
                      borderRadius: "20px",
                      fontWeight: "bold",
                      "&:hover": { bgcolor: "#2C271F" },
                    }}
                  >
                    Book Now
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/checkinsurance")}
                    sx={{
                      borderRadius: "20px",
                      fontWeight: "bold",
                      color: "#3E362E",
                      borderColor: "#3E362E",
                      "&:hover": { bgcolor: "#3E362E", color: "#fff" },
                    }}
                  >
                    Check Insurance
                  </Button>
                </Box>
              </Box>
            </Stack>
          </motion.div>
        </Container>

        <Footer />
      </Box>
    </motion.div>
  );
};

export default AboutUs;