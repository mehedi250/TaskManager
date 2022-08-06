import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkIfAuthenticated } from '../api/authServiceApi';

const AuthenticatedRoute = (props) => {
    // console.log('AuthenticatedRoute', props.auth)
    return checkIfAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}
export default AuthenticatedRoute;