import React, { Component } from 'react'
import { Badge, Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { getProjectApi } from '../../../api/serviceApi';

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
            this.setState({taskList: response.data.data.tasks, project: response.data.data, isLoading: false});
        })
        .catch(error=>{
            this.setState({taskList: [], project: [], isLoading: false});
            console.log("LandingPop", error)
        });
    }
    render() {
   
        return (
            <>
            <div className="header-part">
                <div className="float-left">
                {!this.state.isLoading && 
                    <h2>{this.state.project.name}  <Badge className='text-white' variant="primary">{this.state.taskList.length}</Badge></h2>
                }
                </div>
                <div className="float-right">
                    <Link className="btn btn-info text-white mx-2" to="/projects">Back</Link>
                    <Link className="btn btn-info text-white" to="/tasks/create">+ Create New Task</Link>
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
            <div className="col-12">
                <p>{this.state.project.description}</p>
            </div>
            }
       

            {!this.state.isLoading && 
            this.state.taskList.map((task, index)=>(
                <div className="col-md-6 py-2" key={index}>
                    <Card>
                        <Card.Header>
                            {task.name} 
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {task.description}
                            </Card.Text>
                            <Link to={`/tasks/${task.id}`}>
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

const HOCTaskDetail = withRouter(ProjectView);
export default HOCTaskDetail;
