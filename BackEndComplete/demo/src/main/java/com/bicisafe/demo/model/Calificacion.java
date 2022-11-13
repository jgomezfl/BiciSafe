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
@Table (name = "calificaciones")
@Data @NoArgsConstructor @AllArgsConstructor
public class Calificacion {
    
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    @Column (name = "reporteId")
    private Long reporteId;
    @Column (name = "ident")
    private Long ident;
    @Column (name = "calificacion")
    private int calificacion;

}
