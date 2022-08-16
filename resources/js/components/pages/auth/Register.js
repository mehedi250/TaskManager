import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications';
import Swal from 'sweetalert2';
import { registerApi } from '../../../api/authServiceApi';

import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";
  
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
        <Component
            {...props}
            router={{ location, navigate, params }}
        />
        );
    }

    return ComponentWithRouterProp;
}
class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            errors: []
        };
    }

    handleError = (key)=>{
        return (this.state.errors[key] != undefined)?this.state.errors[key]:'';
    }

    handleName =(e)=>{
        this.setState({name: e.target.value});
    }

    handleEmail =(e)=>{
        this.setState({email: e.target.value});
    }

    handlePassword =(e)=>{
        this.setState({password: e.target.value});
    }

    handlePasswordConfirmation =(e)=>{
        this.setState({password_confirmation: e.target.value});
    }

    handleRedirect=()=>{
        this.props.router.navigate('/projects');
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.setState({isLoading: true, errors: []});
        const postData = {name: this.state.name, email: this.state.email, password: this.state.password, password_confirmation: this.state.password_confirmation};

        registerApi(postData).then((response) => {
            if(response.data.success){
                localStorage.setItem('loginData', JSON.stringify(response));
                Swal.fire({icon: 'success', title: response.data.message, showConfirmButton: false, timer: 2000});
                setTimeout(this.handleRedirect, 2000)
            }
            else{
                if(response.data.status === 'validation-error'){
                    this.setState({errors: response.data.errors});
                }
                else{
                    NotificationManager.error(response.data.message, 'Error!');
                }
            }
            this.setState({isLoading: false});
        })
        .catch(error=>{
            this.setState({isLoading: false});
            console.log("LandingPop", error)
        });
    }

  render() {
    
    return (
        <>
        <div className="mx-auto p-5 my-5 register-form">
            <div className="text-center pb-3">
                <img className='modal-logo' src={`${appUrl}assets/images/favicon.png`} alt="" />
            </div>
            <Form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <Form.Group className="mb-3">
                            <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                            <Form.Control value={this.state.name} onChange={this.handleName} required className='shadow-none' type="text" placeholder="Enter name" />
                            <Form.Text className="text-danger">{this.handleError('name')}</Form.Text>
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                        <Form.Group className="mb-3">
                            <Form.Label>Email address  <span className="text-danger">*</span></Form.Label>
                            <Form.Control value={this.state.email} onChange={this.handleEmail}  required className='shadow-none' type="email" placeholder="Enter email" />
                            <Form.Text className="text-danger">{this.handleError('email')}</Form.Text>
                        </Form.Group>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Form.Group className="mb-3">
                            <Form.Label>Password  <span className="text-danger">*</span></Form.Label>
                            <Form.Control value={this.state.password} onChange={this.handlePassword}  required className='shadow-none' type="password" placeholder="Password" />
                            <Form.Text className="text-danger">{this.handleError('password')}</Form.Text>
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                        <Form.Group className="mb-3">
                            <Form.Label>Conform Password  <span className="text-danger">*</span></Form.Label>
                            <Form.Control value={this.state.password_confirmation}  onChange={this.handlePasswordConfirmation}  required className='shadow-none' type="password" placeholder="Conform Password" />
                            <Form.Text className="text-danger">{this.handleError('password_confirmation')}</Form.Text>
                        </Form.Group>
                    </div>
                </div>

                <Button variant="primary" type="submit" disabled={this.state.isLoading}>
                    REGISTER
                </Button>
            </Form>
  
        </div>
        </>
    )
  }
}
export default withRouter(Register);
