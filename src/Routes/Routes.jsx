import React from "react";
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
import ProtectedRoute from "../Pages/LoginPage/LoginServices/protectedRoute";

const Routers = ({ user, setUser }) => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage setUser={setUser} />} />

        {/* ----------- Dashboard ----------*/}

        <Route path="/dashboard" element={<DashBoard />} />

        {/*------- Finance Page Routs and its sub routes------------ */}

        <Route path="/finance" element={<Outlet />}>
        <Route index element={<ProtectedRoute user={user} allowedRoles={["finance_manager", "admin"]} component={ResidentsPayments} />} />
          <Route path="addNew" element={<ResidentsPaymentsForm />} />

          {/* ---------- Utility payment section ----------- */}

          <Route path="utilitycharges" element={<Outlet />}>
            <Route index element={<UtilityCharges />} />
            <Route path="addUtility" element={<UtilityForm />} />
            <Route path="viewUtilityDetails" element={<UtilityDetails />} />
            <Route
              path="addNewUtilityType"
              element={<UtilityDetailsAddNewForm />}
            />
            <Route
              path="updateUtilityDetails/:id"
              element={<UtilityDetailsUpdateForm />}
            />
          </Route>

          {/* ------- Expenses routes -------------- */}

          <Route path="expenses" element={<Outlet />}>
            <Route index element={<Expenses />} />
            <Route path="addExpense" element={<ExpensesAddNewForm />} />
            <Route path="updateExpenses/:id" element={<ExpensesAddNewForm />} />
          </Route>

          {/* ----------- Revenue routes -------------*/}

          <Route path="revenue" element={<Outlet />}>
            <Route index element={<Revenue />} />
            <Route path="addRevenue" element={<RevenueForm />} />
          </Route>

          {/*----------- Warnings Route ----------------*/}

          <Route path="balance" element={<Balance />} />
          {/* <Route path='fundtypes' element={<EditFunds />}/> */}

          {/* ----------- Edit fund route  --------------*/}

          <Route path="editFunds" element={<Outlet />}>
            <Route index element={<EditFunds />} />
            <Route path="newFund" element={<EditFundsAddNew />} />
            <Route path="updateFund/:id" element={<EditFundsAddNew />} />
          </Route>
        </Route>

        {/*----------- Maintenance Section Routes ----------*/}

        <Route path="/maintenance" element={<Outlet />}>
          <Route index element={<ProtectedRoute user={user} allowedRoles={["security_maintenance_manager", "admin"]} component={RequestsTable} />} />
          <Route path="newRequest" element={<RequestsForm />} />
          <Route path="updateRequest/:id" element={<RequestsForm />} />

          {/*--------- Completed Requests -------------*/}

          <Route path="completed" element={<Outlet />}>
            <Route index element={<CompletedResidentRequestTable />} />
            <Route
              path="addNewCompleted"
              element={<CompleteResidentReqForm />}
            />
            <Route
              path="UpdateCompleted/:id"
              element={<CompleteResidentReqForm />}
            />
          </Route>

          {/* -----------Internal maintenance--------------- */}

          <Route path="internal" element={<Outlet />}>
            <Route index element={<InternalMaintenanceTable />} />
            <Route path="addNew" element={<InternalMaintenanceForm />} />
            <Route
              path="updateInternal/:id"
              element={<InternalMaintenanceForm />}
            />
          </Route>
        </Route>

        {/*-------------- Staff Details ------------------- */}

        <Route path="/staff details" element={<Outlet />}>
          <Route index element={<ProtectedRoute user={user} allowedRoles={["internal_manager", "admin"]} component={StaffList} />} />
          <Route path="addNewStaff" element={<StaffDetailsAddNewForm />} />
          <Route
            path="updateStaff/:staffID"
            element={<StaffDetailsAddNewForm />}
          />
        </Route>

        {/*----------- Resident Details ------------------*/}

        <Route path="/residents information" element={<Outlet />}>
          <Route index element={<ProtectedRoute user={user} allowedRoles={["internal_manager", "admin"]} component={UnitList} />} />
          <Route path="addNewResident" element={<ResidentInfoAddNew />} />
          <Route
            path="updateResident/:residentID"
            element={<ResidentInfoAddNew />}
          />
          <Route path="viewResident/:UnitID" element={<MemberList />} />
        </Route>

        {/*--------- User Credentials Page Routs and its sub routes --------------*/}

        {/* Residents User Credentials Section */}

        <Route path="/user credentials" element={<Outlet />}>
          <Route index element={<ProtectedRoute user={user} allowedRoles={["internal_manager", "admin"]} component={ResidentUserCredentialsFrom} />} />
          <Route
            path="updateResidentUserAccount/:UserID"
            element={<ResidentUserCredentialsFrom />}
          />

          {/* Staff User Credentials Section */}

          <Route path="StaffUserCredentials" element={<Outlet />}>
            <Route index element={<ProtectedRoute user={user} allowedRoles={["internal_manager", "admin"]} component={StaffUserCredentialsFrom} />} />
            <Route
              path="updateStaffUserAccount/:UserID"
              element={<StaffUserCredentialsFrom />}
            />
          </Route>
        </Route>

        {/* END of User Credentials Page Routs and its sub routes */}

        {/*------------- Settings Page Routs -------------*/}

        <Route path="/settings" element={<Outlet />}>
          <Route index element={<ProtectedRoute user={user} allowedRoles={["internal_manager", "admin"]} component={SettingsPage} />} />
        </Route>

        {/*------------ Residential Units Route -----------*/}

        <Route path="/residential units" element={<Outlet />}>
          <Route index element={<ProtectedRoute user={user} allowedRoles={["internal_manager", "admin"]} component={ResidentialUnitsTable} />} />
          <Route
            path="residentialUnitsForm"
            element={<ResidentialUnitsForm />}
          />
          <Route />
          <Route
            path="UpdateresidentialUnits/:Unit_id"
            element={<ResidentialUnitsForm />}
          />
          <Route />
        </Route>

        {/*----------- Complaints route ---------------*/}

        <Route path="complaints" element={<Outlet />}>
          <Route index element={<ProtectedRoute user={user} allowedRoles={["internal_manager", "admin"]} component={ComplaintsTable} />} />
          <Route path="complaintsForm" element={<ComplaintsForm />} />
          <Route
            path="UpdateComplait/:Reference_id"
            element={<ComplaintsForm />}
          />
        </Route>

        {/*------------ News & Notices section -------------*/}

        <Route path="news & notices" element={<Outlet />}>
          {/* Notices Route */}
          <Route index element={<NoticesTable />} />
          <Route path="noticesForm" element={<NoticesForm />} />
        </Route>

        {/* ----------guest Section Routes -------------*/}

        <Route path="/guests" element={<Outlet />}>
          <Route index element={<ProtectedRoute user={user} allowedRoles={["security_manager", "admin"]} component={GuestTable} />} />
          <Route path="addNew" element={<GuestFormNew />} />
          {/* //edit route */}
          <Route path="updateGuest/:guest_ID" element={<GuestFormNew />} />
        </Route>
        {/* </Route> */}

        {/*----------- Reservation Section Routes ------------*/}

        <Route path="/reservations" element={<Outlet />}>
               {/* reservation table */}
          <Route index element={<ProtectedRoute user={user} allowedRoles={["internal_manager", "admin"]} component={ReservationTable} />} /> 
          {/* Reservation form  */}
          <Route path="addNew" element={<ReservationNewTwo />} />
          {/* //edit route */}
          <Route
            path="updateReservation/:ref_no"
            element={<ReservationNewTwo />}
          />

          {/*------------- Sub Routes Facility Requests (Reservation) -----------------*/}

          <Route path="reservation" element={<Outlet />}>
          {/* Facility Table */}
            <Route index element={<ProtectedRoute user={user} allowedRoles={["internal_manager", "admin"]} component={ReservationTableTwo} />} />
            {/* Facility Form */}
            <Route path="addNew" element={<ReservationNewOne />} />
            <Route
              path="updateFacility/:ref_no"
              element={<ReservationNewOne />}
            />

            {/* 
            <Route path = '/reservations' element = {<Outlet />}>
              <Route index element = {<ReservationTable />} />            ReservationTable
              <Route path='addNew' element={<ReservationNewOne />} />      ReservationNewOne
             */}
            {/* Completed Requests */}
            {/* <Route path='reservation' element = {<Outlet />}>
              <Route index element = {<ReservationTableTwo />} />
              <Route path='addNew' element={<ReservationNewTwo />} />
            </Route> */}
          </Route>
        </Route>

        {/*----------- Events Route --------------*/}

        <Route path="eventsTable" element={<Outlet />}>
          <Route index element={<EventsTable />} />
          <Route path="eventsForm" element={<EventsForm />} />
          <Route path="eventsUpdate/:Event_no" element={<EventsForm />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Routers;
