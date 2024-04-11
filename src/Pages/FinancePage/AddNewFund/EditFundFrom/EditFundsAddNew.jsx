import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../../Component/Buttons/SaveButton";
import BackButton from "../../../../Component/Buttons/BackButton";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function EditFundsAddNew() {
  const [formData, setFormData] = useState({
    fundName: "",
    chargedBy: "",
    amount: "",
    timePeriod: "",
    modifiedBy: "",
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

    axios.post('http://localhost:3001/finance/editFunds',formData)
    .then(res => console.log('RES::::::::',res.data))
    .catch(err => console.log(err))

    setIsSubmit(true);
    navigate("/finance/editFunds");
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.table(formData);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.amount) {
      errors.amount = "Please Enter Amount *";
    }
    if (!values.fundName) {
      errors.fundName = "Fund Name is required *";
    }
    if (!values.timePeriod) {
      errors.timePeriod = "Time Period is required *";
    }
    if (!values.chargedBy) {
      errors.chargedBy = "Please select Select Charging Units *";
    }
    if (!values.modifiedBy) {
      errors.modifiedBy = "Please Enter Modified Staff ID *";
    }
    return errors;
  };

  return (
    <div className="FormContainer">
      <form className="MainForm" onSubmit={onSubmitHandler} method="get">

        <div className="inputItem">
          <InputLabel htmlFor="fundName" className="namesTag">
            Fund Name :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="fundName"
            onChange={onChangeHandler}
            value={formData.fundName}
          />
        </div>
        <p>{formErrors.fundName}</p>

        <div className="inputItem">
          <InputLabel className="namesTag">Charged By :</InputLabel>
          <Select
            className="SelectformComponent"
            name="chargedBy"
            onChange={onChangeHandler}
            value={formData.chargedBy}
          >
            <MenuItem value="" className="optionContainer">
              Select Charging Units
            </MenuItem>
            <MenuItem
              value="allUnits"
              name="allUnits"
              className="optionContainer"
            >
              All Units
            </MenuItem>
            <MenuItem value="unit01" name="unit01" className="optionContainer">
              Unit 01
            </MenuItem>
            <MenuItem value="unit02" name="unit02" className="optionContainer">
              Unit 02
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.chargedBy}</p>

        <div className="inputItem">
          <InputLabel htmlFor="amount" className="namesTag">
            Amount (Rs.) :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="amount"
            type="number"
            min="0.00"
            placeholder="0.00"
            onChange={onChangeHandler}
            value={formData.amount}
          />
        </div>
        <p>{formErrors.amount}</p>

        <div className="inputItem">
          <InputLabel htmlFor="timePeriod" className="namesTag">
            Time Period :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="timePeriod"
            onChange={onChangeHandler}
            value={formData.timePeriod}
          />
        </div>
        <p>{formErrors.timePeriod}</p>

        <div className="inputItem">
          <InputLabel htmlFor="modifiedBy" className="namesTag">
            Modified By :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="modifiedBy"
            onChange={onChangeHandler}
            value={formData.modifiedBy}
          />
        </div>
        <p>{formErrors.modifiedBy}</p>

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
export default EditFundsAddNew;
