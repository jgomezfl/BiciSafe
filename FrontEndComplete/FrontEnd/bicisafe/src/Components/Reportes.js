import React from 'react';
import { Accordion } from 'react-bootstrap';
import { Box, TextField, Typography } from '@mui/material';
import { Button, Modal } from 'react-bootstrap';
import { Outlet, } from "react-router-dom";
import { EmojiEmotions } from '@mui/icons-material';
import API from "../services/http-common";
import Cookies from "universal-cookie";

import { Formik } from "formik";
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import FooterFormulario from "../Layouts/FooterFormulario";
import Footer from "../Layouts/Footer";

let validationSchema = Yup.object().shape({
    body: Yup.string().required('El mensaje es requerido')
})

var cookie = new Cookies();

const Reportes = () => {

    const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);

    const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        console.log(window.innerWidth);
        console.log(window.innerHeight);
    };

    React.useEffect(() => {
        window.addEventListener("resize", handleResize);
      }, []);

    const [biciusuario, setBiciusuario] = React.useState(cookie.get("bcusuario"));
    const [ident, setIdent] = React.useState(null);
    const [reportes, setReportes] = React.useState(null);

    const [emailModal, setEmailModal] = React.useState(false);

    const Alerta = (mensaje, tipo) => {
        Swal.fire({
            position: 'top',
            icon: tipo,
            title: mensaje,
            showConfirmButton: false,
            timer: 2500
        })
    }

    React.useState(() => {
        API.get("/reportes/select/all/robadas").then(({data}) => {
            setReportes(data)
        });

        cookie.remove("ubicacion", {path: '/'})
        cookie.set("ubicacion","Reportes", {path: '/'})
    });

    function enviar_mensaje(ident, mensaje1){
        if(biciusuario === undefined){
            Alerta("No es posible compartir esta información si no has iniciado sesión","error")
            return null;
        }
        else if(parseInt(biciusuario.ident) === parseInt(ident)) {
            Alerta("No puedes compartir información a un reporte propio","error")
            return null;
        }
        else{
            var correoRobado = null;
            var path = "/biciusuarios/select/"+ident
            API.get(path).then(({data}) => {
                correoRobado = data.correo
            })
            setTimeout(() => {
                var mensaje = biciusuario.correo+" quiere ayudarte"+'\n'+mensaje1;
                var dict = {recipient: correoRobado, msgBody: mensaje, subject:"Sabemos algo de tu bici!!"}
                API.post("/sendMail", dict).then(response => {
                    console.log(response);
                }).catch(error => {
                    console.log(error.response);
                });
                setEmailModal(false);
            }, 1000);
        }
    }

    return (
        <>
            <div>
                <Accordion defaultActiveKey="0">
                    <div>
                        <div className='containerFAQ border border-3 rounded border-secondary'>
                            <h1 className="text-center">Bicicletas Reportadas</h1>
                            <h5 className="text-center">¿Has visto alguna de las bicicletas o viste algo de lo sucedido?</h5>
                            <h6 className="text-center">Compartir la información que tienes sería de gran ayuda</h6>
                            {reportes ? (
                                <>
                                    {reportes.map((item, index) => {
                                        return(
                                            <div class="row">
                                                <Accordion.Item eventKey={index} className='p-0 border border-3 rounded border-secondary'>
                                                    <Accordion.Header><h5>{item.serie}</h5></Accordion.Header>
                                                    <Accordion.Body>
                                                        <>
                                                        <Box>
                                                            <div className='ms-3 me-3'>
                                                                <TextField 
                                                                 label="¿Que sucedió?"
                                                                 defaultValue={item.descripcionReporte}
                                                                 InputProps={{readOnly: true}}
                                                                 multiline
                                                                 variant="filled"
                                                                 fullWidth
                                                                />
                                                            </div>
                                                            <div className='mt-3 ms-3 me-3'>
                                                                <TextField 
                                                                 label="¿Como se ve la bicicleta?"
                                                                 defaultValue={item.descripcionBicicleta}
                                                                 InputProps={{readOnly: true}}
                                                                 multiline
                                                                 variant="filled"
                                                                 fullWidth
                                                                />
                                                            </div>
                                                            <div className='mt-3'>
                                                                <p style={{color: 'blue', textDecoration: 'underline', cursor: "pointer"}} onClick={() => {
                                                                    setEmailModal(true);
                                                                    setIdent(item.ident);
                                                                }}>¿Sabes algo, visto algo o tienes alguna información que pueda ayudar al usuario?</p>
                                                            </div>
                                                        </Box>
                                                        </>
                                                    </Accordion.Body>
                                                </Accordion.Item>                                        
                                            </div>
                                        )
                                    })}
                                </>
                            ) : (
                                <>
                                    <div className='bg-light p-2 border border-3 rounded border-secondary d-flex justify-content-center align-items-center'>
                                        <EmojiEmotions /> &nbsp;&nbsp; <h5 className='ms-3'>Actualmente no hay bicicletas reportadas!!!</h5>
                                    </div>
                                </>
                            ) }
                        </div>
                    </div>
                </Accordion>
            </div>

            {(height < 843 && width < 774) ? (<Footer />) : (<FooterFormulario />)}

            <Modal
             show={emailModal}
             onHide={() => {setEmailModal(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Comparte  tu información con el dueño</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                     initialValues={{body:""}}
                     onSubmit={(values) => {
                        setBiciusuario(cookie.get("bcusuario"));
                        enviar_mensaje(ident, values.body)
                     }}
                     validationSchema= {validationSchema}>
                        {({handleChange,handleSubmit,errors}) => (
                            <>
                            <Box>
                                <div>
                                    <TextField
                                     autoFocus
                                     required
                                     margin="dense"
                                     label="Descripción del hecho"
                                     fullWidth
                                     multiline
                                     onChange={handleChange('body')}
                                     variant="standard"
                                     error={errors.body ? true : false}
                                     inputProps={{maxLength : 250}}/>
                                    <Typography variant="inherit" color="textSecondary">
                                        {errors.body}
                                    </Typography>
                                </div>
                                <div className='d-flex justify-content-around mt-4'>
                                    <Button className='botones_aplicacion_rojos' onClick={() => {setEmailModal(false)}}>Cancelar</Button>
                                    <Button className='botones_aplicacion' onClick={handleSubmit}>Enviar</Button>
                                </div>
                            </Box>
                            </>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>

            <section>
                <Outlet></Outlet>
            </section>
        </>
    );
}

export default Reportes;