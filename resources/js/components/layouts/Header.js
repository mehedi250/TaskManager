import React from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
const Header = () => {

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
            <Link to="/projects">
              <Nav.Item className='text-white mx-3'>Projects</Nav.Item>
            </Link>
            <Link to="/about">
              <Nav.Item className='text-white mx-3'>About</Nav.Item>
            </Link>
            <Link to="/contact">
              <Nav.Item className='text-white mx-3'>Contact</Nav.Item>
            </Link>
          </Nav>
          <Nav className="ml-auto">
            <Link className='btn btn-outline-success mx-1' to="/Login">
              <Nav.Item className='text-white'>Login</Nav.Item>
            </Link>
            <Link className='btn btn-outline-primary mx-1' to="/Login">
              <Nav.Item className='text-white'>Register</Nav.Item>
            </Link>
          </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
  )
}

export default Header