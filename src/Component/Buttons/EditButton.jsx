import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function EditButton() {
  return (
    <div className="ButtonContainer">
      <Stack spacing={2} direction="row">
        <Button
          variant="outlined"
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
