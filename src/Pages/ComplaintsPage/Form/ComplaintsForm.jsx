import io from 'socket.io-client';
import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
import "./ComplaintsForm.css";
import TopBar from "../../../Component/TopBar/TopBar";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:3001'); // Update with your server's URL

function ComplaintsForm() {
  const navigate = useNavigate();
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

  useEffect(() => {
    // Listen for 'receiveMessage' events from server
    socket.on('receiveMessage', (message) => {
      console.log('Received message:', message);
      // Update messages state with new message
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const onChangeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/complaints/newComplaint', formData)
    .then(res => {
      console.log(res);
      // Emit a notification event
      socket.emit('sendNotification', { message: 'New complaint received!', complaint: formData });
      navigate('/complaints')
    })
    .catch(err => console.log(err));
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

    if (!values.Nature) {
        errors.Nature = "Please select Complaint Nature * ";
      }
      if (!values.Title) {
        errors.Title = "Please enter Complaint Title *";
      }
      if (!values.Complained_by) {
        errors.Complained_by = "Please Enter Complainer Name*";
      }
      if (!values.C_Description) {
        errors.C_Description = "Please enter Description *";
      }
      if (!values.CStatus) {
        errors.CStatus = "Please select Status * ";
      }
    return errors;
  };

  return (
    <>
    <TopBar title="Complaints" /> 
    <div className="FormContainer">
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
            <MenuItem value="complaint" name="complaint" className="optionContainer">
              Complaint
            </MenuItem>
            <MenuItem value="suggestions" name="suggestions" className="optionContainer">
              Suggestions
            </MenuItem>
            <MenuItem value="requests" name="requests" className="optionContainer">
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
            value={formData.Title}/>
        </div>
        <p>{formErrors.Title}</p>

        <div className="inputItem">
          <InputLabel htmlFor="Complained_by" className="Complained_by">
            Complained By :
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
            <MenuItem value="open" name="open" className="optionContainer">
              Open
            </MenuItem>
            <MenuItem value="closed" name="closed" className="optionContainer">
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
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <h3 className="success message">Successfully Added </h3>
      ) : (
        <pre> </pre>
      )}
    </div>
    </>
  );
}
export default ComplaintsForm;
