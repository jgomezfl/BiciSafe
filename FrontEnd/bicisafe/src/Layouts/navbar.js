import logo from "./../assets/logo.jpg";
import { FiUser } from 'react-icons/fi';

import {Container, Nav, Navbar} from 'react-bootstrap';
import { Outlet, Link} from "react-router-dom";

import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

const fontStyles = {fontSize: '40px'};

const navbarExample = () => {
    return (
        <>
            <Navbar className="color-nav" collapseOnSelect expand="lg" variant="light">
                <Container>

                <Navbar.Brand className="justify-content-start">
                            <Nav.Link as={Link} to="/">
                                <img
                                  alt=""
                                  src={logo}
                                  width="150"
                                  height="70"
                                  className="d-inline-block align-top"
                                />{' '}
                            </Nav.Link>
                        </Navbar.Brand>

                    {/* <Nav.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} /> */}

                    <Nav
                        typeof="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarText"
                        aria-controls="navbarText"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <FiUser style={fontStyles} />
                    </Nav>

                </Container>
            </Navbar>

            <section>
                <Outlet></Outlet>
            </section>
        </>
    );
}

export default navbarExample;