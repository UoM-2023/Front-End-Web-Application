import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function ViewButton() {
  return (
    <div>
    <Stack spacing={2} direction="row">
        <Button 
          variant="contained" 
          style={{ 
            backgroundColor: '#80669d', 
            color: '#fff',
            borderRadius: '5rem',
            fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
            fontSize: '0.85rem',
            paddingLeft:'1.8rem',
            paddingRight:'1.8rem'
          }}
        >
          View
        </Button>
      </Stack>
    </div>
  )
}

export default ViewButton