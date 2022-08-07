import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications';
import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";
import Swal from 'sweetalert2';
import { loginApi } from '../../../api/authServiceApi';
  
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
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            email: "",
            password: "",
            errors: []
        };
    }
    handleError = (key)=>{
        return (this.state.errors[key] != undefined)?this.state.errors[key]:'';
    }

    handleEmail =(e)=>{
        this.setState({email: e.target.value});
    }

    handlePassword =(e)=>{
        this.setState({password: e.target.value});
    }

    handleRedirect=()=>{
        this.props.mount();
        this.props.router.navigate('/');
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.setState({isLoading: true, errors: []});
        const postData = { email: this.state.email, password: this.state.password };
        loginApi(postData).then((response) => {
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
        <div className="mx-auto p-5 my-5 login-form">
            <div className="text-center">
                <img className='modal-logo' src={`${appUrl}assets/images/favicon.png`} alt="" />
            </div>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={this.state.email} onChange={this.handleEmail}  required className='shadow-none' type="email" placeholder="Enter email" />
                    <Form.Text className="text-danger">{this.handleError('email')}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={this.state.password} onChange={this.handlePassword}  required className='shadow-none' type="password" placeholder="Password" />
                    <Form.Text className="text-danger">{this.handleError('password')}</Form.Text>
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
export default withRouter(Login);