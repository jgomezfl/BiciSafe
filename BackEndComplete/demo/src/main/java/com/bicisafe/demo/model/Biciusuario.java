package com.bicisafe.demo.model;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table (name = "biciusuarios")
@Data @NoArgsConstructor
public class Biciusuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "correo", unique = true, nullable = false)
    private String correo;
    @Column(name = "UserName", unique = true, nullable = false)
    private String UserName;
    @Column(name = "contrasena", nullable = false)
    private String contrasena;
    @Column(name = "telefono")
    private Long telefono;


    public Biciusuario(String correo, String UserName, String contrasena, Long telefono) {
        this.correo = correo;
        this.UserName = UserName;
        this.contrasena = contrasena;
        this.telefono = telefono;
    }
    

}
