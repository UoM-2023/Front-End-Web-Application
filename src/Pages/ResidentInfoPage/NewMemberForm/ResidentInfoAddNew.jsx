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
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SuccessAlertDialog from "../../../Component/Dialogs/SuccessAlertDialog";
import LoadingIndicator from "../../../Component/Loading Indicator/LoadingIndicator";

function ResidentInfoAddNew() {
  const { residentID } = useParams();

  const [formData, setFormData] = useState({
    residentID: "",
    UnitID: "",
    building: "",
    block_no: "",
    unit_category: "",
    unit_no: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    name_with_initials: "",
    gender: "",
    dob: "",
    nic: "",
    member_type: "",
    email: "",
    mobile_no: "",
    Address: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Change Birthday Date Format

  function formatDate(dateString) {
    // Create a new Date object from the provided string
    const date = new Date(dateString);

    // Increment the date by one day
    date.setDate(date.getDate());

    // Extract year, month, and day components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    // Return the formatted date string
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    console.log("Current Resident ID:", residentID);
    if (residentID) {
      // Check if there is an ID, which means we are in "edit" mode
      console.log("Form useEffect call");
      axios
        .get(
          `http://localhost:3001/residentsDetails/addNewResident/updateResident/${residentID}`
        )
        .then((response) => {
          console.log("Response:", response);
          const { data } = response;
          console.log("Log has called", data);

          // Assuming your response data structure is correct
          if (data && data.result && data.result.length > 0) {
            const residentData = data.result[0]; // Accessing the first item in the array
            console.log("Resident Data:", residentData);

            const residentTypeValue =
              residentData.member_type === "Owner"
                ? "Owner"
                : residentData.member_type;

            const formattedDate = formatDate(residentData.dob);
            console.log("Formatted Date:", formattedDate);

            setFormData({
              residentID: residentData.residentID,
              UnitID: residentData.UnitID,
              first_name: residentData.first_name,
              middle_name: residentData.middle_name,
              last_name: residentData.last_name,
              name_with_initials: residentData.name_with_initials,
              gender: residentData.gender,
              dob: formattedDate,
              nic: residentData.nic,
              member_type: residentTypeValue,
              email: residentData.email,
              mobile_no: residentData.mobile_no,
              Address: residentData.Address,
            });
          } else {
            console.error("Data structure does not match expected format");
          }
        })
        .catch((err) => console.error("Failed to fetch Data...", err))
        .finally(() => setIsLoading(false));
    }
  }, [residentID]);

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
    setIsLoading(true);

    if (residentID) {
      // If there is an ID, it means we're editing existing data, so send a PUT request
      axios
        .put(
          `http://localhost:3001/residentsDetails/addNewResident/updateResident/${[
            residentID,
          ]}`,
          formData
        )
        .then((res) => {
          console.log("Update successful:", res.data);
          setIsSubmit(true);
          setSuccessMessage(res.data.message);
          //navigate("/staffDetails/addNewStaff");
        })
        .catch((err) => console.error("Failed to update data:", err))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // If there is no ID, it means we're creating new data, so send a POST request
      axios
        .post("http://localhost:3001/residentsDetails/addNewResident", formData)
        .then((res) => {
          console.log("Create Successful:", res.data);
          setIsSubmit(true);
          setSuccessMessage(res.data.message);
          //navigate("/staffDetails/addNewStaff");
        })
        .catch((err) => console.error("Failed to Create data:", err))
        .finally(() => {
          setIsLoading(false);
        });
    }
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
    const mobile_no_regex = /^(?:\+94|0)([1-9][0-9]{8})$/;
    const dob_regex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if (!values.residentID) {
      errors.residentID = "Please Enter Resident ID * ";
    }
    if (!values.UnitID) {
      errors.UnitID = "Please Enter Unit ID * ";
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
    return errors;
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/residents information");
  };

  const handleResetForm = () => {
    setFormData({
      residentID: "",
      UnitID: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      name_with_initials: "",
      gender: "",
      dob: "",
      nic: "",
      member_type: "",
      email: "",
      mobile_no: "",
      Address: "",
    });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleOpenDialog();
    }
  }, [formErrors, isSubmit]);

  return (
    <>
      <div
        className="FormContainer"
        style={{
          position: "relative",
          marginTop: "2rem",
          marginLeft: "6rem",
        }}
      >
        {isLoading && <LoadingIndicator />}
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
            <InputLabel htmlFor="Unit ID" className="namesTag">
              Unit ID:
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="textFieldComponent"
              name="UnitID"
              onChange={onChangeHandler}
              value={formData.UnitID}
            />
          </div>
          <p>{formErrors.UnitID}</p>

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
            <InputLabel className="namesTag">
              Relationship with householder :
            </InputLabel>
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
                value="Tenant"
                name="Tenant"
                className="optionContainer"
              >
                Tenant
              </MenuItem>
              <MenuItem
                value="Husband"
                name="Husband"
                className="optionContainer"
              >
                Husband
              </MenuItem>
              <MenuItem value="Wife" name="Wife" className="optionContainer">
                Wife
              </MenuItem>
              <MenuItem value="Son" name="Son" className="optionContainer">
                Son
              </MenuItem>
              <MenuItem
                value="Daughter"
                name="Daughter"
                className="optionContainer"
              >
                Daughter
              </MenuItem>
              <MenuItem
                value="Father"
                name="Father"
                className="optionContainer"
              >
                Father
              </MenuItem>
              <MenuItem
                value="Mother"
                name="Mother"
                className="optionContainer"
              >
                Mother
              </MenuItem>
              <MenuItem
                value="Brother"
                name="Brother"
                className="optionContainer"
              >
                Brother
              </MenuItem>
              <MenuItem
                value="Sister"
                name="Sister"
                className="optionContainer"
              >
                Sister
              </MenuItem>
              <MenuItem value="Other" name="Other" className="optionContainer">
                Other
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

          <div className="buttonSection">
            <Grid container spacing={2}>
              <Grid item>
                <div>
                  <SaveButton />
                </div>
              </Grid>
              <Grid item>
                <BackButton route="/resident details" />
              </Grid>
            </Grid>
          </div>
        </form>
        {openDialog && (
          <SuccessAlertDialog
            handleClose={handleCloseDialog}
            handleReset={handleResetForm}
            message={successMessage}
          />
        )}
      </div>
    </>
  );
}
export default ResidentInfoAddNew;
