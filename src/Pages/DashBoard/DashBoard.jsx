import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, TextareaAutosize } from '@mui/material';
import "./dashboard.css"
import { Box, ThemeProvider } from '@mui/system';
import { TextField } from '@mui/material';

import TextArea from './TextArea';
import AddNewButton from '../../Component/Buttons/AddNewButton';
import PaymentIcon from './PaymentIcon';
import VIsitorIcon from './VIsitorIcon';
import MaintenanceIcon from './MaintenanceIcon';
import EventIcon from './EventsIcon';
import EventsIcon from './EventsIcon';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Calender from './Calender';
import chhartTwo from './chartTwo';
import ChartOne from './ChartOne';
import ChartTwo from './chartTwo';
import ChartThree from './ChartThree';
import Welcome from './Welcome';
import SubmitButton from '../../Component/Buttons/SubmitButton';
import NotificationBar from './NotificationBar';
import ReservationIcon from './reservationIcon';
import { Link, useNavigate } from 'react-router-dom';
import MainComponent from './MainComponent';
import CardComponent from './CardComponent';
import CardFive from './cardFive';
import CardSix from './cardSix';
import CardOne from './cardOne';
import CardTwo from './cardTwo';
import CardThree from './cardThree';
import CardFour from './cardFour';
import getSocketInit from '../../socket';
import { useGetReservation } from '../../hooks/useGetReservation';
import { useGetGuest } from '../../hooks/useGetGuest';
import { useGetComplain } from '../../hooks/useGetComplain';
import { useGetPayment } from '../../hooks/useGetPayment';
import { useGetMaintanance } from '../../hooks/useGetMaintanance';
import { useGetEvent } from '../../hooks/useGetEvent'; 

export default function DashBoard() {

  const socket = getSocketInit();
  socket.connect();

  const navigate = useNavigate();

  const handleComplain = () => {
    navigate('/complaints');
  };

  const handleReservation = () => {
    navigate('/reservations');
  };

  const handlePayments = () => {
    navigate('/finance');
  };
  const handleGuests = () => {
    navigate('/guests');
  };


  const handleMaintenance = () => {
    navigate('/maintenance');
  };

  const handleEvents = () => {
    navigate('/eventsTable');
  };
  const [reservationCount, setReservationCount] = useState(0)





  const { isPending, error, reservation } = useGetReservation();
  const { guest } = useGetGuest();
  const { complain } = useGetComplain();
  const { payment } = useGetPayment();
  const { maintanance } = useGetMaintanance();
  const { event } = useGetEvent();


  if (isPending) return;
  return (
    <div>



      <div className="rowOne">
        <Welcome />
        <CardFive
          onClick={handleComplain}
          className="cardFive"
          title="Support"
          content={`${complain} Complains For Today `}
        />
        <CardSix
          onClick={handleReservation}
          className="cardSix"
          title=" Reservations"
          content={`${reservation} Reservation For Today `}

        />
      </div>


      <div className="rowTwo">
        <CardOne
          onClick={handlePayments}
          className="cardOne"
          title="New Payments"
          content={`${payment} Payments For Today `}
        />
        <CardTwo
          onClick={handleGuests}
          className="cardTwo"
          title="Today Visitors"
          content={`${guest} Visitors For Today `}
        />
        <CardThree
          onClick={handleMaintenance}
          className="cardThree"
          title="Maintenance Requests"
          content={`${maintanance} Maintanance For Today `}
        />
        <CardFour
          onClick={handleEvents}
          className="cardFour"
          title="Today Events"
          content={`${event} Events For Today `}
        />
      </div>
      {/* <div className="charts">
        <ChartTwo />
      </div> */}


      {/* <div className="notificationBar">
        <span className="notificationBar"><NotificationBar /></span>
        <span className="submitButton"><SubmitButton /></span>
      </div> */}
    </div>

  )
}




