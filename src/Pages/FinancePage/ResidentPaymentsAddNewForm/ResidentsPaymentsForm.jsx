import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
import axios from "axios";
import LoadingIndicator from "../../../Component/Loading Indicator/LoadingIndicator";
import SuccessAlertDialog from "../../../Component/Dialogs/SuccessAlertDialog";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../LoginPage/LoginServices/authService";

function ResidentsPaymentsForm() {
  const [formData, setFormData] = useState({
    unit_id: "",
    charge_type: "",
    method: "",
    amount: "",
    payment_id: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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

    axiosInstance
      .post("/finance/payment", formData)
      .then((res) => {
        console.log("Create Successful:", res.data);
        setIsSubmit(true);
        setSuccessMessage(res.data.message);
        navigate(-1);
      })
      .catch((err) => console.error("Failed to Create data:", err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.table(formData);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.charge_type) {
      errors.charge_type = "Please Select Charge Type * ";
    }
    if (!values.unit_id) {
      errors.unit_id = "Please Enter Unit Number *";
    }
    
    if (!values.method) {
      errors.method = "Please Select Payment Method *";
    }
    if (!values.amount) {
      errors.amount = "Please Enter Amount *";
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
      unit_id: "",
      charge_type: "",
      method: "",
      amount: "",
      payment_id: "",
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
          <InputLabel htmlFor="unitNumber" className="namesTag">
            Unit Number :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="unit_id"
            onChange={onChangeHandler}
            value={formData.unit_id}
          />
        </div>
        <p>{formErrors.unit_id}</p>
        <div className="inputItem">
          <InputLabel className="namesTag">Charge Type :</InputLabel>
          <Select
            className="SelectformComponent"
            name="charge_type"
            onChange={onChangeHandler}
            value={formData.charge_type}
          >
            <MenuItem value="" className="optionContainer">
              Select Charge Type
            </MenuItem>
            <MenuItem value="Utility" name="Utility" className="optionContainer">
              Utility
            </MenuItem>
            <MenuItem value="Management" name="Management" className="optionContainer">
              Management
            </MenuItem>
            <MenuItem
              value="Sinking"
              name="Sinking"
              className="optionContainer"
            >
              Sinking
            </MenuItem>
            <MenuItem value="All" name="All" className="optionContainer">
              All
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.chargeType}</p>



        <div className="inputItem">
          <InputLabel className="namesTag">Payment Method :</InputLabel>
          <Select
            className="SelectformComponent"
            name="method"
            onChange={onChangeHandler}
            value={formData.method}
          >
            <MenuItem value="" className="optionContainer">
              Select Payment Method
            </MenuItem>
            <MenuItem value="cash" name="cash" className="optionContainer">
              Cash
            </MenuItem>
            <MenuItem value="card" name="card" className="optionContainer">
              Card
            </MenuItem>
            <MenuItem value="cheque" name="cheque" className="optionContainer">
              Cheque
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.paymentMethod}</p>

        <div className="inputItem">
          <InputLabel htmlFor="amount" className="namesTag">
            Amount (Rs.) :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="number"
            step="0.01"
            min="0.00"
            placeholder="0.00"
            className="textFieldComponent"
            name="amount"
            onChange={onChangeHandler}
            value={formData.amount}
          />
        </div>
        <p>{formErrors.amount}</p>

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

export default ResidentsPaymentsForm;
