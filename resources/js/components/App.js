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
import ProjectCreate from './pages/project/ProjectCreate';
import ProjectView from './pages/project/ProjecView';

import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';

class App extends Component {
  

    render() {
        return (
        <div>
            <Router>
                <Header/>
                <div  style={{minHeight: `calc(100vh - 110.4px)`}}>
                <Container className='py-4'> 
                    <NotificationContainer/>
                   
                    <Routes>
                        <Route path="/" caseSensitive={false} element={<Home />} />
                        <Route path="/about" caseSensitive={false} element={<About />} />
                        <Route path="/contact" caseSensitive={false} element={<Contact />} />
                       
                        <Route path="/projects/" >
                            <Route path="" element={<ProjectList />} />
                            <Route path=":id" element={<ProjectView />} />
                        </Route>
                    </Routes>
                    
                </Container>
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
