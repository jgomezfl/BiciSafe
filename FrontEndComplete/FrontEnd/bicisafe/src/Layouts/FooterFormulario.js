import * as React from 'react';
import { FiFacebook, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Email } from '@mui/icons-material';
import { FaPaypal } from 'react-icons/fa'

const FooterFormulario = () => {
    const iconStyles = { color: "#282c34", fontSize: "25px" };
    const iconFooter = { color: "#282c34", fontSize: "20px"};

    function changeBackground(e){
        e.target.style.backgroundColor = "#C6C6C6";
    };
    
    function changeBackgroundAgain(e){
        e.target.style.backgroundColor = "transparent";
    };
    
      return (
        <>
            <div className="footer-container-formularios">
                <div className='mt-2'>
                    <div className='container'>
                        <div className='row'>
                        <div className='col'>
                            <h5 className='text-uppercase fw-bold mb-3 border-bottom border-dark border-2'>
                            Bicisafe
                            </h5>
                            <Nav.Link as={Link} to ="/quienesSomos">
                            <p className='mb-1'>¿Quienes Somos?</p>
                            </Nav.Link>
                            <Nav.Link as={Link} to ="/informacionLegal" state={{ruta: "/"}}>
                            <p className='mb-1'>Información Legal</p>
                            </Nav.Link>
                            <Nav.Link as={Link} to ="/nosotros">
                            <p className='mb-1'>Sobre la Empresa</p>
                            </Nav.Link>
                            <Nav.Link as={Link} to ="/preguntasFrecuentes">
                            <p className='mb-1'>Preguntas Frecuentes</p>
                            </Nav.Link>
                            <a
                            className="App-link"
                            href="https://www.instagram.com/bicisafeapp/"
                            target={"_blank"}
                            rel="noopener noreferrer">
                                Manual de Usuario
                            </a> 
                        </div>
                        <div className='col'>
                            <h5 className='text-uppercase fw-bold mb-4 border-bottom border-dark border-2'>
                            Contactanos
                            </h5>
                            <div className='mb-0 d-flex justify-content-center p-0'>
                            <Email className='mt-1' style={iconFooter} />
                            <p className='ms-1'>equipobicisafe@gmail.com</p>
                            </div>
                            <div className="d-flex justify-content-center pd-0">
                            <a
                            className="App-link border-bottom border-dark border-2"
                            href="https://www.facebook.com/profile.php?id=100087472195351"
                            target={"_blank"}
                            rel="noopener noreferrer" onMouseOver={changeBackground} onMouseLeave={changeBackgroundAgain}>
                                <FiFacebook style={iconStyles} />  
                            </a>
                            <a
                            className="App-link border-bottom border-dark border-2"
                            href="https://www.linkedin.com/company/bicisafeapp/"
                            target={"_blank"}
                            rel="noopener noreferrer" onMouseOver={changeBackground} onMouseLeave={changeBackgroundAgain}>
                                <FiLinkedin style={iconStyles} />  
                            </a>
                            <a
                            className="App-link border-bottom border-dark border-2"
                            href="https://www.instagram.com/bicisafeapp/"
                            target={"_blank"}
                            rel="noopener noreferrer" onMouseOver={changeBackground} onMouseLeave={changeBackgroundAgain}>
                                <FiInstagram style={iconStyles} /> 
                            </a> 
                            </div>
                        </div>
                        <div className='col'>
                            <h5 className='text-uppercase fw-bold mb-4 border-bottom border-dark border-2'>
                            ¿Deseas Apoyarnos?
                            </h5>
                            <a
                            className="App-link"
                            href="https://www.paypal.com/donate/?hosted_button_id=E86Y3C3XUG8CW"
                            target={"_blank"}
                            rel="noopener noreferrer">
                                <Button className='botones_aplicacion'><FaPaypal/> Apoyanos por medio de PayPal </Button>
                            </a> 
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
      );
}

export default FooterFormulario;