import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, TextareaAutosize } from '@mui/material';
import { Box, ThemeProvider } from '@mui/system';
import { TextField } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import './cardSix.css';



const CardSix = ({ onClick, className, title, content }) => {
  return (
    <span className={className}>
      <Card 
        onClick={onClick}
        sx={{
          width: 340,
          height: 180,
          backgroundColor: '#fff',
          borderRadius: 6,
          border: "#383737 solid",
        }}
      >
        <CardActionArea>
          <CardMedia />
          <div className="CardAndIcon">
            <span className="card">
              <CardContent sx={{ padding: 3.5 }}>
              <p style={{ color: 'rgba(231,103,54,1)' }}>{title}</p>
                <Typography variant="body2" color="text.secondary">
                  <h2>{content}</h2>
                </Typography>
              </CardContent>
            </span>
            <span className="Icon">
              <AutoStoriesIcon sx={{ width: 70, height: 70 }} />
            </span>
          </div>
        </CardActionArea>
      </Card>
    </span>
  );
};

export default CardSix;
