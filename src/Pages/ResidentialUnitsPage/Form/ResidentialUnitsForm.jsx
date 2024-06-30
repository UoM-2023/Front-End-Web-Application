import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
import "./ResidentialUnitsForm.css";
import TopBar from "../../../Component/TopBar/TopBar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "../../../Component/Loading Indicator/LoadingIndicator";
import SuccessAlertDialog from "../../../Component/Dialogs/SuccessAlertDialog";

function ResidentialUnitsForm() {
  const { Unit_id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Unit_id: "",
    Block_no: "",
    Building: "",
    Category: "",
    RStatus: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Current Unit_id:", Unit_id);
    if (Unit_id) {
      // Check if there is an ID, which means we are in "edit" mode
      console.log("Form useEffect call");
      axios
        .get(`http://localhost:3001/residentialUnits/addNewUnit/${Unit_id}`)
        .then((response) => {
          console.log("Response:", response);
          const { data } = response;
          console.log("Log has called", data);

          // Assuming your response data structure is correct
          if (data && data.result && data.result.length > 0) {
            const UnitData = data.result[0]; // Accessing the first item in the array
            console.log("Unit Data:", UnitData);

            const Block_noValue =
              UnitData.Block_no === "Block 01" ? "Block 01" : UnitData.Block_no;

            const BuildingValue =
              UnitData.Building === "Wing 01" ? "Wing 01" : UnitData.Building;

            const CategoryValue =
              UnitData.Category === "Bed Room Type 01"
                ? "Bed Room Type 01"
                : UnitData.Category;

            const RStatusValue =
              UnitData.RStatus === "Available" ? "Available" : UnitData.RStatus;

            setFormData({
              Unit_id: UnitData.Unit_id,
              Block_no: Block_noValue,
              Building: BuildingValue,
              Category: CategoryValue,
              RStatus: RStatusValue,
            });
          } else {
            console.error("Data structure does not match expected format");
          }
        })
        .catch((err) => console.error("Failed to fetch Data...", err))
        .finally(() => setIsLoading(false));
    }
  }, [Unit_id]);

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

    // axios
    //   .post("http://localhost:3001/residentialUnits/addNewUnit", formData)
    //   .then((res) => {
    //     console.log(res);
    //     navigate("/residential units");
    //   })
    //   .catch((err) => console.log(err));
    // setFormErrors(validate(formData));
    // setIsSubmit(true);

    if (Unit_id) {
      // If there is an ID, it means we're editing existing data, so send a PUT request
      axios
        .put(
          `http://localhost:3001/residentialUnits/addNewUnit/${[Unit_id]}`,
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
        .post("http://localhost:3001/residentialUnits/addNewUnit", formData)
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

    if (!values.Building) {
      errors.Building = "Please select Building * ";
    }
    if (!values.Block_no) {
      errors.Block_no = "Please select Block Number * ";
    }
    if (!values.Category) {
      errors.Category = "Please select Unit Category *";
    }
    if (!values.Unit_id) {
      errors.Unit_id = "Please select Unit Number *";
    }
    if (!values.RStatus) {
      errors.RStatus = "Please select Status *";
    }
    return errors;
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/residential units");
  };

  const handleResetForm = () => {
    setFormData({
      Unit_id: "",
      Block_no: "",
      Building: "",
      Category: "",
      RStatus: "",
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
            <InputLabel htmlFor="Unit_id" className="Unit_id">
              Unit ID:
            </InputLabel>
            <TextField
              id="outlined-basic"
              className="textFieldComponent"
              name="Unit_id"
              onChange={onChangeHandler}
              value={formData.Unit_id}
            />
          </div>
          <p>{formErrors.Unit_id}</p>

          <div className="inputItems">
            <InputLabel htmlFor="Block_no" className="namesTag">
              Block:
            </InputLabel>
            <Select
              className="SelectformComponent"
              name="Block_no"
              onChange={onChangeHandler}
              value={formData.Block_no}
            >
              <MenuItem value="" className="optionContainer">
                Select Block
              </MenuItem>
              <MenuItem value="Block 01" className="optionContainer">
                Block 01
              </MenuItem>
              <MenuItem value="Block 02" className="optionContainer">
                Block 02
              </MenuItem>
              <MenuItem value="Block 03" className="optionContainer">
                Block 03
              </MenuItem>
              <MenuItem value="Block 04" className="optionContainer">
                Block 04
              </MenuItem>
            </Select>
          </div>
          <p>{formErrors.Block_no}</p>

          <div className="inputItem">
            <InputLabel className="namesTag">Building :</InputLabel>
            <Select
              className="SelectformComponent"
              name="Building"
              onChange={onChangeHandler}
              value={formData.Building}
            >
              <MenuItem value="" className="optionContainer">
                Select Building
              </MenuItem>
              <MenuItem
                value="Wing 01"
                name="Wing 01"
                className="optionContainer"
              >
                Wing A
              </MenuItem>
              <MenuItem
                value="Wing 02"
                name="Wing 02"
                className="optionContainer"
              >
                Wing B
              </MenuItem>
              <MenuItem
                value="Wing 03"
                name="Wing 03"
                className="optionContainer"
              >
                Wing C
              </MenuItem>
              <MenuItem
                value="Wing 04"
                name="Wing 04"
                className="optionContainer"
              >
                Wing D
              </MenuItem>
            </Select>
          </div>
          <p>{formErrors.Building}</p>

          <div className="inputItems">
            <InputLabel htmlFor="Category" className="namesTag">
              Unit Category:
            </InputLabel>
            <Select
              className="SelectformComponent"
              name="Category"
              onChange={onChangeHandler}
              value={formData.Category}
            >
              <MenuItem value="" className="optionContainer">
                Select Unit Category
              </MenuItem>
              <MenuItem value="Bed Room Type 01" className="optionContainer">
                Bed Room Type 01
              </MenuItem>
              <MenuItem value="Bed Room Type 02" className="optionContainer">
                Bed Room Type 02
              </MenuItem>
              <MenuItem value="Bed Room Type 03" className="optionContainer">
                Bed Room Type 03
              </MenuItem>
              <MenuItem value="Bed Room Type 04" className="optionContainer">
                Bed Room Type 04
              </MenuItem>
            </Select>
          </div>
          <p>{formErrors.Category}</p>

          <div className="inputItems">
            <InputLabel htmlFor="RStatus" className="namesTag">
              Status:
            </InputLabel>
            <Select
              className="SelectformComponent"
              name="RStatus"
              onChange={onChangeHandler}
              value={formData.RStatus}
            >
              <MenuItem value="" className="optionContainer">
                Select Status
              </MenuItem>
              <MenuItem value="Available" className="optionContainer">
                Available
              </MenuItem>
              <MenuItem value="Not Available" className="optionContainer">
                Not Available
              </MenuItem>
            </Select>
          </div>
          <p>{formErrors.RStatus}</p>

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

export default ResidentialUnitsForm;
