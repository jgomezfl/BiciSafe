package com.bicisafe.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bicisafe.demo.model.Reporte;

@Repository
public interface reporteRepository extends JpaRepository<Reporte, Long> {

    public Reporte findBySerie(String serie);
    
    public List<Reporte> findByIdent(Long ident);
    public List<Reporte> findAll();

}
