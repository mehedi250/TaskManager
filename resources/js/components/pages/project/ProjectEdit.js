import React, { Component } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Swal from "sweetalert2"; 
import {NotificationManager} from 'react-notifications';
import { updateProjectApi } from '../../../api/serviceApi';

class ProjectEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            name: this.props.project.name,
            description: this.props.project.description,
            status: this.props.project.status,
            errors: []
        };
    }

    handleName =(e)=>{
        this.setState({name: e.target.value});
    }
    handleDescription =(e)=>{
        this.setState({description: e.target.value});
    }
    handleStatus =(e)=>{
        this.setState({status: e.target.value});
    }

    handleSubmit = async (e)=>{
        e.preventDefault();
        this.setState({isLoading: true, errors: []});
        const postData = {name: this.state.name, description: this.state.description, status: this.state.status, user_id: 1}
        
        updateProjectApi(this.props.project.id, postData).then((response) => {
            if(response.data.success){
                Swal.fire({icon: 'success', title: response.data.message, showConfirmButton: false, timer: 1500});
                this.props.getProject();
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
            <Card>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-8">
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
                                
                            </div>
                            <div className="col-md-4">
                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select className='from-control' onChange={this.handleStatus} value={this.state.status}>
                                        <option value={0}>Pending</option>
                                        <option value={1}>Complete</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>
                        
                        
                        { (this.state.isLoading)?
                        <Button variant="primary" type="button" disabled>
                            Saving...
                        </Button>
                        :
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                        }
                        
                    </Form>
                </Card.Body>
            </Card>
        </>
        )
    }
}

export default ProjectEdit;
