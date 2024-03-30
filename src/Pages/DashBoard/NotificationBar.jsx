import * as React from 'react';
import Box from '@mui/joy/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/system';

const BlackTextarea = styled(TextareaAutosize)({
  color: 'black',
  border: '1px solid black',
  padding: '8px',
  borderRadius: '4px',
  width: '100%',
  resize: 'none',
  '&:focus': {
    // outline: 'black',
    borderColor: 'black', // You can change this to customize the focus color
  },
});

export default function NotificationBar() {
  return (
    <Box
      sx={{
        py: 2,
        display: 'grid',
        gap: 4,
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '90rem',
      }}
    >
      <BlackTextarea placeholder="Type the Notification" />
    </Box>
  );
}
