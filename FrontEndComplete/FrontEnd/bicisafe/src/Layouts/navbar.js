///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   importante, el nombre de las cookies son "logged" booleano para ver si esta loggeado y "bcusuario" en este guardamoslos datos del usuario sin el password que no se trae de la bd   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom"

import logo from "./../assets/logo.png";
import { FiUser, FiFacebook, FiLinkedin, FiInstagram } from 'react-icons/fi';

//componentes bootstrap
import { Button, Nav, Navbar, Modal, NavDropdown } from 'react-bootstrap';
import { Container, Row, Col } from "react-bootstrap";

//importamos componentes MUI material
import { Typography, IconButton, Paper, Box } from '@mui/material';
import { Visibility, VisibilityOff, AccountCircle, LogoutOutlined, Report, Delete,Add, PedalBike } from '@mui/icons-material'; //importamos los iconos de MUI material
import { OutlinedInput, InputLabel, InputAdornment, FormControl, TextField } from '@mui/material'; //importamos lo necesario para el formulario
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

//importamos componentes de validación de forms
import { Formik } from "formik";
import * as Yup from 'yup';

//importamos componente de la cookies
import Cookies from "universal-cookie";

import { Outlet, Link, useNavigate } from "react-router-dom";

import { useEffect,useState } from "react";

//importamos API
import API from "../services/http-common";
import Swal from "sweetalert2";

let validationSchema = Yup.object().shape({
    correo: Yup.string().required('Correo es requerido')
        .email('Email invalido'),
    contrasena: Yup.string().required('Contraseña es requerida')
});
let validationSchema2 = Yup.object().shape({
    desc: Yup.string().required("Por favor ingresa una corta descripción del hecho")
});

var cookie = new Cookies();

