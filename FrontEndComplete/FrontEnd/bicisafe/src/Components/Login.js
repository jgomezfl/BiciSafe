import * as React from "react";

//componentes de bootstrap
import { Container, Button, Nav} from "react-bootstrap";

//componentes de MUI
import { Card, CardActions, CardHeader, CardContent } from '@mui/material'; //importamos todo de las cartas
import { Typography, IconButton, Paper} from '@mui/material';
import { Save, Cancel, PedalBike, Visibility, VisibilityOff} from '@mui/icons-material'; //importamos los iconos de MUI material
import { Box, OutlinedInput, InputLabel, InputAdornment, FormControl, TextField } from '@mui/material'; //importamos lo necesario para el formulario

//API
import API from "../services/http-common";

import FooterFormulario from "../Layouts/FooterFormulario";
import Footer from "../Layouts/Footer";

//componentes router para la navegación
import { Outlet, Link, useNavigate} from "react-router-dom";

//formValidation
import { Formik } from "formik";
import * as Yup from 'yup';
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

var cookie = new Cookies();

let validationSchema  = Yup.object().shape({
    correo: Yup.string().required('Correo es requerido')
        .email('Email invalido'),
    codigo: Yup.number().required('código requerido para la comprobación'),
    contrasena: Yup.string().required('Contraseña es requerida')
        .min(8, 'Contraseña debe ser mayor a 8 caracteres de longitud'),
    conf_contrasena: Yup.string()
        .required('Debes confirmar tu contraseña')
        .oneOf([Yup.ref('contrasena'), null], 'Contraseña no concuerda')
});

const Login = () => {
    
    React.useState(() => {
        cookie.remove("ubicacion", {path: '/'})
        cookie.set("ubicacion","Recuperar Contraseña", {path: '/'})
    })

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

    const Alerta = (mensaje, tipo) => {
        Swal.fire({
            position: 'top',
            icon: tipo,
            title: mensaje,
            showConfirmButton: false,
            timer: 2500
        })
    }

    const [state1, setState1] = React.useState(false);
    const [state2, setState2] = React.useState(false);
    const [randomCode, setRandomCode] = React.useState("");

    const navigate = useNavigate();
    const [values, setValues] = React.useState({
        showPassword: false,
        showConfirmPassword: false
    });

    const handleShowPassword = () =>{
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleDontShowPassword = (event) =>{
        event.preventDefault();
    };

    const handleShowConfirmPassword = () =>{
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
        });
    };

    const handleDontShowConfirmPassword = (event) =>{
        event.preventDefault();
    };

    return (
        <>
            <Formik
                initialValues={{ correo:"", codigo: 0,contrasena:"contrasena", conf_contrasena:"contrasena" }}
                onSubmit={(values) => {

                    if(!state1){
                        var dict = {correo: values.correo};
                        var randomGeneratedNumber = Math.floor(Math.random() * 9)+""+Math.floor(Math.random() * 9)+""+Math.floor(Math.random() * 9)+""+Math.floor(Math.random() * 9);
                        var msg = {recipient: values.correo, msgBody: "El código de recuperación es: "+randomGeneratedNumber, subject:"Código de recuperación de contraseña"}
                        API.post("/biciusuarios/save/correo", dict).then(({data}) => {
                            if(Boolean(data)){
                                setState1(true);
                                setRandomCode(randomGeneratedNumber);
                                Alerta("Código de confirmación enviado", "success")

                                API.post("/sendMail", msg).then(response => {
                                    console.log(response);
                                }).catch(error => {
                                    console.log(error.response);
                                });
                            }else{
                                console.log(null);
                            }
                        });
                    } else if(!state2) {
                        // var codigo_aleatorio = values.codigo;
                        console.log(randomCode);
                        if(values.codigo === randomCode){
                            Alerta("Código de seguridad concuerda","success")
                            setState2(true);
                        }
                        else{
                            Alerta("Código de seguridad incorrecto","error");
                        }
                    } else {
                        API.put("/biciusuarios/update/password",{correo: values.correo, contrasena: values.contrasena}).then(({data}) => {
                            Alerta("La contraseña fue reestablecida","success")
                            navigate(("/"));
                        }).catch(error => {
                            console.log(error.response);
                        });
                    }

                }}
                validationSchema = {validationSchema}
            >
            {({handleChange,handleSubmit,errors})=>(

                <>
                    <Container className="register-mt">
                        <Card sx={{ maxWidth: 1000, width: 700 }}>
                            <CardHeader
                                avatar={
                                    <IconButton aria-label="secondaryIcon">
                                        <PedalBike/>
                                    </IconButton>
                                }
                                title="Recuperar Contraseña"
                                subheader="Por favor ingresa tus datos completos"
                            />
                            <CardContent>
                                <Paper>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap:'wrap' }}>
                                        <div>
                                            <TextField
                                             required
                                             label="Correo Electrónico"
                                             onChange={handleChange('correo')}
                                             error={errors.correo ? true : false}
                                             sx={{ m: 1, width: '25ch' }}
                                             inputProps={{maxLength : 30}}
                                            />
                                            <Typography variant="inherit" color="textSecondary">
                                                {errors.correo}
                                            </Typography>
                                        </div>
                                        <div>
                                            <TextField
                                             required
                                             disabled = {!state1}
                                             label="Código"
                                             onChange={handleChange('codigo')}
                                             error={errors.codigo ? true : false}
                                             sx={{ m: 1, width: '25ch' }}
                                             inputProps={{maxLength : 4}}
                                            />
                                            <Typography variant="inherit" color="textSecondary">
                                                {errors.codigo}
                                            </Typography>
                                        </div>
                                        <div>
                                                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" disabled={!state2}>
                                                <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                                                <OutlinedInput
                                                    disabled={!state2}
                                                    type={values.showPassword ? 'text' : 'password'}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleShowPassword}
                                                                onMouseDown={handleDontShowPassword}
                                                                edge="end"
                                                            >
                                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}  
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    onChange={handleChange('contrasena')}
                                                    error={errors.contrasena ? true : false}
                                                    inputProps={{maxLength : 30}}
                                                    label="Contraseña" />
                                            </FormControl>
                                            <Typography variant="inherit" color="textSecondary">
                                                {errors.contrasena}
                                            </Typography>
                                        </div>
                                        <div>
                                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" disabled={!state2}>
                                                <InputLabel htmlFor="outlined-adornment-password">Confirmar Contraseña</InputLabel>
                                                <OutlinedInput
                                                    disabled={!state2}
                                                    type={values.showConfirmPassword ? 'text' : 'password'}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleShowConfirmPassword}
                                                                onMouseDown={handleDontShowConfirmPassword}
                                                                edge="end"
                                                            >
                                                                {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}  
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    onChange={handleChange('conf_contrasena')}
                                                    error={errors.conf_contrasena ? true : false}
                                                    inputProps={{maxLength : 30}}
                                                    label="Confirmar Contraseña" />
                                            </FormControl>
                                            <Typography variant="inherit" color="textSecondary">
                                                {errors.conf_contrasena}
                                            </Typography>
                                        </div>
                                    </Box>
                                    <CardActions sx={{ display: 'flex', justifyContent: 'space-around', flexWrap:'wrap', marginTop:'20px' }}>
                                        <Button className="botones_aplicacion" size="small" onClick={handleSubmit}>
                                            CONTINUAR
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
    );
}

export default Login;