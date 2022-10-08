package com.bicisafe.demo.model;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table (name = "biciusuarios")
@Data @NoArgsConstructor @AllArgsConstructor
public class Biciusuario {
    
    @Id
    @Column(name = "ident", unique = true, nullable = false)
    private Long ident;
    @Column(name = "correo", unique = true, nullable = false)
    private String correo;
    @Column(name = "UserName", unique = true, nullable = false)
    private String userName;
    @Column(name = "contrasena", nullable = false)
    private String contrasena;
    @Column(name = "tipo_id", nullable = false)
    private String tipo_id;
    @Column(name = "telefono")
    private Long telefono;
    
}
