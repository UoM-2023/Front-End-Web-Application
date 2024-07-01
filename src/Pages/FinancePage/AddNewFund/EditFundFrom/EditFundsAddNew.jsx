import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../../Component/Buttons/SaveButton";
import BackButton from "../../../../Component/Buttons/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "../../../../Component/Loading Indicator/LoadingIndicator";
import SuccessAlertDialog from "../../../../Component/Dialogs/SuccessAlertDialog";
import axiosInstance from "../../../LoginPage/LoginServices/authService";

function EditFundsAddNew() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fundName: "",
    chargedBy: "",
    amount: "",
    timePeriod: "",
    modifiedBy: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current ID:", id);
    if (id) {
      // Check if there is an ID, which means we are in "edit" mode
      console.log("Form useEffect cal");
      axiosInstance
        .get(`/finance/editFunds/${id}`)
        .then((response) => {
          console.log("Response:", response);
          const { data } = response;
          console.log("Log has called", data);

          // Assuming your response data structure is correct
          if (data && data.result && data.result.length > 0) {
            const fundData = data.result[0][0]; // Assuming you want the first item from the first array
            const chargedByValue =
              fundData.chargedBy === "All Units"
                ? "All Units"
                : fundData.chargedBy;
            setFormData({
              fundName: fundData.fundName,
              chargedBy: chargedByValue,
              amount: fundData.amount,
              timePeriod: fundData.timePeriod,
              modifiedBy: fundData.modified_by,
            });
          } else {
            console.error("Data structure does not match expected format");
          }
        })
        .catch((err) => console.error("Failed to fetch data", err))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

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
    setIsLoading(true);

    // axios.post('http://localhost:3001/finance/editFunds',formData)
    // .then(res => console.log('RES::::::::',res.data))
    // .catch(err => console.log(err))

    // setIsSubmit(true);
    // navigate("/finance/editFunds");
    if (id) {
      // If there is an ID, it means we're editing existing data, so send a PUT request
      axiosInstance
        .put(
          `/finance/editFunds/updateFund/${id}`,
          formData
        )
        .then((res) => {
          console.log("Update successful:", res.data);
          setIsSubmit(true);
          setSuccessMessage(res.data.message);
          //navigate("/finance/editFunds");
        })
        .catch((err) => console.error("Failed to update data:", err))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // If there is no ID, it means we're creating new data, so send a POST request
      axiosInstance
        .post("/finance/editFunds", formData)
        .then((res) => {
          console.log("Create successful:", res.data);
          setIsSubmit(true);
          setSuccessMessage(res.data.message);
          //navigate("/finance/editFunds");
        })
        .catch((err) => console.error("Failed to create data:", err))
        .finally(() => {
          setIsLoading(false);
        });
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

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/finance/editFunds");
  };

  const handleResetForm = () => {
    setFormData({
      fundName: "",
      chargedBy: "",
      amount: "",
      timePeriod: "",
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
            value={formData.chargedBy || ""}
          >
            <MenuItem value="" className="optionContainer">
              Select Charging Units
            </MenuItem>
            <MenuItem
              value="All Units"
              name="allUnits"
              className="optionContainer"
            >
              All Units
            </MenuItem>
            <MenuItem
              value="Type A"
              name="unitAType"
              className="optionContainer"
            >
              Type A
            </MenuItem>
            <MenuItem
              value="Type B"
              name="unitBType"
              className="optionContainer"
            >
              Type B
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
export default EditFundsAddNew;
