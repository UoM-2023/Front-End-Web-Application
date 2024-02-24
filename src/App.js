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
import ReservationTableTwo from "./Pages/Reservations/ReservationTableTwo";
import SearchBar from "./Component/SearchBar/SearchBar";
import AddNewButton from "./Component/Buttons/AddNewButton";
import MiniDrawer from "./Component/SideBar/MiniDrawer";
import DashBoard from "./Pages/DashBoard/DashBoard";
import TextArea from "./Pages/DashBoard/TextArea";


import MemberList from "./Pages/ResidentInfoPage/Member List/MemberList";
import ResidentsPayments from "./Pages/FinancePage/ResidentsPayments/ResidentsPayments";
import UtilityCharges from "./Pages/FinancePage/UtilityCharges/UtilityCharges";
import ResidentPaymentsAddNewForm from "./Pages/FinancePage/ResidentPaymentsAddNewForm/ResidentPaymentsAddNewForm";
import AddNewExpenseForm from "./Pages/FinancePage/ExpenseAddNewForm/AddNewExpenseForm";
import Expenses from "./Pages/FinancePage/Expenses/Expenses";
import Revenue from "./Pages/FinancePage/Revenue/Revenue";
import RevenueAddNewForm from "./Pages/FinancePage/RevenueAddNewForm/RevenueAddNewForm";
import UtilityChargesAddNewForm from "./Pages/FinancePage/UtilityChargesAddNewForm/UtilityChargesAddNewForm";
import ResidentialUnits from "./ResidentialUnits";
import TestForm from "./Component/TestForm";

import TextAreaTwo from "./Pages/DashBoard/TextAreaTwo";
import PaymentIcon from "./Pages/DashBoard/PaymentIcon";
import Calender from "./Pages/DashBoard/Calender";


function App() {
  return (
    <>
      <div className="appContainer">
        {/* <LoginPage/> */}
        {/* <Dashboard /> */}
        {/* <TopBar /> */}
        {/* <ResidentInforPage/> */}
        {/* <StaffDetails/> */}
        {/* <TopBar title="Finance" /> */}
        {/* <SearchBar/> */}
        {/* <ResidentInforPage /> */}
        {/* <StaffDetails /> */}
        {/* <AddStaff/> */}
        {/* <MemberList /> */}
        {/* <UnitList /> */}
        {/* <StaffList/> */}
        <MiniDrawer/>
         <TopBar title = "DashBoard"/> 
        {/* <Guest/>  */}
       {/* <Reservation/> */}
       {/* <ReservationTwo/> */}
        {/* <GuestTable/> */}
        {/* <ReservationTable/> */}
          {/* <ReservationTableTwo/> */}
          <DashBoard/>
      
      
      
       {/* <TextArea/> */}
      
       {/* <TextAreaTwo/> */}
     {/* <PaymentIcon/> */}
       
       
    
        {/* <AddNewButton/> */}
        {/* <ResidentsPayments/> */}
        {/* <UtilityCharges/> */}
        {/* <ResidentPaymentsAddNewForm/> */}
        {/* <AddNewExpenseForm /> */}
        {/* <Expenses />
        <Revenue /> */}
        {/* <UtilityCharges/> */}
        {/* <RevenueAddNewForm/> */}
        {/* <UtilityChargesAddNewForm /> */}
        {/* <ResidentialUnits /> */}
        {/* q */}
      </div>
    </>
  );
}

export default App;
