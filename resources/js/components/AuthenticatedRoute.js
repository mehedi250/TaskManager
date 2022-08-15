import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkIfAuthenticated } from '../api/authServiceApi';

const AuthenticatedRoute = (props) => {
    const data = checkIfAuthenticated();
    if(props.login){
        return data ? <Outlet /> : <Navigate to="/login" />;
    }
    else{
        return data ? <Navigate to="/" />:<Outlet />  ;
    }
    
}
export default AuthenticatedRoute;