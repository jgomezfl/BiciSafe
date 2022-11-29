package com.bicisafe.demo.web.controller;

// import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
// import java.util.Locale;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bicisafe.demo.model.Reporte;
import com.bicisafe.demo.service.ReporteService;
import com.bicisafe.demo.web.dto.ReporteDTO;
import com.bicisafe.demo.web.vo.ReporteVO;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/reportes")
public class ReporteController {

    private final ReporteService rpService;

    @Autowired
    public ReporteController(ReporteService  rpService){
        this.rpService = rpService;
    }

    @GetMapping("/select/{id}")
    public ResponseEntity<Reporte> getReporte(@PathVariable("id") Long id){
        Reporte rp = rpService.getReporte(id);
        if(rp == null){ return ResponseEntity.notFound().build(); }
        return ResponseEntity.ok(rp);
    }

    @GetMapping("/select/all/{id}")
    public ResponseEntity<List<Reporte>> getReportebyIdent(@PathVariable("id") Long id){
        List<Reporte> rpList = rpService.findByIdent(id);
        if(rpList.isEmpty()){ return ResponseEntity.notFound().build(); }
        return ResponseEntity.ok(rpList);
    }
    
    @GetMapping("/select/all")
    public ResponseEntity<List<Reporte>> getAll(){
        List<Reporte> rpList = rpService.findAll();
        if(rpList.isEmpty()){ return ResponseEntity.notFound().build(); }
        return ResponseEntity.ok(rpList);
    }

    @GetMapping("/select/all/robadas")
    public ResponseEntity<List<ReporteVO>> getAllRobadas(){
        List<ReporteVO> rpList = rpService.findByTipo("Stolen");
        if(rpList.isEmpty()){ return ResponseEntity.notFound().build(); }
        return ResponseEntity.ok(rpList);
    }

    @GetMapping("/select/bicicletas/{id}")
    public ResponseEntity<List<Reporte>> getReportesBicicletas(@PathVariable("id") Long id){
        List<Reporte> rpList = rpService.findByIdentAndTipo(id, "Stolen");
        if (rpList == null){ return ResponseEntity.notFound().build(); }
        return ResponseEntity.ok(rpList);
    }

    @GetMapping("/select/robada/{serie}")
    public ResponseEntity<Reporte> getReporteBicicletabySerie(@PathVariable("serie") String serie){
        Reporte rp = rpService.findBySerie(serie);
        if(rp == null){ return ResponseEntity.notFound().build(); }
        return ResponseEntity.ok(rp);
    }

    @PostMapping("/save")
    public ResponseEntity<Reporte> createReporte(@RequestBody ReporteDTO rpDto){
        Reporte rp = null;
        if(rpDto.getSerie() != null){ rp  = rpService.findBySerie(rpDto.getSerie()); }
        if(rp != null){return ResponseEntity.notFound().build();}
        Date time = Calendar.getInstance().getTime();
        
        rp = new Reporte();
        rp.setSerie(rpDto.getSerie());
        rp.setIdent(rpDto.getIdent());
        rp.setTipo(rpDto.getTipo());
        rp.setDescripcion(rpDto.getDescripcion());
        rp.setFechaHora(time);
        rp.setLatitud(rpDto.getLatitud());
        rp.setLongitud(rpDto.getLongitud());

        rpService.createReporte(rp);
        return ResponseEntity.ok(rp);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<List<Reporte>> deleteReportes(){
        Date time = Calendar.getInstance().getTime();
        List<Reporte> rpList = rpService.findAll();
        List<Reporte> rpAns = new ArrayList<Reporte>();
        if(rpList.isEmpty()){return ResponseEntity.notFound().build();}
        for (Reporte i: rpList){
            if(!i.getTipo().equals("Stolen")){
                long difference = time.getTime() - i.getFechaHora().getTime();
                Long horas = TimeUnit.HOURS.convert(difference, TimeUnit.MILLISECONDS);
                if(horas >= 24){
                    rpService.deleteReporte(i.getId());                     rpAns.add(i);
                }
            }
        }
        return ResponseEntity.ok(rpAns);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Reporte> deleteReporte(@PathVariable("id") Long id){
        Reporte rp = rpService.getReporte(id);
        if(rp == null){ return ResponseEntity.notFound().build(); }
        rpService.deleteReporte(id);
        return ResponseEntity.ok(rp);
    }

    @PutMapping("/update")
    public ResponseEntity<Reporte> updateReporte(@RequestBody ReporteDTO rpDto){
        Reporte rp = rpService.getReporte(rpDto.getId());
        if(rp == null){ return ResponseEntity.notFound().build(); }
        rp = new Reporte();
        rp.setSerie(rpDto.getSerie());
        rp.setIdent(rpDto.getIdent());
        rp.setTipo(rpDto.getTipo());
        rp.setLatitud(rpDto.getLatitud());
        rp.setLongitud(rpDto.getLongitud());
        
        rpService.updateReporte(rp);
        return ResponseEntity.ok(rp);
    }

}
