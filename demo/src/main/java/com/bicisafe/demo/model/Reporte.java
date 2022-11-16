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
@Table (name = "reportes" )
@Data @NoArgsConstructor @AllArgsConstructor
public class Reporte {
    
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    @Column (name = "serie")
    private String serie;
    @Column (name = "ident")
    private Long ident;
    @Column (name = "tipo", nullable = false)
    private String tipo;
    @Column (name = "latitud")
    private String latitud;
    @Column (name = "longitud")
    private String longitud;

    
}
