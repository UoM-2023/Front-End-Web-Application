import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
import "./ResidentialUnitsForm.css";
import TopBar from "../../../Component/TopBar/TopBar";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function ResidentialUnitsForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Unit_id: "",
    Block_no: "",
    Building: "",
    Category: "",
    RStatus: "",
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
    axios.post('http://localhost:3001/residentialUnits/addNewUnit', formData)
    .then(res => {
      console.log(res);
      navigate('/residential units')
    })
    .catch(err => console.log(err));
    setFormErrors(validate(formData));
    setIsSubmit(false);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.table(formData);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.Building) {
        errors.Building = "Please select Building * ";
      }
      if (!values.Block_no) {
        errors.Block_no = "Please select Block Number * ";
      }
      if (!values.Category) {
        errors.Category = "Please select Unit Category *";
      }
      if (!values.Unit_id) {
        errors.Unit_id = "Please select Unit Number *";
      }
      if (!values.RStatus) {
        errors.RStatus = "Please select Status *";
      }
      return errors;
  };

  return (
    <>
    {/* <TopBar title="Residential Units" />  */}
    <div className="FormContainer">
      <form className="MainForm" onSubmit={onSubmitHandler} method="get">
      <div className="inputItem">
          <InputLabel htmlFor="Unit_id" className="Unit_id">
            Unit :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="Unit_id"
            onChange={onChangeHandler}
            value={formData.Unit_id}/>
        </div>
        <p>{formErrors.Unit_id}</p>


        <div className="inputItems">
          <InputLabel htmlFor="Block_no" className="namesTag">
          Block:
          </InputLabel>
          <Select
            className="SelectformComponent"
            name="Block_no"
            onChange={onChangeHandler}
            value={formData.Block_no}
          >
            <MenuItem value="" className="optionContainer">
              Select Block
            </MenuItem>
            <MenuItem value="Block 01" className="optionContainer">
            Block 01
            </MenuItem>
            <MenuItem value="Block 02" className="optionContainer">
            Block 02
            </MenuItem>
            <MenuItem value="Block 03" className="optionContainer">
            Block 03
            </MenuItem>
            <MenuItem value="Block 04" className="optionContainer">
            Block 04
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.Block_no}</p>

        <div className="inputItem">
          <InputLabel className="namesTag">
            Building :
            </InputLabel>
          <Select
            className="SelectformComponent"
            name="Building"
            onChange={onChangeHandler}
            value={formData.Building}
          >
            <MenuItem value="" className="optionContainer">
              Select Building
            </MenuItem>
            <MenuItem value="Wing 01" name="Wing 01" className="optionContainer">
            Wing A
            </MenuItem>
            <MenuItem value="Wing 02" name="Wing 02" className="optionContainer">
            Wing B
            </MenuItem>
            <MenuItem value="Wing 03" name="Wing 03" className="optionContainer" >
            Wing C
            </MenuItem>
            <MenuItem value="Wing 04" name="Wing 04" className="optionContainer">
            Wing D
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.Building}</p>

        <div className="inputItems">
          <InputLabel htmlFor="Category" className="namesTag">
          Unit Category:
          </InputLabel>
          <Select
            className="SelectformComponent"
            name="Category"
            onChange={onChangeHandler}
            value={formData.Category}
          >
            <MenuItem value="" className="optionContainer">
              Select Unit Category
            </MenuItem>
            <MenuItem value="Bed Room Type 01" className="optionContainer">
            Bed Room Type 01
            </MenuItem>
            <MenuItem value="Bed Room Type 02" className="optionContainer">
            Bed Room Type 02
            </MenuItem>
            <MenuItem value="Bed Room Type 03" className="optionContainer">
            Bed Room Type 03
            </MenuItem>
            <MenuItem value="Bed Room Type 04" className="optionContainer">
            Bed Room Type 04
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.Category}</p>


        <div className="inputItems">
          <InputLabel htmlFor="RStatus" className="namesTag">
          Status:
          </InputLabel>
          <Select
            className="SelectformComponent"
            name="RStatus"
            onChange={onChangeHandler}
            value={formData.RStatus}
          >
            <MenuItem value="" className="optionContainer">
              Select Status
            </MenuItem>
            <MenuItem value="Available" className="optionContainer">
            Available
            </MenuItem>
            <MenuItem value="Not Available" className="optionContainer">
            Not Available
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.RStatus }</p>

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
    </>
  );
}

export default ResidentialUnitsForm;
