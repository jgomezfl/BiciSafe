package com.bicisafe.demo.web.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReporteVO {
    
    private String serie;
    private Long ident;
    private String modelo;
    private String descripcionBicicleta;
    private String descripcionReporte;
    private String fechaHora;

}
