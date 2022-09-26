import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090/biciusuarios",
  headers: {
    'Access-Control-Allow-Origin': '*',
    'origin':'*',
    'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
    "Content-type": "application/json"
  }
});

export default API;