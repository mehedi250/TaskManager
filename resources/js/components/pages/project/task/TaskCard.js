import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { NotificationManager } from 'react-notifications';
import { Button, Card, Spinner } from 'react-bootstrap';
import Swal from "sweetalert2"; 
import { deleteTaskApi, updateTaskApi } from '../../../../api/serviceApi';

export default class TaskCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            task: this.props.task,
            status: this.props.task.status
        };
    }

    handleTaskStatusUpdate=(id, status)=>{
        let newStatus = 0;
        if(status===0){ newStatus = 1;}
        this.setState({isLoading: true});
        const postData = {status: newStatus}
        
        updateTaskApi(id, postData).then((response) => {
            if(response.data.success){
                this.setState( {status: newStatus});
                NotificationManager.success(response.data.message, 'Success');
                // this.props.handleTaskStatusUpdate();
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
                        this.props.handleTaskDelete(this.state.task.id, this.props.index)
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
    render() {
        return (
        <div className="col-12 my-2">   
            <Card className='task-card'>
                <Card.Body>
                    <div className="row">
                        <div className="col-md-7">
                            <strong className={`text-${(this.state.status===1)?"success text-decoration-line-through":""}`}>{this.state.task.name} </strong>
                            <Card.Text>
                                <small className='text-muted'>{this.state.task.description}</small>
                            </Card.Text>
                        </div>
                        <div className="col-md-5 text-right">
                            {(this.state.status===0)?
                                <Button variant='outline-success' className='mr-2 btn-sm' onClick={!this.state.isLoading?()=>this.handleTaskStatusUpdate(this.state.task.id, this.state.status):null}>✓ Mark as Completed</Button>
                            :
                                <Button variant='outline-info' className='mr-2 btn-sm' onClick={!this.state.isLoading?()=>this.handleTaskStatusUpdate(this.state.task.id, this.state.status):null}>Mark as Pending</Button>
                            }
                            
                            <Button variant='outline-danger' className='mr-2 btn-sm' onClick={!this.state.isLoading?()=>this.handleTaskDelete(this.state.task.id, this.props.index):null}><FontAwesomeIcon  icon={faTrash} /> Delete</Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
        )
    }
}
