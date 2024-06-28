//---------------------------------------------------------------------------------------------------

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./TopBar.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import axios from "axios";
import { logout } from "../../Pages/LoginPage/LoginServices/authService";
// import { logout } from "../../Pages/LoginPage/LoginServices/authService";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const TopBar = ({ user, setUser, title }) => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const UserID = localStorage.getItem("userId");

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    setAnchorEl(null);
    navigate("/settings");
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setAuth(false);
      navigate("/login");
    } catch (error) {
      console.log("Failed to logout", error);
    }
  };

  return (
    <div className="topBarContainer">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#fffffff7" }}>
          <Toolbar>
            <Typography
              component="div"
              sx={{
                flexGrow: 1,
                color: "#000000",
                fontWeight: "bold",
                fontSize: "23px",
                marginLeft: "5rem",
              }}
            >
              {title}
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  size="large"
                  sx={{ padding: "0.6rem" }}
                >
                  <AccountCircle
                    sx={{
                      color: "#E76736",
                      width: "3rem",
                      height: "3rem",
                    }}
                  />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {/* <MenuItem onClick={handleLogout} sx={{ fontWeight: "bold" }}>
                    Logout
                  </MenuItem> */}
                  <div style={{ padding: "1rem" }}>
                    <MenuItem onClick={handleClose}>
                      <div className="LoginUserDetails">
                        <span className="textItem">
                          <b>User Name :</b> {UserID}
                        </span>
                        <span className="textItem">
                          <b>User Role :</b>
                          {user.role}
                        </span>
                      </div>
                    </MenuItem>
                    <hr />
                    <MenuItem onClick={handleSettings}>
                      <SettingsOutlinedIcon sx={{ marginRight: "1rem" }} />
                      Settings
                    </MenuItem>
                    <hr />
                    <MenuItem
                      onClick={handleLogout}
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      <LogoutIcon
                        sx={{ marginRight: "1rem", marginLeft: "0.15rem" }}
                      />
                      Logout
                    </MenuItem>
                  </div>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default TopBar;
