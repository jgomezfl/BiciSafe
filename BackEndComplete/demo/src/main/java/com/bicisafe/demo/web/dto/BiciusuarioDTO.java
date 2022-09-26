package com.bicisafe.demo.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class BiciusuarioDTO {
    private Long id;
    private String correo;
    private String userName;
    private String contrasena;
    private Long telefono;


    public BiciusuarioDTO(String correo, String userName, String contrasena, Long telefono) {
        this.correo = correo;
        this.userName = userName;
        this.contrasena = contrasena;
        this.telefono = telefono;
    }
        
    public BiciusuarioDTO(String correo, String contrasena){
        this.correo = correo;
        this.contrasena = contrasena;
    }

    public BiciusuarioDTO(String correo){
        this.correo = correo;
    }

}
