import * as React from "react";
import { Outlet } from "react-router-dom";
import { Card, CardHeader, CardMedia, CardContent, Avatar, Typography } from "@mui/material";
import { red, blue, green, yellow } from '@mui/material/colors';
import Footer from "../Layouts/Footer";
import Cookies from "universal-cookie";

var cookie = new Cookies();

const QuienesSomos = () => {

    React.useState(() => {
        cookie.remove("ubicacion", {path: '/'})
        cookie.set("ubicacion","¿Quienes Somos?", {path: '/'})
    })

    return(
        <>
            <div className="containerFAQ">
                <h1>¿Quienes Somos?</h1>
                <h6>El equipo esta conformado por los siguientes integrantes</h6>
                <div className="mt-2 d-flex flex-wrap justify-content-around">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                         avatar={
                            <Avatar sx={{ bgcolor: yellow[500] }}>
                                S
                            </Avatar>
                         }
                         title="Sebastian Camilo Casas Rojas"
                         subheader="scasasr@unal.edu.co"/>
                        <CardMedia 
                         component="img"
                         height="194"
                         image="/ImgSebas.jpg"
                         alt="Sebastian Casas"/>
                        <CardContent>
                            <Typography variant="body" color="text.primary">
                                Estudiante de Ingeniería de Sistemas y Computación de la Universidad Nacional
                                de Colombia
                            </Typography>
                            <br />
                            <br />
                            <Typography variant="body2" color="text.secondary">
                                Talento y experiencia en desarrollo Front en FrameWorks como ReactJs, Angular y Vue.
                                Además de conocimientos en HTML, CSS, SCSS y JavaScript
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                         avatar={
                            <Avatar sx={{ bgcolor: blue[500] }}>
                                J
                            </Avatar>
                         }
                         title="Juan Jose Ramirez Gómez"
                         subheader="juaramirezgo@unal.edu.co"/>
                        <CardMedia 
                         component="img"
                         height="194"
                         image="/ImgJuanRa.jpg"
                         alt="Juan Jose Ramirez"/>
                        <CardContent>
                            <Typography variant="body" color="text.primary">
                                Estudiante de Ingeniería de Sistemas y Computación de la Universidad Nacional
                                de Colombia.
                            </Typography>
                            <br />
                            <br />
                            <Typography variant="body2" color="text.secondary">
                                Habilidad en el manejo de FrameWorks como DJango, Spring Boot, ExpressJs y lenguajes como
                                Python y Java, además de experiencia en ReactJs y el manejo de la API de google maps.
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card sx={{ maxWidth: 345 }} className="mt-4">
                        <CardHeader
                         avatar={
                            <Avatar sx={{ bgcolor: red[500] }}>
                                J
                            </Avatar>
                         }
                         title="John Freddy Gómez Flórez"
                         subheader="jgomezfl@unal.edu.co"/>
                        <CardMedia 
                         component="img"
                         height="194"
                         image="/ImgJofry.jpg"
                         alt="John Freddy Gómez"/>
                        <CardContent>
                            <Typography variant="body" color="text.primary">
                                Estudiante de Ingeniería de Sistemas y Computación de la Universidad Nacional
                                de Colombia.
                            </Typography>
                            <br />
                            <br />
                            <Typography variant="body2" color="text.secondary">
                                Experiencia en el desarrollo en frames como ReactJs y Vue, con conocimientos
                                en Spring Boot, diseño y desarrollo de bases de datos y sentencias SQL.
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card sx={{ maxWidth: 345 }} className="mt-4">
                        <CardHeader
                         avatar={
                            <Avatar sx={{ bgcolor: green[500] }}>
                                A
                            </Avatar>
                         }
                         title="Andres Felipe Sanchez Fuquene"
                         subheader="asanchezfu@unal.edu.co"/>
                        <CardMedia 
                         component="img"
                         height="194"
                         image="/ImgPipe.jpg"
                         alt="Andres Felipe Sanchez"/>
                        <CardContent>
                            <Typography variant="body" color="text.primary">
                                Estudiante de Ingeniería de Sistemas y Computación de la Universidad Nacional
                                de Colombia.
                            </Typography>
                            <br />
                            <br />
                            <Typography variant="body2" color="text.secondary">
                                Gran lider, excelente en la gestión de proyectos, con habilidades en el desarrollo
                                en Spring Boot y modelamiento de bases de datos, aunado a experiencia trabajando
                                en ReactJs con Bootstrap y Mui Material.
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Footer />
            <section>
                <Outlet></Outlet>
            </section>
        </>
    );
}

export default QuienesSomos;