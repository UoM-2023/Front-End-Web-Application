import { useState, useEffect } from "react";
import { TextField, Button, Radio, RadioGroup, FormControlLabel, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
// import "./AddStaff.css";

function TestForm() {
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
    console.log(event);
    setFormData(() => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.table(formData);
    setFormErrors(validate(formData));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formData);
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
    <div className="AddStaffContainer">
      <form className="MainForm" onSubmit={onSubmitHandler}>
        <div className="inputItems">
          <TextField
            label="First Name"
            className="inputBox"
            name="fName"
            onChange={onChangeHandler}
            value={formData.fName}
          />
          <p>{formErrors.fName}</p>
        </div>

        <div className="inputItems">
          <TextField
            label="Middle Name"
            className="inputBox"
            name="mName"
            onChange={onChangeHandler}
            value={formData.mName}
          />
          <p>{formErrors.mName}</p>
        </div>

        <div className="inputItems">
          <TextField
            label="Last Name"
            className="inputBox"
            name="lName"
            onChange={onChangeHandler}
            value={formData.lName}
          />
          <p>{formErrors.lName}</p>
        </div>

        <div className="inputItems">
          <FormControl component="fieldset">
            <InputLabel>Gender</InputLabel>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={onChangeHandler}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
          <p>{formErrors.gender}</p>
        </div>

        <div className="inputItems">
          <TextField
            label="Date Of Birth"
            className="inputBox"
            type="date"
            name="dob"
            onChange={onChangeHandler}
            value={formData.dob}
          />
          <p>{formErrors.dob}</p>
        </div>

        <div className="inputItems">
          <TextField
            label="NIC"
            className="inputBox"
            name="nic"
            onChange={onChangeHandler}
            value={formData.nic}
          />
          <p>{formErrors.nic}</p>
        </div>

        <div className="inputItems">
          <FormControl>
            <InputLabel>Staff Category</InputLabel>
            <Select
              className="selectItems"
              name="staffCategory"
              onChange={onChangeHandler}
              value={formData.staffCategory}
            >
              <MenuItem value="" disabled>
                Select Staff Category
              </MenuItem>
              <MenuItem value="Owner">Owner</MenuItem>
              <MenuItem value="Member 01">Member 01</MenuItem>
              <MenuItem value="Member 02">Member 02</MenuItem>
              <MenuItem value="Member 03">Member 03</MenuItem>
            </Select>
          </FormControl>
          <p>{formErrors.staffCategory}</p>
        </div>

        <div className="inputItems">
          <TextField
            label="Staff ID"
            className="inputBox"
            name="staffID"
            onChange={onChangeHandler}
            value={formData.staffID}
          />
          <p>{formErrors.staffID}</p>
        </div>

        <div className="inputItems">
          <TextField
            label="Qualification"
            className="inputBox"
            name="qualifications"
            onChange={onChangeHandler}
            value={formData.qualifications}
          />
        </div>

        <div className="inputItems">
          <TextField
            label="E-mail"
            className="inputBox"
            name="email"
            onChange={onChangeHandler}
            value={formData.email}
          />
          <p>{formErrors.email}</p>
        </div>

        <div className="inputItems">
          <TextField
            label="Mobile Number"
            className="inputBox"
            name="mobileNo"
            onChange={onChangeHandler}
            value={formData.mobileNo}
          />
          <p>{formErrors.mobileNo}</p>
        </div>

        <div className="inputItems">
          <TextField
            label="Address"
            className="inputBox"
            name="address"
            onChange={onChangeHandler}
            value={formData.address}
          />
          <p>{formErrors.address}</p>
        </div>

        <div className="inputItems">
          <TextField
            label="City"
            className="inputBox"
            name="city"
            onChange={onChangeHandler}
            value={formData.city}
          />
          <p>{formErrors.city}</p>
        </div>

        <div className="inputItems">
          <TextField
            label="User Name"
            className="inputBox"
            name="username"
            onChange={onChangeHandler}
            value={formData.username}
          />
          <p>{formErrors.username}</p>
        </div>

        <div className="inputItems">
          <TextField
            label="Password"
            className="inputBox"
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={formData.password}
          />
          <p>{formErrors.password}</p>
        </div>

        <div className="inputItems">
          <TextField
            label="Select Image"
            className="inputBox"
            type="file"
            name="img"
            onChange={onChangeHandler}
            value={formData.img}
          />
          <p>{formErrors.img}</p>
        </div>

        <div className="submitBtn">
          <Button variant="contained" color="primary" type="submit">
            Add New Staff Member
          </Button>
        </div>
      </form>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <h3 className="success message">Successfully Added Staff Member </h3>
      ) : (
        <pre> </pre>
      )}
    </div>
  );
}

export default TestForm;
