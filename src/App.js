import React, { useState } from "react";
import "./App.css";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Dashboard from "./Pages/DashboardPage/Dashboard";
import ResidentInforPage from "./Pages/ResidentInfoPage/ResidentInforPage";
import StaffDetails from "./Pages/StaffDetails/StaffDetails";
import UnitList from "./Pages/ResidentInfoPage/UnitTableView/UnitList";
import TopBar from "./Component/TopBar/TopBar";
import StaffList from "./Pages/StaffDetails/StaffTableView/StaffList";
import SearchBar from "./Component/SearchBar/SearchBar";
import AddNewButton from "./Component/Buttons/AddNewButton";
import MemberList from "./Pages/ResidentInfoPage/Member List/MemberList";
import ResidentsPayments from "./Pages/FinancePage/ResidentsPayments/ResidentsPayments";
import UtilityCharges from "./Pages/FinancePage/UtilityCharges/UtilityCharges";
import Expenses from "./Pages/FinancePage/Expenses/Expenses";
import Revenue from "./Pages/FinancePage/Revenue/Revenue";
// import ResidentialUnits from "./ResidentialUnits";
import RequestsTable from "./Pages/MaintenancePage/RequestsTable/RequestsTable";
import InternalMaintenanceTable from "./Pages/MaintenancePage/InternalMaintenanceTable/InternalMaintenanceTable";
import CompletedResidentRequestTable from "./Pages/MaintenancePage/CompletedResidentRequestTable/CompletedResidentRequestTable";
import Warnings from "./Pages/FinancePage/Warnings/Warnings";
import MiniDrawer from "./Component/SideBar/MiniDrawer";
import { BrowserRouter } from "react-router-dom";
import Minibar from "./Pages/FinancePage/Mininavbar/Minibar";
import Routers from "./Routes/Routes";
import ResidentInfoAddNew from "./Pages/ResidentInfoPage/NewMemberForm/ResidentInfoAddNew";
import StaffDetailsAddNewForm from "./Pages/StaffDetails/AddNewStaffMember/StaffDetailsAddNewForm";
import ExpensesAddNewForm from "./Pages/FinancePage/ExpenseAddNewForm/ExpensesAddNewForm";
import ResidentsPaymentsForm from "./Pages/FinancePage/ResidentPaymentsAddNewForm/ResidentsPaymentsForm";
import RevenueForm from "./Pages/FinancePage/RevenueAddNewForm/RevenueForm";
import RequestsForm from "./Pages/MaintenancePage/RequestsAddNewForm/RequestsForm";
import InternalMaintenanceForm from "./Pages/MaintenancePage/InternalMaintenanceAddNewForm/InternalMaintenanceForm";
import CompleteResidentReqForm from "./Pages/MaintenancePage/CompletedResidentRequestForm/CompleteResidentReqForm";
import EditFundsAddNew from "./Pages/FinancePage/AddNewFund/EditFundFrom/EditFundsAddNew";
import Guest from "./Pages/Guest/Guest";
import GuestFormNew from "./Pages/GuestNew/GuestForm";
import GuestTable from "./Pages/Guest/GuestTable";
import ReservationNewOne from "./Pages/ReservationNew/ReservationNewOne";
import ReservationNewTwo from "./Pages/ReservationNew/ReservationNewTwo";
import DashBoard from "./Pages/DashBoard/DashBoard";
import ResidentialUnitsAddNewForm from "./Pages/ResidentialUnitsAddNewForm/ResidentialUnitsAddNewForm";
import ComplaintAddForm from "./Pages/ComplaintAddNewForm/ComplaintAddForm";
import NoticeAddNewForm from "./Pages/NoticeAddNewForm/NoticeAddNewForm";
import EventsAddNewForm from "./Pages/EventsAddNewForm/EventsAddNewForm";
import ResidentialUnitsForm from "./Pages/ResidentialUnitsPage/Form/ResidentialUnitsForm";
import ResidentialUnitsTable from "./Pages/ResidentialUnitsPage/Table/ResidentialUnitsTable";
import ComplaintsTable from "./Pages/ComplaintsPage/Table/ComplaintsTable";
import NoticesTable from "./Pages/News&NoticesPage/Notices/Table/NoticesTable";
import NoticesForm from "./Pages/News&NoticesPage/Notices/Form/NoticesForm";
import EventsTable from "./Pages/News&NoticesPage/Events/Table/EventsTable";
import EventsForm from "./Pages/News&NoticesPage/Events/Form/EventsForm";
import CollapsibleTable from "./Pages/FinancePage/UtilityCharges/UtilityDetails";
import UtilityDetailsUpdateForm from "./Pages/FinancePage/UtilityCharges/UtilityDetailsUpdateForm";
import UtilityDetailsAddNewForm from "./Pages/FinancePage/UtilityCharges/UtilityDetailsAddNew";


function App() {
  return (
    <>
      <div className="appContainer">
        {/* <LoginPage /> */}
        {/* <Dashboard /> */}
        <TopBar title="Finance" />

        {/* <ResidentInforPage />
        <StaffDetails />
        <MemberList />
        <UnitList />
        <StaffList />
        <AddNewButton />
        <ResidentsPayments />
        <UtilityCharges />
        <Expenses />
        <Revenue />
        <UtilityCharges />
        <RevenueAddNewForm />
        <UtilityChargesAddNewForm />
        <ResidentialUnits />
        <Warnings />
        <RequestsTable />
        <InternalMaintenanceTable />
  <CompletedResidentRequestTable /> */}

        <BrowserRouter>
          <MiniDrawer />
          <Routers />
        {/* <UtilityDetailsUpdateForm /> */}
        {/* <UtilityDetailsAddNewForm /> */}
        </BrowserRouter>

        {/* <Minibar /> *}
           
        {/* <InternalMaintenanceTable /> */}
        {/*<UtilityForm />
        <ResidentInfoAddNew />
        
        <ExpensesAddNewForm />
        <ResidentsPaymentsForm />
        <RevenueForm />
        <RequestsForm />
        <InternalMaintenanceForm /> */}
        {/* <CompleteResidentReqForm />  */}
        {/* <EditFundsAddNew /> */}
        {/* <ResidentialUnitsAddNewForm /> */}
        {/* <ComplaintAddForm/> */}
        {/* <NoticeAddNewForm/> */}
        {/* <EventsAddNewForm/> */}
        {/* <StaffDetailsAddNewForm /> */}
        {/* <MemberList /> */}
        {/* <UnitList /> */}
        
      </div>
    </>
  );
}

export default App;
