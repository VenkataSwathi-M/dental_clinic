import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (email) => {
    const gmailRegex = /^[\w.+\-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid Gmail ID.");
      setSuccess("");
    } else {
      setError("");
      setSuccess("Successfully subscribed!");
      setEmail("");
    }
  };

  return (
    <Box sx={{ position: "relative", bgcolor: "#3E362E", color: "#ffffff", pt: 6, pb: 8, mt: 6 }}>
      {/* Animated Wave Background SVG */}
      <Box
        sx={{
          position: "absolute",
          top: -50,
          left: 0,
          width: "100%",
          height: 60,
          overflow: "hidden",
          lineHeight: 0,
          zIndex: 1,
        }}
      >
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ height: "100%", width: "100%" }}
        >
          <motion.path
            d="M0,30 C150,90 350,0 600,30 C850,60 1050,20 1200,30 L1200,120 L0,120 Z"
            fill="#3E362E"
            animate={{
              d: [
                "M0,30 C150,90 350,0 600,30 C850,60 1050,20 1200,30 L1200,120 L0,120 Z",
                "M0,20 C150,60 350,20 600,40 C850,60 1050,30 1200,20 L1200,120 L0,120 Z",
                "M0,30 C150,90 350,0 600,30 C850,60 1050,20 1200,30 L1200,120 L0,120 Z",
              ],
            }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />
        </svg>
      </Box>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Grid container spacing={4}>
            {/* Contact Info */}
            <Grid item xs={12} md={3} sx={{ pr: { md: 6 } }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Dental Clinic
              </Typography>
              <Typography variant="body2">
                123 Smile Street<br />
                Toothville, CA 90210<br />
                Phone: (123) 456-7890<br />
                Email: info@dentalclinic.com
              </Typography>
            </Grid>

            {/* Explore Links */}
            <Grid item xs={6} md={2.5} sx={{ pl: { md: 3 }, pr: { md: 3 } }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Explore
              </Typography>
              <Typography variant="body2" sx={{ cursor: "pointer" }} onClick={() => navigate("/aboutUs")}>
                About Us
              </Typography>
              <Typography variant="body2" sx={{ cursor: "pointer" }} onClick={() => navigate("/contact")}>
                Contact
              </Typography>
              <Typography variant="body2" sx={{ cursor: "pointer" }} onClick={() => navigate("/services")}>
                Services
              </Typography>
            </Grid>

            {/* Follow Us */}
            <Grid item xs={6} md={2.5} sx={{ pl: { md: 3 }, pr: { md: 6 } }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Follow us
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton color="inherit">
                  <EmailIcon />
                </IconButton>
                <IconButton color="inherit">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="inherit">
                  <InstagramIcon />
                </IconButton>
              </Stack>
            </Grid>

            {/* Sign Up Section */}
            <Grid item xs={12} md={4} sx={{ pl: { md: 6 } }}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                  sx={{ textAlign: "right" }}
                >
                  <Stack direction="row" spacing={1} sx={{ width: "100%", justifyContent: "flex-end" }}>
                    <TextField
                      variant="outlined"
                      placeholder="Gmail Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{
                        bgcolor: "#fff",
                        borderRadius: 1,
                        flex: 1,
                        input: { color: "#000" },
                      }}
                    />
                    <Button
                      variant="contained"
                      endIcon={<SendIcon />}
                      onClick={handleSubmit}
                      sx={{
                        bgcolor: "#bba489",
                        color: "#3E362E",
                        borderRadius: 10,
                        px: 4,
                        fontWeight: "bold",
                        "&:hover": { bgcolor: "#a08b71" },
                      }}
                    >
                      Sign Up
                    </Button>
                  </Stack>

                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Sign up with your email address to receive news and updates.
                  </Typography>

                  {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
                  {success && <Typography color="success.main" sx={{ mt: 1 }}>{success}</Typography>}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;
