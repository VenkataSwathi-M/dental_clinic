import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  TextField,
  Avatar,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Appbar from "../Components/Appbar";
import overviewImage from "../assets/10.png"; // ✅ make sure the path is correct

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(11, "Password must be more than 10 characters")
    .max(15, "Password must be less than 15 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export default function CreateAccount() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if email already exists
      const emailExists = users.some((user) => user.email === values.email);
      if (emailExists) {
        toast.error("An account with this email already exists!");
        return;
      }

      // Save to localStorage
      users.push(values);
      localStorage.setItem("users", JSON.stringify(users));

      toast.success("Account created successfully and saved locally!");
      formik.resetForm();

      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    },
  });

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url(${overviewImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#1a1a1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box sx={{ position: "relative", zIndex: 2, width: "100%" }}>
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Navigation Bar */}
        <Appbar />

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
          <Box sx={{ minHeight: "calc(100vh - 64px)", display: "flex", justifyContent: "center", alignItems: "center", px: 2 }}>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ width: "100%" }}>
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
                    <Avatar sx={{ bgcolor: "#3E362E", width: 56, height: 56, margin: "0 auto" }}>
                      <PersonAddAlt1Icon />
                    </Avatar>
                  </Box>
                  <Typography variant="h4" align="center" sx={{ color: "#fff", fontWeight: "bold", mb: 2 }}>
                    Create Account
                  </Typography>
                  <Divider sx={{ borderColor: "#fff", opacity: 0.3, mb: 3 }} />
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                      {[
                        { name: "firstName", label: "First Name", xs: 6 },
                        { name: "lastName", label: "Last Name", xs: 6 },
                        { name: "email", label: "Email", xs: 12 },
                        {
                          name: "password",
                          label: "Password",
                          type: showPassword ? "text" : "password",
                          xs: 12,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowPassword} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                        {
                          name: "confirmPassword",
                          label: "Re-type Password",
                          type: showConfirmPassword ? "text" : "password",
                          xs: 12,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      ].map((field, index) => (
                        <Grid item xs={field.xs} key={field.name}>
                          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 * index, duration: 0.6 }}>
                            <TextField
                              fullWidth
                              label={field.label}
                              type={field.type || "text"}
                              {...formik.getFieldProps(field.name)}
                              error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                              helperText={formik.touched[field.name] && formik.errors[field.name]}
                              InputProps={{
                                style: { color: "#fff" },
                                endAdornment: field.endAdornment || null,
                              }}
                              InputLabelProps={{ style: { color: "#fff" } }}
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
                      ))}
                      <Grid item xs={12}>
                        <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }}>
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
                            Create Account
                          </Button>
                        </motion.div>
                      </Grid>
                    </Grid>
                    <Box textAlign="center" mt={2}>
                      <Typography sx={{ color: "#fff" }}>
                        Already have an account?{" "}
                        <Link to="/signin" style={{ color: "#ffebcd" }}>
                          Sign In
                        </Link>
                      </Typography>
                    </Box>
                  </form>
                </Box>
              </Container>
            </motion.div>
          </Box>
        </motion.div>

        {/* Glowing border keyframes */}
        <style>
          {`
            @keyframes glowBorder {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `}
        </style>
      </Box>
    </Box>
  );
}