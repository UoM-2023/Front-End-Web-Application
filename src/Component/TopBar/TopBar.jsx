import React from "react";
import "./TopBar.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { logout } from "../../Pages/LoginPage/LoginServices/authService";
// import { logout } from "../../Pages/LoginPage/LoginServices/authService";

const TopBar = ({user,setUser,title}) => {
  const [auth, setAuth] = React.useState(true); 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setAuth(false);
      navigate('/login');
    } catch (error) {
      console.log("Failed to logout",error);
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
                  <MenuItem onClick={handleClose}>Your Profile</MenuItem>
                  <MenuItem onClick={handleClose}>Settings</MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ fontWeight: "bold" }}>
                    Logout
                  </MenuItem>
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
