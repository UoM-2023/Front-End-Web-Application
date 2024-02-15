import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function SaveButton() {
  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button
          className="submit"
          type="submit"
          variant="contained"
          style={{
            backgroundColor: "#e87142c5",
            color: "#fff",
            borderRadius: "0.5rem",
            fontFamily:
              "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
            fontSize: "0.85rem",
            fontWeight: "bold",
            paddingLeft: "1.7rem",
            paddingRight: "1.7rem",
          }}
        >
          Save
        </Button>
      </Stack>
    </div>
  );
}

export default SaveButton;
