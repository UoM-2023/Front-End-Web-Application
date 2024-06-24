import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SuccessAlertDialog from "../../../Component/Dialogs/SuccessAlertDialog";
import LoadingIndicator from "../../../Component/Loading Indicator/LoadingIndicator";
//import "./FormDesigns.css";
// import "../../Component/Forms/FormDesigns.css";

function InternalMaintenanceForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    Maintenance: "",
    ServiceProvider: "",
    MobileNo: "",
    completed_date: "",
    Payment_Status: "",
    Internal_Mnt_Payment_id: "",
    Description: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Change completed Date Format

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
    console.log("Current Internal Maintenance ID:", id);
    if (id) {
      // Check if there is an ID, which means we are in "edit" mode
      console.log("Form useEffect cal");
      axios
        .get(`http://localhost:3001/maintenance/Internal_Mnt_Req/${id}`)
        .then((response) => {
          console.log("Response:", response);
          const { data } = response;
          console.log("Log has called", data);

          // Assuming your response data structure is correct InternalMaintData
          if (data && data.result && data.result.length > 0) {
            const InternalMaintData = data.result[0]; // Assuming you want the first item from the first array
            console.log("Internal maintenance Data:", InternalMaintData);

            const MaintenanceValue =
              InternalMaintData.Maintenance === "Water Supply"
                ? "Water Supply"
                : InternalMaintData.Maintenance;

            const Payment_StatusValue =
              InternalMaintData.Payment_Status === "Paid"
                ? "Paid"
                : InternalMaintData.Payment_Status;

            const formattedDate = formatDate(InternalMaintData.completed_date);

            setFormData({
              Maintenance: MaintenanceValue,
              ServiceProvider: InternalMaintData.ServiceProvider,
              MobileNo: InternalMaintData.MobileNo,
              completed_date: formattedDate,
              Payment_Status: Payment_StatusValue,
              Internal_Mnt_Payment_id:
                InternalMaintData.Internal_Mnt_Payment_id,
              Description: InternalMaintData.Description,
            });
          } else {
            console.error("Data structure does not match expected format");
          }
        })
        .catch((err) => console.error("Failed to fetch data", err))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

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

    if (id) {
      // If there is an ID, it means we're editing existing data, so send a PUT request
      axios
        .put(
          `http://localhost:3001/maintenance/Internal_Mnt_Req/${id}`,
          formData
        )
        .then((res) => {
          console.log("Update successful:", res.data);
          setIsSubmit(true);
          setSuccessMessage(res.data.message);
          //navigate("/finance/expenses");
        })
        .catch((err) => console.error("Failed to update data:", err))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // If there is no ID, it means we're creating new data, so send a POST request
      axios
        .post("http://localhost:3001/maintenance/Internal_Mnt_Req", formData)
        .then((res) => {
          console.log("Create successful:", res.data);
          setIsSubmit(true);
          setSuccessMessage(res.data.message);
          //navigate("/maintenance/");
        })
        .catch((err) => console.error("Failed to create data:", err))
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
    const MobileNo_regex = /^(?:\+94|0)([1-9][0-9]{8})$/;

    if (!values.Maintenance) {
      errors.Maintenance = "Please select Maintenance Type * ";
    }
    if (!values.ServiceProvider) {
      errors.ServiceProvider = "Please Enter Service Provider *";
    }
    if (!values.MobileNo) {
      errors.MobileNo = "Mobile Number is required *";
    } else if (!MobileNo_regex.test(values.MobileNo)) {
      errors.MobileNo = "Enter a valid Mobile Number";
    }
    if (!values.completed_date) {
      errors.completed_date = "Please Enter Completed Date *";
    }
    if (!values.Payment_Status) {
      errors.Payment_Status = "Please select Payment Status *";
    }
    if (!values.Internal_Mnt_Payment_id) {
      errors.Internal_Mnt_Payment_id = "Please Enter Payment ID *";
    }
    return errors;
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/maintenance/internal");
  };

  const handleResetForm = () => {
    setFormData({
      Maintenance: "",
      ServiceProvider: "",
      MobileNo: "",
      completed_date: "",
      Payment_Status: "",
      Internal_Mnt_Payment_id: "",
      Description: "",
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
          <InputLabel className="namesTag">Maintenance Type :</InputLabel>
          <Select
            className="SelectformComponent"
            name="Maintenance"
            onChange={onChangeHandler}
            value={formData.Maintenance}
          >
            <MenuItem value="" className="optionContainer">
              Select Maintenance Type
            </MenuItem>
            <MenuItem
              value="Water Supply"
              name="Water Supply"
              className="optionContainer"
            >
              Water Supply
            </MenuItem>
            <MenuItem
              value="Gas Supply"
              name="Gas Supply"
              className="optionContainer"
            >
              Gas Supply
            </MenuItem>
            <MenuItem
              value="Electricity Service"
              name="Electricity Service"
              className="optionContainer"
            >
              Electricity Service
            </MenuItem>
            <MenuItem
              value="Elevators"
              name="Elevators"
              className="optionContainer"
            >
              Elevators
            </MenuItem>
            <MenuItem
              value="Cleaning"
              name="Cleaning"
              className="optionContainer"
            >
              Cleaning
            </MenuItem>
            <MenuItem value="Other" name="Other" className="optionContainer">
              Other
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.Maintenance}</p>

        <div className="inputItem">
          <InputLabel htmlFor="ServiceProvider" className="namesTag">
            Service Provider :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="ServiceProvider"
            onChange={onChangeHandler}
            value={formData.ServiceProvider}
          />
        </div>
        <p>{formErrors.ServiceProvider}</p>

        <div className="inputItem">
          <InputLabel htmlFor="MobileNo" className="namesTag">
            Mobile Number :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="MobileNo"
            onChange={onChangeHandler}
            value={formData.MobileNo}
          />
        </div>
        <p>{formErrors.MobileNo}</p>

        <div className="inputItem">
          <InputLabel htmlFor="completed_date" className="namesTag">
            Completed Date :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="date"
            className="textFieldComponent"
            name="completed_date"
            onChange={onChangeHandler}
            value={formData.completed_date}
          />
        </div>
        <p>{formErrors.completed_date}</p>

        <div className="inputItem">
          <InputLabel className="namesTag">Payment Status :</InputLabel>
          <Select
            className="SelectformComponent"
            name="Payment_Status"
            onChange={onChangeHandler}
            value={formData.Payment_Status}
          >
            <MenuItem value="" className="optionContainer">
              Select Payment Status
            </MenuItem>
            <MenuItem value="Paid" name="Paid" className="optionContainer">
              Paid
            </MenuItem>
            <MenuItem value="Half" name="Half" className="optionContainer">
              Half Payment
            </MenuItem>
            <MenuItem
              value="Pending"
              name="Pending"
              className="optionContainer"
            >
              Pending
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.Payment_Status}</p>

        <div className="inputItem">
          <InputLabel htmlFor="Internal_Mnt_Payment_id" className="namesTag">
            Payment ID :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="Internal_Mnt_Payment_id"
            onChange={onChangeHandler}
            value={formData.Internal_Mnt_Payment_id}
          />
        </div>
        <p>{formErrors.Internal_Mnt_Payment_id}</p>

        <div className="inputItem">
          <InputLabel htmlFor="Description" className="namesTag">
            Description :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="Description"
            onChange={onChangeHandler}
            value={formData.Description}
          />
        </div>

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

export default InternalMaintenanceForm;
