import React, { Component } from 'react'
import { Badge, Button, Card, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from "sweetalert2"; 
import { deleteProjectApi, getProjectListApi } from '../../../api/serviceApi';

import { faTrash, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { NotificationManager } from 'react-notifications';
import ProjectCreate from './ProjectCreate';


export default class ProjectList extends Component {
    constructor(props){
        super(props);
        this.timeout =  0;
        this.state = {
            isLoading: true,
            isCreateProject: false,
            search: "",
            projectList: []
        };    
    }
    

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

    renderProjectList(){
        let view = [];
        this.state.projectList.map((project, index)=>{
            view.push(
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
            )
        })
        if(view.length === 0){
            return(
                <div className='col-md-7 mx-auto p-4'>
                    <div className="text-center p-4 ">
                        No project created yet ! 
                    </div>
                </div>
            )
        }
        return view;
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
        })
    }

    handleCreateProject=(value=true)=>{
        this.setState({isCreateProject: value});
    }

    handleProjectComplete=(data)=>{
        this.setState({projectList: [data, ...this.state.projectList]});
    }

    handleSearch=(e)=>{
        const search = e.target.value;
        this.setState({search: search})
        if(this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          console.log(search)
        }, 800);
    }

    render() {
        return (
            <>
            <div className="header-part">
                <div className="float-left">
                    <h2>Projects <Badge className='text-white' variant="primary">{this.state.projectList.length}</Badge></h2>
                </div>
                <div className="float-right d-flex">
                    <Form.Control  onChange={this.handleSearch} value={this.state.search} type="text" placeholder="Search Project" />
                    <div className='text-right' style={{width: "210px"}}>
                        <button style={{display:"inline"}} className="btn btn-info text-white" onClick={this.handleCreateProject}>+ Create New</button>
                    </div>
                    
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

            {!this.state.isLoading &&  this.renderProjectList() }    
            </div>

            {this.state.isCreateProject && 
                <ProjectCreate  handleCreateProject={this.handleCreateProject} handleProjectComplete={this.handleProjectComplete} />
            }
            </>
        )
    }
}
