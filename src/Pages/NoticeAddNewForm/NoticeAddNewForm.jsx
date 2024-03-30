import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../Component/Buttons/SaveButton";
import BackButton from "../../Component/Buttons/BackButton";
//import "./FormDesigns.css";
// import "../../Component/Forms/FormDesigns.css";

function NoticeAddNewForm() {
  const [formData, setFormData] = useState({
    noticeType: "",
    noticeTitle: "",
    startDate: "",
    endDate: "",
    description: "",
    status: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.table(formData);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.noticeType) {
      errors.noticeType = "Please Select Notice Type *";
    }
    if (!values.noticeTitle) {
      errors.noticeTitle = "Please Enter Notice Title *";
    }
    if (!values.startDate) {
      errors.startDate = "Please Enter Start Date *";
    }
    if (!values.description) {
      errors.description = "Please Enter Description *";
    }
    if (!values.status) {
      errors.status = "Please Select Status *";
    }
    return errors;
  };

  return (
    <div className="FormContainer">
      <form className="MainForm" onSubmit={onSubmitHandler} method="get">

        <div className="inputItem">
          <InputLabel className="namesTag">Notice Type :</InputLabel>
          <Select
            className="SelectformComponent"
            name="noticeType"
            onChange={onChangeHandler}
            value={formData.noticeType}
          >
            <MenuItem value="" className="optionContainer">
              Select Notice Type
            </MenuItem>
            <MenuItem
              value="proposal"
              name="proposal"
              className="optionContainer"
            >
              Proposal
            </MenuItem>
            <MenuItem
              value="announcement"
              name="announcement"
              className="optionContainer"
            >
              Announcement
            </MenuItem>
            <MenuItem
              value="other"
              name="other"
              className="optionContainer"
            >
              Other
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.noticeType}</p>

        <div className="inputItem">
          <InputLabel htmlFor="noticeTitle" className="namesTag">
          Notice Title :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="noticeTitle"
            onChange={onChangeHandler}
            value={formData.noticeTitle}
          />
        </div>
        <p>{formErrors.noticeTitle}</p>

        <div className="inputItem">
          <InputLabel htmlFor="startDate" className="namesTag">
          Start Date :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="date"
            className="textFieldComponent"
            name="startDate"
            onChange={onChangeHandler}
            value={formData.startDate}
          />
        </div>
        <p>{formErrors.startDate}</p>

        <div className="inputItem">
          <InputLabel htmlFor="endDate" className="namesTag">
          End Date :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="date"
            className="textFieldComponent"
            name="endDate"
            onChange={onChangeHandler}
            value={formData.endDate}
          />
        </div>
        <p>{formErrors.endDate}</p>

        

        <div className="inputItem">
          <InputLabel htmlFor="description" className="namesTag">
            Description :
          </InputLabel>
          <TextField
            type="textarea"
            id="outlined-basic"
            className="textFieldComponent"
            name="description"
            onChange={onChangeHandler}
            value={formData.description}
          />
        </div>
        <p>{formErrors.description}</p>

        <div className="inputItem">
          <InputLabel className="namesTag">Status :</InputLabel>
          <Select
            className="SelectformComponent"
            name="status"
            onChange={onChangeHandler}
            value={formData.status}
          >
            <MenuItem value="" className="optionContainer">
              Select Complaint Status
            </MenuItem>
            <MenuItem value="notYet" name="notYet" className="optionContainer">
              Not Yet
            </MenuItem>
            <MenuItem
              value="approved"
              name="approved"
              className="optionContainer"
            >
              Approved
            </MenuItem>
            <MenuItem value="closed" name="closed" className="optionContainer">
              Closed
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.status}</p>

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

export default NoticeAddNewForm;
