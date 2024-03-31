import React from 'react'
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

export default function DashBoard() {
  return (
    <div>
      <div className="CardsRowTwo">

        <span className="welcome"><Welcome /></span>


        <span className="cardFive">
          <Card sx={{
            width: 300,                  // Set the width to 300px
            height: 150,                 // Set the height to 200px
            backgroundColor: '#fff',
            borderRadius: 6,
            border: "#383737 solid",
          }}>
            <CardActionArea>
              <CardMedia>

              </CardMedia>
              <div className="PaymentAndIcon">
                <span className="NewPayments">
                  <CardContent>
                    <p>Support</p>

                    <Typography variant="body2" color="text.secondary">
                      <h3>No Requests For Today</h3>
                    </Typography>
                  </CardContent>
                </span>
                <span className="Icon">

                  <ThumbUpIcon sx={{ width: 65, height: 65 }} />
                </span>
              </div>
            </CardActionArea>
          </Card>
        </span>



        <span className="cardSix">
          <Card sx={{
            width: 300,                  // Set the width to 300px
            height: 150,                 // Set the height to 200px
            backgroundColor: '#fff',
            borderRadius: 6,
            border: "#383737 solid",
          }}>
            <CardActionArea>
              <CardMedia>

              </CardMedia>
              <div className="PaymentAndIcon">
                <span className="NewPayments">
                  <CardContent>
                    <p>Today Reservations</p>

                    <Typography variant="body2" color="text.secondary">
                      <h3>01 Reservations For Today</h3>
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




      </div>

      <div className="CardsRowOne">
        <span className="cardOne">
          <Card sx={{
            width: 300,                  // Set the width to 300px
            height: 150,                 // Set the height to 200px
            backgroundColor: '#fff',
            borderRadius: 6,
            border: "#383737 solid",
          }}>
            <CardActionArea>
              <CardMedia>

              </CardMedia>
              <div className="PaymentAndIcon">
                <span className="NewPayments">
                  <CardContent>
                    <p>New Payments</p>

                    <Typography variant="body2" color="text.secondary">
                      <h3>08 Payments For Today</h3>
                    </Typography>
                  </CardContent>
                </span>
                <span className="Icon">

                  <PaymentIcon />
                </span>
              </div>
            </CardActionArea>
          </Card>
        </span>


        <span className="cardTwo">
          <Card sx={{
            width: 300,                  // Set the width to 300px
            height: 150,                 // Set the height to 200px
            backgroundColor: '#fff',
            borderRadius: 6,
            border: "#383737 solid",
          }}>
            <CardActionArea>
              <div className="PaymentAndIcon">
                <span className="NewPayments">
                  <CardContent>
                    <p>Today Visitors</p>

                    <Typography variant="body2" color="text.secondary">
                      <h3>No Visitors For Today</h3>
                    </Typography>

                  </CardContent>
                </span>
                <span className="Icon">
                  <VIsitorIcon />
                </span>


              </div>
            </CardActionArea>
          </Card>
        </span>


        <span className="cardThree">
          <Card sx={{
            width: 300,                  // Set the width to 300px
            height: 150,                 // Set the height to 200px
            backgroundColor: '#fff',
            borderRadius: 6,
            border: "#383737 solid",
          }}>
            <CardActionArea>
              <div className="PaymentAndIcon">
                <span className="NewPayments">

                  <CardContent>
                    <p>Maintanance Requests</p>

                    <Typography variant="body2" color="text.secondary">
                      <h3>No Maintanace Requests</h3>
                    </Typography>

                  </CardContent>
                </span>
                <span className="Icon">
                  <MaintenanceIcon />
                </span>
              </div>

            </CardActionArea>
          </Card>
        </span>


        <span className="cardFour">
          <Card sx={{
            width: 300,                  // Set the width to 300px
            height: 150,                 // Set the height to 200px
            backgroundColor: '#fff',
            borderRadius: 6,
            border: "#383737 solid",
          }}>
            <CardActionArea>
              <div className="PaymentAndIcon">
                <span className="NewPayments">
                  <CardContent>
                    <p>Today Events</p>

                    <Typography variant="body2" color="text.secondary">
                      <h3>02 Events  For Today</h3>
                      <h3></h3>
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

      </div>







      <div className="charts">
        <ChartTwo />
      </div>


      <div className="notificationBar">
        <span className="notificationBar"><NotificationBar /></span>
        <span className="submitButton"><SubmitButton /></span>
      </div>



    </div>

  )
}

