import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
import "./FormDesigns.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../LoginPage/LoginServices/authService";
import LoadingIndicator from "../../../Component/Loading Indicator/LoadingIndicator";
import SuccessAlertDialog from "../../../Component/Dialogs/SuccessAlertDialog";

function UtilityForm() {
  const [formData, setFormData] = useState({
    unit_id: "",
    month: "",
    electricityUsage: "",
    waterUsage: "",
    gasUsage: "",
    staffID: "",
    remark: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setFormData((prevFormData) => ({ ...prevFormData, userId }));
    } else {
      console.error("No userId found in localStorage");
    }
  }, []);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    if (!formData) {
      console.error("formData is undefined");
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmit(true);
    setIsLoading(true);
    axiosInstance
      .post("/finance/addUtilityUsage", formData)
      .then((res) => {
        console.log("Create successful:", res.data);
        setIsSubmit(true);
        setSuccessMessage(res.data.message);
        //navigate(-1);
      })
      .catch((err) => {
        console.error("Failed to create data:", err);
        alert("Failed");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.table(formData);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.unit_id) {
      errors.unit_id = "Please Enter Unit ID *";
    }
    if (!values.month) {
      errors.month = "Please Enter Month *";
    }
    if (!values.electricityUsage) {
      errors.electricityUsage = "Please Enter Electricity Usage *";
    }
    if (!values.waterUsage) {
      errors.waterUsage = "Please Enter Water Usage *";
    }
    if (!values.gasUsage) {
      errors.gasUsage = "Please Enter Gas Usage *";
    }
    // if (!values.staffID) {
    //   errors.staffID = "Please Enter Staff ID *";
    // }
    return errors;
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/finance/utilitycharges");
  };

  const handleResetForm = () => {
    setFormData({
      unit_id: "",
      month: "",
      electricityUsage: "",
      waterUsage: "",
      gasUsage: "",
      staffID: "",
      remark: "",
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
        <div className="inputItem">
          <InputLabel htmlFor="unit_id" className="namesTag">
            Unit ID:
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="unit_id"
            onChange={onChangeHandler}
            value={formData.unit_id}
          />
        </div>
        <p>{formErrors.unit_id}</p>

        <div className="inputItem">
          <InputLabel htmlFor="month" className="namesTag">
            Month:
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="month"
            onChange={onChangeHandler}
            value={formData.month}
          />
        </div>
        <p>{formErrors.month}</p>

        <div className="inputItem">
          <InputLabel htmlFor="electricityUsage" className="namesTag">
            Electricity Usage :
          </InputLabel>
          <TextField
            type="number"
            min="0.00"
            id="outlined-basic"
            className="textFieldComponent"
            name="electricityUsage"
            onChange={onChangeHandler}
            value={formData.electricityUsage}
          />
        </div>
        <p>{formErrors.electricityUsage}</p>

        <div className="inputItem">
          <InputLabel htmlFor="waterUsage" className="namesTag">
            Water Usage
          </InputLabel>
          <TextField
            type="number"
            min="0.00"
            id="outlined-basic"
            className="textFieldComponent"
            name="waterUsage"
            onChange={onChangeHandler}
            value={formData.waterUsage}
          />
        </div>
        <p>{formErrors.waterUsage}</p>

        <div className="inputItem">
          <InputLabel htmlFor="gasUsage" className="namesTag">
            Gas Usage
          </InputLabel>
          <TextField
            type="number"
            min="0.00"
            id="outlined-basic"
            className="textFieldComponent"
            name="gasUsage"
            onChange={onChangeHandler}
            value={formData.gasUsage}
          />
        </div>
        <p>{formErrors.gasUsage}</p>

        {/* <div className="inputItem">
          <InputLabel htmlFor="unitId" className="namesTag">
            Staff ID :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="staffID"
            onChange={onChangeHandler}
            value={formData.staffID}
          />
        </div>
        <p>{formErrors.staffID}</p> */}

        <div className="inputItem">
          <InputLabel htmlFor="unitId" className="namesTag">
            Remark :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="remark"
            onChange={onChangeHandler}
            value={formData.remark}
          />
        </div>

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

export default UtilityForm;
