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
import DeleteButton from "./Component/Buttons/DeleteButton";
import RequestsTable from "./Pages/MaintenancePage/RequestsTable/RequestsTable";
import InternalMaintenanceTable from "./Pages/MaintenancePage/InternalMaintenanceTable/InternalMaintenanceTable";
import RequestsAddNewForm from "./Pages/MaintenancePage/RequestsAddNewForm/RequestsAddNewForm";
import InternalMaintenanceAddNewForm from "./Pages/MaintenancePage/InternalMaintenanceAddNewForm/InternalMaintenanceAddNewForm";
import CompletedResidentRequestTable from "./Pages/MaintenancePage/CompletedResidentRequestTable/CompletedResidentRequestTable";
import CompletedResidentRequestForm from "./Pages/MaintenancePage/CompletedResidentRequestForm/CompletedResidentRequestForm";
import BackButton from "./Component/Buttons/BackButton";
import CancelButton from "./Component/Buttons/CancelButton";
import EditButton from "./Component/Buttons/EditButton";
import SaveButton from "./Component/Buttons/SaveButton";
import ViewButton from "./Component/Buttons/ViewButton";
import SubmitButton from "./Component/Buttons/SubmitButton";

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
        {/* <UtilityCharges/> */}
        {/* <ResidentPaymentsAddNewForm/>
        <AddNewExpenseForm />
        <Expenses /> */}
        {/* <Revenue /> */}
        {/* <UtilityCharges/> */}
        {/* <RevenueAddNewForm/> */}
        <UtilityChargesAddNewForm />
        {/* <ResidentialUnits /> */}
        {/* <RequestsTable /> */}
        <InternalMaintenanceTable />
        {/* <RequestsAddNewForm/> */}
        {/* <InternalMaintenanceAddNewForm/> */}
        {/* <CompletedResidentRequestTable /> */}
        {/* <CompletedResidentRequestForm /> */}
      </div>
    </>
  );
}

export default App;
