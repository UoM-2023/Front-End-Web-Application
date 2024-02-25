import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function CancelButton() {
  return (
    <div className="ButtonContainer">
      <Stack spacing={2} direction="row">
        <Button
          variant="outlined"
          style={{
            borderColor: "#f1875d",
            backgroundColor: "#ffff",
            borderWidth: "0.1rem",
            color: "#f1875d",
            borderRadius: "0.5rem",
            fontFamily:
              "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
            fontSize: "0.85rem",
            fontWeight: "bold",
            paddingLeft: "1.2rem",
            paddingRight: "1rem",
          }}
        >
          Cancel
        </Button>
      </Stack>
    </div>
  );
}

export default CancelButton;
