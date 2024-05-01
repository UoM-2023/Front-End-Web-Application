import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import './guest.css';

import SaveButton from '../../Component/Buttons/SaveButton';
import BackButton from '../../Component/Buttons/BackButton';
import MiniDrawer from '../../Component/SideBar/MiniDrawer';
import TopBar from '../../Component/TopBar/TopBar';
import { useState } from 'react';




const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
});

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    width: '40rem',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const RedditTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: '#E0E3E7',
    borderWidth: 1,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 1,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 4,
    padding: '4px !important', // override inline-style
  },
});


export default function Guest() {


  const [unit, setUnit] = useState('');
  const [unitError, setUnitError] = useState('');

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const validateUnit = () => {
    if (unit.trim() === '') {
      setUnitError('Unit field cannot be empty');
      return false;
    }
    setUnitError('');
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateUnit()) {
      // Proceed with form submission or further validation
      console.log('Form submitted');
    } else {
      console.log('Form validation failed');
    }
  };




  return (

    <Box
      component="form"
      noValidate
      sx={{
        display: 'grid',
        gridTemplateColumns: { sm: '1fr 1fr' },
        gap: 2,
      }}
    >


      <FormControl variant="standard">

        <InputLabel shrink htmlFor="bootstrap-input">
        </InputLabel>


        <div className="allformItems"><div className='formItems'>
          <div className="formTitles ">Unit</div>
          <div className='wrap'>
            <BootstrapInput className='ABC' defaultValue="Type here" id="bootstrap-input" />
            <InputLabel className='ABC' shrink htmlFor="bootstrap-input">
            </InputLabel>

          </div>
        </div>





          <div className='formItems'>
            <div className="formTitles "> Resident Name</div>
            <div>
              <BootstrapInput defaultValue="Type here" id="bootstrap-input" />
              <InputLabel shrink htmlFor="bootstrap-input">
              </InputLabel>
            </div>
          </div>

          <div className='formItems'>
            <div className="formTitles ">Guest Name </div>
            <div><BootstrapInput defaultValue="Type here" id="bootstrap-input" />
              <InputLabel shrink htmlFor="bootstrap-input">
              </InputLabel></div>
          </div>


          <div className='formItems'>
            <div className="formTitles "> Vehicle No  </div>
            <div>
              <BootstrapInput defaultValue="Type here" id="bootstrap-input" />
              <InputLabel shrink htmlFor="bootstrap-input">
              </InputLabel>
            </div>
          </div>

          <div className='formItems'>
            <div className="formTitles "> Date  </div>
            <div>
              <BootstrapInput defaultValue="Type here" id="bootstrap-input" />
              <InputLabel shrink htmlFor="bootstrap-input">
              </InputLabel>

            </div>

          </div>

          <div className="button">
            <span className="SaveButton">
              <SaveButton />
            </span>
            <span className="BackButton">
              <BackButton />
            </span>
          </div>
        </div>


        {/* div */}




      </FormControl>


    </Box>


  );
}

