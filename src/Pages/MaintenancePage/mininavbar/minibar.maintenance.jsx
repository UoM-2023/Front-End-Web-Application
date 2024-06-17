import { Tab, Tabs, ThemeProvider, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const theme = createTheme({
  palette: {
    secondary: {
      main: '#E87042',  
    },
  },
});


const Minibar = () => {
    const location = useLocation();
    const [value, setValue] = useState('one');
    const handleChange = (event,newValue)=>{
        setValue(newValue);
    };

    useEffect(()=>{
        switch(location.pathname){
            case '/maintenance':
            setValue('one');
            break;
            
            case '/maintenance/completed':
                setValue('two');
                break;
            case '/maintenance/internal':
                setValue('three');
                break;
            default:
                setValue(false);
        }
        },[location.pathname]);
 


  return (
    <>
    <ThemeProvider theme={theme}>
      <Tabs 
        value={value}
        onChange={handleChange}
        textColor="secondary" 
        indicatorColor="secondary" 
        aria-label="secondary tabs example"
        sx={{
          marginTop: 2,
          marginLeft: 10,
          marginRight: 0
        }} >
        <Tab value="one" label="Requests" component={Link} to="/maintenance" />
        <Tab value="two" label="Completed" component={Link} to="/maintenance/completed" />
        <Tab value="three" label="Internal Maintenance" component={Link} to="/maintenance/internal" />
      </Tabs>
    </ThemeProvider>
    </>
  )
}

export default Minibar