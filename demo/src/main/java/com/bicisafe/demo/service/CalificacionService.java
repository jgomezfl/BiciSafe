package com.bicisafe.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bicisafe.demo.model.Calificacion;

@Service
public interface CalificacionService {

    public Calificacion getCalificacion(Long id);
    public Calificacion createCalificacion(Calificacion ca);
    public Calificacion deleteCalificacion(Long id);
    public Calificacion updateCalificacion(Calificacion ca);

    public Calificacion findByReporteIdAndIdent(Long reporteId, Long ident);

    public List<Calificacion> findByReporteId(Long reporteId);
    public List<Calificacion> findAll();
    
}
