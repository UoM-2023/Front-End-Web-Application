import React, { useState, useEffect } from "react";
import { Grid, InputLabel, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CreateAccButton from "../../Component/Buttons/CreateAccButton";
import CancelButton from "../../Component/Buttons/CancelButton";
import SuccessAlertDialog from "../../Component/Dialogs/SuccessAlertDialog";
import LoadingIndicator from "../../Component/Loading Indicator/LoadingIndicator";
import MinibarUserCredentials from "./Minibar UserCredentials/MinibarUserCredentials";

function ResidentUserCredentialsFrom() {
  const { userID } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userID: "",
    role: "Resident",
    password: "",
    Confirmpassword: "",
    added_time: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const errors = validate(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
      setIsLoading(true);

      axios
        .post("http://localhost:3001/auth/register", formData)
        .then((res) => {
          console.log("Create Successful:", res.data);
          setSuccessMessage(res.data.message);
          handleOpenDialog();
        })
        .catch((err) => console.error("Failed to Create data:", err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.table(formData);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.userID) {
      errors.userID = "Please Enter Unit ID *";
    }
    if (!values.password) {
      errors.password = "Password is required *";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters *";
    }
    if (!values.Confirmpassword) {
      errors.Confirmpassword = "Confirm your Password ";
    } else if (values.Confirmpassword !== values.password) {
      errors.Confirmpassword = "Passwords did not match *";
    }
    return errors;
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleResetForm = () => {
    setFormData({
      userID: "",
      role: "Resident",
      password: "",
      Confirmpassword: "",
      added_time: "",
    });
  };

  const handleCancel = () => {
    handleResetForm();
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="ResidentUserCredentialsFromContainer">
      <MinibarUserCredentials />
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
            <InputLabel htmlFor="userID" className="namesTag">
              User Name :
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="textFieldComponent"
              name="userID"
              onChange={onChangeHandler}
              value={formData.userID}
            />
          </div>
          <p>{formErrors.userID}</p>

          <div className="Password">
            <InputLabel htmlFor="password" className="namesTag">
              Password :
            </InputLabel>
            <TextField
              id="outlined-basic"
              type="password"
              className="textFieldComponent"
              name="password"
              onChange={onChangeHandler}
              value={formData.password}
            />
          </div>
          <p>{formErrors.password}</p>

          <div className="Confirmpassword">
            <InputLabel htmlFor="Confirmpassword" className="namesTag">
              Confirm password :
            </InputLabel>
            <TextField
              id="outlined-basic"
              type="password"
              className="textFieldComponent"
              name="Confirmpassword"
              onChange={onChangeHandler}
              value={formData.Confirmpassword}
            />
          </div>
          <p>{formErrors.Confirmpassword}</p>

          <div className="buttonSection">
            <Grid container spacing={2}>
              <Grid item>
                <div>
                  <CreateAccButton />
                </div>
              </Grid>
              <Grid item>
                <CancelButton handleCancel={handleResetForm} />
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
    </div>
  );
}

export default ResidentUserCredentialsFrom;
