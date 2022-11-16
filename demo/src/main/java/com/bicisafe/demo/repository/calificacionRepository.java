package com.bicisafe.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bicisafe.demo.model.Calificacion;

@Repository
public interface calificacionRepository extends JpaRepository<Calificacion, Long> {

    public Calificacion findByReporteIdAndIdent(Long reporteId, Long ident);
    
    public List<Calificacion> findByReporteId(Long reporteId);
    public List<Calificacion> findAll();
    
}
