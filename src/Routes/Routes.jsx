import React from 'react'
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ResidentsPayments from '../Pages/FinancePage/ResidentsPayments/ResidentsPayments'
import UtilityCharges from '../Pages/FinancePage/UtilityCharges/UtilityCharges'
import Expenses from '../Pages/FinancePage/Expenses/Expenses'
import Revenue from '../Pages/FinancePage/Revenue/Revenue'
import Warnings from '../Pages/FinancePage/Warnings/Warnings'

const Routers = () => {
  return (
    <>
            <Routes>
                <Route path='/finance' element={<Outlet />}>
                    <Route index element={<ResidentsPayments />} />
                    <Route path='utilitycharges' element={<UtilityCharges />}/>
                    <Route path='expenses' element={<Expenses />}/>
                    <Route path='revenue' element={<Revenue />}/>
                    <Route path='warnings' element={<Warnings />} />
                    {/* <Route path='charges' element={<UtilityCharges />}/> */}
                </Route>

            </Routes>
    </>
  )
}

export default Routers