import React, { Component } from 'react'
import { Badge, Button, Card, Container, Spinner } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import { getProjectApi } from '../../../api/serviceApi';
import TaskCreate from '../task/TaskCreate';
import TaskCard from '../task/TaskCard';
import ProjectUpdate from './ProjectUpdate';

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
            isEditProject: false, //true = show Project update form    
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
            this.setState({taskList: response.data.data.tasks, project: response.data.data, isLoading: false, isEditProject: false});
        })
        .catch(error=>{
            this.setState({taskList: [], project: [], isLoading: false});
            console.log("LandingPop", error)
        });
    }

    renderTaskList(){
        let view = [];
        this.state.taskList.map((task, index)=>{
            view.push(
                <TaskCard key={index} index={index} task={task} handleTaskDelete={this.handleTaskDelete}  />
            )
        })
        if(view.length === 0){
            return(
                <div className='col-md-7 mx-auto p-4'>
                    <div className="text-center p-4 ">
                        No task created yet ! 
                    </div>
                </div>
            )
        }
        return view;
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
        const newProjectList = this.removeListItem(removeIndex);
        this.setState({taskList: newProjectList});    
    }

    handleEditProject = (value=true) =>{
        this.setState({isEditProject: value});
    }


    render() {
        return (
            <>
            <Container className='py-4'>
            <div className="header-part">
                <div className="row">
                    <div className="col-md-7">
                        {!this.state.isLoading && 
                            <>
                            <div className="d-flex">
                                <h2 className='head-title-shadow'>{this.state.project.name}</h2>
                                <h2><Badge className='text-white ml-2' variant="primary">{this.state.taskList.length}</Badge></h2>
                            </div>
                            <p>{this.state.project.description}</p>
                            </>
                        }
                    </div>
                    <div className="col-md-5 text-right">
                        <button className={`btn btn-outline-${this.state.project.status ===1?'success':'info'}`} disabled>
                            {this.state.project.status ===1?'✓Completed':'Pending'}
                        </button>
                        <Link className='btn btn-info text-white shadow-btn ml-2' to="/projects">Back</Link>
                        <button className="btn btn-success shadow-btn ml-2" onClick={this.handleEditProject} >Edit</button>
                        <button className="btn btn-info text-white shadow-btn ml-2" onClick={this.handleCreateTask} >+ Add Task</button>
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

                {!this.state.isLoading && this.renderTaskList() }
            </div>
            {this.state.isCreateTask && 
                <TaskCreate project={this.state.project} handleCreateTask={this.handleCreateTask} handleTaskComplete={this.handleTaskComplete} />
            }
            {this.state.isEditProject && 
                <ProjectUpdate project={this.state.project}  getProject={this.getProject} handleEditProject={this.handleEditProject} />
            }
            </Container>
            </>
        )
    }
}

const HOCTaskDetail = withRouter(ProjectView);
export default HOCTaskDetail;
