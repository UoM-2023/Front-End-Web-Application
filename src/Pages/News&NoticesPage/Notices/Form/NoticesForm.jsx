import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../../Component/Buttons/SaveButton";
import BackButton from "../../../../Component/Buttons/BackButton";
import "./NoticesForm.css"; 


function NoticesForm() {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
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

    if (!values.type) {
      errors.type = "Please select Notice Type * ";
    }
    if (!values.title) {
      errors.title = "Please Enter Notice Title *";
    }
    if (!values.sDate) {
      errors.sDate = "Please Enter Start Date *";
    }
    if (!values.eDate) {
      errors.eDate = "Please Enter End Date *";
    }
    if (!values.description) {
      errors.description = "Please Enter Description *";
    }
    return errors;
  };

  return (
    <div className="FormContainer">
      <form className="MainForm" onSubmit={onSubmitHandler} method="get">
        <div className="inputItem">
          <InputLabel className="namesTag">Notice Type :</InputLabel>
          <Select
            className="SelectformComponent"
            name="type"
            onChange={onChangeHandler}
            value={formData.type}
          >
            <MenuItem value="" className="optionContainer">
              Select Notice Type
            </MenuItem>
            <MenuItem value="proposal" name="proposal" className="optionContainer">
              Proposal
            </MenuItem>
            <MenuItem value="announcement" name="announcement" className="optionContainer">
              Announcement
            </MenuItem>
            <MenuItem value="other" name="other" className="optionContainer">
              Other
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.type}</p>

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
  );
}

export default NoticesForm;
