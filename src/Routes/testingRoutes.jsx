import React, { useEffect, useState } from "react";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ResidentsPayments from "../Pages/FinancePage/ResidentsPayments/ResidentsPayments";
import UtilityCharges from "../Pages/FinancePage/UtilityCharges/UtilityCharges";
import Expenses from "../Pages/FinancePage/Expenses/Expenses";
import Revenue from "../Pages/FinancePage/Revenue/Revenue";
import EditFunds from "../Pages/FinancePage/AddNewFund/EditFunds";
import ExpensesAddNewForm from "../Pages/FinancePage/ExpenseAddNewForm/ExpensesAddNewForm";
import ResidentsPaymentsForm from "../Pages/FinancePage/ResidentPaymentsAddNewForm/ResidentsPaymentsForm";
import UtilityForm from "../Pages/FinancePage/UtilityChargesAddNewForm/UtilityForm";
import EditFundsAddNew from "../Pages/FinancePage/AddNewFund/EditFundFrom/EditFundsAddNew";
import RevenueForm from "../Pages/FinancePage/RevenueAddNewForm/RevenueForm";
import RequestsTable from "../Pages/MaintenancePage/RequestsTable/RequestsTable";
import RequestsForm from "../Pages/MaintenancePage/RequestsAddNewForm/RequestsForm";
import CompletedResidentRequestTable from "../Pages/MaintenancePage/CompletedResidentRequestTable/CompletedResidentRequestTable";
import CompleteResidentReqForm from "../Pages/MaintenancePage/CompletedResidentRequestForm/CompleteResidentReqForm";
import InternalMaintenanceTable from "../Pages/MaintenancePage/InternalMaintenanceTable/InternalMaintenanceTable";
import InternalMaintenanceForm from "../Pages/MaintenancePage/InternalMaintenanceAddNewForm/InternalMaintenanceForm";
import StaffList from "../Pages/StaffDetails/StaffTableView/StaffList";
import StaffDetailsAddNewForm from "../Pages/StaffDetails/AddNewStaffMember/StaffDetailsAddNewForm";
import UnitList from "../Pages/ResidentInfoPage/UnitTableView/UnitList";
import ResidentInfoAddNew from "../Pages/ResidentInfoPage/NewMemberForm/ResidentInfoAddNew";
import MemberList from "../Pages/ResidentInfoPage/Member List/MemberList";
import TopBar from "../Component/TopBar/TopBar";
import DashBoard from "../Pages/DashBoard/DashBoard";
import ResidentialUnitsTable from "../Pages/ResidentialUnitsPage/Table/ResidentialUnitsTable";
import ResidentialUnitsForm from "../Pages/ResidentialUnitsPage/Form/ResidentialUnitsForm";
import ComplaintsTable from "../Pages/ComplaintsPage/Table/ComplaintsTable";
import ComplaintsForm from "../Pages/ComplaintsPage/Form/ComplaintsForm";
import NoticesTable from "../Pages/News&NoticesPage/Notices/Table/NoticesTable";
import NoticesForm from "../Pages/News&NoticesPage/Notices/Form/NoticesForm";
import EventsTable from "../Pages/News&NoticesPage/Events/Table/EventsTable";
import EventsForm from "../Pages/News&NoticesPage/Events/Form/EventsForm";
import UtilityDetails from "../Pages/FinancePage/UtilityCharges/UtilityDetails";
import UtilityDetailsUpdateForm from "../Pages/FinancePage/UtilityCharges/UtilityDetailsUpdateForm";
import UtilityDetailsAddNewForm from "../Pages/FinancePage/UtilityCharges/UtilityDetailsAddNew";
import { setAuthToken } from "../Pages/LoginPage/LoginServices/authService";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ResidentUserCredentialsFrom from "../Pages/UserCredentialsPage/ResidentUserCredentialsFrom";
import StaffUserCredentialsFrom from "../Pages/UserCredentialsPage/StaffUserCredentialsFrom";
import SettingsPage from "../Pages/SettingsPage/SettingsPage";
import Balance from "../Pages/FinancePage/Warnings/Balance";
import GuestTable from "../Pages/Guest/GuestTable";
import GuestFormNew from "../Pages/GuestNew/GuestForm";
import ReservationNewTwo from "../Pages/ReservationNew/ReservationNewTwo";
import ReservationTableTwo from "../Pages/Reservations/ReservationTableTwo";
import ReservationTable from "../Pages/Reservations/ReservationTable";
import ReservationNewOne from "../Pages/ReservationNew/ReservationNewOne";
import ProtectedRoute from "../Components/ProtectedRoute";

