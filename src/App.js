import React from 'react';
import "./App.css"
import LoginPage from './Pages/LoginPage/LoginPage';
import Dashboard from './Pages/DashboardPage/Dashboard';
import ResidentInforPage from './Pages/ResidentInfoPage/ResidentInforPage';
import StaffDetails from './Pages/StaffDetails/StaffDetails';
import AddStaff from './Pages/StaffDetails/AddNewStaffMember/AddStaff';
import UnitList from './Pages/StaffDetails/TableView/UnitList';

function App() {
  
  return (
    <>
      <div className="appContainer">
        {/* <LoginPage/>
        <Dashboard/> */}
        {/* <ResidentInforPage/> */}
        {/* <StaffDetails/> */}
        {/* <AddStaff/> */}
        <UnitList/>

      </div>
    </>
  );
}

export default App;
