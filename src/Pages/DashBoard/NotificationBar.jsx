import * as React from 'react';
import Box from '@mui/joy/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/system';

const BlackTextarea = styled(TextareaAutosize)({
  color: 'black',
  border: '3px solid black',
  padding: '50px',
  borderRadius: '12px',
  width: '100%',
  height: '100%',
  resize: 'none',
  '&:focus': {
    outline: 'black',
    borderColor: 'black', // You can change this to customize the focus color
  },
});

export default function NotificationBar() {
  return (
    <Box
      sx={{
        py: 4,
        px: 4,
        display: 'grid',
        gap: 4,
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '91rem',

      }}
    >
      <BlackTextarea placeholder="Type the Notification" />
    </Box>
  );
}
