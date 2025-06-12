import React from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Appbar from "../Components/Appbar";
import backgroundImage from "../assets/10.png";

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
});

export default function ForgotPassword() {
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: (values) => {
      // Store email in localStorage
      localStorage.setItem("resetEmail", values.email);
      alert(`Reset link sent to ${values.email}`);
    },
  });

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", width: "100vw", overflow: "hidden" }}>
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px)",
          zIndex: 0,
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        }}
      />

      {/* App Bar */}
      <Appbar />

      {/* Form Container */}
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          px: 2,
        }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "100%" }}
        >
          <Container maxWidth="sm">
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              <Box
                sx={{
                  padding: 4,
                  borderRadius: 4,
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "4px",
                    background: "linear-gradient(to right, #3E362E, #ffebcd, #3E362E)",
                    animation: "glowBorder 6s linear infinite",
                  }}
                />

                <Typography
                  variant="h4"
                  align="center"
                  sx={{ color: "#fff", fontWeight: "bold", mb: 3 }}
                >
                  Forgot Password
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      >
                        <TextField
                          fullWidth
                          label="Email"
                          variant="outlined"
                          {...formik.getFieldProps("email")}
                          error={formik.touched.email && Boolean(formik.errors.email)}
                          helperText={formik.touched.email && formik.errors.email}
                          InputLabelProps={{ style: { color: "#fff" } }}
                          InputProps={{
                            style: {
                              color: "#fff",
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                            },
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": { borderColor: "#fff" },
                              "&:hover fieldset": { borderColor: "#ccc" },
                              "&.Mui-focused fieldset": { borderColor: "#fff" },
                            },
                          }}
                        />
                      </motion.div>
                    </Grid>

                    <Grid item xs={12}>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{
                            paddingY: 1.5,
                            fontWeight: "bold",
                            fontSize: "1rem",
                            background: "linear-gradient(to right, #3E362E, #5E5143)",
                            color: "#fff",
                            "&:hover": {
                              background: "#fff",
                              color: "#000",
                              boxShadow: "0 0 20px #fff",
                            },
                          }}
                        >
                          Send Reset Link
                        </Button>
                      </motion.div>
                    </Grid>
                  </Grid>

                  <Box textAlign="center" mt={2}>
                    <Typography sx={{ color: "#fff" }}>
                      Remember your password?{" "}
                      <Link to="/signin" style={{ color: "#ffebcd" }}>
                        Back to Sign In
                      </Link>
                    </Typography>
                  </Box>
                </form>
              </Box>
            </motion.div>
          </Container>
        </motion.div>
      </Box>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes glowBorder {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </Box>
  );
}