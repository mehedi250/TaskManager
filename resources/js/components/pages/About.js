import React from 'react'
import { Container } from 'react-bootstrap';
function About() {
  return (

    <Container className='py-4'>
      <div className="about-card">
        <div className="row">
          <div className="col-md-6">
            <img className='img-fluid' src={`${appUrl}assets/images/about.png`} alt="" />
          </div>
          <div className="col-md-6 px-4">
            <ul>
              <li>Can register new user.</li>
              <li>Can add new project.</li>
              <li>Can search project.</li>
              <li>Can edit project.</li>
              <li>Can delete project.</li>
              <li>Can delete project.</li>
              <li>Can add new task under a project.</li>
              <li>Can delete task.</li>
            </ul>

          </div>
        </div>
      </div>

    </Container>

  )
}

export default About