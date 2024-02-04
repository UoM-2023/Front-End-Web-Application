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


function App() {
  return (
    <>
      <div className="appContainer">
        {/* <LoginPage/> */}
        {/* <Dashboard />
        <TopBar title="Staff Details" /> */}
        {/* <ResidentInforPage/> */}
        {/* <StaffDetails/> */}
        {/* <AddStaff/> */}
        {/* <UnitList /> */}
        {/* <StaffList/> */}
        
        <SearchBar/>

      </div>
    </>
  );
}

export default App;
