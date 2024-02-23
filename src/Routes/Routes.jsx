import React from 'react'
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ResidentsPayments from '../Pages/FinancePage/ResidentsPayments/ResidentsPayments'
import UtilityCharges from '../Pages/FinancePage/UtilityCharges/UtilityCharges'
import Expenses from '../Pages/FinancePage/Expenses/Expenses'
import Revenue from '../Pages/FinancePage/Revenue/Revenue'
import Warnings from '../Pages/FinancePage/Warnings/Warnings'
import EditFunds from '../Pages/FinancePage/AddNewFund/EditFunds'
import UtilityChargesAddNewForm from '../Pages/FinancePage/UtilityChargesAddNewForm/UtilityChargesAddNewForm'
import RevenueAddNewForm from '../Pages/FinancePage/RevenueAddNewForm/RevenueAddNewForm'

const Routers = () => {
  return (
    <>
            <Routes>
                <Route path='/finance' element={<ResidentsPayments/>}>
                  {/* Routes of mininavbar in finance section */}
                    <Route path='utilitycharges' element={<UtilityCharges />} />
                    <Route path='expenses' element={<Expenses />}/>
                    <Route path='revenue' element={<Revenue />} />
                    <Route path='warnings' element={<Warnings />} />
                    <Route path='fundtypes' element={<EditFunds />}/>
                  {/* Routes of forms in finance sectionn */}
                  {/* <Route path='addUtiltiy' element={<UtilityChargesAddNewForm />} /> */}  
                </Route>

            </Routes>
    </>
  )
}

export default Routers