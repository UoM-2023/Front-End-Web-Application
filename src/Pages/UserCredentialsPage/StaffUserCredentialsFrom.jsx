import React from "react";
import { useState, useEffect } from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import CreateAccButton from "../../Component/Buttons/CreateAccButton";
import CancelButton from "../../Component/Buttons/CancelButton";
import { useNavigate, useParams } from "react-router-dom";

function StaffUserCredentialsFrom() {
  const [formData, setFormData] = useState({
    staff_category: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // const navigate = useNavigate();

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
      console.log(formData.dob);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.staff_category) {
      errors.staff_category = "Please select Staff Category *";
    }
    if (!values.username) {
      errors.username = "Please Enter Staff ID *";
    }
    if (!values.password) {
      errors.password = "Password is required *";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters *";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm your Password ";
    } else if (values.confirmPassword != values.password) {
      errors.confirmPassword = "Passwords did not match *";
    }
    return errors;
  };

  return (
    <div className="StaffUserCredentialsFromContainer">
      <div className="FormContainer">
        <form className="MainForm" onSubmit={onSubmitHandler} method="get">
          <div className="inputItem">
            <InputLabel htmlFor="staffID" className="namesTag">
              Staff ID (Username) :
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="textFieldComponent"
              name="username"
              onChange={onChangeHandler}
              value={formData.username}
            />
          </div>
          <p>{formErrors.username}</p>

          <div className="inputItem">
            <InputLabel className="namesTag">Staff Category:</InputLabel>
            <Select
              className="SelectformComponent"
              name="staff_category"
              onChange={onChangeHandler}
              value={formData.staff_category}
            >
              <MenuItem value="" className="optionContainer">
                Select Staff Category
              </MenuItem>
              <MenuItem value="Admin" name="Admin" className="optionContainer">
                Admin
              </MenuItem>
              <MenuItem
                value="Finance Manager"
                name="financeManager"
                className="optionContainer"
              >
                Finance Manager
              </MenuItem>
              <MenuItem
                value="Security Officer"
                name="securityOfficer"
                className="optionContainer"
              >
                Security Officer
              </MenuItem>
            </Select>
          </div>
          <p>{formErrors.staff_category}</p>

          <div className="password">
            <InputLabel htmlFor="password" className="namesTag">
              Password :
            </InputLabel>
            <TextField
              id="outlined-basic"
              type="password"
              className="textFieldComponent"
              name="password"
              onChange={onChangeHandler}
              value={formData.password}
            />
          </div>
          <p>{formErrors.password}</p>

          <div className="Confirmpassword">
            <InputLabel htmlFor="Confirmpassword" className="namesTag">
              Confirm Password :
            </InputLabel>
            <TextField
              id="outlined-basic"
              type="password"
              className="textFieldComponent"
              name="confirmPassword"
              onChange={onChangeHandler}
              value={formData.confirmPassword}
            />
          </div>
          <p>{formErrors.confirmPassword}</p>

          <div className="buttonSection">
            <Grid container spacing={2}>
              <Grid item>
                <div>
                  <CreateAccButton />
                </div>
              </Grid>
              <Grid item>
                <CancelButton />
              </Grid>
            </Grid>
          </div>
        </form>
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <h3 className="success message">
            Staff Account created successfully
          </h3>
        ) : (
          <pre> </pre>
        )}
      </div>
    </div>
  );
}

export default StaffUserCredentialsFrom;
