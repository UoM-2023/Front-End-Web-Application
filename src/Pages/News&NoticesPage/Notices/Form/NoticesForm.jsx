import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../../Component/Buttons/SaveButton";
import BackButton from "../../../../Component/Buttons/BackButton";
import "./NoticesForm.css"; 
import TopBar from "../../../../Component/TopBar/TopBar";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';


function NoticesForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

    // Initialize Socket.IO client
    const socket = io('http://localhost:3001/newsNotices/newNotice');

    useEffect(() => {
      // Set up Socket.IO event listeners
      socket.on('connect', () => {
        console.log('Connected to backend');
      });
  
      socket.on('noticeUpdated', (data) => {
        console.log('Notice updated:', data);
        // Handle the notice update (e.g., show a notification or update state)
      });
  
      // Clean up Socket.IO event listeners on component unmount
      return () => {
        socket.off('connect');
        socket.off('noticeUpdated');
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
    axios.post('http://localhost:3001/newsNotices/newNotice', formData)
    .then(res => {
      console.log(res);
      navigate('/news & notices')
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

    if (!values.type) {
      errors.type = "Please select Notice Type * ";
    }
    if (!values.title) {
      errors.title = "Please Enter Notice Title *";
    }
    if (!values.description) {
      errors.description = "Please Enter Description *";
    }
    return errors;
  };

  return (
    <>
    <TopBar title="News & Notices" /> 
    <div className="FormContainer">
      <form className="MainForm" onSubmit={onSubmitHandler} method="get">
        <div className="inputItem">
          <InputLabel className="namesTag">Notice Type :</InputLabel>
          <Select
            className="SelectformComponent"
            name="type"
            onChange={onChangeHandler}
            value={formData.type}
          >
            <MenuItem value="" className="optionContainer">
              Select Notice Type
            </MenuItem>
            <MenuItem value="emergency" name="emergency" className="optionContainer">
              Emergency
            </MenuItem>
            <MenuItem value="announcement" name="announcement" className="optionContainer">
              Announcement
            </MenuItem>
            <MenuItem value="proposal" name="proposal" className="optionContainer">
              Proposal
            </MenuItem>
            <MenuItem value="emergency" name="emergency" className="optionContainer">
              Emergency
            </MenuItem>
            <MenuItem value="other" name="other" className="optionContainer">
              Other
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.type}</p>

        <div className="inputItem">
          <InputLabel htmlFor="title" className="namesTag">
            Notice Title :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="title"
            onChange={onChangeHandler}
            value={formData.title}
          />
        </div>
        <p>{formErrors.title}</p>

        <div className="inputItem">
          <InputLabel htmlFor="description" className="namesTag">
            Description :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="description"
            onChange={onChangeHandler}
            value={formData.description}
          />
        </div>
        <p>{formErrors.description}</p>


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

export default NoticesForm;
