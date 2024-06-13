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
import TopBar from "../../../Component/TopBar/TopBar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "../../../Component/Loading Indicator/LoadingIndicator";
import SuccessAlertDialog from "../../../Component/Dialogs/SuccessAlertDialog";

function StaffDetailsAddNewForm() {
  const { staffID } = useParams();

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    name_with_initials: "",
    gender: "",
    dob: "",
    nic: "",
    staff_category: "",
    qualification: "",
    staffID: "",
    email: "",
    mobile_no: "",
    Address: "",
    city: "",
    username: "",
    password: "",
    img: "",
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
    console.log("Current Staff ID:", staffID);
    if (staffID) {
      // Check if there is an ID, which means we are in "edit" mode
      console.log("Form useEffect call");
      axios
        .get(
          `http://localhost:3001/staffDetails/addNewStaff/updateStaff/${staffID}`
        )
        .then((response) => {
          console.log("Response:", response);
          const { data } = response;
          console.log("Log has called", data);

          // Assuming your response data structure is correct
          if (data && data.result && data.result.length > 0) {
            const staffData = data.result[0]; // Accessing the first item in the array
            console.log("Staff Data:", staffData);

            const staffCategoryValue =
              staffData.staff_category === "Admin"
                ? "Admin"
                : staffData.staff_category;

            const formattedDate = formatDate(staffData.dob);
            console.log("Formatted Date:", formattedDate);

            setFormData({
              staffID: staffData.staffID,
              first_name: staffData.first_name,
              middle_name: staffData.middle_name,
              last_name: staffData.last_name,
              name_with_initials: staffData.name_with_initials,
              gender: staffData.gender,
              dob: formattedDate,
              nic: staffData.nic,
              staff_category: staffCategoryValue,
              qualification: staffData.qualification,
              email: staffData.email,
              mobile_no: staffData.mobile_no,
              Address: staffData.Address,
              city: staffData.city,
              img: staffData.img,
            });
          } else {
            console.error("Data structure does not match expected format");
          }
        })
        .catch((err) => console.error("Failed to fetch Data...", err))
        .finally(() => setIsLoading(false));
    }
  }, [staffID]);

  // useEffect(() => {
  //   console.log("Current Staff ID:", staffID);
  //   if (staffID) {
  //     // Check if there is an ID, which means we are in "edit" mode
  //     console.log("Form useEffect call");
  //     axios
  //       .get(
  //         `http://localhost:3001/staffDetails/addNewStaff/updateStaff/${[
  //           staffID,
  //         ]}`
  //       )
  //       .then((response) => {
  //         console.log("Response:", response);
  //         const { data } = response;
  //         console.log("Log has called", data);

  //         // Assuming your response data structure is correct
  //         if (data && data.result && data.result.length > 0) {
  //           const staffData = data.result[0][0]; // Assuming you want the first item from the first array
  //           const staffCategoryValue =
  //             staffData.staff_category === "Admin"
  //               ? "Admin"
  //               : staffData.staff_category;

  //           const formattedDate = formatDate(staffData.dob);
  //           console.log(formattedDate);

  //           setFormData({
  //             staffID:staffData.staffID,
  //             first_name: staffData.first_name,
  //             middle_name: staffData.middle_name,
  //             last_name: staffData.last_name,
  //             name_with_initials: staffData.name_with_initials,
  //             gender: staffData.gender,
  //             dob: formattedDate,
  //             nic: staffData.nic,
  //             staff_category: staffCategoryValue,
  //             qualification: staffData.qualification,
  //             email: staffData.email,
  //             mobile_no: staffData.mobile_no,
  //             Address: staffData.Address,
  //             city: staffData.city,
  //             img: staffData.img,
  //           });
  //         }
  //       })
  //       .catch((err) => console.error("Failed to fetch Data...", err));
  //   }
  // }, [staffID]);

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

    if (staffID) {
      // If there is an ID, it means we're editing existing data, so send a PUT request
      axios
        .put(
          `http://localhost:3001/staffDetails/addNewStaff/updateStaff/${[
            staffID,
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
        .post("http://localhost:3001/staffDetails/addNewStaff", formData)
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
      console.log(formData.dob);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const nic_regex = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/m;
    const mobile_no_regex = /^(?:\+94|0)([1-9][0-9]{8})$/;
    const dob_regex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

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
    if (!values.dob) {
      errors.dob = "Please Enter Date of birth *";
    } else if (!dob_regex.test(values.dob)) {
      errors.dob = "Enter a valid Date of Birth";
    }
    if (!values.nic) {
      errors.nic = "NIC is required *";
    } else if (!nic_regex.test(values.nic)) {
      errors.nic = "Enter a valid NIC";
    }
    if (!values.staff_category) {
      errors.staff_category = "Please select Staff Category *";
    }
    if (!values.staffID) {
      errors.staffID = "Please Enter Staff ID *";
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
    if (!values.city) {
      errors.city = "City is required *";
    }
    if (!values.img) {
      errors.img = "Please Upload Staff Member's Image file *";
    }
    return errors;
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleResetForm = () => {
    setFormData({
      first_name: "",
      middle_name: "",
      last_name: "",
      name_with_initials: "",
      gender: "",
      dob: "",
      nic: "",
      staff_category: "",
      qualification: "",
      staffID: "",
      email: "",
      mobile_no: "",
      Address: "",
      city: "",
      username: "",
      password: "",
      img: "",
    });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleOpenDialog();
    }
  }, [formErrors, isSubmit]);

  return (
    <>
      <TopBar title="Staff Details" />
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
            <InputLabel htmlFor="lastname" className="namesTag">
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
            <InputLabel htmlFor="qualification" className="namesTag">
              Qualification :
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="textFieldComponent"
              name="qualification"
              onChange={onChangeHandler}
              value={formData.qualification}
            />
          </div>
          <p>{formErrors.qualification}</p>

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

          <div className="Address">
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
                <BackButton route="/staff details" />
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
export default StaffDetailsAddNewForm;
