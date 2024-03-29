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
import Calender from './Calender';




export default function DashBoard() {
  return (
    <div>

      <div className="One">

        <span className="Welcomeback">
          <Card sx={{ maxWidth: 600 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="170"
                image="https://imgs.search.brave.com/eV-l_OQZgQwceeDLZ8j9A-sDV0lWfDAUZwgqcYXnqu0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuZGFzaHRoaXMu/Y29tL21lZGlhLzE5/NjAvZGFzaGJvYXJk/X2Rhc2hib2FyZC5w/bmc"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Welcome Back!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ApartFlow Dashboard
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </span>


        <span className="Emergency">
          <Card sx={{ maxWidth: 1500, backgroundColor: '#e76d6d' }}>
            <CardActionArea>

              <CardContent>
                <h1 className='title'>Emergency!!</h1>
                <Typography variant="body2" color="text.secondary">
                  <div className="TypeAreaAndButton">
                    <span className="TextArea"><TextArea /></span>
                    <span className="Button">
                      <AddNewButton />
                    </span>
                  </div>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </span>

      </div>

      <div className="MiddleCards">
        <span className="cardOne">
          <Card sx={{
            maxWidth: 1000,
            backgroundColor: '#fff',
            borderRadius: 10,
            border: "#383737 solid",
          }}>
            <CardActionArea>
              <CardMedia>

              </CardMedia>
              <div className="PaymentAndIcon">
                <span className="NewPayments">
                  <CardContent>
                    <h1>New</h1>
                    <h1>Payments</h1>
                    <Typography variant="body2" color="text.secondary">
                      No Events For Today
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
            maxWidth: 1000,
            backgroundColor: '#fff',
            borderRadius: 10,
            border: "#383737 solid",
          }}>
            <CardActionArea>
              <div className="PaymentAndIcon">
                <span className="NewPayments">
                  <CardContent>
                    <h1>Today</h1>
                    <h1>Visitors</h1>
                    <Typography variant="body2" color="text.secondary">
                      No Visitors For Today
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
            maxWidth: 1000,
            backgroundColor: '#fff',
            borderRadius: 10,
            border: "#383737 solid",
          }}>
            <CardActionArea>
              <div className="PaymentAndIcon">
                <span className="NewPayments">

                  <CardContent>
                    <h1>Maintanance</h1>
                    <h1>Requests</h1>
                    <Typography variant="body2" color="text.secondary">
                      New
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
            maxWidth: 1000,
            backgroundColor: '#fff',
            borderRadius: 10,
            border: "#383737 solid",
          }}>
            <CardActionArea>
              <div className="PaymentAndIcon">
                <span className="NewPayments">
                  <CardContent>
                    <h1>Today</h1>
                    <h1>Events</h1>
                    <Typography variant="body2" color="text.secondary">
                      No Events For Today
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





      <div className="MiddleCards">
        <span className="cardOne">
          <Card sx={{
            maxWidth: 1000,
            backgroundColor: '#fff',
            borderRadius: 10,
            border: "#383737 solid",
          }}>
            <CardActionArea>
              <CardMedia>

              </CardMedia>
              <div className="PaymentAndIcon">
                <span className="NewPayments">
                  <CardContent>
                    <h1>  Today </h1>
                    <h1>  Reservations </h1>
                    <Typography variant="body2" color="text.secondary">
                      No Events For Today
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
            maxWidth: 1000,
            backgroundColor: '#fff',
            borderRadius: 10,
            border: "#383737 solid",
          }}>
            <CardActionArea>
              <div className="PaymentAndIcon">
                <span className="NewPayments">
                  <CardContent>
                    <h1>Guest</h1>
                    <h1>Details</h1>
                    <Typography variant="body2" color="text.secondary">
                      No Visitors For Today
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
            maxWidth: 1000,
            backgroundColor: '#fff',
            borderRadius: 10,
            border: "#383737 solid",
          }}>
            <CardActionArea>
              <div className="PaymentAndIcon">
                <span className="NewPayments">

                  <CardContent>
                    <h1>Complains</h1>
                    <h1>Requests</h1>
                    <Typography variant="body2" color="text.secondary">
                      New
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
            maxWidth: 1000,
            backgroundColor: '#fff',
            borderRadius: 10,
            border: "#383737 solid",
          }}>
            <CardActionArea>
              <div className="PaymentAndIcon">
                <span className="NewPayments">
                  <CardContent>
                    <h1>Today</h1>
                    <h1>Events</h1>
                    <Typography variant="body2" color="text.secondary">
                      No Events For Today
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




      //////////////






    </div>




  )
}

