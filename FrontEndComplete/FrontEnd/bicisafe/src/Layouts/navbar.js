import React from "react";

import logo from "./../assets/logo.png";
import { FiUser } from 'react-icons/fi';

import {Container, Nav, Navbar} from 'react-bootstrap';
import { Row, Col, FormGroup, InputGroup, Button } from 'react-bootstrap';
import { Outlet, Link} from "react-router-dom";

import { useState } from "react";

import { Offcanvas } from 'react-bootstrap';

const NavbarExample = () => {
    const fontStyles = {fontSize: '40px'};
    //const StyleLogo = {  }

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function changeBackground(e){
        e.target.style.backgroundColor = "#C6C6C6";
    }

    function changeBackgroundAgain(e){
        e.target.style.backgroundColor = "transparent";
    }

    return (
        <>
            <Navbar className="color-nav fluid" collapseOnSelect expand="lg" variant="light">
            {/* <Container>
                <Row className="show-grid">
                    <Col md={10}>
                    <FormGroup className="d-flex">
                        <InputGroup type="search" className="me-2" placeholder="Search" />
                    </FormGroup>
                    </Col>
                    <Col md={2}>
                        <Button>Clear</Button>
                    </Col>
                </Row>
            </Container> */}
            <Container>
                <Row>
                    <Col>
                        
                    </Col>
                </Row>
            </Container>
                <Nav.Link as={Link} to="/" className="mw-100" onMouseOver={changeBackground} onMouseLeave={changeBackgroundAgain}>
                    <img
                      onMouseOver={changeBackground} onMouseLeave={changeBackgroundAgain}
                      alt=""
                      width="15%"
                      heigth="15%"
                      src={logo}
                    />{' '}
                </Nav.Link>
                    

                <Nav.Link onMouseOver={changeBackground} onMouseLeave={changeBackgroundAgain} className="">
                    <FiUser onClick={handleShow} style={fontStyles} />
                </Nav.Link>

                
            </Navbar>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>

            <section>
                <Outlet></Outlet>
            </section>
        </>
    );
}

export default NavbarExample;