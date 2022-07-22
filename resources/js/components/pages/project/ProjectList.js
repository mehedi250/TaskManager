import React, { Component } from 'react'
import { Badge, Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProjectListApi } from '../../../api/serviceApi';

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
        getProjectListApi().then((response) => {
            this.setState({projectList: response.data.data, isLoading: false});
        })
        .catch(error=>{
            this.setState({projectList: [], isLoading: false});
            console.log("LandingPop", error)
        });
    }
    render() {
        return (
            <>
            <div className="header-part">
                <div className="float-left">
                    <h2>Projects <Badge className='text-white' variant="primary">{this.state.projectList.length}</Badge></h2>
                </div>
                <div className="float-right">
                    <Link className="btn btn-info text-white" to="/projects/create">+ Create New</Link>
                </div>
            </div>
            <div className="clearfix"></div>
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
                            {project.name} <Badge className='text-white' variant="primary">{project.tasks_count}</Badge>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {project.description}
                            </Card.Text>
                            <Link to={`/projects/${project.id}`}>
                                <Button variant='primary' className='mr-2'>View</Button>
                            </Link>
                            
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
