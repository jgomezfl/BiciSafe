package com.bicisafe.demo.web.controller;

import java.util.ArrayList;
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

import com.bicisafe.demo.model.Calificacion;
import com.bicisafe.demo.service.CalificacionService;
import com.bicisafe.demo.web.dto.CalificacionDTO;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/calificaciones")
public class CalificacionController {
    
    private final CalificacionService caService;

    @Autowired
    public CalificacionController(CalificacionService caService){
        this.caService = caService;
    }

    @GetMapping("/select/{id}")
    public ResponseEntity<Calificacion> getCalificacion(@PathVariable("id") Long id){
        Calificacion ca = caService.getCalificacion(id);
        if(ca == null){ return ResponseEntity.notFound().build(); }
        return ResponseEntity.ok(ca);
    }

    @GetMapping("/select/calificacion/{id}")
    public ResponseEntity<List<Boolean>> getCalificacionByReporte(@PathVariable("id") Long id){
        List<Calificacion> caList = caService.findByReporteId(id);
        List<Boolean> res = new ArrayList<Boolean>();
        if(caList.isEmpty()){
            for(int i = 0; i < 5 ; i++){
                res.add(false);
            }
            return ResponseEntity.ok(res); 
        }
        Double cal = 0.0;
        for (Calificacion i : caList){
            cal += i.getCalificacion();
        }
        cal /= caList.size();
        for (int i = 0 ; i < 5 ; i++){
            if(i < cal){
                res.add(true);
            }else{
                res.add(false);
            }
        }
        return ResponseEntity.ok(res);

    }

    @GetMapping("/select/all/{id}")
    public ResponseEntity<List<Calificacion>> getCalificacionbyReporteId(@PathVariable("id") Long id){
        List<Calificacion> caList = caService.findByReporteId(id);
        if(caList.isEmpty()){ return ResponseEntity.notFound().build(); }
        return ResponseEntity.ok(caList);
    }

    @GetMapping("/select/all")
    public ResponseEntity<List<Calificacion>> getAll(){
        List<Calificacion> caList = caService.findAll();
        if(caList.isEmpty()){ return ResponseEntity.notFound().build(); }
        return ResponseEntity.ok(caList);
    }

    @PostMapping("/save")
    public ResponseEntity<String> createCalificacion(@RequestBody CalificacionDTO  caDto){
        Calificacion ca = caService.findByReporteIdAndIdent(caDto.getReporteId(), caDto.getIdent());
        if(ca != null){ return ResponseEntity.ok("El usuario ya califico"); }
        ca = new Calificacion();
        ca.setReporteId(caDto.getReporteId());
        ca.setIdent(caDto.getIdent());
        ca.setCalificacion(caDto.getCalificacion());

        caService.createCalificacion(ca);
        return ResponseEntity.ok("Success");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Calificacion> deleteCalificacion(@PathVariable("id") Long id){
        Calificacion ca = caService.getCalificacion(id);
        if(ca == null){ return ResponseEntity.notFound().build(); }
        caService.deleteCalificacion(id);
        return ResponseEntity.ok(ca);
    }

    @PutMapping("/update")
    public ResponseEntity<Calificacion> updateCalificacion(@RequestBody CalificacionDTO caDto){
        Calificacion ca = caService.getCalificacion(caDto.getId());
        if(ca == null){ return ResponseEntity.notFound().build(); }
        ca.setCalificacion(caDto.getCalificacion());

        caService.updateCalificacion(ca);
        return ResponseEntity.ok(ca);
    }

}
