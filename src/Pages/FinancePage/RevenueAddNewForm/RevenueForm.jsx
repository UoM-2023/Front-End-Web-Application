import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
import { useNavigate } from "react-router-dom";
import axios from "axios"

function RevenueForm() {
  const [formData, setFormData] = useState({
    paid_by: "",
    amount: "",
    rType: "",
    payment_method: "",
    staffID: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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

    axios.post('http://localhost:3001/finance/revenue',formData)
    .then(res => console.log('RES::::::::',res.data))
    .catch(err => console.log(err))
    setIsSubmit(true);
    navigate("/finance/revenue")
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
  return (
    <div className="FormContainer">
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
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <h3 className="success message">Successfully Added </h3>
      ) : (
        <pre> </pre>
      )}
    </div>
  );
}

export default RevenueForm;
