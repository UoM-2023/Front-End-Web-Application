import React from "react";
import "./App.css";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Dashboard from "./Pages/DashboardPage/Dashboard";
import ResidentInforPage from "./Pages/ResidentInfoPage/ResidentInforPage";
import StaffDetails from "./Pages/StaffDetails/StaffDetails";
import AddStaff from "./Pages/StaffDetails/AddNewStaffMember/AddStaff";
import UnitList from "./Pages/ResidentInfoPage/UnitTableView/UnitList";
import TopBar from "./Component/TopBar/TopBar";
import StaffList from "./Pages/StaffDetails/StaffTableView/StaffList";
import SearchBar from "./Component/SearchBar/SearchBar";
import AddNewButton from "./Component/Buttons/AddNewButton";
import MemberList from "./Pages/ResidentInfoPage/Member List/MemberList";
import ResidentsPayments from "./Pages/FinancePage/ResidentsPayments/ResidentsPayments";
// <<<<<<< Praneeth
// import Expenses from "./Pages/FinancePage/ResidentsPayments/Expenses";
// import Revenue from "./Pages/FinancePage/ResidentsPayments/Revenue";
// =======
// import UtilityCharges from "./Pages/FinancePage/UtilityCharges/UtilityCharges";
// >>>>>>> main

function App() {
  return (
    <>
      <div className="appContainer">
        {/* <LoginPage/> */}
        <Dashboard />
        <TopBar title="Finance" />
        {/* <SearchBar/> */}
        {/* <ResidentInforPage /> */}
        {/* <StaffDetails /> */}
        {/* <AddStaff/> */}
        {/* <MemberList /> */}
        {/* <UnitList /> */}
        {/* <StaffList/> */}
        {/* <AddNewButton/> */}
        {/* <ResidentsPayments/> */}
// <<<<<<< Praneeth
//         {/* <Expenses /> */}
//         <Revenue />
// =======
//         <UtilityCharges/>
// >>>>>>> main
      </div>
    </>
  );
}

export default App;
