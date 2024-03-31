import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../../Component/Buttons/SaveButton";
import BackButton from "../../../../Component/Buttons/BackButton";
import "./EventsForm.css"; 
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
// import dayjs from 'dayjs';


function EventsForm() {
  const [formData, setFormData] = useState({
    event: "",
    place: "",
    sDate: "",
    eDate: "",
    sTime: "",
    eTime: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const onChangeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.table(formData);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.event) {
      errors.event = "Please Enter Event * ";
    }
    if (!values.place) {
      errors.place = "Please Select Place *";
    }
    if (!values.sDate) {
      errors.sDate = "Please Enter Start Date *";
    }
    if (!values.eDate) {
      errors.eDate = "Please Enter End Date *";
    }
    if (!values.sTime) {
      errors.sTime = "Please Enter Start Time *";
    }
    if (!values.eTime) {
        errors.eTime = "Please Enter End Time *";
      }
    return errors;
  };

  return (
    <div className="FormContainer">
      <form className="MainForm" onSubmit={onSubmitHandler} method="get">
      <div className="inputItem">
          <InputLabel htmlFor="event" className="namesTag">
            Event :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="description"
            onChange={onChangeHandler}
            value={formData.event}
          />
        </div>
        <p>{formErrors.event}</p>


        <div className="inputItem">
          <InputLabel className="namesTag">Place :</InputLabel>
          <Select
            className="SelectformComponent"
            name="type"
            onChange={onChangeHandler}
            value={formData.place}
          >
            <MenuItem value="" className="optionContainer">
              Select Event Place
            </MenuItem>
            <MenuItem value="eventHall" name="eventHall" className="optionContainer">
              Event Hall
            </MenuItem>
            <MenuItem value="commonArea" name="commonArea" className="optionContainer">
              Common Area
            </MenuItem>
            <MenuItem value="park" name="park" className="optionContainer">
              Park
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.place}</p>

        <div className="inputItem">
          <InputLabel htmlFor="sDate" className="namesTag">
            Start Date :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="date"
            className="textFieldComponent"
            name="sDate"
            onChange={onChangeHandler}
            value={formData.sDate}
          />
        </div>
        <p>{formErrors.sDate}</p>

        <div className="inputItem">
          <InputLabel htmlFor="eDate" className="namesTag">
            End Date :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="date"
            className="textFieldComponent"
            name="eDate"
            onChange={onChangeHandler}
            value={formData.eDate}
          />
        </div>
        <p>{formErrors.eDate}</p>

       {/*} <div className="inputItem" name="sTime" style={{ color: '#808080' ,width:'22rem' }}>
  <InputLabel htmlFor="sTime" className="namesTag" style={{color:'black'}}>
            Start Time :
          </InputLabel>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'TimePicker',
          'MobileTimePicker',
          'DesktopTimePicker',
          'StaticTimePicker',
        ]}
      >
        <DemoItem>
          <DesktopTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
        </DemoItem>
        
      </DemoContainer>
    </LocalizationProvider>
    </div>
    <p>{formErrors.sTime}</p>*/}


        <div className="buttonSection">
          <Grid container spacing={2}>
            <Grid item>
              <div>
                <SaveButton />
              </div>
            </Grid>
            <Grid item>
              <BackButton />
            </Grid>
          </Grid>
        </div>
      </form>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <h3 className="success message">Successfully Added </h3>
      ) : (
        <pre> </pre>
      )}
    </div>
  );
}

export default EventsForm;
