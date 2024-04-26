import React, { useState } from "react";
import "./App.css";
import LoginPage from "./Pages/LoginPage/LoginPage";
import MiniDrawer from "./Component/SideBar/MiniDrawer";
import { BrowserRouter } from "react-router-dom";
import Minibar from "./Pages/FinancePage/Mininavbar/Minibar";
import Routers from "./Routes/Routes";

function App() {
  return (
    <>
      <div className="appContainer">
        {/* <LoginPage /> */}

        <BrowserRouter>
          <MiniDrawer />
          <Routers />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
