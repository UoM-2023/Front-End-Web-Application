// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import BuildIcon from "@mui/icons-material/Build";
// import EventIcon from "@mui/icons-material/Event";
// import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
// import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
// import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
// import CampaignIcon from "@mui/icons-material/Campaign";
// import GroupsIcon from "@mui/icons-material/Groups";
// import EngineeringIcon from "@mui/icons-material/Engineering";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import SettingsIcon from "@mui/icons-material/Settings";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import { Link, useNavigate } from "react-router-dom";
// import TopBar from "../TopBar/TopBar";

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": {
//       ...openedMixin(theme),
//       backgroundColor: "#060606",
//     },
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": {
//       ...closedMixin(theme),
//       backgroundColor: "#060606",
//     },
//   }),
// }));

// export default function MiniDrawer() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const [selectedIndex, setSelectedIndex] = React.useState(0);
//   const navigate = useNavigate();

//   const handleDrawer = () => {
//     setOpen((open) => !open);
//   };

//   const handleListItemClick = (index, route) => {
//     setSelectedIndex(index);
//     navigate(route);
//   };

//   return (
//     <div className="SideBarContainer">
//       <TopBar title={} />
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />

//         {open && (
//           <div
//             style={{
//               position: "fixed",
//               width: "100vw",
//               height: "100vh",
//               top: "0",
//               left: "0",
//               background: "#00000050",
//               zIndex: "1",
//             }}
//           ></div>
//         )}

//         <Drawer variant="permanent" open={open}>
//           <DrawerHeader>
//             <Box
//               width={"100%"}
//               display={"flex"}
//               justifyContent={open ? "space-between" : "end"}
//               alignItems={"center"}
//             >
//               {open && (
//                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                   <img
//                     src="./Assest/HomeIcon.svg" // Replace with the correct path to your image
//                     alt="ApartFlow Icon"
//                     style={{
//                       marginRight: "20px",
//                       marginLeft: "10px",
//                       width: "2rem",
//                       height: "2rem",
//                     }} // Add margin if needed
//                   />
//                   <Typography
//                     sx={{
//                       color: "#F9FAF9", // Add this line to set the text color
//                     }}
//                   >
//                     ApartFlow
//                   </Typography>
//                 </Box>
//               )}
//               <IconButton
//                 aria-label="open drawer"
//                 onClick={handleDrawer}
//                 edge="start"
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   color: "#E76736",
//                 }}
//               >
//                 <MenuIcon />
//               </IconButton>
//             </Box>
//           </DrawerHeader>
//           <Divider />

//           <List>
//             {[
//               "Dashboard",
//               "Finance",
//               "Maintenance",
//               "Reservations",
//               "Guests",
//               "Residential Units",
//               "Complaints",
//               "News & Notices",
//               "Residents Information",
//               "Staff Details",
//               "User Credentials",
//               "Settings",
//               "info",
//             ].map((text, index) => (
//               <ListItem
//                 key={text}
//                 disablePadding
//                 sx={{ display: "block", cursor: "pointer" }}
//               >
//                 <ListItemButton
//                   selected={selectedIndex === index}
//                   onClick={() => {
//                     handleListItemClick(index, `/${text.toLowerCase()}`);
//                   }}
//                   sx={{
//                     minHeight: 48,
//                     justifyContent: open ? "initial" : "center",
//                     px: 2.5,
//                     color: selectedIndex === index ? "#E76736" : "#F9FAF9",
//                   }}
//                 >
//                   <ListItemIcon
//                     sx={{
//                       minWidth: 0,
//                       mr: open ? 3 : "auto",
//                       justifyContent: "center",
//                       color: selectedIndex === index ? "#E76736" : "#F9FAF9",
//                     }}
//                   >
//                     {index === 0 ? (
//                       <DashboardIcon />
//                     ) : index === 1 ? (
//                       <AccountBalanceIcon />
//                     ) : index === 2 ? (
//                       <BuildIcon /> // Add more icons as needed
//                     ) : index === 3 ? (
//                       <EventIcon />
//                     ) : index === 4 ? (
//                       <TransferWithinAStationIcon />
//                     ) : index === 5 ? (
//                       <MapsHomeWorkIcon />
//                     ) : index === 6 ? (
//                       <DriveFileRenameOutlineIcon />
//                     ) : index === 7 ? (
//                       <CampaignIcon />
//                     ) : index === 8 ? (
//                       <GroupsIcon />
//                     ) : index === 9 ? (
//                       <EngineeringIcon />
//                     ) : index === 10 ? (
//                       <PersonAddIcon />
//                     ) : index === 11 ? (
//                       <SettingsIcon />
//                     ) : index === 12 ? (
//                       <InfoOutlinedIcon />
//                     ) : null}
//                   </ListItemIcon>
//                   <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//         </Drawer>
//       </Box>
//     </div>
//   );
// }

