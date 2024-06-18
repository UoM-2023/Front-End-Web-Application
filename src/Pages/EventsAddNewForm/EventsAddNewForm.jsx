import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../Component/Buttons/SaveButton";
import BackButton from "../../Component/Buttons/BackButton";
//import "./FormDesigns.css";
// import "../../Component/Forms/FormDesigns.css";

function EventsAddNewForm() {
  const [formData, setFormData] = useState({
    event: "",
    place: "",
    startDate: "",
    endDate: "",
    description: "",
    startTime: "",
    endTime: "",
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
      errors.event = "Please Enter Event Name *";
    }
    if (!values.place) {
      errors.place = "Please Enter Event Place *";
    }
    if (!values.startDate) {
      errors.startDate = "Please Enter Start Date *";
    }
    if (!values.endDate) {
      errors.endDate = "Please Enter End Date *";
    }
    if (!values.description) {
      errors.description = "Please Enter Description *";
    }
    if (!values.startTime) {
      errors.startTime = "Please Enter Start Time *";
    }
    if (!values.endTime) {
      errors.endTime = "Please Enter End Time *";
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
            name="event"
            onChange={onChangeHandler}
            value={formData.event}
          />
        </div>
        <p>{formErrors.event}</p>

        <div className="inputItem">
          <InputLabel htmlFor="place" className="namesTag">
            Place :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="place"
            onChange={onChangeHandler}
            value={formData.place}
          />
        </div>
        <p>{formErrors.place}</p>

        <div className="inputItem">
          <InputLabel htmlFor="startDate" className="namesTag">
            Start Date :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="date"
            className="textFieldComponent"
            name="startDate"
            onChange={onChangeHandler}
            value={formData.startDate}
          />
        </div>
        <p>{formErrors.startDate}</p>

        <div className="inputItem">
          <InputLabel htmlFor="endDate" className="namesTag">
            End Date :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="date"
            className="textFieldComponent"
            name="endDate"
            onChange={onChangeHandler}
            value={formData.endDate}
          />
        </div>
        <p>{formErrors.endDate}</p>

        <div className="inputItem">
          <InputLabel htmlFor="startTime" className="namesTag">
            Start Time :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="time"
            className="textFieldComponent"
            name="startTime"
            onChange={onChangeHandler}
            value={formData.startTime}
          />
        </div>
        <p>{formErrors.startTime}</p>

        <div className="inputItem">
          <InputLabel htmlFor="endTime" className="namesTag">
            End Time :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="time"
            className="textFieldComponent"
            name="endTime"
            onChange={onChangeHandler}
            value={formData.endTime}
          />
        </div>
        <p>{formErrors.endTime}</p>

        <div className="inputItem">
          <InputLabel htmlFor="description" className="namesTag">
            Description :
          </InputLabel>
          <TextField
            type="textarea"
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
  );
}

export default EventsAddNewForm;
