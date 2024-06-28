import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "../../../Component/Loading Indicator/LoadingIndicator";
import SuccessAlertDialog from "../../../Component/Dialogs/SuccessAlertDialog";

function RevenueForm() {
  const [formData, setFormData] = useState({
    paid_by: "",
    amount: "",
    rType: "",
    payment_method: "",
    staffID: "",
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

    axios
      .post("http://localhost:3001/finance/revenue", formData)
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

    if (!values.paid_by) {
      errors.paid_by = "Please Enter a Name * ";
    }
    if (!values.amount) {
      errors.amount = "Please Enter Amount *";
    }
    if (!values.rType) {
      errors.rType = "Please Select a Revenue *";
    }
    if (!values.payment_method) {
      errors.payment_method = "Please Select Payment Method *";
    }
    if (!values.staff_id) {
      errors.staff_id = "Please Enter Staff ID *";
    }
    return errors;
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/finance/revenue");
  };

  const handleResetForm = () => {
    setFormData({
      paid_by: "",
      amount: "",
      rType: "",
      payment_method: "",
      staffID: "",
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
          <InputLabel className="namesTag">Revenue Type :</InputLabel>
          <Select
            className="SelectformComponent"
            name="rType"
            onChange={onChangeHandler}
            value={formData.rType}
          >
            <MenuItem value="" className="optionContainer">
              Select Revenue Type
            </MenuItem>
            <MenuItem value="Pool" name="Pool" className="optionContainer">
              Pool
            </MenuItem>
            <MenuItem value="Gym" name="Gym" className="optionContainer">
              Gym
            </MenuItem>
            <MenuItem
              value="Event Hall 01"
              name="Event Hall 01"
              className="optionContainer"
            >
              Event Hall 01
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.rType}</p>

        <div className="inputItem">
          <InputLabel htmlFor="Paid By" className="namesTag">
            Paid By :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="paid_by"
            onChange={onChangeHandler}
            value={formData.paid_by}
          />
        </div>
        <p>{formErrors.paid_by}</p>

        <div className="inputItem">
          <InputLabel htmlFor="unitId" className="namesTag">
            Staff ID :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="staff_id"
            onChange={onChangeHandler}
            value={formData.staff_id}
          />
        </div>
        <p>{formErrors.staff_id}</p>

        <div className="inputItem">
          <InputLabel className="namesTag">Payment Method :</InputLabel>
          <Select
            className="SelectformComponent"
            name="payment_method"
            onChange={onChangeHandler}
            value={formData.payment_method}
          >
            <MenuItem value="" className="optionContainer">
              Select Payment Method
            </MenuItem>
            <MenuItem value="Cash" name="Cash" className="optionContainer">
              Cash
            </MenuItem>
            <MenuItem value="Card" name="Card" className="optionContainer">
              Card
            </MenuItem>
            <MenuItem value="Cheque" name="Cheque" className="optionContainer">
              Cheque
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.payment_method}</p>

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

export default RevenueForm;
