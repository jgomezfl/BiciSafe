package com.bicisafe.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bicisafe.demo.model.Reporte;
import com.bicisafe.demo.repository.reporteRepository;

@Service
public class ReporteServiceImpl implements ReporteService {

    private final reporteRepository rpRepository;

    @Autowired
    public ReporteServiceImpl (reporteRepository rpRepository){
        this.rpRepository = rpRepository;
    }

    @Override
    public Reporte getReporte(Long id) {
        Reporte rp = rpRepository.findById(id).orElse(null);
        return rp;
    }

    @Override
    public Reporte createReporte(Reporte rp) {
        return rpRepository.save(rp);
    }

    @Override
    public Reporte deleteReporte(Long id) {
        Reporte rp = rpRepository.findById(id).orElse(null);
        if(rp == null){return null;}
        rpRepository.delete(rp);
        return rp;
    }

    @Override
    public Reporte updateReporte(Reporte rp) {
        Reporte rpTemp = rpRepository.findById(rp.getId()).orElse(null);
        if(rpTemp == null){return null;}
        return rpRepository.save(rp);
    }

    @Override
    public Reporte findBySerie(String serie) {
        return rpRepository.findBySerie(serie);
    }

    @Override
    public List<Reporte> findByIdent(Long ident) {
        return rpRepository.findByIdent(ident);
    }

    @Override
    public List<Reporte> findAll() {
        return rpRepository.findAll();
    }
    
}
