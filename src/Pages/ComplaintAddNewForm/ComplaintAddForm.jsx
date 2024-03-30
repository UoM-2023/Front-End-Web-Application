import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../Component/Buttons/SaveButton";
import BackButton from "../../Component/Buttons/BackButton";
//import "./FormDesigns.css";
// import "../../Component/Forms/FormDesigns.css";

function ComplaintAddForm() {
  const [formData, setFormData] = useState({
    complaintNature: "",
    complaintTitle: "",
    complaintBy: "",
    date: "",
    description: "",
    status: "",
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

    if (!values.complaintNature) {
      errors.complaintNature = "Please Select Complaint Nature *";
    }
    if (!values.complaintTitle) {
      errors.complaintTitle = "Please Enter Complaint Title *";
    }
    if (!values.complaintBy) {
      errors.complaintBy = "Please Enter Complaint By Name *";
    }
    if (!values.date) {
      errors.date = "Date is required *";
    }
    if (!values.description) {
      errors.description = "Please Enter Description *";
    }
    if (!values.status) {
      errors.status = "Please Select Status *";
    }
    return errors;
  };

  return (
    <div className="FormContainer">
      <form className="MainForm" onSubmit={onSubmitHandler} method="get">
        <div className="inputItem">
          <InputLabel className="namesTag">Complaint Nature :</InputLabel>
          <Select
            className="SelectformComponent"
            name="complaintNature"
            onChange={onChangeHandler}
            value={formData.complaintNature}
          >
            <MenuItem value="" className="optionContainer">
              Select Complaint Nature
            </MenuItem>
            <MenuItem
              value="complaint"
              name="complaint"
              className="optionContainer"
            >
              Complaint
            </MenuItem>
            <MenuItem
              value="suggestions"
              name="suggestions"
              className="optionContainer"
            >
              Suggestions
            </MenuItem>
            <MenuItem
              value="request"
              name="request"
              className="optionContainer"
            >
              Request
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.complaintNature}</p>

        <div className="inputItem">
          <InputLabel htmlFor="complaintTitle" className="namesTag">
            Complaint Title :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="complaintTitle"
            onChange={onChangeHandler}
            value={formData.complaintTitle}
          />
        </div>
        <p>{formErrors.complaintTitle}</p>

        <div className="inputItem">
          <InputLabel htmlFor="complaintBy" className="namesTag">
            Complaint By :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="complaintBy"
            onChange={onChangeHandler}
            value={formData.complaintBy}
          />
        </div>
        <p>{formErrors.complaintBy}</p>

        <div className="inputItem">
          <InputLabel htmlFor="date" className="namesTag">
            Date :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="date"
            className="textFieldComponent"
            name="date"
            onChange={onChangeHandler}
            value={formData.date}
          />
        </div>
        <p>{formErrors.date}</p>

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

        <div className="inputItem">
          <InputLabel className="namesTag">Status :</InputLabel>
          <Select
            className="SelectformComponent"
            name="status"
            onChange={onChangeHandler}
            value={formData.status}
          >
            <MenuItem value="" className="optionContainer">
              Select Complaint Status
            </MenuItem>
            <MenuItem value="open" name="open" className="optionContainer">
              Open
            </MenuItem>
            <MenuItem
              value="pending"
              name="pending"
              className="optionContainer"
            >
              Pending
            </MenuItem>
            <MenuItem value="close" name="close" className="optionContainer">
              Close
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.status}</p>

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

export default ComplaintAddForm;
