import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkIfAuthenticated } from '../api/authServiceApi';

const AuthenticatedRoute = (props) => {
    // console.log('AuthenticatedRoute', props.auth) = 
    const data = checkIfAuthenticated();
    console.log(data);
    if(props.login){
        return data ? <Outlet /> : <Navigate to="/login" />;
    }
    else{
        return data ? <Navigate to="/" />:<Outlet />  ;
    }
    
}
export default AuthenticatedRoute;