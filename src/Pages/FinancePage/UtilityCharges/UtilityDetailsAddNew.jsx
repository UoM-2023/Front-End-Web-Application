import { useState, useEffect } from "react";
import { Grid, InputLabel, Link, MenuItem, Select} from "@mui/material";
// import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
import AddRangeButton from "../../../Component/Buttons/AddRow";
import { KeyboardArrowDown, KeyboardArrowDownRounded, KeyboardArrowUp } from "@mui/icons-material";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";



function UtilityDetailsAddNewForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    utilityType: "",
    rows: [{ priceRange: "", basePrice: "", unitPrice: "" }],
    modifiedBy: "",
  });

  const { id } = useParams();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const onChangeHandler = (event, index) => {
      const { name, value } = event.target;

      if (!formData) {
          console.error("formData is undefined");
          return;
      }

      if (index !== null && index >= 0 && index < formData.rows.length) {
          // Handling row changes
          const updatedRows = [...formData.rows];
          updatedRows[index][name] = value;

          setFormData(prevFormData => ({
              ...prevFormData,
              rows: updatedRows,
          }));
      } else {
          // Handling other field changes such as 'modifiedBy' or 'utilityType'
          setFormData(prevData => ({
              ...prevData,
              [name]: value,
          }));
      }
  };


  const onAddRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      rows: [...prevData.rows, { priceRange: "", basePrice: "", unitPrice: "" }],
    }));
  };


  const onSubmitHandler = (event) => {
    event.preventDefault();
    setFormErrors(validate(formData));

      const utilityData = {
        utilityType: formData.utilityType,
        modifiedBy: formData.modifiedBy,
      };
      const priceData = formData.rows.map(row => ({
        priceRange: row.priceRange,
        basePrice: row.basePrice,
        unitPrice: row.unitPrice,
      }));
  
      try {
        const response = axios.post('http://localhost:3001/finance/utilityDetails', { utilityData, priceData });
        console.log(response.data);
        // navigate('/finance/viewUtilityDetails');
        setIsSubmit(true);
          
      } catch (error) {
        console.error('Error:', error);
      }

   
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.table(formData);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    // For check the price fields get double values only
    const price_regex = /^-?\d+(\.\d+)?$/;

    if (!values.utilityType) {
      errors.utilityType = "Please select Utility Type * ";
    }
    if (!values.priceRange) {
      errors.priceRange = "Please Enter The Price Range *";
    }
    if (!values.basePrice) {
      errors.basePrice = "Please Enter Base Price *";
    } else if (!price_regex.test(values.basePrice)) {
      errors.basePrice = "Enter a valid Base Price";
    }
    if (!values.unitPrice) {
      errors.unitPrice = "Please Enter Unit Price *";
    } else if (!price_regex.test(values.unitPrice)) {
      errors.unitPrice = "Enter a valid Date of Birth";
    }
    if (!values.modifiedBy) {
      errors.modifiedBy = "Please Enter Your ID *";
    }

    return errors;
  };

  return (
    <div className="FormContainer">
      <form className="MainForm" onSubmit={onSubmitHandler} method="get">
        <div className="inputItem">
          <InputLabel htmlFor="utilityType" className="namesTag">
            Utility Type
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="utilityType"
            onChange={onChangeHandler}
            value={formData.utilityType}
          />
        </div>
        <p>{formErrors.utilityType}</p>

        <div >
          {formData.rows.map((row, index) => (
            <div key={index}>
                <InputLabel htmlFor="utilityType" className="namesTag">
                    Unit Range
                </InputLabel>
                <TextField
                    id={`unitRange-${index}`}
                    className="textFieldComponent"
                    name="priceRange"
                    onChange={(event) => onChangeHandler(event, index)}
                    value={row.priceRange} 
                />
                <InputLabel htmlFor="utilityType" className="namesTag">
                    Base Price
                </InputLabel>
                <TextField
                    id={`basePrice-${index}`}
                    className="textFieldComponent"
                    name="basePrice"
                    onChange={(event) => onChangeHandler(event, index)}
                    value={row.basePrice} 
                />
                <InputLabel htmlFor="unitPrice" className="namesTag">
                    Unit Price
                </InputLabel>
                <TextField
                    id={`unitPrice-${index}`}
                    className="textFieldComponent"
                    name="unitPrice"
                    onChange={(event) => onChangeHandler(event, index)}
                    value={row.unitPrice} 
                />
            </div>
          ))}
        </div>
        <Grid container justifyContent="flex-start">
                    <Grid item>
                        {/* Add Row link */}
                        <Link component="button" variant="body2" onClick={onAddRow}>
                            {/* Add Row <KeyboardArrowDownRounded /> */}
                            <AddRangeButton />
                        </Link>
                    </Grid>
                </Grid>

        <div className="inputItem">
            <InputLabel htmlFor="modifiedBy" className="namesTag">
                Modified By
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

export default UtilityDetailsAddNewForm;
