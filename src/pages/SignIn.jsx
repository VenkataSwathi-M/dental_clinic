import React, { useState } from "react";
import {
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  TextField,
  Avatar,
  Divider,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Appbar from "../Components/Appbar";
import backgroundImage from "../assets/10.png";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(11, "Password must be more than 10 characters")
    .max(15, "Password must be less than 15 characters")
    .required("Password is required"),
});

export default function SignIn() {
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      setSuccessMessage("Sign in successful! Redirecting to Home...");
      setTimeout(() => {
        setSubmitting(false);
        navigate("/");
      }, 2000);
    },
  });

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />

      <Appbar />

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <Box
          sx={{
            minHeight: "calc(100vh - 64px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 2,
          }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "100%" }}
          >
            <Container maxWidth="sm">
              <Box
                sx={{
                  padding: 4,
                  borderRadius: 4,
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Top animated gradient line */}
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
                <Box textAlign="center" mb={2}>
                  <Avatar
                    sx={{
                      bgcolor: "#3E362E",
                      width: 56,
                      height: 56,
                      margin: "0 auto",
                    }}
                  >
                    <LockOpenIcon />
                  </Avatar>
                </Box>
                <Typography
                  variant="h4"
                  align="center"
                  sx={{ color: "#fff", fontWeight: "bold", mb: 2 }}
                >
                  Sign In
                </Typography>

                <Divider sx={{ borderColor: "#fff", opacity: 0.3, mb: 3 }} />

                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={2}>
                    {[
                      { name: "email", label: "Email", xs: 12 },
                      { name: "password", label: "Password", type: "password", xs: 12 },
                    ].map((field, index) => (
                      <Grid item xs={field.xs} key={field.name}>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 * index, duration: 0.6 }}
                        >
                          <TextField
                            fullWidth
                            label={field.label}
                            type={field.type || "text"}
                            {...formik.getFieldProps(field.name)}
                            error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                            helperText={formik.touched[field.name] && formik.errors[field.name]}
                            InputLabelProps={{ style: { color: "#fff" } }}
                            InputProps={{ style: { color: "#fff" } }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#fff" },
                                "&:hover fieldset": { borderColor: "#ccc" },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#fff",
                                },
                              },
                            }}
                          />
                        </motion.div>
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <motion.div
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
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
                          Sign In
                        </Button>
                      </motion.div>
                    </Grid>

                    {/* Success message */}
                    {successMessage && (
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            color: "#90ee90",
                            textAlign: "center",
                            mt: 2,
                            fontWeight: "bold",
                          }}
                        >
                          {successMessage}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>

                  <Box textAlign="center" mt={2}>
                    <Typography sx={{ color: "#fff" }}>
                      Don't have an account?{" "}
                      <Link to="/account" style={{ color: "#ffebcd" }}>
                        Create Account
                      </Link>
                    </Typography>
                    <Typography sx={{ color: "#fff", mt: 1 }}>
                      <Link
                        to="/forgot-password"
                        style={{
                          color: "#ffebcd",
                          textDecoration: "underline",
                        }}
                      >
                        Forgot Password?
                      </Link>
                    </Typography>
                  </Box>
                </form>
              </Box>
            </Container>
          </motion.div>
        </Box>
      </motion.div>

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