import { TextField } from '@mui/material';
import * as React from 'react';
import "./textarea.css"


export default function TextArea() {
  return (
    <div>
      <div className="TextField">
        <TextField
          id="outlined-multiline-static"
          label=""
          multiline
          rows={6}
          sx={{
            backgroundColor: "#FFFFFF",
            width: "100%",
          }}
          defaultValue="Type here..."
        />
      </div>
    </div>

  );
}