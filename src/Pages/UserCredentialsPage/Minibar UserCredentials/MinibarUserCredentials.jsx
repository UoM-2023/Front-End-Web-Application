import { Tab, Tabs, ThemeProvider, createTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#E87042",
    },
  },
});

const MinibarUserCredentials = () => {
  const location = useLocation();
  const [value, setValue] = useState("one");

  useEffect(() => {
    switch (location.pathname) {
      case "/user credentials":
        setValue("one");
        break;
      case "/user credentials/StaffUserCredentials":
        setValue("two");
        break;
      default:
        setValue(false);
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          sx={{
            marginTop: 2,
            marginLeft: 10,
            marginRight: 0,
          }}
        >
          <Tab
            value="one"
            label="Residents Accounts"
            component={Link}
            to="/user credentials"
          />
          <Tab
            value="two"
            label="Staff Accounts"
            component={Link}
            to="/user credentials/StaffUserCredentials"
          />
        </Tabs>
      </ThemeProvider>
    </>
  );
};

export default MinibarUserCredentials;
