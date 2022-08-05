import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            email: "",
            password: "",
            errors: []
        };
    }
  render() {
    return (
        <>
        <div className="mx-auto p-5 my-5 login-form">
            <div className="text-center">
                <img className='modal-logo' src={`${appUrl}assets/images/favicon.png`} alt="" />
            </div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={this.state.email} required className='shadow-none' type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={this.state.password} required className='shadow-none' type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" className='w-100'>
                    LOGIN
                </Button>
            </Form>

        </div>
        </>
    )
  }
}
