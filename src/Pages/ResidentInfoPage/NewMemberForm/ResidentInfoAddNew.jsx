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
import TopBar from "../../../Component/TopBar/TopBar";
import axios from "axios";
//import "./FormDesigns.css";
// import "../../Component/Forms/FormDesigns.css";

function ResidentInfoAddNew() {
  const [formData, setFormData] = useState({
    residentID: "",
    building: "",
    block_no: "",
    unit_category: "",
    unit_no: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    name_with_initials: "",
    gender: "",
    dob: Date,
    nic: "",
    member_type: "",
    email: "",
    mobile_no: "",
    Address: "",
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

      axios
        .post("http://localhost:3001/residentsDetails/addNewResident", formData)
        .then((response) => {
          // Handle successful response
          console.log("Response:", response.data);
        })
        .catch((error) => {
          // Handle error
          console.error("Error:", error);
        });
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const nic_regex = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/m;
    const mobile_no_regex = /^(?:\+94|0)([1-9][0-9]{8})$/;
    const dob_regex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if (!values.residentID) {
      errors.residentID = "Please Enter Resident ID * ";
    }
    if (!values.building) {
      errors.building = "Please select Building * ";
    }
    if (!values.block_no) {
      errors.block_no = "Please select Block Number * ";
    }
    if (!values.unit_category) {
      errors.unit_category = "Please select Unit Category *";
    }
    if (!values.unit_no) {
      errors.unit_no = "Please select Unit Number *";
    }
    if (!values.first_name) {
      errors.first_name = "Please Enter First Name *";
    }
    if (!values.middle_name) {
      errors.middle_name = "Please Enter Middle Name *";
    }
    if (!values.last_name) {
      errors.last_name = "Please Enter Last Name *";
    }
    if (!values.name_with_initials) {
      errors.name_with_initials = "Please Enter Name with Initials *";
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
    if (!values.member_type) {
      errors.member_type = "Please select Member Type *";
    }
    if (!values.email) {
      errors.email = "Email is required *";
    } else if (!email_regex.test(values.email)) {
      errors.email = "Enter a valid email";
    }
    if (!values.mobile_no) {
      errors.mobile_no = "Mobile Number is required *";
    } else if (!mobile_no_regex.test(values.mobile_no)) {
      errors.mobile_no = "Enter a valid Mobile Number";
    }
    if (!values.Address) {
      errors.Address = "Address is required *";
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
    <>
      <TopBar title="Residents Information" />
      <div className="FormContainer">
        <form className="MainForm" onSubmit={onSubmitHandler} method="get">
          <div className="inputItem">
            <InputLabel htmlFor="Resident ID" className="namesTag">
              Resident ID:
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="textFieldComponent"
              name="residentID"
              onChange={onChangeHandler}
              value={formData.residentID}
            />
          </div>
          <p>{formErrors.residentID}</p>

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
                value="Wing 04"
                name="Wing 04"
                className="optionContainer"
              >
                Wing 04
              </MenuItem>
            </Select>
          </div>
          <p>{formErrors.building}</p>

          <div className="inputItem">
            <InputLabel className="namesTag">Block :</InputLabel>
            <Select
              className="SelectformComponent"
              name="block_no"
              onChange={onChangeHandler}
              value={formData.block_no}
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
          <p>{formErrors.block_no}</p>

          <div className="inputItem">
            <InputLabel className="namesTag">Unit Category :</InputLabel>
            <Select
              className="SelectformComponent"
              name="unit_category"
              onChange={onChangeHandler}
              value={formData.unit_category}
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
          <p>{formErrors.unit_category}</p>

          <div className="inputItem">
            <InputLabel className="namesTag">Unit :</InputLabel>
            <Select
              className="SelectformComponent"
              name="unit_no"
              onChange={onChangeHandler}
              value={formData.unit_no}
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
          <p>{formErrors.unit_no}</p>

          <div className="inputItem">
            <InputLabel htmlFor="firstName" className="namesTag">
              First Name :
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="textFieldComponent"
              name="first_name"
              onChange={onChangeHandler}
              value={formData.first_name}
            />
          </div>
          <p>{formErrors.first_name}</p>

          <div className="inputItem">
            <InputLabel htmlFor="middleName" className="namesTag">
              Middle Name :
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="textFieldComponent"
              name="middle_name"
              onChange={onChangeHandler}
              value={formData.middle_name}
            />
          </div>
          <p>{formErrors.middle_name}</p>

          <div className="inputItem">
            <InputLabel htmlFor="Last Name" className="namesTag">
              Last Name :
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="textFieldComponent"
              name="last_name"
              onChange={onChangeHandler}
              value={formData.last_name}
            />
          </div>
          <p>{formErrors.last_name}</p>

          <div className="inputItem">
            <InputLabel htmlFor="name_with_initials" className="namesTag">
              Name with Initials :
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="textFieldComponent"
              name="name_with_initials"
              onChange={onChangeHandler}
              value={formData.name_with_initials}
            />
          </div>
          <p>{formErrors.name_with_initials}</p>

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
              name="member_type"
              onChange={onChangeHandler}
              value={formData.member_type}
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
          <p>{formErrors.member_type}</p>

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

          <div className="mobile_no">
            <InputLabel htmlFor="mobile_no" className="namesTag">
              Mobile Number :
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="textFieldComponent"
              name="mobile_no"
              onChange={onChangeHandler}
              value={formData.mobile_no}
            />
          </div>
          <p>{formErrors.mobile_no}</p>

          <div className="Address">
            <InputLabel htmlFor="Address" className="namesTag">
              Address :
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="textFieldComponent"
              name="Address"
              onChange={onChangeHandler}
              value={formData.Address}
            />
          </div>
          <p>{formErrors.Address}</p>

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
    </>
  );
}
export default ResidentInfoAddNew;
