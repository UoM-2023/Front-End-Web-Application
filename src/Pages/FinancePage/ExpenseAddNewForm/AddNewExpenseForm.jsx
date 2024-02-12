import React from "react";
import "./AddNewExpenseForm.css";
import { useState, useEffect } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import PropTypes from "prop-types";
import { Select as BaseSelect, selectClasses } from "@mui/base/Select";
import { Option as BaseOption, optionClasses } from "@mui/base/Option";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import BackButton from "../../../Component/Buttons/BackButton";
import SaveButton from "../../../Component/Buttons/SaveButton";

const Select = React.forwardRef(function Select(props, ref) {
  const slots = {
    root: CustomButton,
    listbox: Listbox,
    popup: Popup,
    ...props.slots,
  };

  return <BaseSelect {...props} ref={ref} slots={slots} />;
});

function AddNewExpenseForm() {
  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#A0AAB4",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#B2BAC2",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#E0E3E7",
      },
      "&:hover fieldset": {
        borderColor: "#B2BAC2",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#6F7E8C",
      },
    },
  });

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
      border: "1px solid",
      borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
      fontSize: 16,
      width: "30rem",
      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  //   const RedditTextField = styled((props) => (
  //     <TextField InputProps={{ disableUnderline: true }} {...props} />
  //   ))(({ theme }) => ({
  //     "& .MuiFilledInput-root": {
  //       overflow: "hidden",
  //       borderRadius: 4,
  //       backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
  //       border: "1px solid",
  //       borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
  //       transition: theme.transitions.create([
  //         "border-color",
  //         "background-color",
  //         "box-shadow",
  //       ]),
  //       "&:hover": {
  //         backgroundColor: "transparent",
  //       },
  //       "&.Mui-focused": {
  //         backgroundColor: "transparent",
  //         boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
  //         borderColor: theme.palette.primary.main,
  //       },
  //     },
  //   }));

  //   const ValidationTextField = styled(TextField)({
  //     "& input:valid + fieldset": {
  //       borderColor: "#E0E3E7",
  //       borderWidth: 1,
  //     },
  //     "& input:invalid + fieldset": {
  //       borderColor: "red",
  //       borderWidth: 1,
  //     },
  //     "& input:valid:focus + fieldset": {
  //       borderLeftWidth: 4,
  //       padding: "4px !important", // override inline-style
  //     },
  //   });

  const [formData, setFormData] = useState({
    chargeType: "",
    unitNumber: "",
    residentName: "",
    paymentMethod: "",
    amount: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const onChangeHandler = (event) => {
    console.log(event);
    setFormData(() => ({
      ...formData,
      [event?.target?.name]: event?.target?.value,
    }));
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.table(formData, validate(formData));
    setFormErrors(validate(formData));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formData);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    // const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // const nic_regex = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/m;
    // const mobileno_regex = /^(?:\+94|0)([1-9][0-9]{8})$/;
    // const dob_regex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if (!values.chargeType) {
      errors.chargeType = "Please select Building * ";
    }
    if (!values.unitNumber) {
      errors.unitNumber = "Please Enter First Name *";
    }
    if (!values.residentName) {
      errors.residentName = "Please Enter Middle Name *";
    }
    if (!values.paymentMethod) {
      errors.paymentMethod = "Please Enter Last Name *";
    }
    if (!values.amount) {
      errors.amount = "Please Enter Amount *";
    }
    return errors;
  };

  return (
    <div className="addNewExpenseFormContainer">
      <Box component="form" noValidate>
        <div className="input-item">
          <InputLabel shrink htmlFor="inputBox" sx={{ fontSize: "20px" }}>
            Expense Type :
          </InputLabel>
          <Select
            name="chargeType"
            onChange={onChangeHandler}
            value={formData.chargeType}
            sx={{
              width: "33.6vw",
              height: "6.4vh",
              backgroundColor: "#e8eaf6",
            }}
          >
            <Option value="gas">Maintenance</Option>
            <Option value="water">Water</Option>
            <Option value="electricity">Electricity</Option>
          </Select>
        </div>
        <p>{formErrors.chargeType}</p>

        <div className="input-item">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="unitNumber" sx={{ fontSize: "20px" }}>
              Unit Number :
            </InputLabel>
            <BootstrapInput
              id="inputBox"
              name="unitNumber"
              type="text"
              onChange={onChangeHandler}
              value={formData.unitNumber}
            />
          </FormControl>
          <p>{formErrors.unitNumber}</p>
        </div>

        <div className="input-item">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="inputBox" sx={{ fontSize: "20px" }}>
              Resident Name :
            </InputLabel>
            <BootstrapInput
              id="inputBox"
              name="residentName"
              onChange={onChangeHandler}
              value={formData.residentName}
            />
          </FormControl>
        </div>
        <p>{formErrors.residentName}</p>

        <div className="input-item">
          <InputLabel shrink htmlFor="inputBox" sx={{ fontSize: "20px" }}>
            Payment Method :
          </InputLabel>
          <Select
            name="paymentMethod"
            onChange={onChangeHandler}
            value={formData.paymentMethod}
            sx={{
              width: "33.6vw",
              height: "6.4vh",
              backgroundColor: "#e8eaf6",
            }}
          >
            <Option value="cash">Cash</Option>
            <Option value="card">Card</Option>
            <Option value="cheque">Cheque</Option>
          </Select>
        </div>
        <p>{formErrors.paymentMethod}</p>

        <div className="input-item">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="inputBox" sx={{ fontSize: "20px" }}>
              Amount (Rs.):
            </InputLabel>
            <BootstrapInput
              id="inputBox"
              name="amount"
              onChange={onChangeHandler}
              value={formData.amount}
            />
          </FormControl>
        </div>
        <p>{formErrors.amount}</p>

        <div className="input-item">
          <div className="inputButtons">
            {/* <button className="submit" type="submit" onClick={onSubmitHandler}>
              Add New Payment
            </button> */}
            <BackButton /> &nbsp; &nbsp;
            <SaveButton onClick={onSubmitHandler} />
          </div>
        </div>
      </Box>
    </div>
  );
}
const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const CustomButton = React.forwardRef(function CustomButton(props, ref) {
  const { ownerState, ...other } = props;
  return (
    <StyledButton type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </StyledButton>
  );
});

