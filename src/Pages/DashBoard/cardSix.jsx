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
          width: 310,
          height: 160,
          backgroundColor: '#fff',
          borderRadius: 6,
          border: "#383737 solid",
        }}
      >
        <CardActionArea>
          <CardMedia />
          <div className="CardAndIcon">
            <span className="card">
              <CardContent>
                <p>{title}</p>
                <Typography variant="body2" color="text.secondary">
                  <h2>{content}</h2>
                </Typography>
              </CardContent>
            </span>
            <span className="Icon">
              <AutoStoriesIcon sx={{ width: 65, height: 65 }} />
            </span>
          </div>
        </CardActionArea>
      </Card>
    </span>
  );
};

export default CardSix;
