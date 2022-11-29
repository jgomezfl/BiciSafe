package com.bicisafe.demo.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

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
    @Column (name = "serie", nullable = true)
    private String serie;
    @Column (name = "ident", nullable = true)
    private Long ident;
    @Column (name = "tipo", nullable = false)
    private String tipo;
    @Column (name = "descripcion", nullable = false)
    private String descripcion;
    @Temporal(TemporalType.TIMESTAMP)
    @Column (name = "fechaHora", nullable = true)
    private Date fechaHora;
    @Column (name = "latitud", nullable = true)
    private String latitud;
    @Column (name = "longitud", nullable = true)
    private String longitud;

    
}
