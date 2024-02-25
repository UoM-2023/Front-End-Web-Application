import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
//import "./FormDesigns.css";
// import "../../Component/Forms/FormDesigns.css";

function RevenueForm() {
  const [formData, setFormData] = useState({
    revenueType: "",
    unitID: "",
    residentName: "",
    staffID: "",
    paymentMethod: "",
    amount: "",
    remark: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.table(formData);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.revenueType) {
      errors.revenueType = "Please select Revenue Type * ";
    }
    if (!values.unitID) {
      errors.unitID = "Please Enter Unit ID *";
    }
    if (!values.residentName) {
      errors.approvedBy = "Please Enter Resident Name *";
    }
    if (!values.staffID) {
      errors.staffID = "Please Enter Staff ID *";
    }
    if (!values.paymentMethod) {
      errors.paymentMethod = "Please Select Payment Method *";
    }
    if (!values.amount) {
      errors.amount = "Please Enter Amount *";
    }
    return errors;
  };
  return (
    <div className="FormContainer">
      <form className="MainForm" onSubmit={onSubmitHandler} method="get">
        <div className="inputItem">
          <InputLabel className="namesTag">Revenue Type :</InputLabel>
          <Select
            className="SelectformComponent"
            name="revenueType"
            onChange={onChangeHandler}
            value={formData.revenueType}
          >
            <MenuItem value="" className="optionContainer">
              Select Revenue Type
            </MenuItem>
            <MenuItem value="pool" name="pool" className="optionContainer">
              Pool
            </MenuItem>
            <MenuItem value="gym" name="gym" className="optionContainer">
              Gym
            </MenuItem>
            <MenuItem
              value="eventHall01"
              name="eventHall01"
              className="optionContainer"
            >
              Event Hall 01
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.revenueType}</p>

        <div className="inputItem">
          <InputLabel htmlFor="unitID" className="namesTag">
            Unit ID :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="unitID"
            onChange={onChangeHandler}
            value={formData.unitID}
          />
        </div>
        <p>{formErrors.unitID}</p>

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
          <InputLabel htmlFor="unitId" className="namesTag">
            Staff ID :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="staffID"
            onChange={onChangeHandler}
            value={formData.staffID}
          />
        </div>
        <p>{formErrors.staffID}</p>

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
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <h3 className="success message">Successfully Added </h3>
      ) : (
        <pre> </pre>
      )}
    </div>
  );
}

export default RevenueForm;
