import { useState, useEffect } from "react";
import { Grid, InputLabel, TextField } from "@mui/material";
import BackButton from "../../Component/Buttons/BackButton";
import SaveButton from "../../Component/Buttons/SaveButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "../../Component/Loading Indicator/LoadingIndicator";
import SuccessAlertDialog from "../../Component/Dialogs/SuccessAlertDialog";

function GuestFormNew() {
  const { guest_ID } = useParams();

  const [formData, setFormData] = useState({
    unit_ID: "",
    // resident_name: "",
    guest_name: "",
    guest_NIC: "",
    vehicle_number: "",
    check_In: "",

    // useresident_name: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current Guest ID:", guest_ID);
    if (guest_ID) {
      // Check if there is an ID, which means we are in "edit" mode
      console.log("Form useEffect call");
      axios
        .get(
          //postman get url
          `http://localhost:3001/GuestDetail/GuestDetails/${guest_ID}`
        )
        .then((response) => {
          console.log("Response:", response);
          const { data } = response;
          console.log("Log has called", data);

          // Assuming your response data structure is correct
          if (data && data.result && data.result.length > 0) {
            const guestData = data.result[0]; // Accessing the first item in the array
            console.log("Guest Data:", guestData);

            setFormData({
              unit_ID: guestData.unit_ID,
              // resident_name: guestData.resident_name,
              guest_name: guestData.guest_name,
              guest_NIC: guestData.guest_NIC,
              vehicle_number: guestData.vehicle_number,
              check_In: guestData.check_In,
              check_Out: guestData.check_Out,

              //useresident_name not added
            });
          } else {
            console.error("Data structure does not match expected format");
          }
        })
        .catch((err) => console.error("Failed to fetch Data...", err))
        .finally(() => setIsLoading(false));
    }
  }, [guest_ID]);

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
    if (guest_ID) {
      // If there is an ID, it means we're editing existing data, so send a PUT request
      axios
        .put(
          //postman edit url
          `http://localhost:3001/GuestDetail/GuestDetails/${[guest_ID]}`,
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
        .post("http://localhost:3001/GuestDetail/GuestDetails", formData)
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

    if (!values.unit_ID) {
      errors.unit_ID = "Please Enter The unit_ID *";
    }
    // if (!values.resident_name) {
    //   errors.resident_name = "Please Enter Resident Name *";
    // }
    if (!values.guest_name) {
      errors.guest_name = "Please Enter Guest Name *";
    }
    if (!values.guest_NIC) {
      errors.guest_NIC = "Please Enter Guest NIC Number *";
    }
    // if (!values.vehicle_number) {
    //   errors.vehicle_number = "Please Enter The Vehicle Number *";
    // }
    if (!values.check_In) {
      errors.check_In = "Please Enter The Date *";
    }
    if (!values.check_Out) {
      errors.check_Out = "Please Enter The Date *";
    }
    return errors;
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/guests");
  };

  const handleResetForm = () => {
    setFormData({
      unit_ID: "",
      guest_name: "",
      guest_NIC: "",
      vehicle_number: "",
      check_In: "",
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
          <InputLabel htmlFor="unit_ID" className="namesTag">
            Unit ID :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="unit_ID"
            onChange={onChangeHandler}
            value={formData.unit_ID}
          />
        </div>
        <p>{formErrors.unit_ID}</p>

        {/* <div className="inputItem">
          <InputLabel htmlFor="residentName" className="namesTag">
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
          <InputLabel htmlFor="guestName" className="namesTag">
            Guest Name :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="guest_name"
            onChange={onChangeHandler}
            value={formData.guest_name}
          />
        </div>
        <p>{formErrors.guest_name}</p>

        <div className="address">
          <InputLabel htmlFor="nicNo" className="namesTag">
            Guest NIC Number :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="guest_NIC"
            onChange={onChangeHandler}
            value={formData.guest_NIC}
          />
        </div>
        <p>{formErrors.guest_NIC}</p>

        <div className="address">
          <InputLabel htmlFor="vehicleNo" className="namesTag">
            Vehicle No :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="vehicle_number"
            onChange={onChangeHandler}
            value={formData.vehicle_number}
          />
        </div>
        {/* <p>{formErrors.vehicle_number}</p> */}

        <div className="inputItem">
          <InputLabel htmlFor="Date" className="namesTag">
            Check In :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="date"
            className="textFieldComponent"
            name="check_In"
            onChange={onChangeHandler}
            value={formData.check_In}
          />
        </div>
        <p>{formErrors.check_In}</p>

        <div className="inputItem">
          <InputLabel htmlFor="Date" className="namesTag">
            Check Out :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="date"
            className="textFieldComponent"
            name="check_Out"
            onChange={onChangeHandler}
            value={formData.check_Out}
          />
        </div>
        <p>{formErrors.check_Out}</p>

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

export default GuestFormNew;