const Routers = ({ user, setUser }) => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        
        <Route path="/dashboard" element={<ProtectedRoute user={user} allowedRoles={["admin", "user"]} component={DashBoard} />} />
        
        <Route path="/finance" element={<Outlet />}>
          <Route index element={<ProtectedRoute user={user} allowedRoles={["finance"]} component={ResidentsPayments} />} />
          <Route path="addNew" element={<ProtectedRoute user={user} allowedRoles={["finance"]} component={ResidentsPaymentsForm} />} />
          <Route path="utilitycharges" element={<Outlet />}>
            <Route index element={<ProtectedRoute user={user} allowedRoles={["finance"]} component={UtilityCharges} />} />
            <Route path="addUtility" element={<ProtectedRoute user={user} allowedRoles={["finance"]} component={UtilityForm} />} />
            <Route path='viewUtilityDetails' element={<ProtectedRoute user={user} allowedRoles={["finance"]} component={UtilityDetails} />} />
            <Route path='addNewUtilityType' element={<ProtectedRoute user={user} allowedRoles={["finance"]} component={UtilityDetailsAddNewForm} />} />
            <Route path='updateUtilityDetails/:id' element={<ProtectedRoute user={user} allowedRoles={["finance"]} component={UtilityDetailsUpdateForm} />} />
          </Route>
          <Route path="expenses" element={<Outlet />}>
            <Route index element={<ProtectedRoute user={user} allowedRoles={["finance"]} component={Expenses} />} />
            <Route path="addExpense" element={<ProtectedRoute user={user} allowedRoles={["finance"]} component={ExpensesAddNewForm} />} />
            <Route path="updateExpenses/:id" element={<ProtectedRoute user={user} allowedRoles={["finance"]} component={ExpensesAddNewForm} />} />
          </Route>
          <Route path="revenue" element={<Outlet />}>
            <Route index element={<ProtectedRoute user={user} allowedRoles={["finance"]} component={Revenue} />} />
            <Route path="addRevenue" element={<ProtectedRoute user={user} allowedRoles={["finance"]} component={RevenueForm} />} />
          </Route>
          <Route path="balance" element={<ProtectedRoute user={user} allowedRoles={["finance"]} component={Balance} />} />
          <Route path="editFunds" element={<Outlet />}>
            <Route index element={<ProtectedRoute user={user} allowedRoles={["finance"]} component={EditFunds} />} />
            <Route path="newFund" element={<ProtectedRoute user={user} allowedRoles={["finance"]} component={EditFundsAddNew} />} />
            <Route path="updateFund/:id" element={<ProtectedRoute user={user} allowedRoles={["finance"]} component={EditFundsAddNew} />} />
          </Route>
        </Route>

        <Route path="/maintenance" element={<Outlet />}>
          <Route index element={<ProtectedRoute user={user} allowedRoles={["maintenance"]} component={RequestsTable} />} />
          <Route path="newRequest" element={<ProtectedRoute user={user} allowedRoles={["maintenance"]} component={RequestsForm} />} />
          <Route path="updateRequest/:id" element={<ProtectedRoute user={user} allowedRoles={["maintenance"]} component={RequestsForm} />} />
          <Route path="completed" element={<Outlet />}>
            <Route index element={<ProtectedRoute user={user} allowedRoles={["maintenance"]} component={CompletedResidentRequestTable} />} />
            <Route path="addNewCompleted" element={<ProtectedRoute user={user} allowedRoles={["maintenance"]} component={CompleteResidentReqForm} />} />
            <Route path="UpdateCompleted/:id" element={<ProtectedRoute user={user} allowedRoles={["maintenance"]} component={CompleteResidentReqForm} />} />
          </Route>
          <Route path="internal" element={<Outlet />}>
            <Route index element={<ProtectedRoute user={user} allowedRoles={["maintenance"]} component={InternalMaintenanceTable} />} />
            <Route path="addNew" element={<ProtectedRoute user={user} allowedRoles={["maintenance"]} component={InternalMaintenanceForm} />} />
            <Route path="updateInternal/:id" element={<ProtectedRoute user={user} allowedRoles={["maintenance"]} component={InternalMaintenanceForm} />} />
          </Route>
        </Route>

        <Route path="/staff details" element={<Outlet />}>
          <Route index element={<ProtectedRoute user={user} allowedRoles={["staff"]} component={StaffList} />} />
          <Route path="addNewStaff" element={<ProtectedRoute user={user} allowedRoles={["staff"]} component={StaffDetailsAddNewForm} />} />
          <Route path="updateStaff/:staffID" element={<ProtectedRoute user={user} allowedRoles={["staff"]} component={StaffDetailsAddNewForm} />} />
        </Route>

        <Route path="/residents information" element={<Outlet />}>
          <Route index element={<ProtectedRoute user={user} allowedRoles={["residents"]} component={UnitList} />} />
          <Route path="addNewResident" element={<ProtectedRoute user={user} allowedRoles={["residents"]} component={ResidentInfoAddNew} />} />
          <Route path="updateResident/:residentID" element={<ProtectedRoute user={user} allowedRoles={["residents"]} component={ResidentInfoAddNew} />} />
          <Route path="viewResident/:UnitID" element={<ProtectedRoute user={user} allowedRoles={["residents"]} component={MemberList} />} />
        </Route>

        <Route path="/user credentials" element={<Outlet />}>
          <Route index element={<ProtectedRoute user={user} allowedRoles={["credentials"]} component={ResidentUserCredentialsFrom} />} />
          <Route path="updateResidentUserAccount/:UserID" element={<ProtectedRoute user={user} allowedRoles={["credentials"]} component={ResidentUserCredentialsFrom} />} />
          <Route path="StaffUserCredentials" element={<Outlet />}>
            <Route index element={<ProtectedRoute user={user} allowedRoles={["credentials"]} component={StaffUserCredentialsFrom} />} />
            <Route path="updateStaffUserAccount/:UserID" element={<ProtectedRoute user={user} allowedRoles={["credentials"]} component={StaffUserCredentialsFrom} />} />
          </Route>
        </Route>

        <Route path="/settings" element={<Outlet />}>
          <Route index element={<ProtectedRoute user={user} allowedRoles={["admin"]} component={SettingsPage} />} />
        </Route>

        <Route path="/residential units" element={<Outlet />}>
          <Route index element={<ProtectedRoute user={user} allowedRoles={["residents"]} component={ResidentialUnitsTable} />} />
          <Route path="residentialUnitsForm" element={<ProtectedRoute user={user} allowedRoles={["residents"]} component={ResidentialUnitsForm} />} />
        </Route>

        <Route path="complaints" element={<Outlet />}>
          <Route index element={<ProtectedRoute user={user} allowedRoles={["complaints"]} component={ComplaintsTable} />} />
          <Route path="complaintsForm" element={<ProtectedRoute user={user} allowedRoles={["complaints"]} component={ComplaintsForm} />} />
        </Route>

        <Route path="news & notices" element={<Outlet />}>
          <Route index element={<ProtectedRoute user={user} allowedRoles={["news"]} component={NoticesTable} />} />
          <Route path="noticesForm" element={<ProtectedRoute user={user} allowedRoles={["news"]} component={NoticesForm} />} />
        </Route>

        <Route path="eventsTable" element={<Outlet />}>
          <Route index element={<ProtectedRoute user={user} allowedRoles={["events"]} component={EventsTable} />} />
          <Route path="eventsForm" element={<ProtectedRoute user={user} allowedRoles={["events"]} component={EventsForm} />} />
        </Route>

        <Route path='/guests' element={<Outlet />}>
          <Route index element={<ProtectedRoute user={user} allowedRoles={["guests"]} component={GuestTable} />} />
          <Route path='addNew' element={<ProtectedRoute user={user} allowedRoles={["guests"]} component={GuestFormNew} />} />
          <Route path="updateGuest/:guest_ID" element={<ProtectedRoute user={user} allowedRoles={["guests"]} component={GuestFormNew} />} />
        </Route>

        <Route path='/reservations' element={<Outlet />}>
          <Route index element={<ProtectedRoute user={user} allowedRoles={["reservations"]} component={ReservationTableTwo} />} />
          <Route path='addNew' element={<ProtectedRoute user={user} allowedRoles={["reservations"]} component={ReservationNewTwo} />} />
          <Route path='reservation' element={<Outlet />}>
            <Route index element={<ProtectedRoute user={user} allowedRoles={["reservations"]} component={ReservationTable} />} />
            <Route path='addNew' element={<ProtectedRoute user={user} allowedRoles={["reservations"]} component={ReservationNewOne} />} />
          </Route>
        </Route>
      </Routes>
    </div >
  );
};


