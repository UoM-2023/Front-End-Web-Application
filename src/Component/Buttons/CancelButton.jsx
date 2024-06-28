import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function CancelButton({ handleCancel }) {
  return (
    <div className="ButtonContainer">
      <Stack spacing={2} direction="row">
        <Button
          variant="outlined"
          style={{
            borderColor: "#E87042",
            backgroundColor: "#ffff",
            borderWidth: "0.1rem",
            color: "#E87042",
            borderRadius: "0.5rem",
            fontFamily:
              "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
            fontSize: "0.85rem",
            fontWeight: "bold",
            paddingLeft: "1.2rem",
            paddingRight: "1rem",
          }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Stack>
    </div>
  );
}

export default CancelButton;
