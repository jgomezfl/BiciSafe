package com.bicisafe.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table ( name = "lugares" )
@Data @NoArgsConstructor @AllArgsConstructor
public class Lugar {
    
    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY )
    private Long id;
    @Column (name = "ident", nullable = false)
    private Long ident;
    @Column (name = "tipo", nullable = false)
    private String tipo;
    @Column (name = "latitude", nullable = false)
    private String latitud;
    @Column (name = "longitud", nullable = false)
    private String longitud;
    @Column (name = "nombre", nullable = false)
    private String nombre;

}
