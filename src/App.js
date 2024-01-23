import React from 'react';
import "./App.css"
import LoginPage from './Pages/LoginPage/LoginPage';
import Dashboard from './Pages/DashboardPage/Dashboard';

function App() {
  
  return (
    <>
      <div className="appContainer">
        {/* <LoginPage/> */}
        <Dashboard/>

      </div>
    </>
  );
}

export default App;