//---------------------------------------------------------------------------------------------------------------------

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BuildIcon from "@mui/icons-material/Build";
import EventIcon from "@mui/icons-material/Event";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CampaignIcon from "@mui/icons-material/Campaign";
import GroupsIcon from "@mui/icons-material/Groups";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "../TopBar/TopBar";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: "#060606",
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: "#060606",
    },
  }),
}));

export default function MiniDrawer({ userRole }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [title, setTitle] = React.useState("Dashboard"); // Initial title
  const navigate = useNavigate();

  const handleDrawer = () => {
    setOpen((open) => !open);
  };

  const handleListItemClick = (index, route) => {
    setSelectedIndex(index);
    navigate(route);
  };

  const adminItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Finance", icon: <AccountBalanceIcon /> },
    { text: "Maintenance", icon: <BuildIcon /> },
    { text: "Reservations", icon: <EventIcon /> },
    { text: "Guests", icon: <TransferWithinAStationIcon /> },
    { text: "Residential Units", icon: <MapsHomeWorkIcon /> },
    { text: "Complaints", icon: <DriveFileRenameOutlineIcon /> },
    { text: "News & Notices", icon: <CampaignIcon /> },
    { text: "Residents Information", icon: <GroupsIcon /> },
    { text: "Staff Details", icon: <EngineeringIcon /> },
    { text: "User Credentials", icon: <PersonAddIcon /> },
    { text: "Settings", icon: <SettingsIcon /> },
    { text: "Info", icon: <InfoOutlinedIcon /> },
  ];
  const financeManagerItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Finance", icon: <AccountBalanceIcon /> },
  ];

  const securityManagerItems = [
    { text: "Guests", icon: <TransferWithinAStationIcon /> },
  ];

  let drawerItems;

  switch (userRole) {
    case "admin":
      drawerItems = adminItems;
      break;
    case "finance_manager":
      drawerItems = financeManagerItems;
      break;
    default:
      drawerItems = securityManagerItems;
      break;
  }

  return (
    <div className="SideBarContainer">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {open && (
          <div
            style={{
              position: "fixed",
              width: "100vw",
              height: "100vh",
              top: "0",
              left: "0",
              background: "#00000050",
              zIndex: "1",
            }}
          ></div>
        )}

        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={open ? "space-between" : "end"}
              alignItems={"center"}
            >
              {open && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="./Assest/HomeIcon.svg" // Replace with the correct path to your image
                    alt="ApartFlow Icon"
                    style={{
                      marginRight: "20px",
                      marginLeft: "10px",
                      width: "2rem",
                      height: "2rem",
                    }} // Add margin if needed
                  />
                  <Typography
                    sx={{
                      color: "#F9FAF9", // Add this line to set the text color
                    }}
                  >
                    ApartFlow
                  </Typography>
                </Box>
              )}
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawer}
                edge="start"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#E76736",
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </DrawerHeader>
          <Divider />

          <List>
            {drawerItems.map((item, index) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: "block", cursor: "pointer" }}
              >
                <ListItemButton
                  selected={selectedIndex === index}
                  onClick={() => {
                    handleListItemClick(index, `/${item.text.toLowerCase()}`);
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: selectedIndex === index ? "#E76736" : "#F9FAF9",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: selectedIndex === index ? "#E76736" : "#F9FAF9",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </div>
  );
}
