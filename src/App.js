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
import Guest from "./Pages/Guest/Guest";
import GuestFormNew from "./Pages/GuestNew/GuestForm";
import GuestTable from "./Pages/Guest/GuestTable";
import ReservationNewOne from "./Pages/ReservationNew/ReservationNewOne";
import ReservationNewTwo from "./Pages/ReservationNew/ReservationNewTwo";
import DashBoard from "./Pages/DashBoard/DashBoard";
import ChartOne from "./Pages/DashBoard/ChartOne";
import ChartTwo from "./Pages/DashBoard/chartTwo";
import Welcome from "./Pages/DashBoard/Welcome";
import NotificationBar from "./Pages/DashBoard/NotificationBar";
import ReservationTable from "./Pages/Reservations/ReservationTable";

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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 60 * 1000,
        staleTime: 0,
      },
    },
  });

  return (
    <>
      <div className="appContainer">
        {/* 
         <BrowserRouter>
           <MiniDrawer />
           <QueryClientProvider client={queryClient}>
             <ReactQueryDevtools initialIsOpen={false} />

             <Routers />
           </QueryClientProvider>
           <ReservationTable/>
         </BrowserRouter> */}

        {user && <TopBar user={user} setUser={setUser} title={title} />}
        {user && <MiniDrawer userRole={user.role} />}
        <Routers user={user} setUser={setUser} />
      </div>
    </>
  );
}

export default App;
