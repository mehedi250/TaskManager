import React, { Component } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { getUserApi } from '../../api/authServiceApi';

export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            isLoading: true

        };
    }
    getUser=()=>{
        this.setState({isLoading: true});
        getUserApi().then((response) => {
            this.setState({user: response.data.user, isLoading: false});
        })
        .catch(error=>{
            this.setState({user: {}, isLoading: false});
            console.log("LandingPop", error)
        });
    }
    componentDidMount(){
        this.getUser();
    }


  render() {
    return (
        <Container className='py-4'>
            {this.state.isLoading? 
            <div className="text-center w-100 py-4">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden"></span>
                </Spinner>    
            </div>
            :
            <div className="row">
                <div className="col-md-6 col-lg-4 mx-auto">
                    <div className="dev-card p-4">
                        <div className='dev-img text-center'>
                            <img src={`${appUrl}assets/images/svg/user-svg.svg`} alt="" />
                        </div>
                        <div className='dev-info pt-2'>
                            <h4>{this.state.user.name}</h4>
                            <p>Email: <a className='text-white' href={`mailto: ${this.state.user.email}`}> {this.state.user.email}</a> </p>
                        </div>
                    </div>    
                </div>
            </div>
            }
            

        </Container>
    )
  }
}
