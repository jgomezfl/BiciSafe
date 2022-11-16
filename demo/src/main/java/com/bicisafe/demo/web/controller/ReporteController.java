package com.bicisafe.demo.web.controller;

import java.util.List;

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

    @PostMapping("/save")
    public String createReporte(@RequestBody ReporteDTO rpDto){
        Reporte rp  = rpService.getReporte(rpDto.getId());
        if(rp != null){return "Bicicleta ya registrada";}
        rp = new Reporte();
        rp.setSerie(rpDto.getSerie());
        rp.setIdent(rpDto.getIdent());
        rp.setTipo(rpDto.getTipo());

        rpService.createReporte(rp);
        return "Success";
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
        return ResponseEntity.ok(rp);
    }
}
