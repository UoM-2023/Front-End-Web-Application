import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function SubmitButton() {
  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          style={{
            backgroundColor: "#db4b12",
            color: "#fff",
            borderRadius: "0.5rem",
            fontFamily:
              "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
            fontSize: "0.85rem",
            fontWeight: "bold",
            paddingLeft: "1.2rem",
            paddingRight: "1.2rem",
          }}
        >
          Submit
        </Button>
      </Stack>
    </div>
  );
}

export default SubmitButton;
