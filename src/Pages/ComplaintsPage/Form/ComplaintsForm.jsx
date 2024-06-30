import io from "socket.io-client";
import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
import "./ComplaintsForm.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "../../../Component/Loading Indicator/LoadingIndicator";
import SuccessAlertDialog from "../../../Component/Dialogs/SuccessAlertDialog";

// const socket = io('http://localhost:3001'); // Update with your server's URL

function ComplaintsForm() {
  const navigate = useNavigate();
  const { Reference_id } = useParams();
  const [formData, setFormData] = useState({
    Nature: "",
    Title: "",
    Complained_by: "",
    C_Description: "",
    CStatus: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [messages, setMessages] = useState([]); // State to hold received messages
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // useEffect(() => {
  //   // Listen for 'receiveMessage' events from server
  //   socket.on('receiveMessage', (message) => {
  //     console.log('Received message:', message);
  //     // Update messages state with new message
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   });

  //   // Clean up socket connection on component unmount
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    console.log("Current Reference_id:", Reference_id);
    if (Reference_id) {
      // Check if there is an ID, which means we are in "edit" mode
      console.log("Form useEffect call");
      axios
        .get(`http://localhost:3001/complaints/newComplaint/${Reference_id}`)
        .then((response) => {
          console.log("Response:", response);
          const { data } = response;
          console.log("Log has called", data);

          // Assuming your response data structure is correct
          if (data && data.result && data.result.length > 0) {
            const complaintData = data.result[0]; // Accessing the first item in the array
            console.log("Staff Data:", complaintData);

            const NatureValue =
              complaintData.Nature === "Complaint"
                ? "Complaint"
                : complaintData.Nature;

            const CStatusValue =
              complaintData.CStatus === "Complaint"
                ? "Complaint"
                : complaintData.CStatus;

            setFormData({
              // Reference_id: complaintData.Reference_id,
              Nature: NatureValue,
              Title: complaintData.Title,
              Complained_by: complaintData.Complained_by,
              C_Description: complaintData.C_Description,
              CStatus: CStatusValue,
            });
          } else {
            console.error("Data structure does not match expected format");
          }
        })
        .catch((err) => console.error("Failed to fetch Data...", err))
        .finally(() => setIsLoading(false));
    }
  }, [Reference_id]);

  const onChangeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  // const onSubmitHandler = (event) => {
  //   event.preventDefault();
  //   axios.post('http://localhost:3001/complaints/newComplaint', formData)
  //   .then(res => {
  //     console.log(res);
  //     // Emit a notification event
  //     socket.emit('sendNotification', { message: 'New complaint received!', complaint: formData });
  //     navigate('/complaints')
  //   })
  //   .catch(err => console.log(err));
  //   setFormErrors(validate(formData));
  //   setIsSubmit(true);
  // };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmit(true);
    setIsLoading(true);

    if (Reference_id) {
      // If there is an ID, it means we're editing existing data, so send a PUT request
      axios
        .put(
          `http://localhost:3001/complaints/newComplaint/${[Reference_id]}`,
          formData
        )
        .then((res) => {
          console.log("Update successful:", res.data);
          setIsSubmit(true);
          setSuccessMessage(res.data.message);
          //navigate("/staffDetails/addNewStaff");
        })
        .catch((err) => console.error("Failed to update data:", err))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // If there is no ID, it means we're creating new data, so send a POST request
      axios
        .post("http://localhost:3001/complaints/newComplaint", formData)
        .then((res) => {
          console.log("Create Successful:", res.data);
          setIsSubmit(true);
          setSuccessMessage(res.data.message);
          //navigate("/staffDetails/addNewStaff");
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

    if (!values.Nature) {
      errors.Nature = "Please select Complaint Nature * ";
    }
    if (!values.Title) {
      errors.Title = "Please enter Complaint Title *";
    }
    if (!values.Complained_by) {
      errors.Complained_by = "Please Enter Complainer Unit ID *";
    }
    if (!values.C_Description) {
      errors.C_Description = "Please enter Description *";
    }
    if (!values.CStatus) {
      errors.CStatus = "Please select Status * ";
    }
    return errors;
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/complaints");
  };

  const handleResetForm = () => {
    setFormData({
      Nature: "",
      Title: "",
      Complained_by: "",
      C_Description: "",
      CStatus: "",
    });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleOpenDialog();
    }
  }, [formErrors, isSubmit]);

  return (
    <>
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
            <InputLabel className="namesTag">Complaints Nature :</InputLabel>
            <Select
              className="SelectformComponent"
              name="Nature"
              onChange={onChangeHandler}
              value={formData.Nature}
            >
              <MenuItem value="" className="optionContainer">
                Select Complaint
              </MenuItem>
              <MenuItem
                value="Complaint"
                name="Complaint"
                className="optionContainer"
              >
                Complaint
              </MenuItem>
              <MenuItem
                value="Suggestions"
                name="Suggestions"
                className="optionContainer"
              >
                Suggestions
              </MenuItem>
              <MenuItem
                value="Requests"
                name="Requests"
                className="optionContainer"
              >
                Requests
              </MenuItem>
            </Select>
          </div>
          <p>{formErrors.Nature}</p>

          <div className="inputItem">
            <InputLabel htmlFor="Title" className="Title">
              Complaint Title :
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="textFieldComponent"
              name="Title"
              onChange={onChangeHandler}
              value={formData.Title}
            />
          </div>
          <p>{formErrors.Title}</p>

          <div className="inputItem">
            <InputLabel htmlFor="Complained_by" className="Complained_by">
              Complained By (Unit ID) :
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="textFieldComponent"
              name="Complained_by"
              onChange={onChangeHandler}
              value={formData.Complained_by}
            />
          </div>
          <p>{formErrors.Complained_by}</p>

          <div className="inputItem">
            <InputLabel htmlFor="C_Description" className="C_Description">
              Description :
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="textFieldComponent"
              name="C_Description"
              onChange={onChangeHandler}
              value={formData.C_Description}
            />
          </div>
          <p>{formErrors.C_Description}</p>

          <div className="inputItem">
            <InputLabel className="namesTag">Status :</InputLabel>
            <Select
              className="SelectformComponent"
              name="CStatus"
              onChange={onChangeHandler}
              value={formData.CStatus}
            >
              <MenuItem value="" className="optionContainer">
                Select Status
              </MenuItem>
              <MenuItem value="Open" name="Open" className="optionContainer">
                Open
              </MenuItem>
              <MenuItem
                value="Closed"
                name="Closed"
                className="optionContainer"
              >
                Closed
              </MenuItem>
            </Select>
          </div>
          <p>{formErrors.CStatus}</p>

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
    </>
  );
}
export default ComplaintsForm;
