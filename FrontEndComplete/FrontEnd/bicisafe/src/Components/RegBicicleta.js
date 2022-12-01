import * as React from "react";

import { Container, Button, Nav } from "react-bootstrap";

import { Card, CardActions, CardHeader, CardContent, Autocomplete } from '@mui/material'; //importamos todo de las cartas
import { Typography, IconButton, Paper} from '@mui/material';
import { Save, Cancel, PedalBike } from '@mui/icons-material'; //importamos los iconos de MUI material
import { Box, TextField } from '@mui/material'; //importamos lo necesario para el formulario

import API from "../services/http-common";

import { Outlet, Link, useNavigate } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";

import FooterFormulario from "../Layouts/FooterFormulario";
import Footer from "../Layouts/Footer";

import Cookies from "universal-cookie";
import Swal from "sweetalert2";

let validationSchema = Yup.object().shape({
    serie: Yup.string().required("Número de serie es requerido"),
    modelo: Yup.string().required("Modelo dela bicicleta requerido"),
    color: Yup.string(),
    vendedor: Yup.string().required("Vendedor requerido"),
    descripcion: Yup.string().required("La descripción puede ayudarnos a identificar tu bicicleta")
})

var cookie = new Cookies();


const RegBicicleta = () => {

    const [width, setWidth] = React.useState(window.innerWidth);
    const [height, setHeight] = React.useState(window.innerHeight);

    const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        console.log(window.innerWidth);
        console.log(window.innerHeight);
    };

    React.useState(() => {
        cookie.remove("ubicacion", {path: '/'})
        cookie.set("ubicacion","Registrar Bicicleta", {path: '/'})
    })

    React.useEffect(() => {
        window.addEventListener("resize", handleResize);
      }, []);

    const [biciusuario] = React.useState(cookie.get("bcusuario"));
    const navigate = useNavigate();

    const colores = [
        {label: 'Blanco'},
        {label: 'Negro'},
        {label: 'Rojo'},
        {label: 'Gris'},
        {label: 'Verde'},
        {label: 'Azul'}
    ]

    const Alerta = (mensaje, tipo) => {
        Swal.fire({
            position: 'top',
            icon: tipo,
            title: mensaje,
            showConfirmButton: false,
            timer: 2500
        })
    }
    
    return (
        <>
            <Formik
             initialValues={{ ident: biciusuario.ident, serie: "", modelo: "", color: "", vendedor: "", robada: false, descripcion: "" }}
             onSubmit={(values) => {
                API.post("/bicicletas/save", values).then(({data}) => {
                    if(data === 'Bicicleta ya registrada'){
                        var aux = true;
                        var path = "/reportes/select/robada/"+values.serie
                        API.get(path).then(({data}) => {
                            if(data){
                                aux = false;
                                Alerta("Bicicleta reportada como robada", "warning")
                                // enviar_mensaje(data.ident, data.serie);
                            }
                        })
                        if(aux){
                            Alerta(data, "error");
                        }
                    }
                    else{
                        Alerta("Bicicleta registrada","success")
                        navigate(("/"));
                    }
                });
                // console.log(values)
             }}
             validationSchema = {validationSchema}
             >
                {({handleChange, handleSubmit, errors}) => (
                    <>
                        <Container className="register-mt">
                            <Card sx={{ maxWidth: 1000, width: 700 }}>
                                <CardHeader
                                    avatar={
                                        <IconButton aria-label="secondaryIcon">
                                            <PedalBike/>
                                        </IconButton>
                                    }
                                    title="REGISTRO"
                                    subheader="Por favor ingresa tus datos completos"
                                />
                                <CardContent>
                                    <Paper>
                                        <Box sx={{display:"flex", flexWrap:'wrap', justifyContent: 'space-around'}}>
                                            <div>
                                                <TextField
                                                 required
                                                 label="Serie de la bicicleta"
                                                 onChange={handleChange('serie')}
                                                 error={errors.serie ? true : false}
                                                 sx={{ m: 1, width: '25ch' }}
                                                 inputProps={{maxLength : 20}}
                                                />
                                                <Typography variant="inherit" color="textSecondary">
                                                    {errors.serie}
                                                </Typography>
                                            </div>
                                            <div>
                                                <TextField
                                                 required
                                                 label="Modelo de la bicicleta"
                                                 onChange={handleChange('modelo')}
                                                 error={errors.modelo ? true : false}
                                                 sx={{ m: 1, width: '25ch' }}
                                                 inputProps={{maxLength : 20}}
                                                />
                                                <Typography variant="inherit" color="textSecondary">
                                                    {errors.modelo}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Autocomplete 
                                                 disablePortal
                                                 options={colores}
                                                 onSelect={handleChange('color')}
                                                 sx={{ m: 1, width: '25ch' }}
                                                 renderInput={(params) => <TextField {...params} label="Color de la bicicleta"
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        inputProps: {
                                                            ...params.inputProps,
                                                            maxLength: 20 
                                                        }
                                                    }}
                                                    onChange={handleChange('color')} error={errors.color ? true : false}/>}
                                                />
                                                <Typography variant="inherit" color="textSecondary">
                                                    {errors.color}
                                                </Typography>
                                            </div>
                                            <div>
                                                <TextField
                                                 required
                                                 label="Vendedor"
                                                 onChange={handleChange('vendedor')}
                                                 error={errors.vendedor ? true : false}
                                                 sx={{ m: 1, width: '25ch' }}
                                                 inputProps={{maxLength : 30}}
                                                />
                                                <Typography variant="inherit" color="textSecondary">
                                                    {errors.vendedor}
                                                </Typography>
                                            </div>
                                        </Box>
                                        <Box className="ms-5 me-5">
                                            <div>
                                                <TextField
                                                 required
                                                 label="Descripción de la bicicleta"
                                                 fullWidth
                                                 multiline
                                                 onChange={handleChange('descripcion')}
                                                 error={errors.descripcion ? true : false}
                                                 inputProps={{maxLength : 250}}
                                                />
                                                <Typography variant="inherit" color="textSecondary">
                                                    {errors.descripcion}
                                                </Typography>
                                            </div>
                                        </Box>
                                        <CardActions sx={{ display: 'flex', justifyContent: 'space-around', flexWrap:'wrap', marginTop:'20px' }}>
                                            <Button className="botones_aplicacion" size="small" onClick={handleSubmit}>
                                                REGISTRAR
                                                <IconButton aria-label="save">
                                                    <Save/>
                                                </IconButton>
                                            </Button>
                                            <Nav.Link as={Link} to="/">
                                                <Button size="small" className="botones_aplicacion_rojos">
                                                    CANCELAR
                                                    <IconButton aria-label="cancel">
                                                        <Cancel/>
                                                    </IconButton>
                                                </Button>
                                            </Nav.Link>
                                        </CardActions>
                                    </Paper>
                                </CardContent>
                            </Card>
                        </Container>
                    </>
                )}
            </Formik>

            {(height < 843 && width < 774) ? (<Footer />) : (<FooterFormulario />)}

            <section>
                <Outlet></Outlet>
            </section>
        </>
    )

}

export default RegBicicleta;