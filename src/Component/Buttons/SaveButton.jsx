import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function SaveButton() {
  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button 
          variant="contained" 
          style={{ 
            backgroundColor: '#3745d9', 
            color: '#fff',
            borderRadius: '5rem',
            fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
            fontSize: '0.85rem',
            paddingLeft:'1.8rem',
            paddingRight:'1.8rem'
          }}
        >
          Save
        </Button>
      </Stack>
    </div>
  )
}

export default SaveButton