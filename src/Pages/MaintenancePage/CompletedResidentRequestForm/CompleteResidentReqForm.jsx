import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
//import "./FormDesigns.css";
// import "../../Component/Forms/FormDesigns.css"; 

function CompleteResidentReqForm() {
  const [formData, setFormData] = useState({
    referenceNo: "",
    serviceProvider: "",
    mobileNo: "",
    completedDate: "",
    paymentStatus: "",
    paymentID: "",
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
    const mobileno_regex = /^(?:\+94|0)([1-9][0-9]{8})$/;

    if (!values.referenceNo) {
      errors.referenceNo = "Please Enter Reference No * ";
    }
    if (!values.serviceProvider) {
      errors.serviceProvider = "Please Enter Service Provider *";
    }
    if (!values.mobileNo) {
      errors.mobileNo = "Mobile Number is required *";
    } else if (!mobileno_regex.test(values.mobileNo)) {
      errors.mobileNo = "Enter a valid Mobile Number";
    }
    if (!values.completedDate) {
      errors.completedDate = "Please Enter Completed Date *";
    }
    if (!values.paymentStatus) {
      errors.paymentStatus = "Please select Payment Status *";
    }
    if (!values.paymentID) {
      errors.paymentID = "Please Enter Payment ID *";
    }
    return errors;
  };

  return (
    <div className="FormContainer">
      <form className="MainForm" onSubmit={onSubmitHandler} method="get">
        <div className="inputItem">
          <InputLabel htmlFor="referenceNo" className="namesTag">
            Reference No :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="referenceNo"
            onChange={onChangeHandler}
            value={formData.referenceNo}
          />
        </div>
        <p>{formErrors.referenceNo}</p>

        <div className="inputItem">
          <InputLabel htmlFor="serviceProvider" className="namesTag">
            Service Provider :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="serviceProvider"
            onChange={onChangeHandler}
            value={formData.serviceProvider}
          />
        </div>
        <p>{formErrors.serviceProvider}</p>

        <div className="inputItem">
          <InputLabel htmlFor="mobileNo" className="namesTag">
            Mobile Number :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="mobileNo"
            onChange={onChangeHandler}
            value={formData.mobileNo}
          />
        </div>
        <p>{formErrors.mobileNo}</p>

        <div className="inputItem">
          <InputLabel htmlFor="completedDate" className="namesTag">
            Completed Date :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="date"
            className="textFieldComponent"
            name="completedDate"
            onChange={onChangeHandler}
            value={formData.completedDate}
          />
        </div>
        <p>{formErrors.completedDate}</p>

        <div className="inputItem">
          <InputLabel className="namesTag">Payment Status :</InputLabel>
          <Select
            className="SelectformComponent"
            name="paymentStatus"
            onChange={onChangeHandler}
            value={formData.paymentStatus}
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
        <p>{formErrors.paymentStatus}</p>

        <div className="inputItem">
          <InputLabel htmlFor="paymentID" className="namesTag">
            Payment ID :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="paymentID"
            onChange={onChangeHandler}
            value={formData.paymentID}
          />
        </div>
        <p>{formErrors.paymentID}</p>

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

export default CompleteResidentReqForm;
