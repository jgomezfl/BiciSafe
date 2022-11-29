package com.bicisafe.demo.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BicicletaDTO {

    private String serie;
    private Long ident;
    private String modelo;
    private String color;
    private String vendedor;
    private Boolean robada;
    private String descripcion;
    
}
