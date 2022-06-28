import React, { Component } from 'react'
import Axios from 'axios';
import { Button, Card, Spinner } from 'react-bootstrap';

export default class ProjectList extends Component {
    state = {
        isLoading: true,
        projectList: []
    };

    componentDidMount(){
        this.getProjectList();
    }

    getProjectList=()=>{
        this.setState({isLoading: true});
        Axios.get('http://127.0.0.1:8000/api/projects').then((response) => {
            this.setState({projectList: response.data.data});
            this.setState({isLoading: false});
        });
    }
    render() {
        return (
            <>
            <h2>Projects</h2>
            <hr />
            <div className="row">
            {this.state.isLoading && 
            <div className="text-center w-100 py-4">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden"></span>
                </Spinner>    
            </div>
            
            }
            {!this.state.isLoading && 
            this.state.projectList.map((project, index)=>(
                <div className="col-md-6 py-2" key={index}>
                    <Card>
                        <Card.Header>
                            {project.name}
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {project.description}
                            </Card.Text>
                            <Button variant='primary' className='mr-2'>View</Button>
                            <Button variant='success' className='mr-2'>Edit</Button>
                            <Button variant='danger' className='mr-2'>Delete</Button>
                        </Card.Body>
                    </Card>
                </div>
            ))}
            </div>
            </>
        )
    }
}
