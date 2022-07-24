import React, { Component } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Swal from "sweetalert2"; 
import {NotificationManager} from 'react-notifications';
import { createProjectApi } from '../../../api/serviceApi';

class ProjectCreate extends Component {
    state = {
        isLoading: false,
        name: "",
        description: "",
        errors: []
    };

    handleName =(e)=>{
        this.setState({name: e.target.value});
    }
    handleDescription =(e)=>{
        this.setState({description: e.target.value});
    }

    handleSubmit = async (e)=>{
        e.preventDefault();
        this.setState({isLoading: true, errors: []});
        const postData = {name: this.state.name, description: this.state.description, user_id: 1}
        
        createProjectApi(postData).then((response) => {
            if(response.data.success){
                Swal.fire({icon: 'success', title: response.data.message, showConfirmButton: false, timer: 1500})
                this.setState({name: "", description: "", errors: []});
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

    handleError = (key)=>{
        return (this.state.errors[key] != undefined)?this.state.errors[key]:'';
    }
    render() {
        return (
        <>
            <div className="header-part">
                <div className="float-left">
                    <h2>Create New Project </h2>
                </div>
                <div className="float-right">
                    <Link className="btn btn-info text-white" to="/projects">All Projects</Link>
                </div>
            </div>
            <div className="clearfix"></div>
            <hr />

            <Card>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Project Name <span className="text-danger">*</span></Form.Label>
                            <Form.Control onChange={this.handleName} value={this.state.name} type="text" placeholder="Enter Project Name" />
                            <Form.Text className="text-danger">{this.handleError('name')}</Form.Text>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control onChange={this.handleDescription} value={this.state.description} type="text" as="textarea" rows="3" placeholder="Enter Project Description" />
                            <Form.Text className="text-danger">{this.handleError('description')}</Form.Text>
                        </Form.Group>
                        
                        { (this.state.isLoading)?
                        <Button variant="primary" type="button" disabled>
                            Saving...
                        </Button>
                        :
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        }
                        
                    </Form>
                </Card.Body>
            </Card>
        </>
        )
    }
}

export default ProjectCreate;
