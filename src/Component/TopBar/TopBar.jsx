// import React from "react";
// import "./TopBar.css";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";

// const TopBar = (props) => {
//   const [auth, setAuth] = React.useState(true);
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   console.log(props);
//   return (
//     <div className="topBarContainer">
//       <Box sx={{ flexGrow: 1 }}>
//         <AppBar position="static" sx={{ backgroundColor: "#fffffff7" }}>
//           <Toolbar>
//             <Typography
//               component="div"
//               sx={{
//                 flexGrow: 1,
//                 color: "#000000",
//                 fontWeight: "bold",
//                 fontSize: "23px",
//                 marginLeft: "5rem",
//               }}
//             >
//               {props.title}
//             </Typography>
//             {auth && (
//               <div>
//                 <IconButton
//                   aria-label="account of current user"
//                   aria-controls="menu-appbar"
//                   aria-haspopup="true"
//                   onClick={handleMenu}
//                   size="large"
//                   sx={{ padding: "0.6rem" }}
//                 >
//                   <AccountCircle
//                     sx={{
//                       color: "#E76736",
//                       width: "3rem",
//                       height: "3rem",
//                     }}
//                   />
//                 </IconButton>
//                 <Menu
//                   id="menu-appbar"
//                   anchorEl={anchorEl}
//                   anchorOrigin={{
//                     vertical: "bottom",
//                     horizontal: "right",
//                   }}
//                   keepMounted
//                   transformOrigin={{
//                     vertical: "top",
//                     horizontal: "right",
//                   }}
//                   open={Boolean(anchorEl)}
//                   onClose={handleClose}
//                 >
//                   <MenuItem onClick={handleClose}>Your Profile</MenuItem>
//                   <MenuItem onClick={handleClose}>Settings</MenuItem>
//                   <MenuItem onClick={handleClose} sx={{ fontWeight: "bold" }}>
//                     Logout
//                   </MenuItem>
//                 </Menu>
//               </div>
//             )}
//           </Toolbar>
//         </AppBar>
//       </Box>
//     </div>
//   );
// };

// export default TopBar;

//--------------------------------------------------------------------------------------------------------------------------------------

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
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const TopBar = (props) => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              {props.title}
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
                  <div style={{ padding: "1rem" }}>
                    <MenuItem onClick={handleClose}>
                      <div className="Login User Details">
                        {/* <span className="textItem">
                          <b>Name :</b> A.B.C.Kulathilake
                        </span> */}
                        <span className="textItem">
                          <b>UserName :</b> AB-000001U
                        </span>
                        {/* <span className="textItem">
                          <b>Staff ID :</b> S-254109
                        </span> */}
                        <span className="textItem">
                          <b>User Role :</b> Finance Manager
                        </span>
                      </div>
                    </MenuItem>
                    <hr />
                    <MenuItem
                      onClick={handleClose}
                      // sx={{ borderBottom: "1px solid #000000" }}
                    >
                      <SettingsOutlinedIcon sx={{ marginRight: "1rem" }} />
                      Settings
                    </MenuItem>
                    <hr width="215rem" />
                    <MenuItem
                      onClick={handleClose}
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


