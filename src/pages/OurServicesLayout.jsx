import React from "react";
import { Box } from "@mui/material";
import OurServices from "./OurServices";

const OurServicesLayout = () => {
  return (
    <Box
      sx={{
        backgroundImage: "url('/')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100vw",
        color: "white",
      }}
    >
      <OurServices />
    </Box>
  );
};

export default OurServicesLayout;