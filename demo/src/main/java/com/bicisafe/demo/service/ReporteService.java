package com.bicisafe.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bicisafe.demo.model.Reporte;

@Service
public interface ReporteService {

    public Reporte getReporte(Long id);
    public Reporte createReporte(Reporte rp);
    public Reporte deleteReporte(Long id);
    public Reporte updateReporte(Reporte rp);

    public Reporte findBySerie(String serie);

    public List<Reporte> findByIdent(Long ident);
    public List<Reporte> findAll();
    
}