CustomButton.propTypes = {
  children: PropTypes.node,
  ownerState: PropTypes.object.isRequired,
};

const StyledButton = styled("button", { shouldForwardProp: () => true })(
  ({ theme }) => `
    position: relative;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    min-width: 320px;
    padding: 8px 12px;
    border-radius: 8px;
    text-align: left;
    line-height: 1.5;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    box-shadow: 0px 2px 4px ${
      theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
    };
  
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }
  
    &.${selectClasses.focusVisible} {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[700] : blue[200]
      };
    }
  
    & > svg {
      font-size: 1rem;
      position: absolute;
      height: 100%;
      top: 0;
      right: 10px;
    }
    `
);

const Listbox = styled("ul")(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 320px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    box-shadow: 0px 2px 4px ${
      theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
    };
    `
);

const Option = styled(BaseOption)(
  ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${optionClasses.selected} {
      background-color: ${
        theme.palette.mode === "dark" ? blue[900] : blue[100]
      };
      color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
    }
  
    &.${optionClasses.highlighted} {
      background-color: ${
        theme.palette.mode === "dark" ? grey[800] : grey[100]
      };
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    }
  
    &:focus-visible {
      outline: 3px solid ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  
    &.${optionClasses.highlighted}.${optionClasses.selected} {
      background-color: ${
        theme.palette.mode === "dark" ? blue[900] : blue[100]
      };
      color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
    }
  
    &.${optionClasses.disabled} {
      color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }
  
    &:hover:not(.${optionClasses.disabled}) {
      background-color: ${
        theme.palette.mode === "dark" ? grey[800] : grey[100]
      };
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    }
    `
);

const Popup = styled("div")`
  z-index: 2;
`;

export default AddNewExpenseForm;
