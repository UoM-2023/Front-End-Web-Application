import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
//import "./FormDesigns.css";
// import "../../Component/Forms/FormDesigns.css";
import "./Addnewform.css";

function StaffDetailsAddNewForm() {
  const [formData, setFormData] = useState({
    fName: "",
    mName: "",
    lName: "",
    gender: "",
    dob: "",
    nic: "",
    staffCategory: "",
    qualifications: "",
    staffID: "",
    email: "",
    mobileNo: "",
    address: "",
    city: "",
    username: "",
    password: "",
    img: "",
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
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const nic_regex = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/m;
    const mobileno_regex = /^(?:\+94|0)([1-9][0-9]{8})$/;
    const dob_regex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if (!values.fName) {
      errors.fName = "Please Enter First Name *";
    }
    if (!values.mName) {
      errors.mName = "Please Enter Middle Name *";
    }
    if (!values.lName) {
      errors.lName = "Please Enter Last Name *";
    }
    if (!values.gender) {
      errors.gender = "Please select Gender *";
    }
    if (!values.dob && values.dob) {
      errors.dob = "Please Enter Date of birth *";
    } else if (!dob_regex.test(values.dob)) {
      errors.dob = "Enter a valid Date of Birth";
    }
    if (!values.nic) {
      errors.nic = "NIC is required *";
    } else if (!nic_regex.test(values.nic)) {
      errors.nic = "Enter a valid NIC";
    }
    if (!values.staffCategory) {
      errors.staffCategory = "Please select Staff Category *";
    }
    if (!values.staffID) {
      errors.staffID = "Please Enter Staff ID *";
    }
    if (!values.email) {
      errors.email = "Email is required *";
    } else if (!email_regex.test(values.email)) {
      errors.email = "Enter a valid email";
    }
    if (!values.mobileNo) {
      errors.mobileNo = "Mobile Number is required *";
    } else if (!mobileno_regex.test(values.mobileNo)) {
      errors.mobileNo = "Enter a valid Mobile Number";
    }
    if (!values.address) {
      errors.address = "Address is required *";
    }
    if (!values.city) {
      errors.city = "City is required *";
    }
    if (!values.username) {
      errors.username = "UserName is required *";
    }
    if (!values.password) {
      errors.password = "Password is required *";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    }
    if (!values.img) {
      errors.img = "Please Upload Staff Member's Image file *";
    }
    return errors;
  };

  return (
    <div className="FormContainer">
      <form className="MainForm" onSubmit={onSubmitHandler} method="get">
        <div className="inputItem">
          <InputLabel htmlFor="firstName" className="namesTag">
            First Name :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="fName"
            onChange={onChangeHandler}
            value={formData.fName}
          />
        </div>
        <p>{formErrors.fName}</p>

        <div className="inputItem">
          <InputLabel htmlFor="middleName" className="namesTag">
            Middle Name :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="mName"
            onChange={onChangeHandler}
            value={formData.mName}
          />
        </div>
        <p>{formErrors.mName}</p>

        <div className="inputItem">
          <InputLabel htmlFor="email" className="namesTag">
            Last Name :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="lName"
            onChange={onChangeHandler}
            value={formData.lName}
          />
        </div>
        <p>{formErrors.lName}</p>

        <div className="input-item">
          <FormControl>
            <FormLabel id="demo-form-control-label-placement">
              Gender :
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="gender"
              onChange={onChangeHandler}
              value={formData.gender}
            >
              <FormControlLabel
                value="Male"
                name="gender"
                control={<Radio />}
                label="Male"
              />
              <FormControlLabel
                value="Female"
                name="gender"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <p>{formErrors.gender}</p>

        <div className="inputItem">
          <InputLabel htmlFor="DateOfBirth" className="namesTag">
            Date Of Birth :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="date"
            className="textFieldComponent"
            name="dob"
            onChange={onChangeHandler}
            value={formData.dob}
          />
        </div>
        <p>{formErrors.dob}</p>

        <div className="inputItem">
          <InputLabel htmlFor="nic" className="namesTag">
            NIC :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="nic"
            onChange={onChangeHandler}
            value={formData.nic}
          />
        </div>
        <p>{formErrors.nic}</p>

        <div className="inputItem">
          <InputLabel className="namesTag">Staff Category:</InputLabel>
          <Select
            className="SelectformComponent"
            name="staffCategory"
            onChange={onChangeHandler}
            value={formData.staffCategory}
          >
            <MenuItem value="" className="optionContainer">
              Select Staff Category
            </MenuItem>
            <MenuItem value="Admin" name="Admin" className="optionContainer">
              Admin
            </MenuItem>
            <MenuItem
              value="financeManager"
              name="financeManager"
              className="optionContainer"
            >
              Finance Manager
            </MenuItem>
            <MenuItem
              value="securityOfficer"
              name="securityOfficer"
              className="optionContainer"
            >
              Security Officer
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.staffCategory}</p>

        <div className="inputItem">
          <InputLabel htmlFor="staffID" className="namesTag">
            Staff ID :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="staffID"
            onChange={onChangeHandler}
            value={formData.staffID}
          />
        </div>
        <p>{formErrors.staffID}</p>

        <div className="inputItem">
          <InputLabel htmlFor="qualifications" className="namesTag">
            Qualification :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="qualifications"
            onChange={onChangeHandler}
            value={formData.qualifications}
          />
        </div>
        <p>{formErrors.qualifications}</p>

        <div className="email">
          <InputLabel htmlFor="email" className="namesTag">
            E-mail :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="email"
            onChange={onChangeHandler}
            value={formData.email}
          />
        </div>
        <p>{formErrors.email}</p>

        <div className="mobileNo">
          <InputLabel htmlFor="mobileNo" className="namesTag">
            Mobile Number :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="mobileNo"
            onChange={onChangeHandler}
            value={formData.mobileNo}
          />
        </div>
        <p>{formErrors.mobileNo}</p>

        <div className="address">
          <InputLabel htmlFor="address" className="namesTag">
            Address :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="address"
            onChange={onChangeHandler}
            value={formData.address}
          />
        </div>
        <p>{formErrors.address}</p>

        <div className="address">
          <InputLabel htmlFor="city" className="namesTag">
            City :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="city"
            onChange={onChangeHandler}
            value={formData.city}
          />
        </div>
        <p>{formErrors.city}</p>

        <div className="username">
          <InputLabel htmlFor="username" className="namesTag">
            User Name :
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

        <div className="img">
          <InputLabel htmlFor="img" className="namesTag">
            Select Image :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="file"
            className="textFieldComponent"
            name="img"
            onChange={onChangeHandler}
            value={formData.img}
            accept="image/*"
          />
        </div>
        <p>{formErrors.img}</p>

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
export default StaffDetailsAddNewForm;
