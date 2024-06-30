import React, { useState } from "react";
import "./SettingsPage.css";
import LoadingIndicator from "../../Component/Loading Indicator/LoadingIndicator";
import { Grid, InputLabel, TextField } from "@mui/material";
import CancelButton from "../../Component/Buttons/CancelButton";
import SuccessAlertDialog from "../../Component/Dialogs/SuccessAlertDialog";
import axios from "axios";
import UpdatePasswordButn from "../../Component/Buttons/UpdatePasswordButn";
import axiosInstance from "../LoginPage/LoginServices/authService";

function SettingsPage(user) {
  const UserID = localStorage.getItem("userId");
  const UserRole = localStorage.getItem("role");

  const [formData, setFormData] = useState({
    oldPassword: "",
    userPassword: "",
    Confirmpassword: "",
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

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const errors = validate(formData);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        const response = await axiosInstance.put(
          `/Settings/updateUserCredentials/${UserID}`,
          {
            oldPassword: formData.oldPassword,
            userPassword: formData.userPassword,
          }
        );
        console.log("Update successful:", response.data);
        setSuccessMessage(response.data.message);
        setOpenDialog(true);
      } catch (error) {
        console.error("Failed to update data:", error);
        setFormErrors({ ...errors, apiError: error.response.data.message });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.oldPassword) {
      errors.oldPassword = "Old Password is required *";
    }
    if (!values.userPassword) {
      errors.userPassword = "Password is required *";
    } else if (values.userPassword.length < 8) {
      errors.userPassword = "Password must be more than 8 characters *";
    }
    if (!values.Confirmpassword) {
      errors.Confirmpassword = "Confirm your Password ";
    } else if (values.Confirmpassword !== values.userPassword) {
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
      oldPassword: "",
      userPassword: "",
      Confirmpassword: "",
    });
    setFormErrors({});
  };

  return (
    <div className="SettingsPageContainer">
      <div className="Formcontainer">
        <div className="pageTitle">
          <h2>Profile Settings</h2>
        </div>
        <div className="pageTopContent">
          <span className="loginDetailsText">
            <b>User Name:</b> {UserID}
          </span>
          <span className="loginDetailsText">
            <b>User Role:</b> {UserRole}
          </span>
        </div>
        {isLoading && <LoadingIndicator />}
        <form className="MainForm" onSubmit={onSubmitHandler} method="get">
          <div className="Password">
            <InputLabel htmlFor="OldPassword" className="namesTag">
              Old Password :
            </InputLabel>
            <TextField
              id="outlined-basic"
              type="password"
              className="textFieldComponent"
              name="oldPassword"
              onChange={onChangeHandler}
              value={formData.oldPassword}
            />
            <p>{formErrors.oldPassword}</p>
          </div>
          <div className="Password">
            <InputLabel htmlFor="userPassword" className="namesTag">
              New Password :
            </InputLabel>
            <TextField
              id="outlined-basic"
              type="password"
              className="textFieldComponent"
              name="userPassword"
              onChange={onChangeHandler}
              value={formData.userPassword}
            />
            <p>{formErrors.userPassword}</p>
          </div>
          <div className="ConfirmuserPassword">
            <InputLabel htmlFor="Confirmpassword" className="namesTag">
              Confirm New Password :
            </InputLabel>
            <TextField
              id="outlined-basic"
              type="password"
              className="textFieldComponent"
              name="Confirmpassword"
              onChange={onChangeHandler}
              value={formData.Confirmpassword}
            />
            <p>{formErrors.Confirmpassword}</p>
          </div>
          <div className="buttonSection">
            <Grid container spacing={2}>
              <Grid item>
                <div>
                  <UpdatePasswordButn />
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

export default SettingsPage;
