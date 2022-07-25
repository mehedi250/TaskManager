import React, { Component } from 'react'
import { Badge, Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from "sweetalert2"; 
import { deleteProjectApi, getProjectListApi } from '../../../api/serviceApi';

import { faTrash, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { NotificationManager } from 'react-notifications';


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

    removeListItem =(removeIndex)=>{
        return this.state.projectList.filter((value, index) => index !== removeIndex);
    }

    deletetItemConformtion=()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
              return true;
            }
            return false;
        })
    }

    handleDelete=(id, removeIndex)=>{
        if(this.deletetItemConformtion()){
            this.setState({isLoading: true});
            deleteProjectApi(id).then((response) => {
                if(response.data.success){
                    Swal.fire({icon: 'success', title: response.data.message, showConfirmButton: false, timer: 1500})
                    const newProjectList = this.removeListItem(removeIndex);
                    this.setState({projectList: newProjectList});
                    this.setState({isLoading: false});
                }else{
                    this.setState({isLoading: false});
                    NotificationManager.error(response.data.message, 'Error!');
                }
                
            })
            .catch(error=>{
                this.setState({isLoading: false});
                console.log("LandingPop", error)
            });    
        }
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
                            {(project.status===1) &&  <span className='float-right text-success'><FontAwesomeIcon  icon={faCheckDouble} /></span>}
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {project.description}
                            </Card.Text>
                            <Link to={`/projects/${project.id}`}>
                                <Button variant='primary' className='mr-2 btn-sm'>View & Edit</Button>
                            </Link>
                            <Button variant='danger' onClick={()=>this.handleDelete(project.id, index)} className='btn-sm'><FontAwesomeIcon  icon={faTrash} /> Delete</Button>
                        </Card.Body>
                    </Card>
                </div>
            ))}
            </div>
            </>
        )
    }
}
