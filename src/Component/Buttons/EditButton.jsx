import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function EditButton() {
  return (
    <div className='ButtonContainer'>
      <Stack spacing={2} direction="row">
        <Button 
          variant="contained" 
          style={{ 
            backgroundColor: '#7170CA', 
            color: '#fff',
            borderRadius: '5rem',
            fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
            fontSize: '0.8rem',
            paddingLeft:'1.8rem',
            paddingRight:'1.8rem'
          }}
        >
          Edit
        </Button>
      </Stack>
    </div>
  )
}

export default EditButton