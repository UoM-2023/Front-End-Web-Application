import "./AddMember.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import PropTypes from "prop-types";
import { Select as BaseSelect, selectClasses } from "@mui/base/Select";
import { Option as BaseOption, optionClasses } from "@mui/base/Option";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";

const Select = React.forwardRef(function Select(props, ref) {
  const slots = {
    root: CustomButton,
    listbox: Listbox,
    popup: Popup,
    ...props.slots,
  };

  return <BaseSelect {...props} ref={ref} slots={slots} />;
});

function AddMember() {
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

  const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
  ))(({ theme }) => ({
    "& .MuiFilledInput-root": {
      overflow: "hidden",
      borderRadius: 4,
      backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
      border: "1px solid",
      borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      "&:hover": {
        backgroundColor: "transparent",
      },
      "&.Mui-focused": {
        backgroundColor: "transparent",
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  const ValidationTextField = styled(TextField)({
    "& input:valid + fieldset": {
      borderColor: "#E0E3E7",
      borderWidth: 1,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 1,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 4,
      padding: "4px !important", // override inline-style
    },
  });

  const [formData, setFormData] = useState({
    building: "",
    block: "",
    unitCategory: "",
    unit: "",
    fName: "",
    mName: "",
    lName: "",
    gender: "",
    dob: Date,
    nic: "",
    memberType: "",
    email: "",
    mobileNo: "",
    address: "",
    username: "",
    password: "",
    img: "",
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
    console.table(formData, validate(formData), "kjjj");
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
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const nic_regex = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/m;
    const mobileno_regex = /^(?:\+94|0)([1-9][0-9]{8})$/;
    const dob_regex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if (!values.building) {
      errors.building = "Please select Building * ";
    }
    if (!values.block) {
      errors.block = "Please select Block Number * ";
    }
    if (!values.unitCategory) {
      errors.unitCategory = "Please select Unit Category *";
    }
    if (!values.unit) {
      errors.unit = "Please select Unit Number *";
    }
    if (!values.fName) {
      errors.fName = "Please Enter First Name *";
    }
    if (!values.mName) {
      errors.mName = "Please Enter Middle Name *";
    }
    if (!values.lName) {
      errors.lName = "Please Enter Last Name *";
    }
    if (!values.gender) {
      errors.gender = "Please select Gender *";
    }
    if (!values.dob && values.dob) {
      errors.dob = "Please Enter Date of birth *";
    } else if (!dob_regex.test(values.dob)) {
      errors.dob = "Enter a valid Date of Birth";
    }
    if (!values.nic) {
      errors.nic = "NIC is required *";
    } else if (!nic_regex.test(values.nic)) {
      errors.nic = "Enter a valid NIC";
    }
    if (!values.memberType) {
      errors.memberType = "Please select Member Type *";
    }
    if (!values.email) {
      errors.email = "Email is required *";
    } else if (!email_regex.test(values.email)) {
      errors.email = "Enter a valid email";
    }
    if (!values.mobileNo) {
      errors.mobileNo = "Mobile Number is required *";
    } else if (!mobileno_regex.test(values.mobileNo)) {
      errors.mobileNo = "Enter a valid Mobile Number";
    }
    if (!values.address) {
      errors.address = "Address is required *";
    }
    if (!values.username) {
      errors.username = "UserName is required *";
    }
    if (!values.password) {
      errors.password = "Password is required *";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    }
    if (!values.img) {
      errors.img = "Please Upload Resident's Image file *";
    }
    return errors;
  };

  return (
    <div className="AddMemberFormContainer">
      <Box component="form" noValidate>
        <div className="input-item">
          <InputLabel shrink htmlFor="inputBox" sx={{ fontSize: "20px" }}>
            Building :
          </InputLabel>
          <Select
            name="building"
            sx={{
              width: "33.6vw",
              height: "6.4vh",
              backgroundColor: "#e8eaf6",
            }}
          >
            <Option value="Wing1">Wing 01</Option>
            <Option value="wing2">Wing 02</Option>
            <Option value="wing3">Wing 03</Option>
            <Option value="wing4">Wing 04</Option>
          </Select>
        </div>
        <p>{formErrors.building}</p>

        <div className="input-item">
          <InputLabel shrink htmlFor="inputBox" sx={{ fontSize: "20px" }}>
            Block :
          </InputLabel>
          <Select
            name="block"
            sx={{
              width: "33.6vw",
              height: "6.4vh",
              backgroundColor: "#e8eaf6",
            }}
          >
            <Option value="block1">Block 01</Option>
            <Option value="block2">Block 02</Option>
            <Option value="block3">Block 03</Option>
            <Option value="block4">Block 04</Option>
          </Select>
        </div>
        <p>{formErrors.block}</p>

        <div className="input-item">
          <InputLabel shrink htmlFor="inputBox" sx={{ fontSize: "20px" }}>
            Unit Category :
          </InputLabel>
          <Select
            name="unitCategory"
            sx={{
              width: "33.6vw",
              height: "6.4vh",
              backgroundColor: "#e8eaf6",
            }}
          >
            <Option value="br1">Bed Room 01</Option>
            <Option value="br2">Bed Room 02</Option>
            <Option value="br3">Bed Room 03</Option>
            <Option value="br4">Bed Room 04</Option>
          </Select>
        </div>
        <p>{formErrors.unitCategory}</p>

        <div className="input-item">
          <InputLabel shrink htmlFor="inputBox" sx={{ fontSize: "20px" }}>
            Unit :
          </InputLabel>
          <Select
            name="unit"
            sx={{
              width: "33.6vw",
              height: "6.4vh",
              backgroundColor: "#e8eaf6",
            }}
            onChange={onChangeHandler}
            value={formData.unit}
          >
            <Option value="unit1">Unit 01</Option>
            <Option value="unit2">Unit 02</Option>
            <Option value="unit3">Unit 03</Option>
            <Option value="unit4">Unit 04</Option>
          </Select>
        </div>
        <p>{formErrors.unit}</p>

        <div className="input-item">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="fName" sx={{ fontSize: "20px" }}>
              First Name :
            </InputLabel>
            <BootstrapInput
              id="inputBox"
              name="fName"
              type="text"
              onChange={onChangeHandler}
              value={formData.fName}
            />
          </FormControl>
          <p>{formErrors.fName}</p>
        </div>

        <div className="input-item">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="inputBox" sx={{ fontSize: "20px" }}>
              Middle Name :
            </InputLabel>
            <BootstrapInput
              id="inputBox"
              name="mName"
              onChange={onChangeHandler}
              value={formData.mName}
            />
          </FormControl>
        </div>
        <p>{formErrors.mName}</p>

        <div className="input-item">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="inputBox" sx={{ fontSize: "20px" }}>
              Last Name :
            </InputLabel>
            <BootstrapInput
              id="inputBox"
              name="lName"
              onChange={onChangeHandler}
              value={formData.lName}
            />
          </FormControl>
        </div>
        <p>{formErrors.lName}</p>

        <div className="input-item">
          <FormControl>
            <FormLabel id="demo-form-control-label-placement">
              Gender :
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="gender"
              onChange={onChangeHandler}
              value={formData.gender}
            >
              <FormControlLabel
                value="Male"
                name="gender"
                control={<Radio />}
                label="Male"
              />
              <FormControlLabel
                value="Female"
                name="gender"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <p>{formErrors.gender}</p>

        <div className="input-item">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="inputBox" sx={{ fontSize: "20px" }}>
              Date Of Birth :
            </InputLabel>
            <BootstrapInput
              type="date"
              id="inputBox"
              name="dob"
              onChange={onChangeHandler}
              value={formData.dob}
            />
          </FormControl>
        </div>
        <p>{formErrors.dob}</p>

        <div className="input-item">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="inputBox" sx={{ fontSize: "20px" }}>
              NIC :
            </InputLabel>
            <BootstrapInput
              id="inputBox"
              name="nic"
              onChange={onChangeHandler}
              value={formData.nic}
            />
          </FormControl>
        </div>
        <p>{formErrors.nic}</p>

        <div className="input-item">
          <InputLabel shrink htmlFor="inputBox" sx={{ fontSize: "20px" }}>
            Member Type :
          </InputLabel>
          <Select
            name="memberType"
            sx={{
              width: "33.6vw",
              height: "6.4vh",
              backgroundColor: "#e8eaf6",
            }}
          >
            <Option value="owner">Owner</Option>
            <Option value="member01">Member 01</Option>
            <Option value="member02">Member 02</Option>
            <Option value="member03">Member 03</Option>
          </Select>
        </div>
        <p>{formErrors.memberType}</p>

        <div className="input-item">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="inputBox" sx={{ fontSize: "20px" }}>
              E-mail :
            </InputLabel>
            <BootstrapInput
              id="inputBox"
              name="email"
              onChange={onChangeHandler}
              value={formData.email}
            />
          </FormControl>
        </div>
        <p>{formErrors.email}</p>

        <div className="input-item">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="inputBox" sx={{ fontSize: "20px" }}>
              Mobile Number :
            </InputLabel>
            <BootstrapInput
              id="inputBox"
              name="mobileNo"
              onChange={onChangeHandler}
              value={formData.mobileNo}
            />
          </FormControl>
        </div>
        <p>{formErrors.mobileNo}</p>

        <div className="input-item">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="inputBox" sx={{ fontSize: "20px" }}>
              Address :
            </InputLabel>
            <BootstrapInput
              id="inputBox"
              name="address"
              onChange={onChangeHandler}
              value={formData.address}
            />
          </FormControl>
        </div>
        <p>{formErrors.address}</p>

        <div className="input-item">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="inputBox" sx={{ fontSize: "20px" }}>
              User Name :
            </InputLabel>
            <BootstrapInput
              id="inputBox"
              name="username"
              onChange={onChangeHandler}
              value={formData.username}
            />
          </FormControl>
        </div>
        <p>{formErrors.username}</p>

        <div className="input-item">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="inputBox" sx={{ fontSize: "20px" }}>
              Password :
            </InputLabel>
            <BootstrapInput
              type="password"
              id="inputBox"
              name="password"
              onChange={onChangeHandler}
              value={formData.password}
            />
          </FormControl>
        </div>
        <p>{formErrors.password}</p>

        <div className="input-item">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="inputBox" sx={{ fontSize: "20px" }}>
              Upload Image :
            </InputLabel>
            <BootstrapInput
              type="file"
              id="inputBox"
              name="img"
              onChange={onChangeHandler}
              value={formData.img}
            />
          </FormControl>
        </div>
        <p>{formErrors.img}</p>

        <div className="input-item">
          <button className="submit" type="submit" onClick={onSubmitHandler}>
            Add New Staff Member
          </button>
        </div>
      </Box>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <h3 className="success message">Successfully Added Staff Member </h3>
      ) : (
        <pre> </pre>
      )}
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
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &:focus-visible {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }
  `
);

const Popup = styled("div")`
  z-index: 1;
`;

export default AddMember;