const NavbarExample = () => {
    const [ubicacion, setUbicacion] = React.useState(cookie.get("ubicacion"));
    //estilo icono
    const fontStyles = {fontSize: '40px'};
    const iconStyles = { color: "#282c34", fontSize: "25px" };

    const navigate = useNavigate();

    React.useEffect(() => {
        setUbicacion(cookie.get("ubicacion"))
    });

    //guardamos los datos del usuario sin el password
    const [biciusuario, setBiciusuario] = useState(cookie.get("bcusuario"));
    //guardamos el estado (true o false)
    const [loggeado, SetLoggeado] = useState(cookie.get("logged"));
    //serie de la bicicleta
    const [serie, setSerie] = useState(null);
    //guardamos las bicicletas
    const [bicicletas, setBicicletas] = useState(cookie.get("bicicletas"));
    //bivivleta a modificar
    const [bicicleta, setBicicleta] = useState(null);
    //constantes booleanas para mostrar el password
    const [showPassword, setShowPassword] = useState(false);

    //Dialogo de eliminación
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleOpenDialog = () => { setOpenDialog(true); };
    const handleCloseDialog = () => { setOpenDialog(false); setSerie(null); };

    //Dialogo de confirmación reporte
    const [openReportDialog, setOpenReportDialog] = React.useState(false);
    const handleOpenReportDialog = () => { setOpenReportDialog(true); };
    const handleCloseReportDialog = () => { setOpenReportDialog(false); };

    //Dialogo de reporte
    // const [openDialogReporte, setOpenDialogReporte] = React.useState(false);
    // const handleOpenDialogReporte = () => { setOpenDialogReporte(true); };
    // const handleCloseDialogReporte = () => { setOpenDialogReporte(false); };

    //show login modal
    const [showModalLogin, setShowModalLogin] = useState(false);
    const handleOpenLoginModal = () => setShowModalLogin(true);
    const handleCloseLoginModal = () => setShowModalLogin(false);

    //show modal Menu
    const [showModalMenu, setShowModalMenu] = useState(false);
    const handleOpenModalMenu = () => {
        setShowModalMenu(true);

    };
    const handleCloseModalMenu = ()  => setShowModalMenu(false);

    //show modal about us 
    const [showModalAboutUs, setShowModalAboutUs] = useState(false);
    const handleOpenModalAboutUs = () => {
        setShowModalAboutUs(true);

    };

    const handleCloseModalAboutUs = ()  => setShowModalAboutUs(false);

    const Alerta = (mensaje, tipo) => {
        Swal.fire({
            position: 'top',
            icon: tipo,
            title: mensaje,
            showConfirmButton: false,
            timer: 2500
        })
    }

    //show modals
    const handleShowModals = () => {
        if(loggeado === undefined){
            handleOpenLoginModal();
        }
        else{
            var path = "bicicletas/select/all/"+biciusuario.ident;
            API.get(path).then(({data}) => {
                setBicicletas(data);
            })
            console.log(bicicletas)
            handleOpenModalMenu();
        }
    }

    const handleShowModalsAboutUs= () => {
        if(loggeado === undefined){
            handleOpenLoginModal();
        }
        else{
            handleOpenModalAboutUs();
        }
    }

    //Show button paypal
    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

    const [price, setPrice] = useState(0);
    const[opcion, setOpcion] = useState(1);

    useEffect(() =>{
        if(opcion !== "other"){
            setPrice(opcion);
        }
    },[opcion]);
    

    const changePrice = (e) => {
        setPrice(e.target.value);
    }

    const changePriceOption = (e) => {
        setOpcion(e.target.value);
    }
    
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
            {
                amount: {
                value: price,
                currency: 'USD'
                },
            },
            ],
        });
    }

    const onApprove = (data, actions) => {
        return actions.order.capture(console.log("Pago exitoso"));
    }

    const handleShowPassword = () =>{
        setShowPassword(true);
    };
    const handleDontShowPassword = (event) =>{
        event.preventDefault();
        setShowPassword(false);
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
        setBicicletas(undefined);
        setBicicleta(undefined);

        cookie.remove("logged", { path: '/' });
        cookie.remove("bcusuario", { path: '/' });
        cookie.remove("bicicletas", { path: '/' });

        handleCloseModalMenu();
        Alerta("Hasta Pronto","success")
        navigate(("/"));
    }

    function borrarBicicleta(){
        console.log(serie);
        var aux = [];
        for (var i in bicicletas){
            if(bicicletas[i].serie !== serie){
                aux.push(bicicletas[i]);
            }
        }
        setBicicletas(aux);
        cookie.remove("bicicletas", { path: '/' });
        cookie.set("bicicletas", aux, {path: '/'});

        var path = "/bicicletas/delete/"+serie;
        API.delete(path).then(({data}) =>{
            console.log(data);
        })
        handleCloseDialog();
    }

    function reportarBicicleta(desc){
        var dict = {
            serie: bicicleta.serie,
            ident: biciusuario.ident,
            tipo: "Stolen",
            descripcion: desc,
        }
        API.post("/reportes/save",dict).then(({data}) => {
            console.log(data);
        })
        var path = "/bicicletas/update/"+bicicleta.serie;
        API.put(path).then(({data}) => {
            console.log(data);
        })
        var aux = bicicletas;
        for(var i in aux){
            if(aux[i].serie === bicicleta.serie){
                aux[i].robada = true;
            }
        }
        cookie.remove("bicicletas", { path: '/' });
        cookie.set("bicicletas", aux, {path: '/'});
        handleCloseReportDialog();
        handleCloseModalMenu();
        setBicicleta(null);
        Alerta("Hecho reportado","success")
    }

    return (
        <>
            <Navbar className="color-nav d-flex justify-content-around" collapseOnSelect expand="lg" variant="light">
                <div className="d-flex align-items-center">
                    <Nav.Link as={Link} to ="/">
                        <img
                         onMouseOver={changeBackground} onMouseLeave={changeBackgroundAgain}
                         width="100"
                         height="15%"
                         src={logo}
                         className="d-inline-block align-top"
                         alt="React Bootstrap logo"
                        />
                    </Nav.Link>
                    <NavDropdown title={ubicacion}>
                        <NavDropdown.Item>
                            <Nav.Link as={Link} to ="/">
                                Principal
                            </Nav.Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Nav.Link as={Link} to ="/reportes">
                                Reportes
                            </Nav.Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                </div>
                

                <Nav.Link onMouseOver={changeBackground} onMouseLeave={changeBackgroundAgain}>
                    <FiUser onClick={handleShowModals} style={fontStyles} /> 
                </Nav.Link>

            </Navbar>

            <Dialog
             open={openDialog}
             onClose={handleCloseDialog}
             aria-labelledby="alert-dialog-title"
             aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"¿Deseas Eliminar esta bicicleta?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Por favor confirma en caso de realmente querer eliminar la bicicleta, de otra forma
                        solo cancela la solicitud.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={borrarBicicleta} className="btn btn-danger">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            <Modal show={showModalMenu} onHide={handleCloseModalMenu}>
                <Modal.Header closeButton>
                    <Modal.Title>Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex">
                        <AccountCircle sx={{ fontSize: 80 }}/>
                        <div className="ms-5">
                            <h1> {(biciusuario !== undefined) ? biciusuario.userName : ''} </h1>
                            <p> { (biciusuario !== undefined) ? biciusuario.correo : ''} </p>
                        </div>
                    </div>
                    <Paper className="ps-1 pe-1
                    " sx={{maxHeight: '200px', overflow: 'auto', borderColor: 'grey.500', borderStyle: 'solid', borderWidth: '0.1em'}}>
                        { 
                        (bicicletas !== undefined && bicicletas.length > 0) ?
                            bicicletas.map((bicicleta) =>
                            <>
                                {(bicicleta.robada) ? (
                                <Box className="align-items-center mt-1 mb-1" sx={{ backgroundColor:"#dedad9", color:"#A75858" , display:"flex", justifyContent: 'space-between', borderColor: 'grey.500', borderStyle: 'solid', borderWidth: '0.1em', borderRadius: '12px' }}>
                                    <div className="ms-3">
                                        <PedalBike sx={{fontSize: 32 }}/>
                                    </div>
                                    <div className="mt-2 mb-2">
                                        <p className="mb-0 fw-bold">{bicicleta.modelo}</p>
                                        <p className="mt-0 mb-0">{bicicleta.color}</p>
                                    </div>
                                    <div className="d-flex me-3">
                                        {/* <IconButton onClick={() => {console.log("Ya no esta robada uwu")}}></IconButton> */}
                                        <IconButton className="ms-1" onClick={ () => {handleOpenDialog(); setSerie(bicicleta.serie); }}><Delete sx={{ fontSize: 20, color: "#A75858" }}/></IconButton>
                                    </div>
                                </Box>
                                ) : (
                                <Box className="align-items-center mt-1 mb-1" sx={{ display:"flex", justifyContent: 'space-between', borderColor: 'grey.500', borderStyle: 'solid', borderWidth: '0.1em', borderRadius: '12px' }}>
                                    <div className="ms-3">
                                        <PedalBike sx={{fontSize: 32 }}/>
                                    </div>
                                    <div className="mt-2 mb-2">
                                        <p className="mb-0 fw-bold">{bicicleta.modelo}</p>
                                        <p className="mt-0 mb-0">{bicicleta.color}</p>
                                    </div>
                                    <div className="d-flex me-3">
                                        <IconButton onClick={() => {
                                            setBicicleta(bicicleta)
                                            handleOpenReportDialog();
                                            handleCloseModalMenu();
                                        }}><Report sx={{ fontSize: 20 }}/></IconButton>
                                        <IconButton className="ms-1" onClick={ () => {handleOpenDialog(); setSerie(bicicleta.serie); }}><Delete sx={{ fontSize: 20, color: "#A75858" }}/></IconButton>
                                    </div>
                                </Box>)}
                                
                            </>
                            )
                                
                        : 
                            <Box  className="align-items-center mt-1 mb-1" sx={{display:"flex", justifyContent: 'space-between', borderColor: 'grey.500', borderStyle: 'solid', borderWidth: '0.1em', borderRadius: '12px' }}>
                                <div className="ms-3">
                                    <PedalBike sx={{fontSize: 32}}/>
                                </div>
                                <div className="mt-2 mb-2">
                                    <p className="mb-0 fw-bold">No has registrado ninguna bicicleta</p>
                                </div>
                                <div></div>
                            </Box>
                        }
                    </Paper>
                    <br/>
                    <div className="d-flex justify-content-around">
                        <Nav.Link as={Link} to="/regBicicleta">
                            <Button className="botones_aplicacion" size="small" onClick={handleCloseModalMenu}>
                                Añadir Bicicleta
                                <IconButton aria-label="LogOut">
                                    <Add sx={{ color: "#262626" }}/>
                                </IconButton>
                            </Button>
                        </Nav.Link>
                        <Button className="botones_aplicacion_rojos" size="small" onClick={cerrarSesion}>
                            Cerrar Sesión
                            <IconButton aria-label="LogOut">
                                <LogoutOutlined sx={{ color: "#262626" }}/>
                            </IconButton>
                        </Button>
                    </div>

                </Modal.Body>
            </Modal>

            <Modal show={openReportDialog} onHide={handleCloseReportDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>¿Que sucedió?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                     initialValues={{desc:""}}
                     onSubmit={(values) => {
                        reportarBicicleta(values.desc);
                     }}
                     validationSchema={validationSchema2}>
                        {({handleChange,handleSubmit,errors}) => (
                            <>
                            <Paper >
                                <Container >
                                    <TextField
                                     autoFocus
                                     required
                                     margin="dense"
                                     label="Descripción del hecho"
                                     fullWidth
                                     multiline
                                     onChange={handleChange('desc')}
                                     error={errors.desc ? true : false}
                                     variant="standard"
                                     inputProps={{maxLength : 250}}/>
                                    <Typography variant="inherit" color="textSecondary">
                                        {errors.desc}
                                    </Typography>
                                    <br />
                                    <Row className="justify-content-md-center">
                                        <Button onClick={() => {
                                            handleCloseReportDialog();
                                            handleOpenModalMenu();
                                        }} color="primary" className="ms-2 me-2">
                                            Cancelar
                                        </Button> 
                                    </Row>
                                    <Row className="justify-content-md-center mt-1">
                                        <Button onClick={handleSubmit} className="btn btn-danger ms-2 me-2">
                                            Reportar
                                        </Button> 
                                    </Row>
                                </Container>
                            </Paper>
                            </>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>

            <Modal show={showModalLogin} onHide={handleCloseLoginModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{correo:"", contrasena:""}}
                        onSubmit={async (values) => {
                            var cookie = new Cookies();
                            API.post("/biciusuarios/save/login", values).then(({data}) => {
                                if(Boolean(data)){
                                    setBiciusuario(data);
                                    SetLoggeado(true);
                                    setBiciusuario(data);
                                    handleCloseLoginModal();
                                    cookie.set("logged", true, { path: '/' });
                                    cookie.set("bcusuario", data, { path: '/' });

                                    var path = "/bicicletas/select/all/"+data.ident;
                                    API.get(path).then(({data}) =>{
                                        if(Boolean(data)){
                                            cookie.set("bicicletas", data, {path: '/'});
                                            setBicicletas(data);
                                        }
                                    })
                                    Alerta("Bienvenido", "success")
                                }
                                else{
                                    Alerta("Correo o contraseña incorrectas", "error")
                                    console.log(data);
                                }
                            });
                            navigate(("/"));

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
                                                 sx={{ m: 1, width: '25ch' }}
                                                 inputProps={{maxLength : 30}}/>
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
                                                        inputProps={{maxLength : 30}}
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

            <Modal show={showModalAboutUs} onHide={handleCloseModalAboutUs}>
                <Modal.Header closeButton>
                    <Modal.Title>About Us</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h1 className="text-center"> Colabora con Bicisafe </h1>
                        <h5 className="text-center"> Estas donando {price} $</h5>
                    </div>
                    
                    <select value={opcion} className="form-control" onChange={changePriceOption}>
                        <option value="1">1 usd</option>
                        <option value="3">3 usd</option>
                        <option value="5">5 usd</option>
                        <option value="other">Otro valor</option>
                    </select>
                    
                    {opcion === "other" && (
                        <input type ="text" className="form-control" onChange={changePrice} value={price}></input>
                    )}
                    
                    <br></br>
                    <div>
                        <PayPalButton
                            createOrder={(data, actions) => createOrder(data, actions)}
                            onApprove={(data, actions) => onApprove(data, actions)}
                        />
                    </div> 
                    
                     <div class="d-grid gap-3" >
                        
                        <Nav.Link as={Link} to="/nosotros" >
                            <div class="p-2 bg-light border" onClick={handleCloseModalAboutUs}>Bicisafe</div>
                        </Nav.Link>

                        <Nav.Link as={Link} to="/preguntasFrecuentes" >
                            <div class="p-2 bg-light border" onClick={handleCloseModalAboutUs}>Preguntas frecuentes</div>
                        </Nav.Link>
                        
                        <Nav.Link as={Link} to="/informacionLegal" state={{ruta: "/"}}>
                            <div class="p-2 bg-light border" onClick={handleCloseModalAboutUs}>Informacion legal</div>
                        </Nav.Link>

                    </div>
                    <br></br>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                        <a
                        className="App-link"
                        href="https://www.facebook.com/profile.php?id=100087472195351"
                        target={"_blank"}
                        rel="noopener noreferrer" onMouseOver={changeBackground} onMouseLeave={changeBackgroundAgain}>
                            <FiFacebook style={iconStyles} />  
                        </a>
                        <a
                        className="App-link"
                        href="https://www.linkedin.com/company/bicisafeapp/"
                        target={"_blank"}
                        rel="noopener noreferrer" onMouseOver={changeBackground} onMouseLeave={changeBackgroundAgain}>
                            <FiLinkedin style={iconStyles} />  
                        </a>
                        <a
                        className="App-link"
                        href="https://www.instagram.com/bicisafeapp/"
                        target={"_blank"}
                        rel="noopener noreferrer" onMouseOver={changeBackground} onMouseLeave={changeBackgroundAgain}>
                            <FiInstagram style={iconStyles} /> 
                        </a>                    
                    </div>
                
                    
                </Modal.Body>
            </Modal>


            <section>
                <Outlet></Outlet>
            </section>
        </>
    );
}

export default NavbarExample;