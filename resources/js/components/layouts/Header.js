import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { Link, Navigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { logoutApi } from '../../api/serviceApi';
const Header = (props) => {
  const logout = () =>{
    logoutApi().then((response) => {
      if(response.data.success){
        localStorage.removeItem('loginData');
        props.resetMount();
        Swal.fire({icon: 'success', title: response.data.message, showConfirmButton: false, timer: 1500});
        const timer = setTimeout(() => {
          <Navigate to="/login" />
        }, 1000);
        return () => clearTimeout(timer);
      }
      else{
        NotificationManager.error(response.data.message, 'Error!');
      }
    })
    .catch(error=>{
        console.log("LandingPop", error)
    });
  }

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
            {props.isLoggedIn &&
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
          {!props.isLoggedIn &&
          <>
            <Link className='btn btn-outline-success mx-1' to="/login">
              <Nav.Item className='text-white'>Login</Nav.Item>
            </Link>
            <Link className='btn btn-outline-primary mx-1' to="/register">
              <Nav.Item className='text-white'>Register</Nav.Item>
            </Link>
          </>
          
          }
          {props.isLoggedIn &&
          <>
            <Link className='btn btn-outline-success mx-1' to="/profile">
                <Nav.Item className='text-white'>{props.user.name}</Nav.Item>
            </Link>

            <Link className='btn btn-outline-light mx-1' to="/login" onClick={()=>logout()} >
              <Nav.Item className=''>Logout</Nav.Item>
            </Link>
          </>
            
          }
          </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
  )
}

export default Header