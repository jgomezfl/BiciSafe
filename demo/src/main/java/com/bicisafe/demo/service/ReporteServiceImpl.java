package com.bicisafe.demo.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bicisafe.demo.model.Bicicleta;
import com.bicisafe.demo.model.Reporte;
import com.bicisafe.demo.repository.bicicletaRepository;
import com.bicisafe.demo.repository.reporteRepository;
import com.bicisafe.demo.web.vo.ReporteVO;

@Service
public class ReporteServiceImpl implements ReporteService {

    private final reporteRepository rpRepository;
    private final bicicletaRepository bcRepository;

    @Autowired
    public ReporteServiceImpl (reporteRepository rpRepository, bicicletaRepository bcRepository){
        this.rpRepository = rpRepository;
        this.bcRepository = bcRepository;
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

    @Override
    public List<Reporte> findByIdentAndTipo(Long ident, String tipo) {
        List<Reporte> rp = rpRepository.findByIdentAndTipo(ident, tipo);
        return rp;
    }

    @Override
    public List<ReporteVO> findByTipo(String tipo) {
        SimpleDateFormat formato = new SimpleDateFormat("yyyy/MM/dd HH:mm");
        List<ReporteVO> rpVoList = new ArrayList<ReporteVO>();
        List<Reporte> rpList =  rpRepository.findByTipo(tipo);
        for(Reporte i : rpList){
            Bicicleta bc = bcRepository.findById(i.getSerie()).orElse(null);

            ReporteVO rpVo = new ReporteVO();
            rpVo.setSerie(i.getSerie());
            rpVo.setIdent(bc.getIdent());
            rpVo.setModelo(bc.getModelo());
            rpVo.setDescripcionBicicleta(bc.getDescripcion());
            rpVo.setDescripcionReporte(i.getDescripcion());
            String fecha = formato.format(i.getFechaHora());
            rpVo.setFechaHora(fecha);
            
            rpVoList.add(rpVo);
        }
        return rpVoList;
    }
    
}
