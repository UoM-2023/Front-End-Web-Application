import React, { useEffect, useState } from "react";
import "./App.css";
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
import {
  getDecodedToken,
  setAuthToken,
} from "./Pages/LoginPage/LoginServices/authService";
import RouteTitles from "./Routes/RouteTitles";
import TopBar from "./Component/TopBar/TopBar";

function App() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(token);
      const decodeUser = getDecodedToken(token);
      setUser(decodeUser);
      setAuthToken(token);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const path = location.pathname;
    const newTitle = RouteTitles[path] || "App Title";
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
