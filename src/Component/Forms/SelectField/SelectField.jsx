import React from "react";
import { Box, Grid, InputLabel, MenuItem, Select } from "@mui/material";

const SelectField = (props) => {
  console.log(props);
  return (
    <div className="SelectFieldContainer">
      <Box
        className="inputItems"
        sx={{
          "& > :not(style)": { ml: 10, width: "35vw" },
        }}
      >
        <InputLabel className="namesTag">{props.selectNameTag}</InputLabel>
        
        <Select className="selectItems" name="building">
          <MenuItem value="" className="optionContainer">
            Select Building
          </MenuItem>
          <MenuItem value="wing01" name="wing01" className="optionContainer">
            Wing 01
          </MenuItem>
          <MenuItem value="wing02" name="wing02" className="optionContainer">
            Wing 02
          </MenuItem>
          <MenuItem value="wing03" name="wing03" className="optionContainer">
            Wing 03
          </MenuItem>
          <MenuItem value="wing04" name="wing04" className="optionContainer">
            Wing 04
          </MenuItem>
        </Select>
      </Box>
    </div>
  );
};

export default SelectField;
