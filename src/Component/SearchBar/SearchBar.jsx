import React from "react";
import "./SearchBar.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

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
    width: "16rem",
    height: "2rem",
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

function SearchBar() {
  const [selectedValues, setSelectedValues] = React.useState([]);

  const handleChange = (event) => {
    const selected = event.target.value;
    if (selected.includes("All")) {
      setSelectedValues(
        selected.length === 1 ? ["wing01", "wing02", "wing03", "wing04"] : []
      );
    } else {
      setSelectedValues(selected);
    }
  };

  return (
    <div className="FullBar">
      <div className="filterBoxContainer">
        <FormControl sx={{ m: 0, minWidth: 80 }}>
          <Select
            multiple
            value={selectedValues}
            onChange={handleChange}
            IconComponent={FilterAltIcon}
            renderValue={(selected) => selected.join(", ")}
            sx={{
              width: "5rem",
              height: "2rem",
              borderWidth: "1px",
              borderColor: "#48484840",
              borderStyle: "none",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f9f4f0",
              "&:hover": {
                backgroundColor: "#ffffff",
              },
              "& .MuiSelect-icon": {
                transform: "rotate(0deg)",
              },
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="wing01">
              <Checkbox checked={selectedValues.includes("wing01")} />
              Wing 01
            </MenuItem>
            <MenuItem value="wing02">
              <Checkbox checked={selectedValues.includes("wing02")} />
              Wing 02
            </MenuItem>
            <MenuItem value="wing03">
              <Checkbox checked={selectedValues.includes("wing03")} />
              Wing 03
            </MenuItem>
            <MenuItem value="wing04">
              <Checkbox checked={selectedValues.includes("wing04")} />
              Wing 04
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="searchBarContainer">
        <Box sx={{ flexGrow: 1 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Box>
      </div>
    </div>
  );
}

export default SearchBar;
