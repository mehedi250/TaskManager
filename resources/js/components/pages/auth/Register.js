import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            name: "",
            email: "",
            password: "",
            errors: []
        };
    }

    handleError = (key)=>{
        return (this.state.errors[key] != undefined)?this.state.errors[key]:'';
    }

  render() {
    return (
        <>
        <div className="mx-auto p-5 my-5 register-form">
            <div className="text-center pb-3">
                <img className='modal-logo' src={`${appUrl}assets/images/favicon.png`} alt="" />
            </div>
            <Form>
                <div className="row">
                    <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={this.state.name} required className='shadow-none' type="text" placeholder="Enter name" />
                            <Form.Text className="text-danger">{this.handleError('name')}</Form.Text>
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control value={this.state.email} required className='shadow-none' type="email" placeholder="Enter email" />
                            <Form.Text className="text-danger">{this.handleError('email')}</Form.Text>
                        </Form.Group>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={this.state.password} required className='shadow-none' type="password" placeholder="Password" />
                            <Form.Text className="text-danger">{this.handleError('password')}</Form.Text>
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Conform Password</Form.Label>
                            <Form.Control value={this.state.password} required className='shadow-none' type="password" placeholder="Conform Password" />
                        </Form.Group>
                    </div>
                </div>

                <Button variant="primary" type="submit">
                    REGISTER
                </Button>
            </Form>
  
        </div>
        </>
    )
  }
}
