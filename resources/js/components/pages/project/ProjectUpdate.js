import React, { Component } from 'react'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import Swal from "sweetalert2"; 
import {NotificationManager} from 'react-notifications';
import { updateProjectApi } from '../../../api/serviceApi';

class ProjectUpdate extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            name: this.props.project.name,
            description: this.props.project.description,
            status: this.props.project.status,
            show: true,
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
        const postData = {name: this.state.name, description: this.state.description, status: parseInt(this.state.status)}
        
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

    handleClose = () =>{
        this.props.handleEditProject(false);
        this.setState({show: false});
    }
    render() {
        return (
        <>
        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header>
                <Modal.Title>Edit Project
                </Modal.Title>
                <button className='btn btn-outline-info btn-sm' onClick={this.handleClose}>x</button>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    <img className='modal-logo' src={`${appUrl}assets/images/favicon.png`} alt="" />
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Project Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control className='shadow-none border-primary' onChange={this.handleName} value={this.state.name} type="text" placeholder="Enter Project Name" />
                        <Form.Text className="text-danger">{this.handleError('name')}</Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                        <Form.Control className='shadow-none border-primary' onChange={this.handleDescription} value={this.state.description} type="text" as="textarea" rows="3" placeholder="Enter Project Description" />
                        <Form.Text className="text-danger">{this.handleError('description')}</Form.Text>
                    </Form.Group>
                    <div className="form-group">
                        <label>select Status</label>
                        <select className="form-control"  onChange={this.handleStatus} value={this.state.status}>
                            <option value={0}>Pending</option>
                            <option value={1}>Complete</option>
                        </select>
                    </div>

                    <Button variant="primary" type="submit" disabled={this.state.isLoading}>
                        {this.state.isLoading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> }
                        Update
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
        )
    }
}

export default ProjectUpdate;
