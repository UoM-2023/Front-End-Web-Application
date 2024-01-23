import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function CancelButton() {
  return (
    <div className='ButtonContainer'>
      <Stack spacing={2} direction="row">
        <Button 
          variant="contained" 
          style={{ 
            backgroundColor: '#f1875d', 
            color: '#fff',
            borderRadius: '5rem',
            fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
            fontSize: '1rem'
          }}
        >
          Cancel
        </Button>
      </Stack>
    </div>
  )
}

export default CancelButton;