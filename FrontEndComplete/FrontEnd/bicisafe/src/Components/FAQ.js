// Componente de preguntas frecuentes

import React from 'react';
import { Questions } from '../Helpers/Questions';
import Accordion from 'react-bootstrap/Accordion';
import Footer from '../Layouts/Footer';
import Cookies from "universal-cookie";

var cookie = new Cookies();

const FAQ = () =>{
    React.useState(() => {
        cookie.remove("ubicacion", {path: '/'})
        cookie.set("ubicacion","Preguntas Frecuentes", {path: '/'})
    })
    return(
        <div>
            <Accordion defaultActiveKey="0">
                <div>
                    <div class="containerFAQ">
                      
                        <h1 className="text-center">Preguntas frecuentes</h1>
                        
                            {Questions.map((item, index) => {
                                return(
                                    <div class="row">
                                        <Accordion.Item eventKey={index}>
                                            <Accordion.Header><h5>{item.question}</h5></Accordion.Header>
                                            <Accordion.Body>{item.answer}</Accordion.Body>
                                        </Accordion.Item>
                                    </div>
                                )
                            })}
                    </div>
                </div> 
            </Accordion>
            <Footer />
        </div>
    
    )
}

export default FAQ