import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import { checkIfAuthenticated } from '../../api/authServiceApi';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            isLoggedIn: false

        };
    }
    componentDidMount(){
        if(checkIfAuthenticated()){
            this.setState({user: checkIfAuthenticated(), isLoggedIn: true});
        }
    }

    render() {
        return (
            <>
            <Container className='py-4'>
                <div className='text-center'>
                    <h2>Simple. Agile. Secure.</h2>
                    <p>Task Management for Team</p>
                    <div className="text-center">
                        <a className='btn btn-outline-success mx-2' href="">Login</a>
                        <a className='btn btn-primary mx-2' href="">Register</a>
                    </div>
                </div>
            </Container>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,256L120,213.3C240,171,480,85,720,90.7C960,96,1200,192,1320,240L1440,288L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
            </>
        )
    }
}
