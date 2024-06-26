import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import BackButton from "../../Component/Buttons/BackButton";
import SaveButton from "../../Component/Buttons/SaveButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "../../Component/Loading Indicator/LoadingIndicator";
import SuccessAlertDialog from "../../Component/Dialogs/SuccessAlertDialog";
import axiosInstance from "../LoginPage/LoginServices/authService";
//import "./FormDesigns.css";
// import "../../Component/Forms/FormDesigns.css";

function ReservationNewTwo() {
  const { ref_no } = useParams();

  const [formData, setFormData] = useState({
    facility_name: "",
    Unit_id: "",
    // resident_name: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    // payment_status: "",
    availability: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Change Dates Date Format

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

  function formatTime(timeString, incrementHours = 0, incrementMinutes = 0, incrementSeconds = 0) {
    // Create a new Date object from the provided time string
    const time = new Date(`1970-01-01T${timeString}Z`);
  
    // Increment the time by the specified hours, minutes, and seconds
    time.setUTCHours(time.getUTCHours() + incrementHours);
    time.setUTCMinutes(time.getUTCMinutes() + incrementMinutes);
    time.setUTCSeconds(time.getUTCSeconds() + incrementSeconds);
  
    // Extract hours, minutes, and seconds components
    const hours = String(time.getUTCHours()).padStart(2, "0");
    const minutes = String(time.getUTCMinutes()).padStart(2, "0");
    const seconds = String(time.getUTCSeconds()).padStart(2, "0");
  
    // Return the formatted time string
    return `${hours}:${minutes}:${seconds}`;
  }
  

  useEffect(() => {
    console.log("Current Reservation ID:", ref_no);
    if (ref_no) {
      // Check if there is an ID, which means we are in "edit" mode
      console.log("Form useEffect call");
      axiosInstance
        .get(
          //postman get url
          `/Reservation/Reservations/${ref_no}`
        )
        .then((response) => {
          console.log("Response:", response);
          const { data } = response;
          console.log("Log has called", data);

          // Assuming your response data structure is correct
          if (data && data.result && data.result.length > 0) {
            const reservationData = data.result[0]; // Accessing the first item in the array
            console.log("Reservation Data:", reservationData);

            //selection use
            const facility_nameValue =
              reservationData.facility_name === "Gym" //1st value form data
                ? "Gym"
                : reservationData.facility_name; //staff_category -->selection eka aithi eka

            // const payment_statusValue =
            //   reservationData.payment_status === "Paid" //1st value form data
            //     ? "Paid"
            //     : reservationData.payment_status; //staff_category -->selection eka aithi eka

            const availabilityValue =
              reservationData.availability === "Paid" //1st value form data
                ? "Paid"
                : reservationData.availability; //staff_category -->selection eka aithi eka

            const formatted_start_date = formatDate(reservationData.start_date);
            const formatted_end_date = formatDate(reservationData.end_date);
            const formatted_start_time = formatTime(reservationData.start_time);
            const formatted_end_time = formatTime(reservationData.end_time);
            
            setFormData({
              facility_name: facility_nameValue,
              Unit_id: reservationData.Unit_id,
              start_date: formatted_start_date,
              end_date: formatted_end_date,
              start_time: formatted_start_time,
              end_time: formatted_end_time,
              // payment_status: payment_statusValue,
              availability: availabilityValue,
            });
          } else {
            console.error("Data structure does not match expected format");
          }
        })
        .catch((err) => console.error("Failed to fetch Data...", err))
        .finally(() => setIsLoading(false));
    }
  }, [ref_no]); //primary key

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

    //primary key
    if (ref_no) {
      // If there is an ID, it means we're editing existing data, so send a PUT request
      axiosInstance
        .put(
          //postman edit url
          `/Reservation/Reservations/${[ref_no]}`,
          formData
        )
        .then((res) => {
          console.log("Update successful:", res.data);
          setIsSubmit(true);
          setSuccessMessage(res.data.message);
        })
        .catch((err) => console.error("Failed to update data:", err))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // If there is no ID, it means we're creating new data, so send a POST request
      axiosInstance
        // postman post url
        .post("/Reservation/Reservations", formData)
        .then((res) => {
          console.log("Create Successful:", res.data);
          setIsSubmit(true);
          setSuccessMessage(res.data.message);
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
    const dob_regex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if (!values.facility_name) {
      errors.facility_name = "Please select the Facility Name * ";
    }
    if (!values.Unit_id) {
      errors.Unit_id = "Please Enter  the Unit ID * ";
    }
    // if (!values.resident_name) {
    //   errors.resident_name = "Please Enter The Resident Name *";
    // }
    if (!values.start_date) {
      errors.start_date = "Please Enter The Start Date *";
    }
    if (!values.end_date) {
      errors.end_date = "Please Enter The End Date *";
    }
    // if (!values.start_time) {
    //   errors.start_date = "Please Enter The Start Time *";
    // }
    // if (!values.end_time) {
    //   errors.start_date = "Please Enter The End Time *";
    // }
    // if (!values.payment_status) {
    //   errors.payment_status = "Please select the Payment Status * ";
    // }
    if (!values.availability) {
      errors.availability = "Please select the availability Status * ";
    }

    return errors;
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/reservations");
  };

  const handleResetForm = () => {
    setFormData({
      facility_name: "",
      Unit_id: "",
      // resident_name: "",
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
      availability: "",
    });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleOpenDialog();
    }
  }, [formErrors, isSubmit]);

  return (
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
          <InputLabel className="namesTag">Facility Name :</InputLabel>
          <Select
            className="SelectformComponent"
            name="facility_name"
            onChange={onChangeHandler}
            value={formData.facility_name}
          >
            <MenuItem value="" className="optionContainer">
              Select Facility Name
            </MenuItem>
            <MenuItem value="Gym" name="Gym" className="optionContainer">
              Gym
            </MenuItem>
            <MenuItem value="Pool" name="Pool" className="optionContainer">
              Pool
            </MenuItem>
            <MenuItem
              value="Event Hall"
              name="Event Hall"
              className="optionContainer"
            >
              Event Hall
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.facility_name}</p>

        <div className="inputItem">
          <InputLabel htmlFor="Name" className="namesTag">
           Unit ID :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="Unit_id"
            onChange={onChangeHandler}
            value={formData.Unit_id}
          />
        </div>
        <p>{formErrors.Unit_id}</p>

        {/* <div className="inputItem">
          <InputLabel htmlFor="Name" className="namesTag">
            Resident Name :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="resident_name"
            onChange={onChangeHandler}
            value={formData.resident_name}
          />
        </div>
        <p>{formErrors.resident_name}</p> */}

        <div className="inputItem">
          <InputLabel htmlFor="StartDate" className="namesTag">
            Start Date :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="date"
            className="textFieldComponent"
            name="start_date"
            onChange={onChangeHandler}
            value={formData.start_date}
          />
        </div>
        <p>{formErrors.start_date}</p>

        <div className="inputItem">
          <InputLabel htmlFor="EnDate" className="namesTag">
            End Date :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="date"
            className="textFieldComponent"
            name="end_date"
            onChange={onChangeHandler}
            value={formData.end_date}
          />
        </div>
        <p>{formErrors.end_date}</p>

        <div className="inputItem">
          <InputLabel htmlFor="StartTime" className="namesTag">
            Start Time :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="time"
            className="textFieldComponent"
            name="start_time"
            onChange={onChangeHandler}
            value={formData.start_time}
          />
        </div>
        {/* <p>{formErrors.start_date}</p> */}

        <div className="inputItem">
          <InputLabel htmlFor="EndTime" className="namesTag">
            End Time :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="time"
            className="textFieldComponent"
            name="end_time"
            onChange={onChangeHandler}
            value={formData.end_time}
          />
        </div>
        {/* <p>{formErrors.end_time}</p> */}

        {/* <div className="inputItem">
          <InputLabel className="namesTag">Payment Status :</InputLabel>
          <Select
            className="SelectformComponent"
            name="payment_status"
            onChange={onChangeHandler}
            value={formData.payment_status}
          >
            <MenuItem value="" className="optionContainer">
              Select Payment Status
            </MenuItem>
            <MenuItem value="Paid" name="Paid" className="optionContainer">
              Paid
            </MenuItem>
            <MenuItem
              value="Not Yet"
              name="Not Yet"
              className="optionContainer"
            >
              Not Yet
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.payment_status}</p> */}

        <div className="inputItem">
          <InputLabel className="namesTag"> Status :</InputLabel>
          <Select
            className="SelectformComponent"
            name="availability"
            onChange={onChangeHandler}
            value={formData.availability}
          >
            <MenuItem value="" className="optionContainer">
              Select Status
            </MenuItem>
            <MenuItem
              value="Reserved"
              name="Reserved"
              className="optionContainer"
            >
              Reserved
            </MenuItem>
            <MenuItem
              value=" Already Reserved"
              name=" Already Reserved"
              className="optionContainer"
            >
              Already Reserved
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.availability}</p>

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
      {openDialog && (
        <SuccessAlertDialog
          handleClose={handleCloseDialog}
          handleReset={handleResetForm}
          message={successMessage}
        />
      )}
    </div>
  );
}
export default ReservationNewTwo;
