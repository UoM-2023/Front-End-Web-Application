// import * as React from "react";
// import "./StaffList.css";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import EditButton from "../../../Component/Buttons/EditButton";
// import DeleteButton from "../../../Component/Buttons/DeleteButton";
// import SearchBar from "../../../Component/SearchBar/SearchBar";
// import AddNewButton from "../../../Component/Buttons/AddNewButton";
// import { useEffect } from "react";
// import axios from "axios";
// import { useState } from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [&.${tableCellClasses.head}]: {
//     backgroundColor: "#f9f4f0",
//     color: "#605D5D",
//     fontSize: "16px",
//     fontWeight: "bold",
//   },
//   [&.${tableCellClasses.body}]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(even)": {
//     backgroundColor: "#ECE1D9",
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// function StaffList() {
//   const [stafflist, setStafflist] = useState([]);
//   const [open, setOpen] = React.useState(false);
//   const [staffID, setStaffID] = useState("");

//   const onClickRowDelete = (rowid) => {
//     setStaffID(rowid);
//     handleClickOpen();
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   useEffect(() => {
//     console.log("frontend use effect");
//     getStaffDetails();
//   }, []);

//   // Get the data from the backend to front end

//   const getStaffDetails = () => {
//     axios
//       .get("http://localhost:3001/staffDetails/addNewStaff")
//       .then((response) => {
//         console.log("CALLED");
//         console.log(response);
//         setStafflist(response.data.result);
//       })
//       .catch((error) => console.log(error));
//   };

//   // Handling the edit button (primary key)

//   const handleEdit = (staffID) => {
//     console.log("Hanlde Edit Before axios");
//     axios
//       .get(
//         `/staffDetails/addNewStaff/updateStaff/${staffID}`
//       )
//       .then((response) => {
//         console.log("Hanlde Edit Called");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   // Handling the Delete button (primary key)

//   const handleDelete = (staffID) => {
//     axios
//       .delete(
//         `http://localhost:3001/staffDetails/addNewStaff/deleteStaff/${[
//           staffID,
//         ]}`
//       )
//       .then((response) => {
//         console.log("Hanlde Delete Called");
//         window.location.reload();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div className="unitListContainer">
//       <div className="pageTop">
//         <SearchBar />
//         <AddNewButton route="/staff details/addNewStaff" />
//       </div>

//       {/* Staff Details Table */}

//       <TableContainer component={Paper}>
//         <Table
//           sx={{
//             maxWidth: "93.5vw",
//             marginTop: 5,
//             marginLeft: 9.5,
//             marginRight: 0,
//             paddingTop: "100px",
//           }}
//           aria-label="customized table"
//         >
//           <TableHead>
//             <TableRow>
//               {/* <StyledTableCell align="left">#No</StyledTableCell> */}
//               <StyledTableCell align="left">Staff ID</StyledTableCell>
//               <StyledTableCell align="left">Name</StyledTableCell>
//               <StyledTableCell align="left">NIC</StyledTableCell>
//               <StyledTableCell align="left">Staff Role</StyledTableCell>
//               <StyledTableCell align="left">Mobile No</StyledTableCell>
//               <StyledTableCell align="left">Email</StyledTableCell>
//               <StyledTableCell align="left">City</StyledTableCell>
//               <StyledTableCell align="left">Action</StyledTableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {stafflist &&
//               stafflist.map((apartflowtesting, index) => {
//                 return (
//                   <StyledTableRow key={index}>
//                     <StyledTableCell>
//                       {apartflowtesting.staffID}
//                     </StyledTableCell>
//                     <StyledTableCell>
//                       {apartflowtesting.name_with_initials}
//                     </StyledTableCell>
//                     <StyledTableCell>{apartflowtesting.nic}</StyledTableCell>
//                     <StyledTableCell>
//                       {apartflowtesting.staff_category}
//                     </StyledTableCell>
//                     <StyledTableCell>
//                       {apartflowtesting.mobile_no}
//                     </StyledTableCell>
//                     <StyledTableCell>{apartflowtesting.email}</StyledTableCell>
//                     <StyledTableCell>{apartflowtesting.city}</StyledTableCell>
//                     <StyledTableCell
//                       sx={{
//                         display: "flex",
//                         gap: "0.3rem",
//                       }}
//                     >
//                       <EditButton //front end route edit
//                         route={`/staff details/updateStaff/${[
//                           apartflowtesting.staffID,
//                         ]}`}
//                         onClick={() => handleEdit([apartflowtesting.staffID])}
//                       />
//                       <DeleteButton
//                         onClick={() =>
//                           onClickRowDelete(apartflowtesting.staffID)
//                         }
//                       />
//                     </StyledTableCell>
//                   </StyledTableRow>
//                 );
//               })}
//           </TableBody>

//           {/* Delete Button Dialog */}

//           <div className="Delete Dialog">
//             <React.Fragment>
//               <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//               >
//                 <DialogTitle id="alert-dialog-title">
//                   {"Delete staff member"}
//                 </DialogTitle>
//                 <DialogContent>
//                   <DialogContentText id="alert-dialog-description">
//                     Are you sure you want to delete this?
//                   </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                   <Button onClick={handleClose}>No</Button>
//                   <Button onClick={() => handleDelete(staffID)} autoFocus>
//                     Yes
//                   </Button>
//                 </DialogActions>
//               </Dialog>
//             </React.Fragment>
//           </div>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }

// export default StaffList;



// ///////////////////////////////sample tex t edit part ///////////




// import React, { useEffect, useState } from "react";
// import {
//   Outlet,
//   Route,
//   BrowserRouter as Router,
//   Routes,
// } from "react-router-dom";
// import ResidentsPayments from "../Pages/FinancePage/ResidentsPayments/ResidentsPayments";
// import UtilityCharges from "../Pages/FinancePage/UtilityCharges/UtilityCharges";
// import Expenses from "../Pages/FinancePage/Expenses/Expenses";
// import Revenue from "../Pages/FinancePage/Revenue/Revenue";
// import Warnings from "../Pages/FinancePage/Warnings/Warnings";
// import EditFunds from "../Pages/FinancePage/AddNewFund/EditFunds";
// import ExpensesAddNewForm from "../Pages/FinancePage/ExpenseAddNewForm/ExpensesAddNewForm";
// import ResidentsPaymentsForm from "../Pages/FinancePage/ResidentPaymentsAddNewForm/ResidentsPaymentsForm";
// import UtilityForm from "../Pages/FinancePage/UtilityChargesAddNewForm/UtilityForm";
// import EditFundsAddNew from "../Pages/FinancePage/AddNewFund/EditFundFrom/EditFundsAddNew";
// import RevenueForm from "../Pages/FinancePage/RevenueAddNewForm/RevenueForm";
// import RequestsTable from "../Pages/MaintenancePage/RequestsTable/RequestsTable";
// import RequestsForm from "../Pages/MaintenancePage/RequestsAddNewForm/RequestsForm";
// import CompletedResidentRequestTable from "../Pages/MaintenancePage/CompletedResidentRequestTable/CompletedResidentRequestTable";
// import CompleteResidentReqForm from "../Pages/MaintenancePage/CompletedResidentRequestForm/CompleteResidentReqForm";
// import InternalMaintenanceTable from "../Pages/MaintenancePage/InternalMaintenanceTable/InternalMaintenanceTable";
// import InternalMaintenanceForm from "../Pages/MaintenancePage/InternalMaintenanceAddNewForm/InternalMaintenanceForm";
// import StaffList from "../Pages/StaffDetails/StaffTableView/StaffList";
// import StaffDetailsAddNewForm from "../Pages/StaffDetails/AddNewStaffMember/StaffDetailsAddNewForm";
// import Dashboard from "../Pages/DashboardPage/Dashboard";
// import UnitList from "../Pages/ResidentInfoPage/UnitTableView/UnitList";
// import ResidentInfoAddNew from "../Pages/ResidentInfoPage/NewMemberForm/ResidentInfoAddNew";
// import MemberList from "../Pages/ResidentInfoPage/Member List/MemberList";
// import TopBar from "../Component/TopBar/TopBar";
// import DashBoard from "../Pages/DashBoard/DashBoard";
// import ResidentialUnitsTable from "../Pages/ResidentialUnitsPage/Table/ResidentialUnitsTable";
// import ResidentialUnitsForm from "../Pages/ResidentialUnitsPage/Form/ResidentialUnitsForm";
// import ComplaintsTable from "../Pages/ComplaintsPage/Table/ComplaintsTable";
// import ComplaintsForm from "../Pages/ComplaintsPage/Form/ComplaintsForm";
// import NoticesTable from "../Pages/News&NoticesPage/Notices/Table/NoticesTable";
// import NoticesForm from "../Pages/News&NoticesPage/Notices/Form/NoticesForm";
// import EventsTable from "../Pages/News&NoticesPage/Events/Table/EventsTable";
// import EventsForm from "../Pages/News&NoticesPage/Events/Form/EventsForm";
// import UtilityDetails from "../Pages/FinancePage/UtilityCharges/UtilityDetails";
// import UtilityDetailsUpdateForm from "../Pages/FinancePage/UtilityCharges/UtilityDetailsUpdateForm";
// import UtilityDetailsAddNewForm from "../Pages/FinancePage/UtilityCharges/UtilityDetailsAddNew";
// import { setAuthToken } from "../Pages/LoginPage/LoginServices/authService";
// import LoginPage from "../Pages/LoginPage/LoginPage";
// import ResidentUserCredentialsFrom from "../Pages/UserCredentialsPage/ResidentUserCredentialsFrom";
// import StaffUserCredentialsFrom from "../Pages/UserCredentialsPage/StaffUserCredentialsFrom";
// import SettingsPage from "../Pages/SettingsPage/SettingsPage";

// const Routers = ({ user, setUser }) => {
//   return (
//     <div>
//       <Routes>
//         <Route path="/login" element={<LoginPage setUser={setUser} />} />
//         {/* Dashboard */}
//         <Route path="/dashboard" element={<DashBoard />} />

//         {/* Finance Page Routs and its sub routes */}
//         <Route path="/finance" element={<Outlet />}>
//           <Route index element={<ResidentsPayments />} />
//           <Route path="addNew" element={<ResidentsPaymentsForm />} />

//           {/* Utility payment section */}
//           <Route path="utilitycharges" element={<Outlet />}>
//             <Route index element={<UtilityCharges />} />
//             <Route path="addUtility" element={<UtilityForm />} />
//             <Route path="viewUtilityDetails" element={<UtilityDetails />} />
//             <Route
//               path="addNewUtilityType"
//               element={<UtilityDetailsAddNewForm />}
//             />
//             <Route
//               path="updateUtilityDetails/:id"
//               element={<UtilityDetailsAddNewForm />}
//             />
//           </Route>

//           {/* Expenses routes */}
//           <Route path="expenses" element={<Outlet />}>
//             <Route index element={<Expenses />} />
//             <Route path="addExpense" element={<ExpensesAddNewForm />} />
//             <Route path="updateExpenses/:id" element={<ExpensesAddNewForm />} />
//           </Route>

//           {/* Revenue routes */}
//           <Route path="revenue" element={<Outlet />}>
//             <Route index element={<Revenue />} />
//             <Route path="addRevenue" element={<RevenueForm />} />
//           </Route>

//           {/* Warnings Route */}
//           <Route path="warnings" element={<Warnings />} />
//           {/* <Route path='fundtypes' element={<EditFunds />}/> */}

//           {/* Edit fund route */}
//           <Route path="editFunds" element={<Outlet />}>
//             <Route index element={<EditFunds />} />
//             <Route path="newFund" element={<EditFundsAddNew />} />
//             <Route path="updateFund/:id" element={<EditFundsAddNew />} />
//           </Route>
//         </Route>

//         {/* Maintenance Section Routes */}
//         <Route path="/maintenance" element={<Outlet />}>
//           <Route index element={<RequestsTable />} />
//           <Route path="newRequest" element={<RequestsForm />} />
//           <Route path="updateRequest/:id" element={<RequestsForm />} />

//           {/* Completed Requests */}
//           <Route path="completed" element={<Outlet />}>
//             <Route index element={<CompletedResidentRequestTable />} />
//             <Route
//               path="addNewCompleted"
//               element={<CompleteResidentReqForm />}
//             />
//             <Route
//               path="UpdateCompleted/:id"
//               element={<CompleteResidentReqForm />}
//             />
//           </Route>

//           {/* Internal maintenance */}
//           <Route path="internal" element={<Outlet />}>
//             <Route index element={<InternalMaintenanceTable />} />
//             <Route path="addNew" element={<InternalMaintenanceForm />}></Route>
//           </Route>
//         </Route>

//         {/* Staff Details */}
//         <Route path="/staff details" element={<Outlet />}>
//           <Route index element={<StaffList />} />
//           <Route path="addNewStaff" element={<StaffDetailsAddNewForm />} />
//          {/* //edit route */}
//           <Route
//             path="updateStaff/:staffID"
//             element={<StaffDetailsAddNewForm />}
//           />
//         </Route>

//         {/* Resident Details */}
//         <Route path="/residents information" element={<Outlet />}>
//           <Route index element={<UnitList />} />
//           <Route path="addNewResident" element={<ResidentInfoAddNew />} />
//           <Route
//             path="updateResident/:residentID"
//             element={<ResidentInfoAddNew />}
//           />
//           <Route path="viewResident/:UnitID" element={<MemberList />} />
//         </Route>

//         {/* User Credentials Page Routs and its sub routes */}

//         {/* Residents User Credentials Section */}

//         <Route path="/user credentials" element={<Outlet />}>
//           <Route index element={<ResidentUserCredentialsFrom />} />
//           <Route
//             path="updateResidentUserAccount/:UserID"
//             element={<ResidentUserCredentialsFrom />}
//           />

//           {/* Staff User Credentials Section */}

//           <Route path="StaffUserCredentials" element={<Outlet />}>
//             <Route index element={<StaffUserCredentialsFrom />} />
//             <Route
//               path="updateStaffUserAccount/:UserID"
//               element={<StaffUserCredentialsFrom />}
//             />
//           </Route>
//         </Route>

//         {/* END of User Credentials Page Routs and its sub routes */}

//         {/* Settings Page Routs */}
//         <Route path="/settings" element={<Outlet />}>
//           <Route index element={<SettingsPage />} />
//         </Route>

//         {/* Residential Units Route */}
//         <Route path="/residential units" element={<Outlet />}>
//           <Route index element={<ResidentialUnitsTable />} />
//           <Route
//             path="residentialUnitsForm"
//             element={<ResidentialUnitsForm />}
//           />
//           <Route />
//         </Route>

//         {/* Complaints route */}
//         <Route path="complaints" element={<Outlet />}>
//           <Route index element={<ComplaintsTable />} />
//           <Route path="complaintsForm" element={<ComplaintsForm />} />
//         </Route>

//         {/* News & Notices section */}
//         <Route path="news & notices" element={<Outlet />}>
//           {/* Notices Route */}
//           <Route index element={<NoticesTable />} />
//           <Route path="noticesForm" element={<NoticesForm />} />
//         </Route>

//         {/* Events Route */}
//         <Route path="eventsTable" element={<Outlet />}>
//           <Route index element={<EventsTable />} />
//           <Route path="eventsForm" element={<EventsForm />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// };

// export default Routers;