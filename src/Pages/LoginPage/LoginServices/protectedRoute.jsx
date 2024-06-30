import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({user, allowedRoles, component: Component}) => {
     
    if(!user || !allowedRoles.includes(user.role)){
        return <Navigate to='/dashboard' />
    }
    return <Component />
}
export default ProtectedRoute