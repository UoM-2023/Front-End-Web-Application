import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { propTypes } from "react-bootstrap/esm/Image";

const AddNewButton = ({route}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the desired route when the button is clicked
    navigate(route);
  };
  return (
    <div className="ButtonContainer">
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          style={{
            backgroundColor: "#E87042",
            color: "#fff",
            borderRadius: "0.5rem",
            fontFamily:
              "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
            fontSize: "0.9rem",
            fontWeight: "bold",
            paddingLeft: "1.2rem",
            paddingRight: "1.2rem", 
          }}
          onClick = {handleClick}
        >
          + Add New
        </Button>
      </Stack>
    </div>
  );
}

// AddNewButton.propTypes = {
//   route: propTypes.string.isRequired,
// };

export default AddNewButton;
