import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function DeleteButton() {
  return (
    <div className='ButtonContainer'>
      <Stack spacing={2} direction="row">
        <Button 
          variant="contained" 
          style={{ 
            backgroundColor: '#ED0800', 
            color: '#fff',
            borderRadius: '5rem',
            fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
            fontSize: '0.85rem',
            paddingLeft:'1.2rem',
            paddingRight:'1.2rem'
          }}
        >
          Delete
        </Button>
      </Stack>
    </div>
  )
}

export default DeleteButton