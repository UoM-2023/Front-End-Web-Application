import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
// import SaveButton from "../../../Component/Buttons/SaveButton";
// import BackButton from "../../../Component/Buttons/BackButton";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import BackButton from "../../Component/Buttons/BackButton";
import SaveButton from "../../Component/Buttons/SaveButton";
//import "./FormDesigns.css";
// import "../../Component/Forms/FormDesigns.css";

function ReservationNewOne() {
  const [formData, setFormData] = useState({

    Unit: "",
    rName: "",
    building: "",


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
    const dob_regex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;


    if (!values.Unit) {
      errors.Unit = "Please Enter The Unit *";
    }
    if (!values.rName) {
      errors.rName = "Please Enter Resident Name *";
    }
    if (!values.faciName) {
        errors.faciName = "Please select the Facility Name * ";
      }
 


    return errors;
  };
  return (
    <div className="FormContainer">
      <form className="MainForm" onSubmit={onSubmitHandler} method="get">
        


      <div className="inputItem">
          <InputLabel className="namesTag">Facility Name :</InputLabel>
          <Select
            className="SelectformComponent"
            name="faciName"
            onChange={onChangeHandler}
            value={formData.faciName}
          >
            <MenuItem value="" className="optionContainer">
              Select Facility Name
            </MenuItem>
            <MenuItem
              value="Wing 01"
              name="Wing 01"
              className="optionContainer"
            >
             Gym
            </MenuItem>
            <MenuItem
              value="Wing 02"
              name="Wing 02"
              className="optionContainer"
            >
              Pool
            </MenuItem>
            <MenuItem
              value="Wing 03"
              name="Wing 03"
              className="optionContainer"
            >
              Event Hall
            </MenuItem>

          </Select>
        </div>
        <p>{formErrors.faciName}</p>




        <div className="inputItem">
          <InputLabel htmlFor="Unit" className="namesTag">
            Unit :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="Unit"
            onChange={onChangeHandler}
            value={formData.Unit}
          />
        </div>
        <p>{formErrors.Unit}</p>

        <div className="inputItem">
          <InputLabel htmlFor="residentName" className="namesTag">
            Resident Name :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="rName"
            onChange={onChangeHandler}
            value={formData.rName}
          />
        </div>
        <p>{formErrors.rName}</p>





        <div className="buttonSection">
          <Grid container spacing={2}>
            <Grid item>
              <div>
                <SaveButton/>
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
export default ReservationNewOne;
