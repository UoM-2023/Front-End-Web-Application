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

function ReservationNewTwo() {
  const [formData, setFormData] = useState({

    faciName: "",
    Name: "",
    sdate: "",
    edate:"",
    PayStatus: "",
    availability: ""

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

    if (!values.faciName) {
        errors.faciName = "Please select the Facility Name * ";
      }
    if (!values.Name) {
      errors.Name = "Please Enter The Name *";
    }
    if (!values.sdate) {
        errors.sdate = "Please Enter The Start Date *";
      }
    if (!values.edate) {
      errors.edate = "Please Enter The End Date *";
    }
    if (!values.PayStatus) {
        errors.PayStatus = "Please select the Payment Status * ";
      }
      if (!values.availability) {
        errors.availability = "Please select the Availability Status * ";
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
          <InputLabel htmlFor="Name" className="namesTag">
           Name :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="Name"
            onChange={onChangeHandler}
            value={formData.Name}
          />
        </div>
        <p>{formErrors.Name}</p>


        <div className="inputItem">
          <InputLabel htmlFor="StartDate" className="namesTag">
            Start Date :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="date"
            className="textFieldComponent"
            name="sdate"
            onChange={onChangeHandler}
            value={formData.sdate}
          />
        </div>
        <p>{formErrors.sdate}</p>




        <div className="inputItem">
          <InputLabel htmlFor="EnDate" className="namesTag">
            End Date :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="date"
            className="textFieldComponent"
            name="edate"
            onChange={onChangeHandler}
            value={formData.edate}
          />
        </div>
        <p>{formErrors.edate}</p>



        <div className="inputItem">
          <InputLabel className="namesTag">Payment Status :</InputLabel>
          <Select
            className="SelectformComponent"
            name="PayStatus"
            onChange={onChangeHandler}
            value={formData.PayStatus}
          >
            <MenuItem value="" className="optionContainer">
              Select Payment Status
            </MenuItem>
            <MenuItem
              value="Wing 01"
              name="Wing 01"
              className="optionContainer"
            >
              Paid
            </MenuItem>
            <MenuItem
              value="Wing 02"
              name="Wing 02"
              className="optionContainer"
            >
              Not Yet
            </MenuItem>

            
          </Select>
        </div>
        <p>{formErrors.PayStatus}</p>

        <div className="inputItem">
          <InputLabel className="namesTag"> Availability :</InputLabel>
          <Select
            className="SelectformComponent"
            name="availability"
            onChange={onChangeHandler}
            value={formData.availability}
          >
            <MenuItem value="" className="optionContainer">
              Select Availability
            </MenuItem>
            <MenuItem
              value="Wing 01"
              name="Wing 01"
              className="optionContainer"
            >
              Reserved
            </MenuItem>
            <MenuItem
              value="Wing 02"
              name="Wing 02"
              className="optionContainer"
            >
              Not Yet
            </MenuItem>

            
          </Select>
        </div>
        <p>{formErrors.availability}</p>
















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
export default ReservationNewTwo;
