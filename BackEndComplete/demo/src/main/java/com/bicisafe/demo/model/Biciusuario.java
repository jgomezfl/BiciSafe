package com.bicisafe.demo.model;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table (name = "biciusuarios")
@Data @NoArgsConstructor
public class Biciusuario {
    
    @Id
    @Column(name ="identificacion")
    private Long identificacion;
    @Column(name = "nombre")
    private String nombre;
    @Column(name = "apellido")
    private String apellido;
    @Column(name = "correo")
    private String correo;
    @Column(name = "contrasena")
    private String contrasena;

    public Biciusuario(Long identificacion, String nombre, String apellido, String correo, String contrasena){
        this.identificacion = identificacion;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contrasena = contrasena;
    }

}
