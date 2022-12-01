import React from  'react';
import Footer from '../Layouts/Footer';
import Cookies from "universal-cookie";

var cookie = new Cookies();

const Nosotros = () => {
    React.useState(() => {
        cookie.remove("ubicacion", {path: '/'})
        cookie.set("ubicacion","Sobre la Empresa", {path: '/'})
    })

    return(
        <>
        <br></br>
        <div class="containerFAQ">
            <h1>
                Misión
            </h1>
        </div>

        <div class="containerLegal">
            <p>
                BiciSafe busca ayudar a crear comunidades locales que se apoyen entre sí por medio de una aplicación web que facilite la comunicación facilitando la decisión de las rutas de uso diario  
            </p>
        </div>
        <div class="containerFAQ">
            <h1>
                Visión
            </h1>
        </div>

        <div class="containerLegal">
            <p>
            Para el año 2025 BiciSafe será una herramienta ampliamente conocida por brindar la información necesaria para escoger una ruta mientras la comunidad crece y se apoya protegiéndose entre sí
            </p>
        </div>
        <div class="containerFAQ">
            <h1>
                Propuesta Valor
            </h1>
        </div>

        <div class="containerLegal">
            <p>
            Brindar a la comunidad de ciclistas una herramienta tecnológica en la que encuentren la información necesaria para sus recorridos.
            </p>
            <p>
            BiciSafe es una aplicación social que se mantiene actualizada gracias a su comunidad de biciusuarios y sistema de navegación asistido por GPS permitiendo mitigar la inseguridad de diferente tipo que sufre este colectivo.
            </p>
        </div>

        <Footer />

        </>
    )
}

export default Nosotros;