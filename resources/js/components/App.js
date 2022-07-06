import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';
import ProjectList from './pages/project/ProjectList';
import ProjectCreate from './pages/project/ProjectCreate';


class App extends Component {
    state = {
       
    }


    render() {
        return (
        <div>
            <Router>
                <Header/>
                <Container className='py-4'>
                    {/* <nav>
                        <ul>
                            <li>
                            <Link to="/">Home</Link>
                            </li>
                            <li>
                            <Link to="/about">About</Link>
                            </li>
                            <li>
                            <Link to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </nav> */}
                    <Routes>
                        <Route path="/" caseSensitive={false} element={<Home />} />
                        {/* <Route path="/projects" caseSensitive={false} element={<ProjectList />} /> */}
                        <Route path="/projects-create" caseSensitive={false} element={<ProjectCreate />} />
                        <Route path="/about" caseSensitive={false} element={<About />} />
                        <Route path="/contact" caseSensitive={false} element={<Contact />} />
                        <Route path="/projects/create" caseSensitive={false} element={<ProjectCreate />} />

                        <Route path="/projects" element={<ProjectList />}>
                            <Route path=":id" element={<ProjectCreate />} />
                            <Route path="create" element={<ProjectCreate />} />
                            <Route path="edit/:id" element={<ProjectCreate />} />
                        </Route>
                    </Routes>
                    
                </Container>
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
