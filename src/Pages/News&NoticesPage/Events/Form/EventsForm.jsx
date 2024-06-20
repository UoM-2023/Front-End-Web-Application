import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../../Component/Buttons/SaveButton";
import BackButton from "../../../../Component/Buttons/BackButton";
import "./EventsForm.css"; 
import TopBar from "../../../../Component/TopBar/TopBar";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function EventsForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    event: "",
    place: "",
    sDate: "",
    eDate: "",
    description: "",
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
    axios.post('http://localhost:3001/newsNotices/newEvent', formData)
    .then(res => {
      console.log(res);
      navigate('/eventsTable')
    })
    .catch(err => console.log(err));
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
    if (!values.description) {
      errors.description = "Please Add Description *";
    }
    return errors;
  };

  return (
    <>
    <TopBar title="News & Notices" /> 
    <div className="FormContainer">
      <form className="MainForm" onSubmit={onSubmitHandler} method="get">
      <div className="inputItem">
          <InputLabel htmlFor="event" className="namesTag">
            Event :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="event"
            onChange={onChangeHandler}
            value={formData.event}
          />
        </div>
        <p>{formErrors.event}</p>


        <div className="inputItem">
          <InputLabel className="namesTag">Venue :</InputLabel>
          <Select
            className="SelectformComponent"
            name="place"
            onChange={onChangeHandler}
            value={formData.place}
          >
            <MenuItem value="" className="optionContainer">
              Select Venue
            </MenuItem>
            <MenuItem value="eventhall" name="eventhall" className="optionContainer">
              Event Hall
            </MenuItem>
            <MenuItem value="garden" name="dargen" className="optionContainer">
              Garden
            </MenuItem>
            <MenuItem value="playarea" name="playarea" className="optionContainer">
              Play Area
            </MenuItem>
            <MenuItem value="rooftop" name="rooftop" className="optionContainer">
              Roof Top
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

        <div className="inputItem">
          <InputLabel htmlFor="description" className="namesTag">
            Description :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="description"
            onChange={onChangeHandler}
            value={formData.description}
          />
        </div>
        <p>{formErrors.description}</p>



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
    </>
  );
}

export default EventsForm;
