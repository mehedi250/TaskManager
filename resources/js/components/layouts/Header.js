import React from 'react';
import { useState } from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
const Header = () => {
  const [publicUrl, setPublucUrl] = useState('');
  return (
    <Navbar  bg="dark" variant="dark" expand="lg" sticky='top'>
    <Container>
        <Link to=""><Navbar.Brand ><img style={{height:"25px"}} src={'/assets/images/favicon.png'} alt="" /> My Task</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
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
        </Navbar.Collapse>
    </Container>
    </Navbar>
  )
}

export default Header