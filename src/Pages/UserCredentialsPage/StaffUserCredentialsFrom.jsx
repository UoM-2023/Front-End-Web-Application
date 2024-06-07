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
import axios from "axios";

function StaffUserCredentialsFrom() {
  const { UserID } = useParams();

  const [formData, setFormData] = useState({
    UserID: "",
    userRole: "",
    userPassword: "",
    Confirmpassword: "",
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

    if (UserID) {
      // If there is an ID, it means we're editing existing data, so send a PUT request
      axios
        .put(
          `http://localhost:3001/staffDetails/addNewStaff/updateStaff/${[
            UserID,
          ]}`,
          formData
        )
        .then((res) => {
          console.log("Update successful:", res.data);
          setIsSubmit(true);
          //navigate("/staffDetails/addNewStaff");
        })
        .catch((err) => console.error("Failed to update data:", err));
    } else {
      // If there is no ID, it means we're creating new data, so send a POST request
      axios
        .post("http://localhost:3001/staffDetails/addNewStaff", formData)
        .then((res) => {
          console.log("Create Successful:", res.data);
          setIsSubmit(true);
          //navigate("/staffDetails/addNewStaff");
        })
        .catch((err) => console.error("Failed to Create data:", err));
    }

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

    if (!values.userRole) {
      errors.userRole = "Please select Staff Category *";
    }
    if (!values.UserID) {
      errors.UserID = "Please Enter Staff ID *";
    }
    if (!values.userPassword) {
      errors.userPassword = "Password is required *";
    } else if (values.userPassword.length < 8) {
      errors.userPassword = "Password must be more than 8 characters *";
    }
    if (!values.Confirmpassword) {
      errors.Confirmpassword = "Confirm your Password ";
    } else if (values.Confirmpassword != values.userPassword) {
      errors.Confirmpassword = "Passwords did not match *";
    }
    return errors;
  };

  return (
    <div className="StaffUserCredentialsFromContainer">
      <div className="FormContainer">
        <form className="MainForm" onSubmit={onSubmitHandler} method="get">
          <div className="inputItem">
            <InputLabel htmlFor="UserID" className="namesTag">
              Staff ID (UserID) :
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="textFieldComponent"
              name="UserID"
              onChange={onChangeHandler}
              value={formData.UserID}
            />
          </div>
          <p>{formErrors.UserID}</p>

          <div className="inputItem">
            <InputLabel className="namesTag">Staff Category:</InputLabel>
            <Select
              className="SelectformComponent"
              name="userRole"
              onChange={onChangeHandler}
              value={formData.userRole}
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
          <p>{formErrors.userRole}</p>

          <div className="Password">
            <InputLabel htmlFor="userPassword" className="namesTag">
              Password :
            </InputLabel>
            <TextField
              id="outlined-basic"
              type="password"
              className="textFieldComponent"
              name="userPassword"
              onChange={onChangeHandler}
              value={formData.userPassword}
            />
          </div>
          <p>{formErrors.userPassword}</p>

          <div className="ConfirmuserPassword">
            <InputLabel htmlFor="Confirmpassword" className="namesTag">
              Confirm userPassword :
            </InputLabel>
            <TextField
              id="outlined-basic"
              type="password"
              className="textFieldComponent"
              name="Confirmpassword"
              onChange={onChangeHandler}
              value={formData.Confirmpassword}
            />
          </div>
          <p>{formErrors.Confirmpassword}</p>

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
