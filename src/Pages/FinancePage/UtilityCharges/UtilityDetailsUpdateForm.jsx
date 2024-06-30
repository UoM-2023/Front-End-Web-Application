import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../LoginPage/LoginServices/authService";
import SuccessAlertDialog from "../../../Component/Dialogs/SuccessAlertDialog";
import LoadingIndicator from "../../../Component/Loading Indicator/LoadingIndicator";

function UtilityDetailsUpdateForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    utility_name: "",
    priceRange: "",
    basePrice: "",
    unitPrice: "",
    modifiedBy: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current id", id);
    if (id) {
      console.log("Update Fund useEffect");
      axiosInstance
        .get(`/finance/utilityDetails/${id}`)
        .then((response) => {
          console.log("Response", response);
          const { data } = response;
          console.log("Response data", data);

          if (response) {
            const { result } = data;
            console.log(result);
            // console.log("Response Dumb",utilityData[0].utility_name);
            setFormData({
              utility_name: result.utility_name,
              priceRange: "",
              basePrice: "",
              unitPrice: "",
              modifiedBy: "",
            });
          } else {
            console.error("Data structure does not match expected format");
          }
        })
        .catch((err) => console.error("Failed to fetch Data...", err))
        .finally(() => setIsLoading(false));
    }
  }, []);

  const onChangeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmit(true);
    setIsLoading(true);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axiosInstance.put(
          `/finance/updateutilityDetails`,
          formData
        );
        console.log(response);
        setIsSubmit(true);
        setSuccessMessage(response.data.message);
      } catch (error) {
        console.error("There was an error updating the data!", error);
      } finally {
        setIsLoading(false);
      }
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

    if (!values.utility_name) {
      errors.utility_name = "Please select Utility Type * ";
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

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/finance/utilitycharges/viewUtilityDetails");
  };

  const handleResetForm = () => {
    setFormData({
      utility_name: "",
      priceRange: "",
      basePrice: "",
      unitPrice: "",
      modifiedBy: "",
    });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleOpenDialog();
    }
  }, [formErrors, isSubmit]);

  return (
    <div
      className="FormContainer"
      style={{
        position: "relative",
        marginTop: "2rem",
        marginLeft: "6rem",
      }}
    >
      {isLoading && <LoadingIndicator />}
      <form className="MainForm" onSubmit={onSubmitHandler} method="get">
        {/* <div className="inputItem">
          <InputLabel className="namesTag">Utility Type :</InputLabel>
          <Select
            className="SelectformComponent"
            name="utilityType"
            onChange={onChangeHandler}
            value={formData.utilityType}
          >
            <MenuItem value="" className="optionContainer">
              Select Utility Type
            </MenuItem>
            <MenuItem value="gas" name="gas" className="optionContainer">
              Gas
            </MenuItem>
            <MenuItem value="water" name="water" className="optionContainer">
              Water
            </MenuItem>
            <MenuItem
              value="electricity"
              name="electricity"
              className="optionContainer"
            >
              Electricity
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.utilityType}</p> */}

        <div className="inputItem">
          <InputLabel htmlFor="utilityTypejs" className="namesTag">
            Utility Type :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="utility_name"
            onChange={onChangeHandler}
            value={formData.utility_name}
          />
        </div>

        <div className="inputItem">
          <InputLabel className="namesTag">Price Range :</InputLabel>
          <Select
            className="SelectformComponent"
            name="priceRange"
            onChange={onChangeHandler}
            value={formData.priceRange}
          >
            <MenuItem value="" className="optionContainer">
              Select Price Range
            </MenuItem>
            <MenuItem value="0-30" name="0-30" className="optionContainer">
              0 - 30
            </MenuItem>
            <MenuItem value="31-60" name="31-60" className="optionContainer">
              31 - 60
            </MenuItem>
            <MenuItem value="61-90" name="61-90" className="optionContainer">
              61 - 90
            </MenuItem>
            <MenuItem value="91-120" name="91-120" className="optionContainer">
              91 - 120
            </MenuItem>
            <MenuItem
              value="121-180"
              name="121-180"
              className="optionContainer"
            >
              121 - 180
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.priceRange}</p>

        <div className="inputItem">
          <InputLabel htmlFor="basePrice" className="namesTag">
            Base Price :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="basePrice"
            onChange={onChangeHandler}
            value={formData.basePrice}
          />
        </div>
        <p>{formErrors.basePrice}</p>

        <div className="inputItem">
          <InputLabel htmlFor="unitPrice" className="namesTag">
            Unit Price :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="unitPrice"
            onChange={onChangeHandler}
            value={formData.unitPrice}
          />
        </div>
        <p>{formErrors.unitPrice}</p>

        <div className="inputItem">
          <InputLabel htmlFor="modifiedBy" className="namesTag">
            Modified By :
          </InputLabel>
          <TextField
            // type="number"
            // min="0.00"
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
      {openDialog && (
        <SuccessAlertDialog
          handleClose={handleCloseDialog}
          handleReset={handleResetForm}
          message={successMessage}
        />
      )}
    </div>
  );
}

export default UtilityDetailsUpdateForm;
