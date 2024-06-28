import React from "react";
import "./LoginPage.css";
import ShapeComponent from "../../Component/Sheps/ShapeComponent";
import LoginForm from "../../Component/LoginForm/LoginForm";
import { Grid } from "@mui/material";

function LoginPage({ setUser }) {
  return (
    <Grid
    // sx={{
    //   width: {
    //     sx: 100, // 0
    //     sm: 600, // 600
    //     md: 900, // 900
    //     lg: 1200, //1200
    //     xl: 1536, //1536
    //   },
    // }}
    >
      <div className="LoginPageContainer">
        <div className="ShepsComponent">
          <ShapeComponent />
        </div>
        <div className="loginFormComponent">
          <LoginForm setUser={setUser} />
        </div>
      </div>
    </Grid>
  );
}

export default LoginPage;
