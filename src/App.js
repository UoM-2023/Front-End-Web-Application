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
import UtilityCharges from "./Pages/FinancePage/UtilityCharges/UtilityCharges";
import ResidentPaymentsAddNewForm from "./Pages/FinancePage/ResidentPaymentsAddNewForm/ResidentPaymentsAddNewForm";
import AddNewExpenseForm from "./Pages/FinancePage/ExpenseAddNewForm/AddNewExpenseForm";
import Expenses from "./Pages/FinancePage/Expenses/Expenses";
import Revenue from "./Pages/FinancePage/Revenue/Revenue";
import RevenueAddNewForm from "./Pages/FinancePage/RevenueAddNewForm/RevenueAddNewForm";
import UtilityChargesAddNewForm from "./Pages/FinancePage/UtilityChargesAddNewForm/UtilityChargesAddNewForm";
import ResidentialUnits from "./ResidentialUnits";
import TestForm from "./Component/TestForm";
import Warnings from "./Pages/FinancePage/Warnings/Warnings";
import MiniDrawer from "./Component/SideBar/MiniDrawer";
import { BrowserRouter, Router, Routes } from "react-router-dom";
import Minibar from "./Pages/FinancePage/Mininavbar/Minibar";
import Routers from "./Routes/Routes";

function App() {
  return (
    <>
      <div className="appContainer">
        {/* <LoginPage/> */}
        {/* <Dashboard /> */}
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
        {/* <UtilityCharges/> */}
        {/* <ResidentPaymentsAddNewForm/> */}
        {/* <AddNewExpenseForm /> */}
        {/* <Expenses />
        <Revenue /> */}
        {/* <UtilityCharges/> */}
        {/* <RevenueAddNewForm/> */}
        {/* <UtilityChargesAddNewForm /> */}
        {/* <ResidentialUnits /> */}
        <MiniDrawer />
        {/* <Warnings /> */}
        {/* q */}
        
      </div>
    </>
  );
}

export default App;
