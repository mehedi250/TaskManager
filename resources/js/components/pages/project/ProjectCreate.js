import Axios from 'axios';
import React, { Component } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'


class ProjectCreate extends Component {
    state = {
        isLoading: false,
        name: "",
        description: ""
    };

    handleName =(e)=>{
        this.setState({name: e.target.value});
    }
    handleDescription =(e)=>{
        this.setState({description: e.target.value});
    }

    handleSubmit = async (e)=>{
        e.preventDefault();

        const postData = {name: this.state.name, description: this.state.description, user_id: 1}
        Axios.post('http://127.0.0.1:8000/api/projects', postData).then((response) => {
            if(response.data.success){
                this.setState({name: "", description: ""});
                alert(response.data.message);
            }
            else{
                alert('error');
            }
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
                        
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
        )
    }
}

export default ProjectCreate;
