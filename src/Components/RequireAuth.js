import React from 'react'
import { useLocation, Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useauth'

function RequireAuth({ allowedRoles }) {
    const { auth } = useAuth()
    const location = useLocation()
    console.log(location);
    return (
        //if the role required is part of the user roles(stored on auth.role)...deliver the outlet or else check if user is loged in
        //if yes, return unauthorized page , if not, navigate to login
        auth?.roles.find(role => allowedRoles.include(role))
            ?
            <Outlet />
            :
            auth?.userName
                ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequireAuth