import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "../../../Component/Buttons/SaveButton";
import BackButton from "../../../Component/Buttons/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "../../../Component/Loading Indicator/LoadingIndicator";
import SuccessAlertDialog from "../../../Component/Dialogs/SuccessAlertDialog";

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
            const expensesData = data.result[0]; // Assuming you want the first item from the first array
            console.log("Expenses Data:", expensesData);

            const eTypeValue =
              expensesData.eType === "Maintenance"
                ? "Maintenance"
                : expensesData.eType;

            const payment_methodValue =
              expensesData.payment_method === "Cash"
                ? "Cash"
                : expensesData.payment_method;

            setFormData({
              expense_id: expensesData.expense_id,
              eType: eTypeValue,
              amount: expensesData.amount,
              payment_method: payment_methodValue,
              staff_id: expensesData.staff_id,
              remark: expensesData.remark,
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

    if (id) {
      // If there is an ID, it means we're editing existing data, so send a PUT request
      axios
        .put(
          `http://localhost:3001/finance/expenses/updateExpenses/${id}`,
          formData
        )
        .then((res) => {
          console.log("Update successful:", res.data);
          setIsSubmit(true);
          setSuccessMessage(res.data.message);
          //navigate("/finance/expenses");
        })
        .catch((err) => console.error("Failed to update data:", err))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // If there is no ID, it means we're creating new data, so send a POST request
      axios
        .post("http://localhost:3001/finance/newExpense", formData)
        .then((res) => {
          console.log("Create successful:", res.data);
          setIsSubmit(true);
          setSuccessMessage(res.data.message);
          //navigate("/finance/expenses");
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

    if (!values.eType) {
      errors.eType = "Please select Expense Type * ";
    }
    if (!values.staff_id) {
      errors.staff_id = "Please Enter Staff ID *";
    }
    if (!values.payment_method) {
      errors.payment_method = "Please Select Payment Method *";
    }
    if (!values.amount) {
      errors.amount = "Please Enter Amount *";
    }
    if (!values.remark) {
      errors.remark = "Please Enter Remark *";
    }
    return errors;
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/finance/expenses");
  };

  const handleResetForm = () => {
    setFormData({
      amount: "",
      eType: "",
      payment_method: "",
      staff_id: "",
      remark: "",
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
          <InputLabel className="namesTag">Expense Type :</InputLabel>
          <Select
            className="SelectformComponent"
            name="eType"
            onChange={onChangeHandler}
            value={formData.eType}
          >
            <MenuItem value="" className="optionContainer">
              Select Expenses Type
            </MenuItem>
            <MenuItem
              value="Maintenance"
              name="Maintenance"
              className="optionContainer"
            >
              Maintenance
            </MenuItem>
            <MenuItem
              value="Cleaning"
              name="Cleaning"
              className="optionContainer"
            >
              Cleaning
            </MenuItem>
            <MenuItem value="Other" name="Other" className="optionContainer">
              Other
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.eType}</p>

        <div className="inputItem">
          <InputLabel htmlFor="staff_id" className="namesTag">
            Staff ID :
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="textFieldComponent"
            name="staff_id"
            onChange={onChangeHandler}
            value={formData.staff_id}
          />
        </div>
        <p>{formErrors.staff_id}</p>

        <div className="inputItem">
          <InputLabel className="namesTag">Payment Method :</InputLabel>
          <Select
            className="SelectformComponent"
            name="payment_method"
            onChange={onChangeHandler}
            value={formData.payment_method}
          >
            <MenuItem value="" className="optionContainer">
              Select Payment Method
            </MenuItem>
            <MenuItem value="Cash" name="Cash" className="optionContainer">
              Cash
            </MenuItem>
            <MenuItem value="Card" name="Card" className="optionContainer">
              Card
            </MenuItem>
            <MenuItem value="Cheque" name="Cheque" className="optionContainer">
              Cheque
            </MenuItem>
          </Select>
        </div>
        <p>{formErrors.payment_method}</p>

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
        <p>{formErrors.remark}</p>

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

export default ExpensesAddNewForm;
