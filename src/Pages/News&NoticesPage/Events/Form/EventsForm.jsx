import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../../Component/Buttons/SaveButton";
import BackButton from "../../../../Component/Buttons/BackButton";
import "./EventsForm.css";
import TopBar from "../../../../Component/TopBar/TopBar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SuccessAlertDialog from "../../../../Component/Dialogs/SuccessAlertDialog";
import LoadingIndicator from "../../../../Component/Loading Indicator/LoadingIndicator";
import axiosInstance from "../../../LoginPage/LoginServices/authService";

function EventsForm() {
  const { Event_no } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    event: "",
    place: "",
    sDate: "",
    eDate: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Change Date Format

  function formatDate(dateString) {
    // Create a new Date object from the provided string
    const date = new Date(dateString);

    // Increment the date by one day
    date.setDate(date.getDate());

    // Extract year, month, and day components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    // Return the formatted date string
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    console.log("Current Event_no:", Event_no);
    if (Event_no) {
      // Check if there is an ID, which means we are in "edit" mode
      console.log("Form useEffect call");
      axiosInstance
        .get(`/newsNotices/newEvent/${Event_no}`)
        .then((response) => {
          console.log("Response:", response);
          const { data } = response;
          console.log("Log has called", data);

          // Assuming your response data structure is correct
          if (data && data.result && data.result.length > 0) {
            const eventData = data.result[0]; // Accessing the first item in the array
            console.log("Event Data:", eventData);

            const placeValue =
              eventData.place === "Garden" ? "Garden" : eventData.place;
            console.log("placeValue called", placeValue);

            const formatted_sDate = formatDate(eventData.sDate);
            const formatted_eDate = formatDate(eventData.eDate);

            setFormData({
              event: eventData.event,
              place: placeValue,
              sDate: formatted_sDate,
              eDate: formatted_eDate,
              description: eventData.description,
            });
          } else {
            console.error("Data structure does not match expected format");
          }
        })
        .catch((err) => console.error("Failed to fetch Data...", err))
        .finally(() => setIsLoading(false));
    }
  }, [Event_no]);

  const onChangeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = (event) => {
    console.log(formData);
    event.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmit(true);
    setIsLoading(true);
    // axios
    //   .post("http://localhost:3001/newsNotices/newEvent", formData)
    //   .then((res) => {
    //     console.log(res);
    //     navigate("/eventsTable");
    //   })
    //   .catch((err) => console.log(err));

    if (Event_no) {
      // If there is an ID, it means we're editing existing data, so send a PUT request
      axiosInstance
        .put(
          `/newsNotices/newEvent/${[Event_no]}`,
          formData
        )
        .then((res) => {
          console.log("Update successful:", res.data);
          setIsSubmit(true);
          setSuccessMessage(res.data.message);
          //navigate("/newsNotices/addNewStaff");
        })
        .catch((err) => console.error("Failed to update data:", err))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // If there is no ID, it means we're creating new data, so send a POST request
      axiosInstance
        .post("/newsNotices/newEvent", formData)
        .then((res) => {
          console.log("Create Successful:", res.data);
          setIsSubmit(true);
          setSuccessMessage(res.data.message);
          //navigate("/newsNotices/addNewStaff");
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

    if (!values.event) {
      errors.event = "Please Enter Event * ";
    }
    if (!values.place) {
      errors.place = "Please Select Place *";
    }
    if (!values.sDate) {
      errors.sDate = "Please Enter Start Date *";
    }
    if (!values.eDate) {
      errors.eDate = "Please Enter End Date *";
    }
    if (!values.description) {
      errors.description = "Please Add Description *";
    }
    return errors;
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/eventsTable");
  };

  const handleResetForm = () => {
    setFormData({
      event: "",
      place: "",
      sDate: "",
      eDate: "",
      description: "",
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
            <InputLabel htmlFor="event" className="namesTag">
              Event :
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="textFieldComponent"
              name="event"
              onChange={onChangeHandler}
              value={formData.event}
            />
          </div>
          <p>{formErrors.event}</p>

          <div className="inputItem">
            <InputLabel className="namesTag">Venue :</InputLabel>
            <Select
              className="SelectformComponent"
              name="place"
              onChange={onChangeHandler}
              value={formData.place}
            >
              <MenuItem value="" className="optionContainer">
                Select Venue
              </MenuItem>
              <MenuItem
                value="Garden"
                name="Garden"
                className="optionContainer"
              >
                Garden
              </MenuItem>
              <MenuItem
                value="Event Hall"
                name="Event Hall"
                className="optionContainer"
              >
                Event Hall
              </MenuItem>
              <MenuItem
                value="Play Area"
                name="Play Area"
                className="optionContainer"
              >
                Play Area
              </MenuItem>
              <MenuItem
                value="Roof Top"
                name="Roof Top"
                className="optionContainer"
              >
                Roof Top
              </MenuItem>
            </Select>
          </div>
          <p>{formErrors.place}</p>

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

export default EventsForm;
