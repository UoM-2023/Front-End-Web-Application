import React, { useEffect, useState } from "react";
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
import ResidentialUnits from "./ResidentialUnits";
import RequestsTable from "./Pages/MaintenancePage/RequestsTable/RequestsTable";
import InternalMaintenanceTable from "./Pages/MaintenancePage/InternalMaintenanceTable/InternalMaintenanceTable";
import CompletedResidentRequestTable from "./Pages/MaintenancePage/CompletedResidentRequestTable/CompletedResidentRequestTable";
import Warnings from "./Pages/FinancePage/Warnings/Warnings";
import MiniDrawer from "./Component/SideBar/MiniDrawer";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
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
import ResidentialUnitsAddNewForm from "./Pages/ResidentialUnitsAddNewForm/ResidentialUnitsAddNewForm";
import ComplaintAddForm from "./Pages/ComplaintAddNewForm/ComplaintAddForm";
import NoticeAddNewForm from "./Pages/NoticeAddNewForm/NoticeAddNewForm";
import EventsAddNewForm from "./Pages/EventsAddNewForm/EventsAddNewForm";
import StaffUserCredentialsFrom from "./Pages/UserCredentialsPage/StaffUserCredentialsFrom";
import ResidentUserCredentialsFrom from "./Pages/UserCredentialsPage/ResidentUserCredentialsFrom";
import { getDecodedToken, setAuthToken } from "./Pages/LoginPage/LoginServices/authService";
import RouteTitles from "./Routes/RouteTitles";

function App() {
  const [user, setUser] = useState(null);
  const [title,setTitle] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log(token);
      const decodeUser = getDecodedToken(token);
      setUser(decodeUser);
      setAuthToken(token);
    } else {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    const path = location.pathname;
    const newTitle = RouteTitles[path] || 'App Title';
    setTitle(newTitle);
  }, [location]);

  return (
    <>
      <div className="appContainer">
        {user && <TopBar user={user} setUser={setUser} title={title} />}
        {user && <MiniDrawer userRole={user.role} />}
        <Routers user={user} setUser={setUser} />
      </div>
    </>
  );
}

export default App;
