import React, { Component } from 'react'
import { Badge, Button, Container, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from "sweetalert2"; 
import { deleteProjectApi, getProjectListApi } from '../../../api/serviceApi';

import { faTrash } from "@fortawesome/free-solid-svg-icons";
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
            projectList: [],
            searchProjectList: []
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

    renderSearch=(results)=>{
        let view=[];
        results.map((project, index)=>{
            view.push(
                <div className="col-md-6 col-lg-4 py-2" key={index}>
                    <div className={`project-card  dealwrapper ${(project.status===1)?"purple":"red"} py-4`}>
                        <div className="ribbon-wrapper">
                            <div className="ribbon-tag">{(project.status===1)?"Completed":"Incomplete"}</div>
                        </div>
                        <div className="card-title px-4">
                            <strong>{project.name}</strong> {" "} <Badge className='text-white' variant="primary">{project.tasks_count}</Badge>
                        </div>
                        <div className="card-content px-4">
                            <p>{project.description}</p>
                        </div>
                        <div className="card-action-hidden text-center py-3">
                            <Link to={`/projects/${project.id}`}>
                                <Button variant='primary' className='mr-2 btn-sm'>View & Edit</Button>
                            </Link>
                            <Button variant='danger' onClick={()=>this.handleDelete(project.id, index)} className='btn-sm'><FontAwesomeIcon  icon={faTrash} /> Delete</Button>
                        </div>
                    </div>
              
                </div>
            )
        })
        if(view.length === 0){
            return(
                <div className='col-md-7 mx-auto p-4'>
                    <div className="text-center p-4 ">
                        {(this.state.search !== '')?"No result found !":"No project created yet !"}
                    </div>
                </div>
            )
        }
        return view;
    }

    renderProjectList(){
        if(this.state.search !== ''){
            const results = this.state.projectList.filter((project) => {
                const mainText = project.name.toLowerCase();
                const searchText = this.state.search.trim().toLowerCase();
                return mainText.indexOf(searchText)!==-1;
            });
            return this.renderSearch(results);
        }
        else{
            return this.renderSearch(this.state.projectList);
        }
    }

    removeListItem =(removeIndex)=>{
        return this.state.projectList.filter((value, index) => index !== removeIndex);
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
                deleteProjectApi(id).then((response) => {
                    if(response.data.success){
                        Swal.fire({icon: 'success', title: response.data.message, showConfirmButton: false, timer: 1500})
                        const newProjectList = this.removeListItem(removeIndex);
                        this.setState({projectList: newProjectList});
                    }else{
                        NotificationManager.error(response.data.message, 'Error!');
                    }
                })
                .catch(error=>{
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
        this.setState({search: e.target.value});
    }

    render() {
        return (
            <>
            <Container className='py-4'> 
            <div className="header-part">
                <div className="float-left d-flex">
                    <h2 className='head-title-shadow'>Projects </h2>
                    <h2> <Badge className='text-white ml-2' variant="primary">{this.state.projectList.length}</Badge></h2>
                    
                </div>
                <div className="float-right d-flex">
                    <Form.Control className='shadow-none border-primary common-search-box' onChange={this.handleSearch} value={this.state.search} type="text" placeholder="Search Project" />
                    <div className='text-right' style={{width: "210px"}}>
                        <button style={{display:"inline"}} className="btn btn-info text-white shadow-btn" onClick={this.handleCreateProject}>+ Create New</button>
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
            </Container>
            </>
        )
    }
}
