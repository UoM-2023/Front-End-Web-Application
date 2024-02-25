import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function ViewButton() {
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
        >
          View
        </Button>
      </Stack>
    </div>
  );
}

export default ViewButton;
