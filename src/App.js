import React from 'react';
import "./App.css"
import LoginPage from './Pages/LoginPage/LoginPage';
import Dashboard from './Pages/DashboardPage/Dashboard';
import ResidentInforPage from './Pages/ResidentInfoPage/ResidentInforPage';

function App() {
  
  return (
    <>
      <div className="appContainer">
        {/* <LoginPage/> */}
        {/* <Dashboard/> */}
        <ResidentInforPage/>

      </div>
    </>
  );
}

export default App;
