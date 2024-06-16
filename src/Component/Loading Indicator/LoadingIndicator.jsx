import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#E87042",
    },
  },
});

function LoadingIndicator() {
  return (
    <ThemeProvider theme={theme}>
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
        <CircularProgress color="secondary" />
      </Box>
    </ThemeProvider>
  );
}

export default LoadingIndicator;
