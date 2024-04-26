import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  return (
    <div className="ButtonContainer">
      <Stack spacing={2} direction="row">
        <Button
          variant="outlined"
          style={{
            borderColor: "#f96328",
            backgroundColor: "#ffff",
            borderWidth: "0.1rem",
            color: "#f96328",
            borderRadius: "0.5rem",
            fontFamily:
              "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
            fontSize: "0.85rem",
            paddingLeft: "1.56rem",
            paddingRight: "1.56rem",
            fontWeight: "bold",
          }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Stack>
    </div>
  );
}

export default BackButton;
