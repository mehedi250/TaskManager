import React, { Component } from 'react'
import { Badge, Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { deleteTaskApi, getProjectApi, updateTaskApi } from '../../../api/serviceApi';
import TaskCreate from './task/TaskCreate';
import ProjectEdit from './ProjectEdit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from "sweetalert2"; 
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { NotificationManager } from 'react-notifications';

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams()
    return <Component {...props} params={params} />
  }
  return ComponentWithRouter
}

class ProjectView extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            editStatus: false,    //true = show Project update form
            isCreateTask: false,  //true = show create new task modal 
            project: {},
            taskList: []
        };
    }
     
    componentDidMount(){
        this.getProject();
    }

    getProject=()=>{
        this.setState({isLoading: true});
        getProjectApi(this.props.params.id).then((response) => {
            this.setState({taskList: response.data.data.tasks, project: response.data.data, isLoading: false, editStatus: false});
        })
        .catch(error=>{
            this.setState({taskList: [], project: [], isLoading: false});
            console.log("LandingPop", error)
        });
    }

    handleCreateTask=(value=true)=>{
        this.setState({isCreateTask: value});
    }

    handleTaskComplete=(data)=>{
        this.setState({taskList: [...this.state.taskList, data]});
    }

    removeListItem =(removeIndex)=>{
        return this.state.taskList.filter((value, index) => index !== removeIndex);
    }

    handleTaskDelete = (id, removeIndex)=>{
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
                deleteTaskApi(id).then((response) => {
                    if(response.data.success){
                        Swal.fire({icon: 'success', title: response.data.message, showConfirmButton: false, timer: 1500})
                        const newProjectList = this.removeListItem(removeIndex);
                        this.setState({taskList: newProjectList});
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

    handleTaskStatusUpdate=(id, status)=>{
        this.setState({isLoading: true});
        const postData = {status: status}
        
        updateTaskApi(id, postData).then((response) => {
            if(response.data.success){
                Swal.fire({icon: 'success', title: response.data.message, showConfirmButton: false, timer: 1500});
                this.getProject();
            }
            else{
                NotificationManager.error(response.data.message, 'Error!');
            }
            this.setState({isLoading: false});
        })
        .catch(error=>{
            this.setState({isLoading: false});
            console.log("LandingPop", error)
        });
    }
    render() {
   
        return (
            <>
            <div className="header-part">
                <div className="row">
                    <div className="col-md-7">
                        {this.state.editStatus &&
                            <ProjectEdit  project={this.state.project} getProject={this.getProject} />
                        }
                        {!this.state.isLoading && !this.state.editStatus &&
                            <>
                                <h2>{this.state.project.name}  <Badge className='text-white' variant="primary">{this.state.taskList.length}</Badge></h2>
                                <p>{this.state.project.description}</p>
                            </>
                        }
                        
                    </div>
                    <div className="col-md-5 text-right">
                        <button className={`btn btn-outline-${this.state.project.status ===1?'success':'info'}`} disabled>
                            {this.state.project.status ===1?'✓Completed':'Pending'}
                        </button>
                        <button className='btn btn-success ml-2' onClick={()=>this.setState({editStatus: !this.state.editStatus})}>{!this.state.editStatus?'Edit':'Cancel Edit'}</button>
                        {/* <Link className="btn btn-info text-white ml-2" to="/projects">Back</Link> */}
                        <button className="btn btn-info text-white ml-2" onClick={this.handleCreateTask} >+ Add Task</button>
                    </div>
                </div>
            </div>
            {/* <div className="clearfix"></div> */}
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
            this.state.taskList.map((task, index)=>(
                <div className="col-12 py-2" key={index}>
                    <Card className='task-card'>
                        <Card.Body>
                            <div className="row">
                                <div className="col-md-7">
                                    <h5 className={`text-${(task.status===1)?"success":""}`}>{task.name} </h5>
                                    <Card.Text>
                                        {task.description}
                                    </Card.Text>
                                </div>
                                <div className="col-md-5 text-right">
                                    {(task.status===0)?
                                        <Button variant='outline-success' className='mr-2 btn-sm' onClick={()=>this.handleTaskStatusUpdate(task.id, !task.status)}>✓ Mark as Completed</Button>
                                    :
                                        <Button variant='outline-info' className='mr-2 btn-sm' onClick={()=>this.handleTaskStatusUpdate(task.id, !task.status)}>Mark as Pending</Button>
                                    }
                                    
                                    <Button variant='outline-danger' className='mr-2 btn-sm' onClick={()=>this.handleTaskDelete(task.id, index)}><FontAwesomeIcon  icon={faTrash} /> Delete</Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            ))}
            </div>
            {this.state.isCreateTask && 
                <TaskCreate project={this.state.project} handleCreateTask={this.handleCreateTask} handleTaskComplete={this.handleTaskComplete} />
            }


            </>
        )
    }
}

const HOCTaskDetail = withRouter(ProjectView);
export default HOCTaskDetail;
