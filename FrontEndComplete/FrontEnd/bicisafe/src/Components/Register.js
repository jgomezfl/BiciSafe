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

//componentes router para la navegación
import { Outlet, Link, useNavigate} from "react-router-dom";

//formValidation
import { Formik } from "formik";
import * as Yup from 'yup';

//importamos el componente de alertas
import { InstantMessage } from "../Helpers/Alertas";

let validationSchema  = Yup.object().shape({
    userName: Yup.string().required('Nombre de usuario es requerido'),
    correo: Yup.string().required('Correo es requerido')
        .email('Email invalido'),
    telefono: Yup.number(),
    contrasena: Yup.string().required('Contraseña es requerida')
        .min(8, 'Contraseña debe ser mayor a 8 caracteres de longitud'),
    conf_contrasena: Yup.string()
        .required('Debes confirmar tu contraseña')
        .oneOf([Yup.ref('contrasena'), null], 'Contraseña no concuerda')
});

const Register = () => {

    const [error, setError] = React.useState(false);
    const [message, setMessage] = React.useState('');

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
                initialValues={{ userName:"", correo:"", telefono:3, contrasena:"", conf_contrasena:"" }}
                onSubmit={(values) => {

                    API.post("/save", values).then(({data}) => {
                        if(data === 'Correo ya Registrado' || data === 'User Name ya registrado'){
                            setMessage(data);
                            setError(true)
                        }
                        else{
                            setMessage(data);
                            setError(true);
                            navigate(("/"));
                        }
                    });
                    setError(false);
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
                                title="REGISTRO"
                                subheader="Por favor ingresa tus datos completos"
                            />
                            <CardContent>
                                <Paper>
                                    <Box sx={{display:"flex", flexWrap:'wrap', justifyContent: 'space-around'}}>
                                        <div>
                                            <TextField
                                             required
                                             label="User Name"
                                             onChange={handleChange('userName')}
                                             error={errors.UserName ? true : false}
                                             sx={{ m: 1, width: '25ch' }}
                                            />
                                            <Typography variant="inherit" color="textSecondary">
                                                {errors.userName}
                                            </Typography>
                                        </div>
                                        <div>
                                            <TextField
                                             required
                                             label="Correo Electrónico"
                                             onChange={handleChange('correo')}
                                             error={errors.correo ? true : false}
                                             sx={{ m: 1, width: '25ch' }}
                                            />
                                            <Typography variant="inherit" color="textSecondary">
                                                {errors.correo}
                                            </Typography>
                                        </div>
                                        <div>
                                            <TextField
                                             label="Telefono/Celular"
                                             onChange={handleChange('telefono')}
                                             error={errors.telefono ? true : false}
                                             sx={{ m: 1, width: '25ch' }}
                                            />
                                            <Typography variant="inherit" color="textSecondary">
                                                {errors.telefono}
                                            </Typography>
                                        </div>
                                        <div>
                                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                                <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                                                <OutlinedInput
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
                                                    label="Contraseña" />
                                            </FormControl>
                                            <Typography variant="inherit" color="textSecondary">
                                                {errors.contrasena}
                                            </Typography>
                                        </div>
                                        <div>
                                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                                <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                                                <OutlinedInput
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
                                                    label="Confirmar Contraseña" />
                                            </FormControl>
                                            <Typography variant="inherit" color="textSecondary">
                                                {errors.conf_contrasena}
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
                                            <Button size="small" className="botones_aplicacion">
                                                CANCELAR
                                                <IconButton aria-label="cancel">
                                                    <Cancel/>
                                                </IconButton>
                                            </Button>
                                        </Nav.Link>
                                    </CardActions>
                                    {error ? <InstantMessage message = {message} /> : `` }
                                </Paper>
                            </CardContent>
                        </Card>
                    </Container>
                </>
            )}
            </Formik>

            <section>
                <Outlet></Outlet>
            </section>
            
        </>
    );
}

export default Register;