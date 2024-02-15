import { useState } from "react";
import "./ResidentInfoPage.css";
import MiniDrawer from "../../Component/SideBar/MiniDrawer";
import AddNewMember from "./NewMemberForm/AddNewMember";
import AddMember from "./NewMemberForm/AddMember";

const ResidentInforPage = (props) => {
  return (
    <div className="ResidentInfoPageContainer">
      {/* <MiniDrawer/> */}
      {/* <AddNewMember/> */}
      <AddMember />
    </div>
  );
};

export default ResidentInforPage;
