import React, { Component } from 'react'
import Axios from 'axios';
import { Badge, Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default class ProjectView extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            project: {},
            taskList: []
        };
    }
     
    componentDidMount(){
        this.getProject();
    }

    getProject=()=>{
        // let {id}=this.props.match.params;
        console.log(this.props);
        // const pro = useParams;
        
        // this.setState({isLoading: true});
        // Axios.get(`http://127.0.0.1:8000/api/projects/${this.props.match.params.id}`).then((response) => {
        //     this.setState({taskList: response.data.data.tasks, project: response.data.data, isLoading: false});
        // });
    }
    render() {
        console.log(this.props.match.params.id)
        return (
            <>
            <div className="header-part">
                <div className="float-left">
                {!this.state.isLoading && 
                    <h2>{this.state.project.name} <Badge className='text-white' variant="primary">{this.state.taskList.length}</Badge></h2>
                }
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
            <Card>
                <Card.Header>
                    {this.state.project.name} <Badge className='text-white' variant="primary">{project.tasks_count}</Badge>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {this.state.project.description}
                    </Card.Text>
                    <Button variant='primary' className='mr-2'>View</Button>
                    <Button variant='success' className='mr-2'>Edit</Button>
                    <Button variant='danger' className='mr-2'>Delete</Button>
                </Card.Body>
            </Card>
            }
            </div>
            </>
        )
    }
}
