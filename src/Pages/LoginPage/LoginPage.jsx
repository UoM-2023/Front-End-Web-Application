import React from "react";
import "./LoginPage.css"
import ShapeComponent from "../../Component/Sheps/ShapeComponent";
import LoginForm from "../../Component/LoginForm/LoginForm";

function LoginPage({setUser}) {

  return (
    <div className="LoginPageContainer">
      <div className="ShepsComponent">
        <ShapeComponent />
      </div>
      <div className="loginFormComponent"> 
        <LoginForm setUser = {setUser} />
      </div>
    </div>
  );
}

export default LoginPage;
