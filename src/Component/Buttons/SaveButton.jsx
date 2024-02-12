import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function SaveButton() {
  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          style={{
            backgroundColor: "#e87142c5",
            color: "#fff",
            borderRadius: "0.5rem",
            fontFamily:
              "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
            fontSize: "0.85rem",
            fontWeight:"bold",
            paddingLeft: "1.8rem",
            paddingRight: "1.8rem",
          }}
          className="submit"
          type="submit"
        >
          Save
        </Button>
      </Stack>
    </div>
  );
}

export default SaveButton;
