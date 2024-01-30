import {useState} from 'react'
import "./ResidentInfoPage.css";
import MiniDrawer from '../../Component/SideBar/MiniDrawer';
import AddNewMember from './NewMemberForm/AddNewMember';

const ResidentInforPage = props => {
  return (
    <div className='ResidentInfoPageContainer'>
        {/* <MiniDrawer/> */}
        <AddNewMember/>

    </div>
  )
}

export default ResidentInforPage;