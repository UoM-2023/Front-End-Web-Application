import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function BackButton() {
  return (
    <div className='ButtonContainer'>
      <Stack spacing={2} direction="row">
        <Button 
          variant="outlined"
          style={{ 
              borderColor: '#4681f4',
              backgroundColor:'#ffff',
              borderWidth:'0.1rem',
              color: '#4681f4',
              borderRadius: '5rem',
              fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
              fontSize: '0.85rem',
              paddingLeft:'1.8rem',
              paddingRight:'1.8rem'
            }}
        >
          Back
        </Button>
      </Stack>
    </div>
  )
}

export default BackButton