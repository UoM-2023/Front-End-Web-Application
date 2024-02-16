import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import "./InputField.css";

export default function InputField() {
  return (
    <div className="inputFieldContainer">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 0, marginLeft: "5rem", width: "35vw" },
        }}
        noValidate
        autoComplete="off"
      >
        <InputLabel htmlFor="building" className="namesTag">
          Buildinghhhh:
        </InputLabel>
        <TextField
          id="outlined-basic"
          sx={{
            "& .MuiInputBase-root": {
              height: "6.5vh", // Adjust the height here as per your requirement
              fontSize: "1rem", // Adjust the font size here as per your requirement
            },
            "& .MuiInputLabel-root": {
              fontSize: "1rem", // Adjust the font size of the label here as per your requirement
            },
          }}
        />
      </Box>
    </div>
  );
}
