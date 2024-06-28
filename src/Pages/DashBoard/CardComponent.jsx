import React from 'react';
import CardOne from './cardOne';
import CardTwo from './cardTwo';
import CardThree from './cardThree';
import CardFour from './cardFour';
import './CardComponent.css'; 

const CardComponent = () => {
  const handlePayments = () => {
    // Handle payments functionality
  };

  const handleGuests = () => {
    // Handle guests functionality
  };

  const handleMaintenance = () => {
    // Handle maintenance functionality
  };

  const handleEvents = () => {
    // Handle events functionality
  };

  return (
    <div className="main-container"> {/* Container for the cards */}
      <div className="card-container">
        <CardOne
          onClick={handlePayments}
          className="cardOne"
          title="New Payments"
          content="08 Payments For Today"
        />
        <CardTwo
          onClick={handleGuests}
          className="cardTwo"
          title="Today Visitors"
          content="No Visitors For Today"
        />
        <CardThree
          onClick={handleMaintenance}
          className="cardThree"
          title="Maintenance Requests"
          content="No Maintenance Requests"
        />
        <CardFour
          onClick={handleEvents}
          className="cardFour"
          title="Today Events"
          content="02 Events For Today"
        />
      </div>
    </div>
  );
};

export default CardComponent;
