import { Tab, Tabs, ThemeProvider, createTheme } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const theme = createTheme({
  palette: {
    secondary: {
      main: '#E87042',  
    },
  },
});


const Minibar = () => {
  const [value, setValue] = useState('one');
  const handleChange = (event,newValue)=>{
    setValue(newValue);
  };


  return (
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
        <Tab value="four" label="Warnings" component={Link} to="/finance/warnings" />
        <Tab value="five" label="Edit Funds" component={Link} to="/finance/fundtypes" />
      </Tabs>
    </ThemeProvider>
  )
}

export default Minibar