
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
        <Card sx={{ display: 'flex', backgroundColor: '#000000', width: 1520 }}> {/* Change background color to black */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h4" color="white"> {/* Change text color to white */}
                        Welcome Back!
                    </Typography>
                    <Typography variant="subtitle1" color="white" component="div"> {/* Change text color to white */}
                        ApartFlow Dashboard
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 2 }}>

                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 120, marginLeft: '70rem' }}
                image="https://www.freevector.com/uploads/vector/preview/259/FreeVector-Flats-Vector.jpg"
                alt=" Welcome Back to ApartFlow Dashboard"
            />
        </Card>
    );
}
