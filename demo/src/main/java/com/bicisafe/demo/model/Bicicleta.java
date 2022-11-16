package com.bicisafe.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Entity
@Table (name = "bicicletas")
@Data @NoArgsConstructor @AllArgsConstructor
public class Bicicleta {

    @Id
    @Column(name = "serie", unique = true, nullable = false)
    private String serie;
    @Column(name = "ident", nullable = false)
    private Long ident;
    @Column (name = "modelo", nullable = false)
    private String modelo;
    @Column (name = "color")
    private String color;
    @Column (name = "vendedor", nullable = false)
    private String vendedor;
    @Column (name = "robada", nullable = false)
    private boolean robada;

}
