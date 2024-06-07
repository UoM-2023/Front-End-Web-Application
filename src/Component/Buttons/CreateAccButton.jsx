import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function CreateAccButton() {
  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          className="submit"
          type="submit"
          style={{
            backgroundColor: "#E87042",
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
          Create Account
        </Button>
      </Stack>
    </div>
  );
}

export default CreateAccButton;
