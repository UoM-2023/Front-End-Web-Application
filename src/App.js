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
import Guest from "./Pages/Guest/Guest";
import Reservation from "./Pages/Reservations/Reservation";
import ReservationTwo from "./Pages/Reservations/ReservationTwo";
import GuestTable from "./Pages/Guest/GuestTable";
import ReservationTable from "./Pages/Reservations/ReservationTable";

function App() {
  return (
    <>
      <div className="appContainer">
        {/* <LoginPage/> */}
        {/* <Dashboard /> */}
        {/* <TopBar /> */}
        {/* <ResidentInforPage/> */}
        {/* <StaffDetails/> */}
        {/* <AddStaff/> */}
        {/* <UnitList /> */}
        {/* <StaffList/> */}
        {/* <Guest/> */}
       {/* <Reservation/> */}
       {/* <ReservationTwo/> */}
        {/* <GuestTable/> */}
        <ReservationTable/>
      </div>
    </>
  );
}

export default App;
