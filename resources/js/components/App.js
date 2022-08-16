import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';
import ProjectList from './pages/project/ProjectList';
import ProjectView from './pages/project/ProjecView';

import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import { checkIfAuthenticated } from '../api/authServiceApi';
import AuthenticatedRoute from './AuthenticatedRoute';
import Profile from './pages/Profile';

class App extends Component {
    state = {
        user: {},
        isLoggedIn: false
    }
    componentDidMount(){
        if(checkIfAuthenticated()){
            this.setState({user: checkIfAuthenticated(), isLoggedIn: true});
        }
    }

    resetMount = () =>{
        if(checkIfAuthenticated()){
            this.setState({user: checkIfAuthenticated(), isLoggedIn: true});
        }
        else{
            this.setState({user: {}, isLoggedIn: false});
        }
    }

    render() {
        return (
        <div>
            <Router>
                <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user} resetMount={this.resetMount} />
                <div  style={{minHeight: `calc(100vh - 110.4px)`}}>
                
                    <NotificationContainer/>
                    <Routes>
                        <Route path="/" caseSensitive={false} element={<Home />} />
                        <Route path="/about" caseSensitive={false} element={<About />} />
                        <Route path="/contact" caseSensitive={false} element={<Contact />} />

                        <Route path="/" element={<AuthenticatedRoute login={false}/>}>
                            <Route path="/register" caseSensitive={false} element={<Register />} />
                            <Route path="/login" caseSensitive={false} element={<Login mount={this.resetMount} />} />
                        </Route>

                        <Route path="/" element={<AuthenticatedRoute login={true}/>}>
                            <Route path="/profile" caseSensitive={false} element={<Profile />} />
                        </Route>
                       
                        <Route path="/projects/" element={<AuthenticatedRoute login={true} auth={this.state.isLoggedIn}/>}>
                            <Route path="" element={<ProjectList />} />
                            <Route path=":id" element={<ProjectView />} />
                        </Route>
                    </Routes>
            
                </div>
                <Footer/>
            </Router>
        </div>
        );
    }
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
