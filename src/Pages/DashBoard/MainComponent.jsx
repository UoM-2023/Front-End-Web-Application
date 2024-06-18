import React from 'react';
import CardFive from './cardFive';
import CardSix from './cardSix';
import './maincomponent.css'; 
import Welcome from './Welcome';

const MainComponent = () => {
  const handleComplain = () => {
    // Handle complain functionality
  };

  const handleReservation = () => {
    // Handle reservation functionality
  };

  return (
    <div className="main-container"> {/* Container for the cards */}
      <Welcome />
      <CardFive
        onClick={handleComplain}
        className="cardFive"
        title="Support"
        content="No Requests For Today"
      />
      <CardSix
        onClick={handleReservation}
        className="cardSix"
        title=" Reservations"
        content="01 Reservations For Today"
      />
    </div>
  );
};

export default MainComponent;
