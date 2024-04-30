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


const MiniNavBar = () => {
  const location = useLocation();
  const [value, setValue] = useState('one');

  useEffect(()=>{
    switch(location.pathname){
      case '/news & notices':
        setValue('one');
        break;
      case '/eventsTable':
          setValue('two');
          break;
      default:
          setValue(false);
    }
  },[location.pathname]);

  const handleChange = (event,newValue)=>{
    setValue(newValue);
  };
 

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
        <Tab value="one" label="Notices" component={Link} to="/news & notices" />
        <Tab value="two" label="Events" component={Link} to="/eventsTable" />
      </Tabs>
    </ThemeProvider>
    </>
  )
}

export default MiniNavBar