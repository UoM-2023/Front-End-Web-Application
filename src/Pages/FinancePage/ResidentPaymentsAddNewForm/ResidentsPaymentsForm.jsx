import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
import axios from "axios";
import LoadingIndicator from "../../../Component/Loading Indicator/LoadingIndicator";
import SuccessAlertDialog from "../../../Component/Dialogs/SuccessAlertDialog";

function ResidentsPaymentsForm() {
  const [formData, setFormData] = useState({
    chargeType: "",
    unitNumber: "",
    residentName: "",
    paymentMethod: "",
    amount: "",
    remark: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    axios
      .post("http://localhost:3001/staffDetails/addNewStaff", formData)
      .then((res) => {
        console.log("Create Successful:", res.data);
        setIsSubmit(true);
        setSuccessMessage(res.data.message);
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

    if (!values.chargeType) {
      errors.chargeType = "Please Select Charge Type * ";
    }
    if (!values.unitNumber) {
      errors.unitNumber = "Please Enter Unit Number *";
    }
    if (!values.residentName) {
      errors.residentName = "Please Enter Resident Name *";
    }
    if (!values.paymentMethod) {
      errors.paymentMethod = "Please Select Payment Method *";
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
      chargeType: "",
      unitNumber: "",
      residentName: "",
      paymentMethod: "",
      amount: "",
      remark: "",
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
          <InputLabel className="namesTag">Charge Type :</InputLabel>
          <Select
            className="SelectformComponent"
            name="chargeType"
            onChange={onChangeHandler}
            value={formData.chargeType}
          >
            <MenuItem value="" className="optionContainer">
              Select Utility Type
            </MenuItem>
            <MenuItem value="gas" name="gas" className="optionContainer">
              Gas
            </MenuItem>
            <MenuItem value="water" name="water" className="optionContainer">
              Water
            </MenuItem>
            <MenuItem
              value="electricity"
              name="electricity"
              className="optionContainer"
            >
              Electricity
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.chargeType}</p>

        <div className="inputItem">
          <InputLabel htmlFor="unitNumber" className="namesTag">
            Unit Number :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="unitNumber"
            onChange={onChangeHandler}
            value={formData.unitNumber}
          />
        </div>
        <p>{formErrors.unitNumber}</p>

        <div className="inputItem">
          <InputLabel htmlFor="residentName" className="namesTag">
            Resident Name :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="residentName"
            onChange={onChangeHandler}
            value={formData.residentName}
          />
        </div>
        <p>{formErrors.residentName}</p>

        <div className="inputItem">
          <InputLabel className="namesTag">Payment Method :</InputLabel>
          <Select
            className="SelectformComponent"
            name="paymentMethod"
            onChange={onChangeHandler}
            value={formData.paymentMethod}
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

        <div className="inputItem">
          <InputLabel htmlFor="unitId" className="namesTag">
            Remark :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="remark"
            onChange={onChangeHandler}
            value={formData.remark}
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

export default ResidentsPaymentsForm;
