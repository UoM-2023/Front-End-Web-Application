import React from "react";
import "./App.css";
import MiniDrawer from "./Component/SideBar/MiniDrawer";
import { BrowserRouter } from "react-router-dom";
import Routers from "./Routes/Routes";

function App() {
  return (
    <>
      <div className="appContainer">
        <BrowserRouter>
          <MiniDrawer />
          <Routers />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
