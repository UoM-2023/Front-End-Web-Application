import React from "react";
import "./SearchBar.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  borderWidth: "1px",
  borderColor: "#48484853",
  borderStyle: "solid",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#f9f4f0",
  "&:hover": {
    backgroundColor: "#ffffff",
    borderColor: "#000000",
  },
  "&:active": {
    borderColor: "#1c74eed5",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "25rem",
    height: "2.5rem",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg": {
    width: "1.3rem",
    height: "1.3rem",
    marginLeft: "0",
    marginTop: "2px",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#000000",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 4),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "22ch",
    },
  },
}));

function SearchBar({ onChange }) {
  const handleSearchChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="FullBar">
      <div className="searchBarContainer">
        <Box sx={{ flexGrow: 1 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearchChange}
            />
          </Search>
        </Box>
      </div>
    </div>
  );
}

export default SearchBar;
