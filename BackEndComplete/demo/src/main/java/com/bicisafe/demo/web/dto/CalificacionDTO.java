package com.bicisafe.demo.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CalificacionDTO {

    private Long id;
    private Long reporteId;
    private Long ident;
    private int calificacion;
    
}
