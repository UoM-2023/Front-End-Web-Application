import React, { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CreateAccButton from "../../Component/Buttons/CreateAccButton";
import CancelButton from "../../Component/Buttons/CancelButton";
import SuccessAlertDialog from "../../Component/Dialogs/SuccessAlertDialog";
import LoadingIndicator from "../../Component/Loading Indicator/LoadingIndicator";
import MinibarUserCredentials from "./Minibar UserCredentials/MinibarUserCredentials";
import TopBar from "../../Component/TopBar/TopBar";

function ResidentUserCredentialsFrom() {
  const { UserID } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    UserID: "",
    userRole: "Resident",
    userPassword: "",
    Confirmpassword: "",
    added_time: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Current User ID:", UserID);
    if (UserID) {
      console.log("Form useEffect call");
      axios
        .get(
          `http://localhost:3001/staffDetails/addNewStaff/updateStaff/${UserID}`
        )
        .then((response) => {
          console.log("Response:", response);
          const { data } = response;
          console.log("Log has called", data);

          if (data && data.result && data.result.length > 0) {
            const userData = data.result[0][0];
            const userCategoryValue =
              userData.userRole === "Admin" ? "Admin" : userData.userRole;

            setFormData({
              userRole: userCategoryValue,
              userPassword: userData.userPassword,
            });
          }
        })
        .catch((err) => console.error("Failed to fetch Data...", err));
    }
  }, [UserID]);

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

    if (UserID) {
      axios
        .put(
          `http://localhost:3001/userCredentials/NewUserCredentials/updateUserCredentials/${UserID}`,
          formData
        )
        .then((res) => {
          console.log("Update successful:", res.data);
          setIsSubmit(true);
          setSuccessMessage(res.data.message);
        })
        .catch((err) => console.error("Failed to update data:", err))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      axios
        .post(
          "http://localhost:3001/userCredentials/NewUserCredentials/",
          formData
        )
        .then((res) => {
          console.log("Create Successful:", res.data);
          setIsSubmit(true);
          setSuccessMessage(res.data.message);
        })
        .catch((err) => console.error("Failed to Create data:", err))
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

    if (!values.UserID) {
      errors.UserID = "Please Enter Unit ID *";
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
      UserID: "",
      userRole: "Resident",
      userPassword: "",
      Confirmpassword: "",
      added_time: "",
    });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleOpenDialog();
    }
  }, [formErrors, isSubmit]);

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
            <InputLabel htmlFor="UserID" className="namesTag">
              Unit ID (UserID) :
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="textFieldComponent"
              name="UserID"
              onChange={onChangeHandler}
              value={formData.UserID}
            />
          </div>
          <p>{formErrors.UserID}</p>

          <div className="Password">
            <InputLabel htmlFor="userPassword" className="namesTag">
              Password :
            </InputLabel>
            <TextField
              id="outlined-basic"
              type="password"
              className="textFieldComponent"
              name="userPassword"
              onChange={onChangeHandler}
              value={formData.userPassword}
            />
          </div>
          <p>{formErrors.userPassword}</p>

          <div className="ConfirmuserPassword">
            <InputLabel htmlFor="Confirmpassword" className="namesTag">
              Confirm userPassword :
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
