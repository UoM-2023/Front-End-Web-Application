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
import ResidentPaymentsAddNewForm from '../Pages/FinancePage/ResidentPaymentsAddNewForm/ResidentPaymentsAddNewForm'
import AddNewExpenseForm from '../Pages/FinancePage/ExpenseAddNewForm/AddNewExpenseForm'

const Routers = () => {
  return (
    <>
            <Routes>
                <Route path='/finance' element={<Outlet />}>
                {/* <Route path='/finance' element={<ResidentsPayments />}> */}
                  {/* Routes of mininavbar in finance section */}
                    <Route index element={<ResidentsPayments />} />
                    <Route path='addNew' element={<ResidentPaymentsAddNewForm />}/>

                    {/* Utility payment section */}
                    <Route path='utilitycharges' element={<Outlet />} >
                      <Route index element={<UtilityCharges />} />
                      <Route path='addUtility' element={<UtilityChargesAddNewForm />}/>
                    </Route>

                    {/* Expenses routes */}
                    <Route path='expenses' element={<Outlet />}>
                      <Route index element={<Expenses />} />
                      <Route path='addExpense' element={<AddNewExpenseForm />} />
                    </Route>

                    {/* Revenue routes */}
                    <Route path='revenue' element={<Outlet />}>
                      <Route index element={<Revenue />} />
                      <Route path='addRevenue' element={<RevenueAddNewForm />} />
                    </Route>

                    {/* Warnings Route */}
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