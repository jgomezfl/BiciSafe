package com.bicisafe.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bicisafe.demo.model.Calificacion;
import com.bicisafe.demo.repository.calificacionRepository;

@Service
public class CalificacionServiceImpl implements CalificacionService {

    private final calificacionRepository caRepository;

    @Autowired
    public CalificacionServiceImpl (calificacionRepository caRepository){
        this.caRepository = caRepository;
    }

    @Override
    public Calificacion getCalificacion(Long id) {
        Calificacion ca = caRepository.findById(id).orElse(null);
        return ca;
    }

    @Override
    public Calificacion createCalificacion(Calificacion ca) {
        return caRepository.save(ca);
    }

    @Override
    public Calificacion deleteCalificacion(Long id) {
        Calificacion ca = caRepository.findById(id).orElse(null);
        if(ca == null){return null;}
        caRepository.delete(ca);
        return ca;
    }

    @Override
    public Calificacion updateCalificacion(Calificacion ca) {
        Calificacion caTemp = caRepository.findById(ca.getIdent()).orElse(null);
        if(caTemp == null){return null;}
        return caRepository.save(ca);
    }

    @Override
    public List<Calificacion> findByReporteId(Long reporteId) {
        return caRepository.findByReporteId(reporteId);
    }

    @Override
    public List<Calificacion> findAll() {
        return caRepository.findAll();
    }

    @Override
    public Calificacion findByReporteIdAndIdent(Long reporteId, Long ident) {
        return caRepository.findByReporteIdAndIdent(reporteId, ident);
    }

    
    
}
