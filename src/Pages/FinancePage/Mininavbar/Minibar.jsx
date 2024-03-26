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

  useEffect(()=>{
    switch(location.pathname){
      case '/finance':
        setValue('one');
        break;
      case '/finance/utilitycharges':
          setValue('two');
          break;
      case '/finance/expenses':
          setValue('three');
          break;
      case '/finance/revenue':
          setValue('four');
          break;
      case '/finance/warnings':
          setValue('five');
          break;
      case '/finance/editFunds':
          setValue('six');
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
        <Tab value="one" label="Resident Payments" component={Link} to="/finance" />
        <Tab value="two" label="Utility Charges" component={Link} to="/finance/utilitycharges" />
        <Tab value="three" label="Expenses" component={Link} to="/finance/expenses" />
        <Tab value="four" label="Revenue" component={Link} to="/finance/revenue" />
        <Tab value="five" label="Warnings" component={Link} to="/finance/warnings" />
        <Tab value="six" label="Edit Funds" component={Link} to="/finance/editFunds" />
      </Tabs>
    </ThemeProvider>
    </>
  )
}

export default Minibar