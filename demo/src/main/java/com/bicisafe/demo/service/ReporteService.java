package com.bicisafe.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bicisafe.demo.model.Reporte;
import com.bicisafe.demo.web.vo.ReporteVO;

@Service
public interface ReporteService {

    public Reporte getReporte(Long id);
    public Reporte createReporte(Reporte rp);
    public Reporte deleteReporte(Long id);
    public Reporte updateReporte(Reporte rp);

    public Reporte findBySerie(String serie);

    public List<Reporte> findByIdentAndTipo(Long ident, String tipo);
    public List<ReporteVO> findByTipo(String tipo);
    public List<Reporte> findByIdent(Long ident);
    public List<Reporte> findAll();
    
}
