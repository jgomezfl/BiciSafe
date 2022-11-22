// Componente de preguntas frecuentes

import React from 'react';
import { Questions } from '../Helpers/Questions';
import Accordion from 'react-bootstrap/Accordion';





const FAQ = () =>{
    return(
        <main>
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
        </main>
    
    )
}

export default FAQ