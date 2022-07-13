import Axios from 'axios';
import React, { Component } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
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

    handleError=()=>{
        this.setState({errors: []});
    }

    handleSubmit = async (e)=>{
        e.preventDefault();
        this.setState({isLoading: true});

        const postData = {name: this.state.name, description: this.state.description, user_id: 1}
        Axios.post('http://127.0.0.1:8000/api/projects', postData).then((response) => {
            if(response.data.success){
                Swal.fire({
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                this.setState({name: "", description: "", errors: []});
            }
            else{
                this.setState({errors: response.data.message});
            
                setTimeout(() => this.setState({errors: []}), 2000);
            }
            this.setState({isLoading: false});
        });
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
            
            {(this.state.errors.length>0) &&  this.state.errors.map((error, index)=>(
                <Alert severity="error" key={index}>{error}</Alert>
            ))}
            
      
            <Card>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Project Name <span className="text-danger">*</span></Form.Label>
                            <Form.Control onChange={this.handleName} value={this.state.name} type="text" placeholder="Enter Project Name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control onChange={this.handleDescription} value={this.state.description} type="text" as="textarea" rows="5" placeholder="Enter Project Description" />
                        </Form.Group>
                        
                        { this.state.isLoading && 
                        <Button variant="primary" type="button" disabled>
                            Saving...
                        </Button>
                        }
                        { !this.state.isLoading && 
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
