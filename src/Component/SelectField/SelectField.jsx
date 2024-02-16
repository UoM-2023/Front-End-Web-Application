// import React from "react";
// // import { useState, useEffect } from "react";
// import { Box, Grid, InputLabel, MenuItem, Select } from "@mui/material";

// function SelectField() {
//   return (
//     <div className="SelectFieldContainer">
//       <Box
//         className="inputItems"
//         sx={{
//           "& > :not(style)": { ml: 10, width: "35vw" },
//         }}
//       >
//         <InputLabel htmlFor="building" className="namesTag">
//           Building:
//         </InputLabel>
//         <Select className="selectItems" name="building">
//           <MenuItem value="" className="optionContainer">
//             Select Building
//           </MenuItem>
//           <MenuItem value="Wing 01" name="Wing 01" className="optionContainer">
//             Wing 01
//           </MenuItem>
//           <MenuItem value="Wing 02" name="Wing 02" className="optionContainer">
//             Wing 02
//           </MenuItem>
//           <MenuItem value="Wing 03" name="Wing 03" className="optionContainer">
//             Wing 03
//           </MenuItem>
//           <MenuItem value="Wing 04" name="Wing 04" className="optionContainer">
//             Wing 04
//           </MenuItem>
//         </Select>
//       </Box>
//     </div>
//   );
// }

// export default SelectField;

import React, { useState } from "react";
import { Box, InputLabel, MenuItem, Select } from "@mui/material";

function SelectField({ label, options, initialValue, onChange }) {
  const [selectedValue, setSelectedValue] = useState(initialValue || "");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="SelectFieldContainer">
      <Box
        className="inputItems"
        sx={{
          "& > :not(style)": { ml: 10, width: "35vw" },
        }}
      >
        <InputLabel htmlFor="building" className="namesTag">
          {label}:
        </InputLabel>
        <Select
          className="selectItems"
          name="building"
          value={selectedValue}
          onChange={handleChange}
        >
          <MenuItem value="" className="optionContainer">
            Select {label}
          </MenuItem>
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              className="optionContainer"
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </div>
  );
}

export default SelectField;
