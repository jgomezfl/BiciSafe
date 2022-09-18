import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090/biciusuarios",
  headers: {
    "Content-type": "application/json"
  }
});

export default API;