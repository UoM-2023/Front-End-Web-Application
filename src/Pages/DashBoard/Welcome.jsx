
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function Welcome() {
    const theme = useTheme();

    return (
        <Card sx={{ display: 'flex', backgroundColor: '#000000', width: 1580, height: 220 }}> {/* Change background color to black */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h3" style={{ color: 'rgba(231,103,54,255)',marginBottom: '20px' }}> {/* Change text color to white */}
                        Welcome Back!
                    </Typography>
                    <Typography variant="h5" color="white" component="div"> {/* Change text color to white */}
                        ApartFlow Dashboard
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 2 }}>

                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 230, marginLeft: '61rem' }}
                // image="https://www.freevector.com/uploads/vector/preview/259/FreeVector-Flats-Vector.jpg"
                image="https://img.freepik.com/free-photo/new-york-buildings-day_23-2150863247.jpg?t=st=1718920139~exp=1718923739~hmac=742c0f8dc398136fddb56076c29d0b2ce2ace5e078e14b22a7e58692ad981c7b&w=740"
                alt=" Welcome Back to ApartFlow Dashboard"
            />
        </Card>
    );
}
