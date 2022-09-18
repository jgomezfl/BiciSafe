import React from "react";

import logo from "./../assets/logo.png";
import { FiUser } from 'react-icons/fi';

import {Form, Button, Modal, Nav, Navbar} from 'react-bootstrap';
import { Container, Row, Col } from "react-bootstrap";
import { Outlet, Link} from "react-router-dom";

import { useState } from "react";

//importamos API
import API from "../services/http-common";

//importamos until para retornar las promesas
import { until } from "../Helpers/until";


const NavbarExample = () => {
    const fontStyles = {fontSize: '40px'};
    //const StyleLogo = {  }

    const [biciusuarios, setBiciusuarios] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function changeBackground(e){
        e.target.style.backgroundColor = "#C6C6C6";
    }//uwu

    function changeBackgroundAgain(e){
        e.target.style.backgroundColor = "transparent";
    }

    const getBiciusuarios = async () => {
        const [err, res] = await until(API.get("/all"));
        if (err) return err.response.data?.message;
        setBiciusuarios(res.data.data);
        return res.data.data;
    };

    return (
        <>
            <Navbar className="color-nav d-flex justify-content-around" collapseOnSelect expand="lg" variant="light">

                <Nav.Link as={Link} to="/">
                    <img
                      onMouseOver={changeBackground} onMouseLeave={changeBackgroundAgain}
                      width="100"
                      height="15%"
                      src={logo}
                      className="d-inline-block align-top"
                      alt="React Bootstrap logo"
                    />
                </Nav.Link>

                <Nav.Link onMouseOver={changeBackground} onMouseLeave={changeBackgroundAgain}>
                    <FiUser onClick={handleShow} style={fontStyles} />
                </Nav.Link>

            </Navbar>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInputEmail">
                        <Form.Label>Correo Electronico</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="username@example.com"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInputPassword">
                        <Form.Label>Contraña</Form.Label>
                        <Form.Control
                            type="password"
                            autoFocus
                        />
                    </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                <Button onClick={handleClose} className="botones_aplicacion">
                                    INGRESAR
                                </Button> 
                            </Col>
                        </Row>
                        <br />
                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                <Nav.Link as={Link} to="/login" onClick={handleClose}><p><a href="">¿Olvidaste tu contraseña?</a></p></Nav.Link>
                            </Col>
                        </Row>
                        <br />
                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                <Nav.Link as={Link} to="/register" onClick={handleClose}><p><a href="">Registrarse</a></p></Nav.Link>
                            </Col>
                        </Row>
                    </Container>
                    
                </Modal.Footer>
            </Modal>

            <section>
                <Outlet></Outlet>
            </section>
        </>
    );
}

export default NavbarExample;