import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { propTypes } from "react-bootstrap/esm/Image";

function ViewButton({ route }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the desired route when the button is clicked
    navigate(route);
  };
  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button
          variant="outlined"
          style={{
            borderColor: "#bb5008c5",
            borderWidth: "0.1rem",
            backgroundColor: "#ffffff",
            color: "#bb5008c5",
            borderRadius: "0.5rem",
            fontFamily:
              "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
            fontSize: "0.85rem",
            fontWeight: "bold",
            paddingLeft: "1.6rem",
            paddingRight: "1.6rem",
          }}
          onClick={handleClick}
        >
          View
        </Button>
      </Stack>
    </div>
  );
}

export default ViewButton;
