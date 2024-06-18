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

function GuestFormNew() {
  const [formData, setFormData] = useState({

    Unit: "",
    rName: "",
    gName: "",
    gNIC: "",
    vehi_no : "",
    username: "",

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
    if (!values.gName) {
      errors.gName = "Please Enter Guest Name *";
    }
    if (!values.gNIC) {
      errors.gName = "Please Enter Guest NIC Number *";
    }

    if (!values.vehi_no) {
      errors.vehi_no = "Please Enter The Vehicle Number *";
    }

    if (!values.date && values.date) {
        errors.date = "Please Enter The Date  *";
      }  


    return errors;
  };
  return (
    <div className="FormContainer">
      <form className="MainForm" onSubmit={onSubmitHandler} method="get">
        


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

        <div className="inputItem">
          <InputLabel htmlFor="guestName" className="namesTag">
            Guest Name :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="gName"
            onChange={onChangeHandler}
            value={formData.gName}
          />
        </div>
        <p>{formErrors.gName}</p>


        <div className="address">
          <InputLabel htmlFor="nicNo" className="namesTag">
           Guest NIC Number :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="gNIC"
            onChange={onChangeHandler}
            value={formData.gNIC}
          />
        </div>
        <p>{formErrors.gNIC}</p>


        <div className="address">
          <InputLabel htmlFor="vehicleNo" className="namesTag">
            Vehicle No :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="vehi_no"
            onChange={onChangeHandler}
            value={formData.vehi_no}
          />
        </div>
        <p>{formErrors.vehi_no}</p>

        <div className="inputItem">
          <InputLabel htmlFor="Date" className="namesTag">
            Check In :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="date"
            className="textFieldComponent"
            name="date"
            onChange={onChangeHandler}
            value={formData.date}
          />
        </div>
        <p>{formErrors.date}</p>



        <div className="inputItem">
  <InputLabel htmlFor="Date" className="namesTag">
    Check Out:
  </InputLabel>
  <TextField
    id="outlined-basic"
    type="date"
    className="textFieldComponent"
    name="checkoutDate" 
    onChange={onChangeHandler}
    value={formData.checkoutDate} 
  />
</div>





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
export default GuestFormNew;
