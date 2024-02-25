import React from "react";
import "./LoginPage.css"
import ShapeComponent from "../../Component/Sheps/ShapeComponent";
import LoginForm from "../../Component/LoginForm/LoginForm";

function LoginPage() {
  return (
    <div className="LoginPageContainer">
      <div className="ShepsComponent">
        <ShapeComponent />
      </div>
      <div className="loginFormComponent"> 
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
