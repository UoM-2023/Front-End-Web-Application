import React, { useState } from "react";
import "./loginForm.css";
import username from "../Assets/User_light.svg";
import password from "../Assets/finger-print-outline.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAuthToken } from "../LoginServices/authService";
import { jwtDecode } from "jwt-decode";

export default function LoginForm({ setUser }) {
  const [userData, setUserData] = useState({ userID: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login',userData);
      const { token, refreshToken, userId } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
      setAuthToken(token);
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      navigate("/dashboard");
    } catch (error) {
      console.log("Login Error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="loginFormBox">
        <div className="container">
          <div className="header">
            <div className="text">Log In</div>
          </div>
          <div className="inputs">
            <div className="input">
              <img src={username} alt="" className="inputPic" />
              <input
                type="text"
                placeholder="User name"
                className="userName"
                name="userID"
                value={userData.userID}
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <img src={password} alt="" className="inputPic" />
              <input
                type="password"
                placeholder="Password"
                className="userName"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="loginFormBottom">
            <div className="login-contact">
              <div className="login">Log In</div>
              <div className="cancel"> Cancel </div>
            </div>
            <div className="resetPassword">Reset Password</div>
          </div>
        </div>
      </div>
    </form>
  );
}
