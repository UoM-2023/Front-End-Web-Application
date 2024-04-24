import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';



function DeleteButton({onClick}) {

  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className='ButtonContainer'>
      <Stack spacing={2} direction="row">
        <Button 
          variant="contained" 
          onClick={handleClick}
          style={{ 
            backgroundColor: '#BB5008', 
            color: '#fff',
            borderRadius: '0.5rem',
            fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
            fontSize: '0.85rem',
            fontWeight: "bold",
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