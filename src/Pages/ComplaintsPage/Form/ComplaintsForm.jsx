import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
import "./ComplaintsForm.css";
// import "../../Component/Forms/FormDesigns.css";

function ComplaintsForm() {
  const [formData, setFormData] = useState({
    nature: "",
    title: "",
    by: "",
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

    if (!values.nature) {
        errors.nature = "Please select Complaint Nature * ";
      }
      if (!values.title) {
        errors.title = "Please enter Complaint Title *";
      }
      if (!values.by) {
        errors.by = "Please Enter Complainer Name*";
      }
      if (!values.description) {
        errors.description = "Please enter Description *";
      }
      if (!values.status) {
        errors.status = "Please select Status * ";
      }
    return errors;
  };

  return (
    <div className="FormContainer">
      <form className="MainForm" onSubmit={onSubmitHandler} method="get">

        <div className="inputItem">
          <InputLabel className="namesTag">Complaints Nature :</InputLabel>
          <Select
            className="SelectformComponent"
            name="nature"
            onChange={onChangeHandler}
            value={formData.nature}
            >
            <MenuItem value="" className="optionContainer">
              Select Complaint 
            </MenuItem>
            <MenuItem value="complaint" name="complaint" className="optionContainer">
              Complaint
            </MenuItem>
            <MenuItem value="suggestions" name="suggestions" className="optionContainer">
              Suggestions
            </MenuItem>
            <MenuItem value="requests" name="requests" className="optionContainer">
              Requests
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.nature}</p>

        <div className="inputItem">
          <InputLabel htmlFor="title" className="title">
            Complaint Title :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="title"
            onChange={onChangeHandler}
            value={formData.title}
          />
        </div>
        <p>{formErrors.title}</p>

        <div className="inputItem">
          <InputLabel htmlFor="by" className="by">
            Complained By :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="by"
            onChange={onChangeHandler}
            value={formData.by}
          />
        </div>
        <p>{formErrors.by}</p>

        <div className="inputItem">
          <InputLabel htmlFor="description" className="description">
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

        <div className="inputItem">
          <InputLabel className="namesTag">Status :</InputLabel>
          <Select
            className="SelectformComponent"
            name="status"
            onChange={onChangeHandler}
            value={formData.status}
            >
            <MenuItem value="" className="optionContainer">
              Select Status 
            </MenuItem>
            <MenuItem value="open" name="open" className="optionContainer">
              Open
            </MenuItem>
            <MenuItem value="closed" name="closed" className="optionContainer">
              Closed
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
export default ComplaintsForm;
