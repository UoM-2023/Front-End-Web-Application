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

function ResidentInfoAddNew() {
  const [formData, setFormData] = useState({
    building: "",
    block: "",
    unitCategory: "",
    unit: "",
    fName: "",
    mName: "",
    lName: "",
    gender: "",
    dob: Date,
    nic: "",
    memberType: "",
    email: "",
    mobileNo: "",
    address: "",
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

    if (!values.building) {
      errors.building = "Please select Building * ";
    }
    if (!values.block) {
      errors.block = "Please select Block Number * ";
    }
    if (!values.unitCategory) {
      errors.unitCategory = "Please select Unit Category *";
    }
    if (!values.unit) {
      errors.unit = "Please select Unit Number *";
    }
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
    if (!values.memberType) {
      errors.memberType = "Please select Member Type *";
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
    if (!values.username) {
      errors.username = "UserName is required *";
    }
    if (!values.password) {
      errors.password = "Password is required *";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    }
    if (!values.img) {
      errors.img = "Please Upload Resident's Image file *";
    }
    return errors;
  };
  return (
    <div className="FormContainer">
      <form className="MainForm" onSubmit={onSubmitHandler} method="get">
        <div className="inputItem">
          <InputLabel className="namesTag">Building :</InputLabel>
          <Select
            className="SelectformComponent"
            name="building"
            onChange={onChangeHandler}
            value={formData.building}
          >
            <MenuItem value="" className="optionContainer">
              Select Building
            </MenuItem>
            <MenuItem
              value="Wing 01"
              name="Wing 01"
              className="optionContainer"
            >
              Wing 01
            </MenuItem>
            <MenuItem
              value="Wing 02"
              name="Wing 02"
              className="optionContainer"
            >
              Wing 02
            </MenuItem>
            <MenuItem
              value="Wing 03"
              name="Wing 03"
              className="optionContainer"
            >
              Wing 03
            </MenuItem>
            <MenuItem
              value="Block 04"
              name="Block 04"
              className="optionContainer"
            >
              Block 04
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.building}</p>

        <div className="inputItem">
          <InputLabel className="namesTag">Block :</InputLabel>
          <Select
            className="SelectformComponent"
            name="block"
            onChange={onChangeHandler}
            value={formData.block}
          >
            <MenuItem value="" className="optionContainer">
              Select Block
            </MenuItem>
            <MenuItem
              value="Block 01"
              name="Block 01"
              className="optionContainer"
            >
              Block 01
            </MenuItem>
            <MenuItem
              value="Block 02"
              name="Block 02"
              className="optionContainer"
            >
              Block 02
            </MenuItem>
            <MenuItem
              value="Block 03"
              name="Block 03"
              className="optionContainer"
            >
              Block 03
            </MenuItem>
            <MenuItem
              value="Wing 04"
              name="Wing 04"
              className="optionContainer"
            >
              Wing 04
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.block}</p>

        <div className="inputItem">
          <InputLabel className="namesTag">Unit Category :</InputLabel>
          <Select
            className="SelectformComponent"
            name="unitCategory"
            onChange={onChangeHandler}
            value={formData.unitCategory}
          >
            <MenuItem value="" className="optionContainer">
              Select Unit Category
            </MenuItem>
            <MenuItem
              value="Bed Room 01"
              name="Bed Room 01"
              className="optionContainer"
            >
              Bed Room 01
            </MenuItem>
            <MenuItem
              value="Bed Room 02"
              name="Bed Room 02"
              className="optionContainer"
            >
              Bed Room 02
            </MenuItem>
            <MenuItem
              value="Bed Room 03"
              name="Bed Room 03"
              className="optionContainer"
            >
              Bed Room 03
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.unitCategory}</p>

        <div className="inputItem">
          <InputLabel className="namesTag">Unit :</InputLabel>
          <Select
            className="SelectformComponent"
            name="unit"
            onChange={onChangeHandler}
            value={formData.unit}
          >
            <MenuItem value="" className="optionContainer">
              Select Unit Number
            </MenuItem>
            <MenuItem
              value="Unit 01"
              name="Unit 01"
              className="optionContainer"
            >
              Unit 01
            </MenuItem>
            <MenuItem
              value="Unit 02"
              name="Unit 02"
              className="optionContainer"
            >
              Unit 02
            </MenuItem>
            <MenuItem
              value="Unit 03"
              name="Unit 03"
              className="optionContainer"
            >
              Unit 03
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.unit}</p>

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
          <InputLabel className="namesTag">Member Type :</InputLabel>
          <Select
            className="SelectformComponent"
            name="memberType"
            onChange={onChangeHandler}
            value={formData.memberType}
          >
            <MenuItem value="" className="optionContainer">
              Select Member Type
            </MenuItem>
            <MenuItem value="Owner" name="Owner" className="optionContainer">
              Owner
            </MenuItem>
            <MenuItem
              value="Member01"
              name="Member01"
              className="optionContainer"
            >
              Member 01
            </MenuItem>
            <MenuItem
              value="Member02"
              name="Member02"
              className="optionContainer"
            >
              Member 02
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.memberType}</p>

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
export default ResidentInfoAddNew;
