import React from 'react'
import { Container } from 'react-bootstrap';
function Contact() {
  return (
<>
    <Container className='contact-container py-4'>
      <div className="dev-card p-4">
        <div className="d-flex align-items-center">
          <div className='dev-img pr-4'>
            <img src={`${appUrl}assets/images/dev.png`} alt="" />
          </div>
          <div className='dev-info'>
            <h2>Md. Mehedi Hasan Shawon</h2>
            <p><strong>Web Application Developer</strong></p>
            <p>PHP | Laravel | React Js</p>
            <p>Email: <a className='text-white' href="mailto: mhshawon250@gmail.com"> mhshawon250@gmail.com</a> </p>
          </div>
        </div> 
       
      </div>
      
    </Container>
    <img className='contact-star4' src={`${appUrl}assets/images/svg/star4.svg`}alt="" /> 
    <img className='contact-star5' src={`${appUrl}assets/images/svg/star5.svg`}alt="" /> 
  </>
  )
}

export default Contact