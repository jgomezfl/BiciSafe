package com.bicisafe.demo.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LugarDTO {
    
    private Long id;
    private Long ident;
    private String tipo;
    private String latitud;
    private String longitud;
    private String nombre;

}
