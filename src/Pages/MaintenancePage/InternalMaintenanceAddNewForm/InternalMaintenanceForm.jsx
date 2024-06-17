import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
//import "./FormDesigns.css";
// import "../../Component/Forms/FormDesigns.css";

function InternalMaintenanceForm() {
  const [formData, setFormData] = useState({
    Maintenance: "",
    ServiceProvider: "",
    MobileNo: "",
    completed_date: "",
    Payment_Status: "",
    Internal_Mnt_Payment_id: "",
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

  return (
    <div className="FormContainer">
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
              value="waterSupply"
              name="waterSupply"
              className="optionContainer"
            >
              Water Supply
            </MenuItem>
            <MenuItem
              value="gasSupply"
              name="gasSupply"
              className="optionContainer"
            >
              Gas Supply
            </MenuItem>
            <MenuItem
              value="electricityService"
              name="electricityService"
              className="optionContainer"
            >
              Electricity Service
            </MenuItem>
            <MenuItem
              value="elevators"
              name="elevators"
              className="optionContainer"
            >
              Elevators
            </MenuItem>
            <MenuItem
              value="cleaning"
              name="cleaning"
              className="optionContainer"
            >
              Cleaning
            </MenuItem>
            <MenuItem value="other" name="other" className="optionContainer">
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
            <MenuItem value="paid" name="paid" className="optionContainer">
              Paid
            </MenuItem>
            <MenuItem
              value="halfPayment"
              name="halfPayment"
              className="optionContainer"
            >
              Half Payment
            </MenuItem>
            <MenuItem
              value="pending"
              name="pending"
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

export default InternalMaintenanceForm;
