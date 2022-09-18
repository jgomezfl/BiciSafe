import * as React from "react";
import logo from "./../assets/logo.png";

//componentes de bootstrap
import { Container, Button, Nav} from "react-bootstrap"; //container para 

//componentes de MUI
import { Card, CardActions, CardActionArea, CardHeader, CardContent } from '@mui/material'; //importamos todo de las cartas
import { Typography, Avatar, IconButton} from '@mui/material';
import { Save, Cancel, PedalBike, Visibility, VisibilityOff } from '@mui/icons-material'; //importamos los iconos de MUI material
import { Box, Input, FilledInput, OutlinedInput, InputLabel, InputAdornment, FormHelperText, FormControl, TextField } from '@mui/material'; //importamos lo necesario para el formulario

//componentes router para la navegación
import { Outlet, Link} from "react-router-dom";

const Register = () => {
    const [values, setValues] = React.useState({
        identificacion: '',
        nombre: '',
        apellido: '',
        correo: '',
        contrasena: '',
        conf_contrasena: '',
        showPassword: false,
        showConfirmPassword: false
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleShowPassword = () =>{
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    }

    const handleDontShowPassword = (event) =>{
        event.preventDefault();
    }

    const handleShowConfirmPassword = () =>{
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
        });
    }

    const handleDontShowConfirmPassword = (event) =>{
        event.preventDefault();
    }

    return (
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
                        <Box sx={{display:"flex", flexWrap:'wrap', justifyContent: 'space-around'}}>
                            <TextField
                              label="User Name"
                              id="outlined-start-adornment"
                              sx={{ m: 1, width: '25ch' }}
                            />
                            <TextField
                              label="Correo"
                              id="outlined-start-adornment"
                              sx={{ m: 1, width: '25ch' }}
                            />
                            <TextField
                              label="Telefono"
                              id="outlined-start-adornment"
                              sx={{ m: 1, width: '25ch' }}
                            />
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                                <OutlinedInput
                                    id="Input_Contrasena"
                                    type={values.showPassword ? 'text' : 'password'}
                                    values={values.contrasena}
                                    onChange={handleChange('password')}
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
                                    label="Contraseña" />
                            </FormControl>

                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Confirmar Contraseña</InputLabel>
                                <OutlinedInput
                                    id="Input_Confirmar_Contrasena"
                                    type={values.showConfirmPassword ? 'text' : 'password'}
                                    values={values.conf_contrasena}
                                    onChange={handleChange('password')}
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
                                    label="Confirmar Contraseña" />
                            </FormControl>
                        </Box>
                    </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: 'space-around', flexWrap:'wrap', marginTop:'20px' }}>
                            <Button className="botones_aplicacion" size="small">
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
                </Card>
            </Container>

            <section>
                <Outlet></Outlet>
            </section>
            
        </>
    );
}

export default Register;