// Componente de preguntas frecuentes

import React from 'react';
import { Questions } from '../Helpers/Questions';
import Accordion from 'react-bootstrap/Accordion';
<<<<<<< HEAD
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
=======





const FAQ = () =>{
    return(
        <main>
>>>>>>> db28393b3f01f36c50dd748b751b5efb1bbdd9ca
            <Accordion defaultActiveKey="0">
                <div>
                    <div class="containerFAQ">
                      
                        <h1 className="text-center">Preguntas frecuentes</h1>
                        
                            {Questions.map((item, index) => {
<<<<<<< HEAD
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
=======
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
        </main>
>>>>>>> db28393b3f01f36c50dd748b751b5efb1bbdd9ca
    
    )
}

export default FAQ