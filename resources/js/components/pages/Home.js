import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <>
            <div className="home-animation-box"></div>
            <Container className='py-3'>
                <div className='text-center pt-4 home-top'>
                    <h2>Simple. Agile. Secure.</h2>
                    <p>Task Management for Team</p>
                    <div className="text-center">
                        <Link className='btn btn-outline-success mx-2' to="/login">Login</Link>
                        <Link className='btn btn-primary mx-2' to="/register">Register</Link>
                    </div>
                </div>
            </Container>

            <div style={{paddingTop: "22.22%", possition:"relative"}}></div>
          
            <img className='home-btm-img' src={`${appUrl}assets/images/home-btm.png`} alt="" />

            <svg style={{bottom:"0", position:"absolute"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,256L120,213.3C240,171,480,85,720,90.7C960,96,1200,192,1320,240L1440,288L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
            
            {/* Box animation */}
            <div className="home-btm-animation-box1"></div>
            <div className="home-btm-animation-box2"></div>
            </>
        )
    }
}
