import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
import "./FormDesigns.css"; 


function UtilityForm() {
  const [formData, setFormData] = useState({
    utilityType: "",
    unitID: "",
    residentName: "",
    staffID: "",
    paymentMethod: "",
    noOfUnits: "",
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

    if (!values.utilityType) {
      errors.utilityType = "Please select Utility Type * ";
    }
    if (!values.unitID) {
      errors.unitID = "Please Enter Unit ID *";
    }
    if (!values.residentName) {
      errors.residentName = "Please Enter Resident Name *";
    }
    if (!values.staffID) {
      errors.staffID = "Please Enter Staff ID *";
    }
    if (!values.paymentMethod) {
      errors.paymentMethod = "Please Select Payment Method *";
    }
    if (!values.noOfUnits) {
      errors.noOfUnits = "Please Enter No Of Units *";
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
          <InputLabel className="namesTag">Utility Type :</InputLabel>
          <Select
            className="SelectformComponent"
            name="utilityType"
            onChange={onChangeHandler}
            value={formData.utilityType}
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
            <MenuItem value="other" name="other" className="optionContainer">
              Other
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.utilityType}</p>

        <div className="inputItem">
          <InputLabel htmlFor="unitId" className="namesTag">
            Unit ID:
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
          <InputLabel htmlFor="unitId" className="namesTag">
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
          <InputLabel htmlFor="unitId" className="namesTag">
            No Of Units :
          </InputLabel>
          <TextField
            type="number"
            min="0.00"
            id="outlined-basic"
            className="textFieldComponent"
            name="noOfUnits"
            onChange={onChangeHandler}
            value={formData.noOfUnits}
          />
        </div>
        <p>{formErrors.noOfUnits}</p>

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

export default UtilityForm;
