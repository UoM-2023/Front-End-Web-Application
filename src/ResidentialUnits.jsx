// import { useState, useEffect } from "react";
// import { Box, Grid, InputLabel, MenuItem, Select } from "@mui/material";
// import SaveButton from "./Component/Buttons/SaveButton";
// import BackButton from "./Component/Buttons/BackButton";
// // import "./ResidentialUnits.css";

// function ResidentialUnits() {
//   const [formData, setFormData] = useState({
//     building: "",
//     block: "",
//     unitCategory: "",
//     unit: "",
//     status: "", 
//   });

//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);

//   const onChangeHandler = (event) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [event.target.name]: event.target.value,
//     }));
//   };

//   const onSubmitHandler = (event) => {
//     event.preventDefault();
//     setFormErrors(validate(formData));
//     setIsSubmit(true);
//   };

//   useEffect(() => {
//     if (Object.keys(formErrors).length === 0 && isSubmit) {
//       console.table(formData);
//     }
//   }, [formErrors]);

//   const validate = (values) => {
//     const errors = {};

//     if (!values.building) {
//       errors.building = "Please select Building * ";
//     }
//     if (!values.block) {
//       errors.block = "Please select Block Number * ";
//     }
//     if (!values.unitCategory) {
//       errors.unitCategory = "Please select Unit Category *";
//     }
//     if (!values.unit) {
//       errors.unit = "Please select Unit Number *";
//     }
//     if (!values.status) {
//       errors.status = "Please select Status *";
//     }
//     return errors;
//   };

//   return (
//     <>
//       <Box className="formContainer">
//         <form className="MainForm" onSubmit={onSubmitHandler} method="get">
//           <Box className="inputItems">
//             <InputLabel htmlFor="building" className="namesTag">
//               Building:
//             </InputLabel>
//             <Select
//               className="selectItems"
//               name="building"
//               onChange={onChangeHandler}
//               value={formData.building}
//             >
//               <MenuItem value="" className="optionContainer">
//                 Select Building
//               </MenuItem>
//               <MenuItem value="Wing 01" className="optionContainer">
//                 Wing 01
//               </MenuItem>
//               <MenuItem value="Wing 02" className="optionContainer">
//                 Wing 02
//               </MenuItem>
//               <MenuItem value="Wing 03" className="optionContainer">
//                 Wing 03
//               </MenuItem>
//               <MenuItem value="Wing 04" className="optionContainer">
//                 Wing 04
//               </MenuItem>
//             </Select>
//           </Box>
//           <p>{formErrors.building}</p>

//           <Box className="inputItems">
//             <InputLabel htmlFor="Block" className="namesTag">
//               Block:
//             </InputLabel>
//             <Select
//               className="selectItems"
//               name="block"
//               onChange={onChangeHandler}
//               value={formData.block}
//             >
//               <MenuItem value="" className="optionContainer">
//                 Select Block
//               </MenuItem>
//               <MenuItem value="Block 01" className="optionContainer">
//                 Block 01
//               </MenuItem>
//               <MenuItem value="Block 02" className="optionContainer">
//                 Block 02
//               </MenuItem>
//               <MenuItem value="Block 03" className="optionContainer">
//                 Block 03
//               </MenuItem>
//               <MenuItem value="Block 04" className="optionContainer">
//                 Block 04
//               </MenuItem>
//             </Select>
//           </Box>
//           <p>{formErrors.block}</p>

//           <Box className="inputItems">
//             <InputLabel htmlFor="Unit" className="namesTag">
//               Unit:
//             </InputLabel>
//             <Select
//               className="selectItems"
//               name="unit"
//               onChange={onChangeHandler}
//               value={formData.unit}
//             >
//               <MenuItem value="" className="optionContainer">
//                 Select Unit
//               </MenuItem>
//               <MenuItem value="Unit 01" className="optionContainer">
//                 Unit 01
//               </MenuItem>
//               <MenuItem value="Unit 02" className="optionContainer">
//                 Unit 02
//               </MenuItem>
//               <MenuItem value="Unit 03" className="optionContainer">
//                 Unit 03
//               </MenuItem>
//               <MenuItem value="Unit 04" className="optionContainer">
//                 Unit 04
//               </MenuItem>
//             </Select>
//           </Box>
//           <p>{formErrors.unit}</p>

//           <Box className="inputItems">
//             <InputLabel htmlFor="UnitCategory" className="namesTag">
//               Unit Category:
//             </InputLabel>
//             <Select
//               className="selectItems"
//               name="unitCategory"
//               onChange={onChangeHandler}
//               value={formData.unitCategory}
//             >
//               <MenuItem value="" className="optionContainer">
//                 Select Unit Category
//               </MenuItem>
//               <MenuItem value="Bed Room Type 01" className="optionContainer">
//                 Bed Room Type 01
//               </MenuItem>
//               <MenuItem value="Bed Room Type 02" className="optionContainer">
//                 Bed Room Type 02
//               </MenuItem>
//               <MenuItem value="Bed Room Type 03" className="optionContainer">
//                 Bed Room Type 03
//               </MenuItem>
//               <MenuItem value="Bed Room Type 04" className="optionContainer">
//                 Bed Room Type 04
//               </MenuItem>
//             </Select>
//           </Box>
//           <p>{formErrors.unitCategory}</p>

//           <Box className="inputItems">
//             <InputLabel htmlFor="Status" className="namesTag">
//               Status:
//             </InputLabel>
//             <Select
//               className="selectItems"
//               name="status"
//               onChange={onChangeHandler}
//               value={formData.status}
//             >
//               <MenuItem value="" className="optionContainer">
//                 Select Status
//               </MenuItem>
//               <MenuItem value="Available" className="optionContainer">
//                 Available
//               </MenuItem>
//               <MenuItem value="Not Available" className="optionContainer">
//                 Not Available
//               </MenuItem>
//             </Select>
//           </Box>
//           <p>{formErrors.status}</p>

//           <div>
//             <Grid container spacing={2}>
//               <Grid item>
//                 <div>
//                   <SaveButton />
//                 </div>
//               </Grid>
//               <Grid item>
//                 <BackButton />
//               </Grid>
//             </Grid>
//           </div>
//         </form>

//         {Object.keys(formErrors).length === 0 && isSubmit ? (
//           <h3 className="success message">Successfully Added </h3>
//         ) : (
//           <pre> </pre>
//         )}
//       </Box>
//     </>
//   );
// }

// export default ResidentialUnits;
