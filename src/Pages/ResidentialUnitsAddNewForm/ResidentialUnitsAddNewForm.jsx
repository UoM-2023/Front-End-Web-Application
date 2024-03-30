import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../Component/Buttons/SaveButton";
import BackButton from "../../Component/Buttons/BackButton";
//import "./FormDesigns.css";
// import "../../Component/Forms/FormDesigns.css";

function ResidentialUnitsAddNewForm() {
  const [formData, setFormData] = useState({
    unitID: "",
    blockNo: "",
    building: "",
    category: "",
    status: "",
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

    if (!values.unitID) {
      errors.unitID = "Please Enter Unit ID *";
    }
    if (!values.blockNo) {
      errors.blockNo = "Please Select Block No * ";
    }
    if (!values.building) {
      errors.building = "Please select Building *";
    }
    if (!values.category) {
      errors.category = "Please select Category *";
    }
    if (!values.status) {
      errors.status = "Please Select Status *";
    }
    return errors;
  };

  return (
    <div className="FormContainer">
      <form className="MainForm" onSubmit={onSubmitHandler} method="get">
        <div className="inputItem">
          <InputLabel htmlFor="unitID" className="namesTag">
            Unit ID :
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
          <InputLabel className="namesTag">Block No :</InputLabel>
          <Select
            className="SelectformComponent"
            name="blockNo"
            onChange={onChangeHandler}
            value={formData.blockNo}
          >
            <MenuItem value="" className="optionContainer">
              Select Block
            </MenuItem>
            <MenuItem value="blockA" name="blockA" className="optionContainer">
              Block - A
            </MenuItem>
            <MenuItem value="blockB" name="blockB" className="optionContainer">
              Block - B
            </MenuItem>
            <MenuItem value="blockC" name="blockC" className="optionContainer">
              Block - C
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.blockNo}</p>

        <div className="inputItem">
          <InputLabel className="namesTag">Building :</InputLabel>
          <Select
            className="SelectformComponent"
            name="building"
            onChange={onChangeHandler}
            value={formData.building}
          >
            <MenuItem value="" className="optionContainer">
              Select Building
            </MenuItem>
            <MenuItem value="wing01" name="wing01" className="optionContainer">
              Wing 01
            </MenuItem>
            <MenuItem value="wing02" name="wing02" className="optionContainer">
              Wing 02
            </MenuItem>
            <MenuItem value="wing03" name="wing03" className="optionContainer">
              Wing 03
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.building}</p>

        <div className="inputItem">
          <InputLabel className="namesTag">Category :</InputLabel>
          <Select
            className="SelectformComponent"
            name="category"
            onChange={onChangeHandler}
            value={formData.category}
          >
            <MenuItem value="" className="optionContainer">
              Select Category
            </MenuItem>
            <MenuItem
              value="bedRoom01"
              name="bedRoom01"
              className="optionContainer"
            >
              Bed Room 01
            </MenuItem>
            <MenuItem
              value="bedRoom02"
              name="bedRoom02"
              className="optionContainer"
            >
              Bed Room 02
            </MenuItem>
            <MenuItem
              value="bedRoom03"
              name="bedRoom03"
              className="optionContainer"
            >
              Bed Room 03
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.category}</p>

        <div className="inputItem">
          <InputLabel className="namesTag">Status :</InputLabel>
          <Select
            className="SelectformComponent"
            name="status"
            onChange={onChangeHandler}
            value={formData.status}
          >
            <MenuItem value="" className="optionContainer">
              Select Status
            </MenuItem>
            <MenuItem
              value="occupied"
              name="occupied"
              className="optionContainer"
            >
              Occupied
            </MenuItem>
            <MenuItem value="unoccupied" name="unoccupied" className="optionContainer">
              Unoccupied
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.status}</p>

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
export default ResidentialUnitsAddNewForm;
