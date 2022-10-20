package com.bicisafe.demo.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReporteDTO {

    private Long id;
    private String serie;
    private Long ident;
    private String tipo;
    
}
