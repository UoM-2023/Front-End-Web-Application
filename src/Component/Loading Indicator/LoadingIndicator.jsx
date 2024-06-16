import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function LoadingIndicator() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // semi-transparent background
        zIndex: 9999, // high z-index to overlay everything
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default LoadingIndicator;
