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

function ReservationNewOne() {
  const { ref_no } = useParams();

  const [formData, setFormData] = useState({
    facility_name: "",
    amount_charge: "",
    charge_per: "",
    availability: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current Facility ID:", ref_no);
    if (ref_no) {
      // Check if there is an ID, which means we are in "edit" mode
      console.log("Form useEffect call");
      axios
        .get(
          //postman get url
          ` http://localhost:3001/Facility/Facilities/${ref_no}`
        )
        .then((response) => {
          console.log("Response:", response);
          const { data } = response;
          console.log("Log has called", data);

          // Assuming your response data structure is correct
          if (data && data.result && data.result.length > 0) {
            const facilityData = data.result[0]; // Accessing the first item in the array
            console.log("Facility Data:", facilityData);

            //selection use
            const facility_nameValue =
              facilityData.facility_name === "Gym"
                ? "Gym"
                : facilityData.facility_name;

            //selection use
            const charge_perValue =
              facilityData.charge_per === "Event"
                ? "Event"
                : facilityData.charge_per;

            //selection use
            const availabilityValue =
              facilityData.availability === "Reserved"
                ? "Reserved"
                : facilityData.availability;

            setFormData({
              facility_name: facility_nameValue,
              amount_charge: facilityData.amount_charge,
              charge_per: charge_perValue,
              availability: availabilityValue,
            });
          } else {
            console.error("Data structure does not match expected format");
          }
        })
        .catch((err) => console.error("Failed to fetch Data...", err))
        .finally(() => setIsLoading(false));
    }
  }, [ref_no]);

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

    if (ref_no) {
      // If there is an ID, it means we're editing existing data, so send a PUT request
      axios
        .put(
          //postman edit url
          `http://localhost:3001/Facility/Facilities/${[ref_no]}`,
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
      axios
        // postman post url
        .post("http://localhost:3001/Facility/Facilities", formData)
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
    if (!values.facility_name) {
      errors.facility_name = "Please Enter The facility_name *";
    }
    if (!values.amount_charge) {
      errors.amount_charge = "Please Enter Resident Name *";
    }
    if (!values.charge_per) {
      errors.charge_per = "Please select the charge_per * ";
    }
    if (!values.availability) {
      errors.availability = "Please select the availability * ";
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
      amount_charge: "",
      charge_per: "",
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
          <InputLabel htmlFor="facility_name" className="namesTag">
            Amount Charge :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="amount_charge"
            onChange={onChangeHandler}
            value={formData.amount_charge}
          />
        </div>
        <p>{formErrors.amount_charge}</p>

        <div className="inputItem">
          <InputLabel className="namesTag">Charge Per :</InputLabel>
          <Select
            className="SelectformComponent"
            name="charge_per"
            onChange={onChangeHandler}
            value={formData.charge_per}
          >
            <MenuItem value="" className="optionContainer">
              Select Charge Per
            </MenuItem>
            <MenuItem value="Event" name="Event" className="optionContainer">
              Event
            </MenuItem>
            <MenuItem
              value="Session"
              name="Session"
              className="optionContainer"
            >
              Session
            </MenuItem>
            <MenuItem value=" Month" name=" Month" className="optionContainer">
              Month
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.charge_per}</p>

        <div className="inputItem">
          <InputLabel className="namesTag">Availability :</InputLabel>
          <Select
            className="SelectformComponent"
            name="availability"
            onChange={onChangeHandler}
            value={formData.availability}
          >
            <MenuItem value="" className="optionContainer">
              Select Availability
            </MenuItem>
            <MenuItem
              value="Reserved"
              name="Reserved"
              className="optionContainer"
            >
              Reserved
            </MenuItem>
            <MenuItem
              value=" Not Yet"
              name=" Not Yet"
              className="optionContainer"
            >
              Not Yet
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

export default ReservationNewOne;
