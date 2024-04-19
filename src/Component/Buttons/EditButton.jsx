import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function EditButton({route}) {
  
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the desired route when the button is clicked
    navigate(route);
  };
  return (
    <div className="ButtonContainer">
      <Stack spacing={2} direction="row">
        <Button
          variant="outlined"
          onClick={handleClick}
          style={{
            backgroundColor: "#ffffff",
            borderColor: "#e87142c5",
            color: "#e87142c5",
            borderWidth: "0.1rem",
            borderRadius: "0.5rem",
            fontWeight: "bold",
            fontFamily:
              "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
            fontSize: "0.85rem",
            paddingLeft: "1.58rem",
            paddingRight: "1.58rem",
          }}
        >
          Edit
        </Button>
      </Stack>
    </div>
  );
}

export default EditButton;
