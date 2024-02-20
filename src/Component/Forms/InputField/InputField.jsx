import * as React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import "./InputField.css";

export default function InputField() {
  return (
    <div className="inputFieldContainer">
      <InputLabel htmlFor="building" className="namesTag">
        Buildinghhhh:
      </InputLabel>
      <TextField
        id="outlined-basic"
        className="textFieldComponent"
        sx={{
          "& .MuiInputBase-root": {
            width: "35vw",
            height: "5.5vh", // Adjust the height here as per your requirement
            fontSize: "1rem", // Adjust the font size here as per your requirement
          },
          "& .MuiInputLabel-root": {
            fontSize: "1rem", // Adjust the font size of the label here as per your requirement
          },
        }}
      />
    </div>
  );
}
