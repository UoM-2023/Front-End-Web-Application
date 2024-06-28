import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import BackButton from "../../../Component/Buttons/BackButton";
import SaveButton from "../../../Component/Buttons/SaveButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "../../../Component/Loading Indicator/LoadingIndicator";
import SuccessAlertDialog from "../../../Component/Dialogs/SuccessAlertDialog";

function CompleteResidentReqForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    Mnt_id: "",
    ServiceProvider: "",
    MobileNo: "",
    completed_date: "",
    Payment_Status: "",
    Mnt_Payment_id: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Change Completed Date Format

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
    console.log("Current ID:", id);
    if (id) {
      // Check if there is an ID, which means we are in "edit" mode
      console.log("Form useEffect cal");
      axios
        .get(`http://localhost:3001/maintenance/Completed_Mnt_Req/${id}`)
        .then((response) => {
          console.log("Response:", response);
          const { data } = response;
          console.log("Log has called", data);

          // Assuming your response data structure is correct
          if (data && data.result && data.result.length > 0) {
            const ComData = data.result[0]; // Assuming you want the first item from the first array

            const Payment_StatusValue =
              ComData.Payment_Status === "Paid"
                ? "Paid"
                : ComData.Payment_Status;

            const formattedDate = formatDate(ComData.completed_date);
            //console.log("Formatted Date:", formattedDate);

            setFormData({
              Mnt_id: ComData.Mnt_id,
              ServiceProvider: ComData.ServiceProvider,
              MobileNo: ComData.MobileNo,
              Payment_Status: Payment_StatusValue,
              completed_date: formattedDate,
              Mnt_Payment_id: ComData.Mnt_Payment_id,
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
          `http://localhost:3001/maintenance/Completed_Mnt_Req/${id}`,
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
        .post("http://localhost:3001/maintenance/Completed_Mnt_Req", formData)
        .then((res) => {
          console.log("Create successful:", res.data);
          setIsSubmit(true);
          setSuccessMessage(res.data.message);
          //navigate("/maintenance/completed");
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

    if (!values.Mnt_id) {
      errors.Mnt_id = "Please Enter Reference No * ";
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
    if (!values.Mnt_Payment_id) {
      errors.Mnt_Payment_id = "Please Enter Payment ID *";
    }
    return errors;
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/maintenance/completed");
  };

  const handleResetForm = () => {
    setFormData({
      Mnt_id: "",
      ServiceProvider: "",
      MobileNo: "",
      completed_date: "",
      Payment_Status: "",
      Mnt_Payment_id: "",
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
      <form className="MainForm" onSubmit={onSubmitHandler} method="post">
        <div className="inputItem">
          <InputLabel htmlFor="Mnt_id" className="namesTag">
            Reference No :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="Mnt_id"
            onChange={onChangeHandler}
            value={formData.Mnt_id}
          />
        </div>
        <p>{formErrors.Mnt_id}</p>

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
          <InputLabel htmlFor="Mnt_Payment_id" className="namesTag">
            Payment ID :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="Mnt_Payment_id"
            onChange={onChangeHandler}
            value={formData.Mnt_Payment_id}
          />
        </div>
        <p>{formErrors.Mnt_Payment_id}</p>

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

export default CompleteResidentReqForm;
