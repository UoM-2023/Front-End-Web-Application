import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
import axios from "axios";
//import "./FormDesigns.css";
// import "../../Component/Forms/FormDesigns.css";

function RequestsForm() {
  const [formData, setFormData] = useState({
    MType: "",
    Unit_id: "",
    Resident_Name: "",
    M_Description: "",
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
    console.log(formErrors);
      setIsSubmit(true);

    //Post Method

    axios
      .post("http://localhost:3001/maintenance/New_Mnt_Req", formData)
      .then((res) => {
        console.log("create successfully", res.data);
        setIsSubmit(true);
      })
      .catch((err) => console.error("Failed to create"));
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.table(formData);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.MType) {
      errors.MType = "Please select Maintenance Type * ";
    }
    if (!values.Unit_id) {
      errors.Unit_id = "Please Enter Unit ID *";
    }
    if (!values.Resident_Name) {
      errors.Resident_Name = "Please Enter Resident Name *";
    }
    // if (!values.M_Description) {
    //   errors.M_Description = "Please Enter Resident Name *";
    // }
    return errors;
  };

  return (
    <div className="FormContainer">
      <form className="MainForm" onSubmit={onSubmitHandler} method="get">
        <div className="inputItem">
          <InputLabel className="namesTag">Maintenance Type :</InputLabel>
          <Select
            className="SelectformComponent"
            name="MType"
            onChange={onChangeHandler}
            value={formData.MType}
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
            <MenuItem value="other" name="other" className="optionContainer">
              Other
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.MType}</p>

        <div className="inputItem">
          <InputLabel htmlFor="Unit_id" className="namesTag">
            Unit ID :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="Unit_id"
            onChange={onChangeHandler}
            value={formData.Unit_id}
          />
        </div>
        <p>{formErrors.Unit_id}</p>

        <div className="inputItem">
          <InputLabel htmlFor="Resident_Name" className="namesTag">
            Resident Name :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="Resident_Name"
            onChange={onChangeHandler}
            value={formData.Resident_Name}
          />
        </div>
        <p>{formErrors.Resident_Name}</p>

        <div className="inputItem">
          <InputLabel htmlFor="M_Description" className="namesTag">
            Description :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="M_Description"
            onChange={onChangeHandler}
            value={formData.M_Description}
          />
        </div>
        {/* <p>{formErrors.M_Description}</p> */}

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

export default RequestsForm;
