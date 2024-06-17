import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ExpensesAddNewForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    expense_id: "",
    amount: "",
    eType: "",
    payment_method: "",
    staff_id: "",
    added_date: "",
    remark: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current expenses ID:", id);
    if (id) {
      // Check if there is an ID, which means we are in "edit" mode
      console.log("Form useEffect cal");
      axios
        .get(`http://localhost:3001/finance/expenses/updateExpenses/${id}`)
        .then((response) => {
          console.log("Response:", response);
          const { data } = response;
          console.log("Log has called", data);

          // Assuming your response data structure is correct expensesData
          if (data && data.result && data.result.length > 0) {
            const expensesData = data.result[0][0]; // Assuming you want the first item from the first array
            const chargedByValue =
              expensesData.chargedBy === "All Units"
                ? "All Units"
                : expensesData.chargedBy;
            setFormData({
              fundName: expensesData.fundName,
              chargedBy: chargedByValue,
              amount: expensesData.amount,
              timePeriod: expensesData.timePeriod,
              modifiedBy: expensesData.modified_by,
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
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.table(formData);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (!values.expenseType) {
      errors.expenseType = "Please select Expense Type * ";
    }
    if (!values.staffID) {
      errors.staffID = "Please Enter Staff ID *";
    }
    if (!values.approvedBy) {
      errors.approvedBy = "Please Enter Approved ID *";
    }
    if (!values.paymentMethod) {
      errors.paymentMethod = "Please Select Payment Method *";
    }
    if (!values.amount) {
      errors.amount = "Please Enter Amount *";
    }
    return errors;
  };

  return (
    <div
      className="FormContainer"
      style={{
        position: "relative",
        marginTop: "2rem",
        marginLeft: "6rem",
      }}
    >
      <form className="MainForm" onSubmit={onSubmitHandler} method="get">
        <div className="inputItem">
          <InputLabel className="namesTag">Expense Type :</InputLabel>
          <Select
            className="SelectformComponent"
            name="expenseType"
            onChange={onChangeHandler}
            value={formData.expenseType}
          >
            <MenuItem value="" className="optionContainer">
              Select Expenses Type
            </MenuItem>
            <MenuItem
              value="maintenance"
              name="maintenance"
              className="optionContainer"
            >
              Maintenance
            </MenuItem>
            <MenuItem
              value="cleaning"
              name="cleaning"
              className="optionContainer"
            >
              Cleaning
            </MenuItem>
            <MenuItem value="other" name="other" className="optionContainer">
              Other
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.expenseType}</p>

        <div className="inputItem">
          <InputLabel htmlFor="staffID" className="namesTag">
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
        <p>{formErrors.staffID}</p>

        <div className="inputItem">
          <InputLabel htmlFor="approvedBy" className="namesTag">
            Approved By :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="approvedBy"
            onChange={onChangeHandler}
            value={formData.approvedBy}
          />
        </div>
        <p>{formErrors.approvedBy}</p>

        <div className="inputItem">
          <InputLabel className="namesTag">Payment Method :</InputLabel>
          <Select
            className="SelectformComponent"
            name="paymentMethod"
            onChange={onChangeHandler}
            value={formData.paymentMethod}
          >
            <MenuItem value="" className="optionContainer">
              Select Payment Method
            </MenuItem>
            <MenuItem value="cash" name="cash" className="optionContainer">
              Cash
            </MenuItem>
            <MenuItem value="card" name="card" className="optionContainer">
              Card
            </MenuItem>
            <MenuItem value="cheque" name="cheque" className="optionContainer">
              Cheque
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.paymentMethod}</p>

        <div className="inputItem">
          <InputLabel htmlFor="amount" className="namesTag">
            Amount (Rs.) :
          </InputLabel>
          <TextField
            id="outlined-basic"
            type="number"
            step="0.01"
            min="0.00"
            placeholder="0.00"
            className="textFieldComponent"
            name="amount"
            onChange={onChangeHandler}
            value={formData.amount}
          />
        </div>
        <p>{formErrors.amount}</p>

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
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <h3 className="success message">Successfully Added </h3>
      ) : (
        <pre> </pre>
      )}
    </div>
  );
}

export default ExpensesAddNewForm;
