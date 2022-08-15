import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { NotificationManager } from 'react-notifications';
import { Button, Card } from 'react-bootstrap';
import Swal from "sweetalert2"; 
import { deleteTaskApi, updateTaskApi } from '../../../api/serviceApi';

export default class TaskCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            isDisable: false,
            task: this.props.task,
            status: this.props.task.status
        };
    }

    handleTaskStatusUpdate=(id, status)=>{
        if(this.state.isDisable){
            return false;
        }
        this.setState({isDisable: true});

        let newStatus = 0;
        if(status===0){ newStatus = 1;}
        this.setState({isLoading: true});
        const postData = {status: newStatus}
        
        updateTaskApi(id, postData).then((response) => {
            if(response.data.success){
                this.setState( {status: newStatus});
                NotificationManager.success(response.data.message, 'Success', 1000);
                // this.props.handleTaskStatusUpdate();
            }
            else{
                NotificationManager.error(response.data.message, 'Error!', 1000);
            }
            this.setState({isDisable: false});
        })
        .catch(error=>{
            this.setState({isDisable: false});
            console.log("LandingPop", error)
        });
    }

    handleTaskDelete = (id)=>{
        if(this.state.isDisable){
            return false;
        }
        this.setState({isDisable: true});
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
                        this.setState({isDisable: false});
                    }else{
                        this.setState({isLoading: false});
                        NotificationManager.error(response.data.message, 'Error!');
                    }
                })
                .catch(error=>{
                    this.setState({isDisable: false});
                    console.log("LandingPop", error)
                }); 
            }
            else{
                this.setState({isDisable: false});
            }
        })
    }
    render() {
        return (
        <div className="col-12 my-2">   
            <Card className={`task-card ${(this.state.status===1)?"completed":""}`}>
                <Card.Body>
                    <div className="row">
                        <div className="col-8 d-flex align-items-center">
                            <div className='pr-2 ' style={{fill:"red"}}>
                                {this.state.status===1 ?
                                    <img className='black-to-green-svg cursor-pointer' onClick={()=>this.handleTaskStatusUpdate(this.state.task.id, this.state.status)} src={`${appUrl}assets/images/svg/checked.svg`} alt="" /> :
                                    <img className='cursor-pointer' onClick={()=>this.handleTaskStatusUpdate(this.state.task.id, this.state.status)} src={`${appUrl}assets/images/svg/unchecked.svg`} alt="" />
                                }
                                
                            </div>
                            <div>
                                <strong className={`text-${(this.state.status===1)?"success text-decoration-line-through":""}`}>{this.state.task.name} </strong>
                                <Card.Text>
                                    <small className='text-muted'>{this.state.task.description}</small>
                                </Card.Text>    
                            </div>
                            
                        </div>
                        <div className="col-4 text-right d-flex align-items-center">
                            <div className='ml-auto'>
                                <Button variant='outline-danger' disabled={this.state.isDisable} className='mr-2 my-0 btn-sm' onClick={()=>this.handleTaskDelete(this.state.task.id)}><FontAwesomeIcon  icon={faTrash} /> Delete</Button>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
        )
    }
}
