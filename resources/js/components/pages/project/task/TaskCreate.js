import React, { Component } from 'react'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'

import Swal from "sweetalert2"; 
import {NotificationManager} from 'react-notifications';
import { createTaskApi } from '../../../../api/serviceApi';

class TaskCreate extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            name: "",
            description: "",
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

    handleSubmit = async (e)=>{
        e.preventDefault();
        this.setState({isLoading: true, errors: []});
        const postData = {name: this.state.name, description: this.state.description, project_id: this.props.project.id}
        
        createTaskApi(postData).then((response) => {
            if(response.data.success){
                Swal.fire({icon: 'success', title: response.data.message, showConfirmButton: false, timer: 1500})
                this.handleClose();
                this.props.handleTaskComplete(response.data.data);
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
        this.props.handleCreateTask(false);
        this.setState({show: false});
    }

    render() {
        return (
        <>
        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header>
                <Modal.Title>Create New Task
                    <div></div>
                </Modal.Title>
                <button className='btn btn-outline-info btn-sm' onClick={this.handleClose}>x</button>
            </Modal.Header>
            <Modal.Body>
            {/* <small><em>Project: {this.props.project.name}</em></small> */}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Task Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control onChange={this.handleName} value={this.state.name} type="text" placeholder="Enter Task Name" />
                        <Form.Text className="text-danger">{this.handleError('name')}</Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={this.handleDescription} value={this.state.description} type="text" as="textarea" rows="3" placeholder="Enter Task Description" />
                        <Form.Text className="text-danger">{this.handleError('description')}</Form.Text>
                    </Form.Group>
                    
                    { (this.state.isLoading)?
                    <Button variant="primary" type="button" disabled>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        Saving...
                    </Button>
                    :
                    <Button variant="primary" type="submit">
                        Add Task
                    </Button>
                    }
                    
                </Form>
            </Modal.Body>
        </Modal>
        </>
        )
    }
}

export default TaskCreate;
