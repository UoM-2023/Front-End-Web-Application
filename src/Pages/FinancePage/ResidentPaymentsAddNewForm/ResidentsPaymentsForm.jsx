import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
//import "./FormDesigns.css";
// import "../../Component/Forms/FormDesigns.css";

function ResidentsPaymentsForm() {
  const [formData, setFormData] = useState({
    chargeType: "",
    unit_id: "",
    residentName: "",
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

    if (!values.chargeType) {
      errors.chargeType = "Please Select Charge Type * ";
    }
    if (!values.unit_id) {
      errors.unit_id = "Please Enter Unit Number *";
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

  return (
    <div className="FormContainer">
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
            <MenuItem value="all" name="all" className="optionContainer">
              All
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
            name="unit_id"
            onChange={onChangeHandler}
            value={formData.unit_id}
          />
        </div>
        <p>{formErrors.unit_id}</p>

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
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <h3 className="success message">Successfully Added </h3>
      ) : (
        <pre> </pre>
      )}
    </div>
  );
}

export default ResidentsPaymentsForm;
