import * as React from "react";

import { Container, Button, Nav } from "react-bootstrap";

import { Card, CardActions, CardHeader, CardContent, MenuItem } from '@mui/material'; //importamos todo de las cartas
import { Typography, IconButton, Paper} from '@mui/material';
import { Save, Cancel, PedalBike, Visibility, VisibilityOff} from '@mui/icons-material'; //importamos los iconos de MUI material
import { Box, OutlinedInput, InputLabel, InputAdornment, FormControl, TextField, Select } from '@mui/material'; //importamos lo necesario para el formulario

import API from "../services/http-common";

import { Outlet, Link, useNavigate } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";

import { InstantMessage } from "../Helpers/Alertas";