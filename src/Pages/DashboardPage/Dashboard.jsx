import React from "react";
import MiniDrawer from "../../Component/SideBar/MiniDrawer";
import CancelButton from "../../Component/Buttons/CancelButton";
import BackButton from "../../Component/Buttons/BackButton";

function Dashboard() {
  return <div>
    {/* <MiniDrawer/> */}
    <CancelButton/>
    <hr></hr>
    <BackButton/>
  </div>;
}

export default Dashboard;
