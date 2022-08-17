import React, { useState } from 'react';
import { useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import {useNavigate} from "react-router-dom";
import { checkIfAuthenticated } from '../../api/authServiceApi';
import { logoutApi } from '../../api/serviceApi';

const Header = (props) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLogIn] = useState(props.isLoggedIn);
  const navigate = useNavigate();

  
  const handleRedirect =()=>{
    // setIsLogIn(false);
    props.resetMount();
    navigate('/login');
  }

  const logout = () =>{
    logoutApi().then((response) => {
      if(response.data.success){
        localStorage.removeItem('loginData');
        Swal.fire({icon: 'success', title: response.data.message, showConfirmButton: false, timer: 1500});
        setTimeout(handleRedirect, 1600);
      }
      else{
        NotificationManager.error(response.data.message, 'Error!');
      }
    })
    .catch(error=>{
        console.log("LandingPop", error)
    });
  }

  useEffect(() => {
    const response = checkIfAuthenticated();
    if(response){
      setUser(response);
      setIsLogIn(true)
    }
    else{
      setUser({});
      setIsLogIn(false)
    }
  }, [props.isLoggedIn]);

  useEffect(() => {
    const response = checkIfAuthenticated();
    if(response){
      setUser(response);
      setIsLogIn(true)
    }
    else{
      setUser({});
      setIsLogIn(false)
    }
  }, []);

  return (
    <Navbar  bg="dark" variant="dark" expand="lg" sticky='top'>
    <Container>
        <Link to=""><Navbar.Brand ><img style={{height:"25px"}} src={`${appUrl}assets/images/favicon.png`} alt="" />TASK MANAGER</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mulish">
            <Link to="">
              <Nav.Item className='text-white mx-3'>Home</Nav.Item>
            </Link>
            {isLoggedIn &&
            <Link to="/projects">
              <Nav.Item className='text-white mx-3'>Projects</Nav.Item>
            </Link>
            }
            <Link to="/about">
              <Nav.Item className='text-white mx-3'>About</Nav.Item>
            </Link>
            <Link to="/contact">
              <Nav.Item className='text-white mx-3'>Contact</Nav.Item>
            </Link>
          </Nav>
          
          <Nav className="ml-auto">
          {!isLoggedIn &&
          <>
            <Link className='btn btn-outline-success mx-1' to="/login">
              <Nav.Item className='text-white'>Login</Nav.Item>
            </Link>
            <Link className='btn btn-outline-primary mx-1' to="/register">
              <Nav.Item className='text-white'>Register</Nav.Item>
            </Link>
          </>
          
          }
          {isLoggedIn &&
          <>
            <Link className='btn btn-outline-success mx-1' to="/profile">
                <Nav.Item className='text-white'>{user.name}</Nav.Item>
            </Link>

            {/* <Link className='btn btn-outline-light mx-1' to="/login" onClick={()=>logout()} >
              <Nav.Item className=''>Logout</Nav.Item>
            </Link> */}
          </>
            
          }
          </Nav>
          {isLoggedIn &&
          <span className='btn btn-outline-light mx-1' onClick={()=>logout()}>
            Logout
          </span>
          }
        </Navbar.Collapse>
    </Container>
    </Navbar>
  )
}

export default Header