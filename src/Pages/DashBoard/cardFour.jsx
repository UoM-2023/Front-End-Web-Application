import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EventsIcon from '@mui/icons-material/Event';
import './fourCards.css'; 

const CardFour = ({ onClick, className, title, content }) => {
  return (
    <span className={className}>
      <Card
        onClick={onClick}
        sx={{
          width: 300,
          height: 150,
          backgroundColor: '#fff',
          borderRadius: 6,
          border: "#383737 solid",
        }}
      >
        <CardActionArea>
          <div className="CardAndIcon">
            <span className="card">
              <CardContent>
                <p>{title}</p>
                <Typography variant="body2" color="text.secondary">
                  <h3>{content}</h3>
                </Typography>
              </CardContent>
            </span>
            <span className="Icon">
              <EventsIcon />
            </span>
          </div>
        </CardActionArea>
      </Card>
    </span>
  );
};

export default CardFour;
