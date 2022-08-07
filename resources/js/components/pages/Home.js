import React, { Component } from 'react'
import { checkIfAuthenticated } from '../../api/authServiceApi';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            isLoggedIn: false

        };
    }
    componentDidMount(){
        if(checkIfAuthenticated()){
            this.setState({user: checkIfAuthenticated(), isLoggedIn: true});
        }
    }

    render() {
        return (
            <>
                {this.state.isLoggedIn &&
                <>
                    <h3>Welcome, {this.state.user.name}</h3>
                </>
                }

                {!this.state.isLoggedIn &&
                <>
                    <h3>Welcome To TaskMnager </h3>
                    <p>Login your account and enjoy our service.</p>
                </>
                }
                
            </>
        )
    }
}
