package com.bicisafe.demo.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BiciusuarioDTO {

    private Long ident;
    private String correo;
    private String userName;
    private String contrasena;
    private String tipo_id;
    private Long telefono;

}
