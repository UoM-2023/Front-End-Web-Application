import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "../../../Component/Loading Indicator/LoadingIndicator";
import SuccessAlertDialog from "../../../Component/Dialogs/SuccessAlertDialog";

function RequestsForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    Unit_id: "",
    MType: "",
    Mnt_Status: "Pending",
    M_Description: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current ID:", id);
    if (id) {
      // Check if there is an ID, which means we are in "edit" mode
      console.log("Form useEffect cal");
      axios
        .get(`http://localhost:3001/maintenance/New_Mnt_Req/${id}`)
        .then((response) => {
          console.log("Response:", response);
          const { data } = response;
          console.log("Log has called", data);

          // Assuming your response data structure is correct
          if (data && data.result && data.result.length > 0) {
            const mData = data.result[0]; // Assuming you want the first item from the first array

            const MTypeValue =
              mData.MType === "Water Supply" ? "Water Supply" : mData.MType;

            setFormData({
              Unit_id: mData.Unit_id,
              MType: MTypeValue,
              Mnt_Status: mData.Mnt_Status,
              M_Description: mData.M_Description,
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
        .put(`http://localhost:3001/maintenance/Update_Mnt_Req/${id}`, formData)
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
        .post("http://localhost:3001/maintenance/New_Mnt_Req", formData)
        .then((res) => {
          console.log("Create successful:", res.data);
          setIsSubmit(true);
          setSuccessMessage(res.data.message);
          //navigate("/maintenance/newRequest");
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

    if (!values.MType) {
      errors.MType = "Please select Maintenance Type *";
    }
    if (!values.Unit_id) {
      errors.Unit_id = "Please Enter Unit ID *";
    }
    return errors;
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/maintenance");
  };

  const handleResetForm = () => {
    setFormData({
      Unit_id: "",
      MType: "",
      Mnt_Status: "Pending",
      M_Description: "",
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
            name="MType"
            onChange={onChangeHandler}
            value={formData.MType}
          >
            <MenuItem value="" className="optionContainer">
              Select Maintenance Type
            </MenuItem>
            <MenuItem
              value="Plumbing"
              name="Plumbing"
              className="optionContainer"
            >
              Plumbing
            </MenuItem>
            <MenuItem
              value="Electrical"
              name="Electrical"
              className="optionContainer"
            >
              Electrical
            </MenuItem>
            <MenuItem value="HVAC" name="HVAC" className="optionContainer">
              HVAC
            </MenuItem>
            <MenuItem
              value="Appliances"
              name="Appliances"
              className="optionContainer"
            >
              Appliances
            </MenuItem>
            <MenuItem
              value="General Maintenance"
              name="General Maintenance"
              className="optionContainer"
            >
              General Maintenance
            </MenuItem>
            <MenuItem
              value="Pest Control"
              name="Pest Control"
              className="optionContainer"
            >
              Pest Control
            </MenuItem>
            <MenuItem
              value="Safety and Security"
              name="Safety and Security"
              className="optionContainer"
            >
              Safety and Security
            </MenuItem>
            <MenuItem
              value="Grounds keeping"
              name="Grounds keeping"
              className="optionContainer"
            >
              Grounds keeping
            </MenuItem>
            <MenuItem
              value="Structural Repairs"
              name="Structural Repairs"
              className="optionContainer"
            >
              Structural Repairs
            </MenuItem>
            <MenuItem value="Other" name="Other" className="optionContainer">
              Other
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.MType}</p>

        <div className="inputItem">
          <InputLabel htmlFor="Unit_id" className="namesTag">
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

        <div className="inputItem">
          <InputLabel htmlFor="Description" className="namesTag">
            Description :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="M_Description"
            onChange={onChangeHandler}
            value={formData.M_Description}
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

export default RequestsForm;
