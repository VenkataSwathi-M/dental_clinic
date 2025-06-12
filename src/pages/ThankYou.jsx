import { useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        position: "fixed",          // make it occupy entire screen
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "#000",
        color: "#E0C097",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        zIndex: 9999,
      }}
    >
      <Typography variant="h2" gutterBottom>
        🎉 Thank You!
      </Typography>
      <Typography variant="h6" mb={4}>
        Your appointment has been booked successfully.
        <br />
        You’ll be redirected to Home shortly.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{
          backgroundColor: "#E0C097",
          color: "#000",
          mt: 2,
          "&:hover": {
            backgroundColor: "#cda772",
          },
        }}
      >
        Back to Home Now
      </Button>
    </Box>
  );
};

export default ThankYou;