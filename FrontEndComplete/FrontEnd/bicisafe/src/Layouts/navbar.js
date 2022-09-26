///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   importante, el nombre de las cookies son "logged" booleano para ver si esta loggeado y "bcusuario" en este guardamoslos datos del usuario sin el password que no se trae de la bd   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React from "react";

import logo from "./../assets/logo.png";
import { FiUser } from 'react-icons/fi';

//componentes bootstrap
import { Button, Nav, Navbar, Modal } from 'react-bootstrap';
import { Container, Row, Col } from "react-bootstrap";

//importamos componentes MUI material
import { Typography, IconButton, Paper, Popper, MenuItem, ClickAwayListener} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; //importamos los iconos de MUI material
import { OutlinedInput, InputLabel, InputAdornment, FormControl, TextField, MenuList } from '@mui/material'; //importamos lo necesario para el formulario

//importamos componentes de validación de forms
import { Formik } from "formik";
import * as Yup from 'yup';

//importamos componente de la cookies
import Cookies from "universal-cookie";

//importamos alertas
import { SuccessMessage, InstantMessage } from "../Helpers/Alertas";

import { Outlet, Link, useNavigate} from "react-router-dom";

import { useState } from "react";

//importamos API
import API from "../services/http-common";

let validationSchema = Yup.object().shape({
    correo: Yup.string().required('Correo es requerido')
        .email('Email invalido'),
    contrasena: Yup.string().required('Contraseña es requerida')
});

var cookie = new Cookies();

const NavbarExample = () => {
    //estilo icono
    const fontStyles = {fontSize: '40px'};

    //guardamos los datos del usuario sin el password
    const [biciusuario, setBiciusuario] = useState(cookie.get("bcusuario"));
    //guardamos el estado (true o false)
    const [loggeado, SetLoggeado] = useState(cookie.get("logged"));
    //constantes booleanas para mostrar el password
    const [showPassword, setShowPassword] = useState(false);

    //mensaje de las alertas
    const [message, setMessage] = React.useState('');
    const [succes, setSucces] = React.useState(false);
    const [error, setError] = React.useState(false);

    //show login modal
    const [showModalLogin, setShowModalLogin] = useState(false);
    const handleOpenLoginModal = () => setShowModalLogin(true);
    const handleCloseLoginModal = () => setShowModalLogin(false);

    //show popper loggout
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpenPopper = (event) => {
        if(loggeado !== undefined){
            setAnchorEl(anchorEl ? null : event.currentTarget);
            setOpen(true);
        } else{
            handleOpenLoginModal();
        }  
    };
    const handleClosePopper = () => {
        setAnchorEl(null);
        setOpen(false);
    }

    const handleShowPassword = () =>{
        setShowPassword(true);
    };
    const handleDontShowPassword = (event) =>{
        event.preventDefault();
    };

    function changeBackground(e){
        e.target.style.backgroundColor = "#C6C6C6";
    };

    function changeBackgroundAgain(e){
        e.target.style.backgroundColor = "transparent";
    };

    function cerrarSesion(){
        SetLoggeado(undefined);
        setBiciusuario(undefined);
        cookie.remove("logged", { path: '/' });
        cookie.remove("bcusuario", { path: '/' });

        handleClosePopper();
    }

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
                    <FiUser onClick={handleOpenPopper} style={fontStyles} /> 
                </Nav.Link>

                <Popper open={open} anchorEl={anchorEl}>
                    <Paper>
                        <ClickAwayListener onClickAway={handleClosePopper}>
                            <MenuList autoFocusItem={open}>
                                <MenuItem onClick={cerrarSesion}>Cerrar Sesión</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Popper>

                {succes ? <SuccessMessage message = {message}/> : `` }
                {error ? <InstantMessage message = {message}/> : `` }

            </Navbar>

            <Modal show={showModalLogin} onHide={handleCloseLoginModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{correo:"", contrasena:""}}
                        onSubmit={async (values) => {
                            var cookie = new Cookies();
                            API.post("/save/login", values).then(({data}) => {
                                if(Boolean(data)){
                                    setBiciusuario(data);
                                    SetLoggeado(true);
                                    setBiciusuario(data);
                                    handleCloseLoginModal();
                                    cookie.set("logged", true, { path: '/' });
                                    cookie.set("bcusuario", data, { path: '/' })
                                    
                                    setMessage("Bienvenido");
                                    setSucces(true);
                                }
                                else{
                                    setMessage("Correo o contraseña incorrectas");
                                    setError(true);
                                    console.log(data);
                                }
                            });
                            setSucces(false);
                            setError(false);

                        }}
                        validationSchema = {validationSchema}>
                        {({handleChange,handleSubmit,errors}) => (
                            <>
                            <Paper>
                                <Container>
                                    <Row className="justify-content-md-center">
                                        <Col md="auto">
                                            <div>
                                                <TextField
                                                 required
                                                 label="Correo"
                                                 onChange={handleChange('correo')}
                                                 error={errors.correo ? true : false}
                                                 sx={{ m: 1, width: '25ch' }}/>
                                                <Typography variant="inherit" color="textSecondary">
                                                    {errors.correo}
                                                </Typography>
                                            </div>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row className="justify-content-md-center">
                                        <Col md="auto">
                                            <div>
                                                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                                    <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                                                    <OutlinedInput
                                                        type={showPassword ? 'text' : 'password'}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleShowPassword}
                                                                    onMouseDown={handleDontShowPassword}
                                                                    edge="end"
                                                                >
                                                                    {showPassword ? <VisibilityOff /> : <Visibility />} 
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                        onChange={handleChange('contrasena')}
                                                        error={errors.contrasena ? true : false}
                                                        label="Contraseña"/>
                                                </FormControl>
                                                <Typography variant="inherit" color="textSecondary">
                                                    {errors.contrasena}
                                                </Typography>
                                            </div>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row className="justify-content-md-center">
                                        <Button onClick={handleSubmit} className="botones_aplicacion">
                                            INGRESAR
                                        </Button> 
                                    </Row>
                                </Container>
                            </Paper>
                            </>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                <Nav.Link as={Link} to="/login" onClick={handleCloseLoginModal}><p><a href="/">¿Olvidaste tu contraseña?</a></p></Nav.Link>
                            </Col>
                        </Row>
                        <br />
                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                <Nav.Link as={Link} to="/register" onClick={handleCloseLoginModal}><p><a href="/">Registrarse</a></p></Nav.Link>
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