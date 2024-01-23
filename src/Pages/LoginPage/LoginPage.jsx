import React from "react";
import ShapeComponent from "../../Component/Sheps/ShapeComponent";
import LoginForm from "../../Component/LoginForm/LoginForm";

function LoginPage() {
  return (
    <>
      <div className="ShepsComponent">
        <ShapeComponent />
      </div>
      <div className="loginFormComponent">
        <LoginForm />
      </div>
    </>
  );
}

export default LoginPage;
