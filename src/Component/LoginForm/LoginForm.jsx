import React, { useState } from "react";
import "./loginForm.css";
import username from "../Assets/User_light.svg";
import password from "../Assets/finger-print-outline.svg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import axiosInstance, {
  setAuthToken,
} from "../../Pages/LoginPage/LoginServices/authService";

export default function LoginForm({ setUser }) {
  const { userID } = useParams();

  const [userData, setUserData] = useState({ userID: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", userData);
      const { token, refreshToken, userId } = response.data;
      console.log("Token", token, refreshToken, userId);
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userId", userId);
      const userID = localStorage.getItem("userId");
      console.log(userID);
      setAuthToken(token);
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      navigate("/dashboard");
    } catch (error) {
      console.log("Login Error", error);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
    }
  };

  // Handling the View button
  const handleLoginButn = (userID) => {
    console.log("Hanlde login button Before axios");
    axios
      .get(`http://localhost:3001/Settings/getUser/${userID}`)
      .then((response) => {
        console.log("Hanlde login button Called..");
      })
      .catch((error) => {
        console.log(error);
      });
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
              <button
                type="submit"
                className="login"
                onClick={() => handleLoginButn([userData.userID])}
              >
                Log In
              </button>
              <div className="cancel"> Cancel </div>
            </div>
            <div className="resetPassword">Reset Password</div>
          </div>
        </div>
      </div>
    </form>
  );
}
