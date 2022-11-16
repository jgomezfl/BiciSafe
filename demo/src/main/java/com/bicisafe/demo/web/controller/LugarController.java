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

import com.bicisafe.demo.model.Lugar;
import com.bicisafe.demo.service.LugarService;
import com.bicisafe.demo.web.dto.LugarDTO;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/lugares")
public class LugarController {
    
    private final LugarService lrService;

    @Autowired
    public LugarController(LugarService lrService){
        this.lrService = lrService;
    }

    @GetMapping("/select/{id}")
    public ResponseEntity<List<Lugar>> getLugar(@PathVariable("id") Long id){
        List<Lugar> lrList = lrService.findByIdent(id);
        if(lrList.isEmpty()){return ResponseEntity.notFound().build();}
        return  ResponseEntity.ok(lrList);
    }
    
    @GetMapping("/select/all")
    public ResponseEntity<List<Lugar>> getAll(){
        List<Lugar> lrList = lrService.findAll();
        if(lrList.isEmpty()){return ResponseEntity.notFound().build();}
        return ResponseEntity.ok(lrList);
    }

    @PostMapping("/save")
    public ResponseEntity<Lugar> createLugar(@RequestBody LugarDTO lrDto){
        Lugar lr = new Lugar();
        lr.setIdent(lrDto.getIdent());
        lr.setLatitud(lrDto.getLatitud());
        lr.setLongitud(lrDto.getLongitud());
        lr.setTipo(lrDto.getTipo());

        // lrService.createLugar(lr);
        return ResponseEntity.ok(lr);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Lugar> deleteLugar(@PathVariable("id") Long id){
        Lugar lr = lrService.getLugar(id);
        if(lr == null){return ResponseEntity.notFound().build();}
        lrService.deleteLugar(id);
        return ResponseEntity.ok(lr);
    }

    @PutMapping("/update")
    public ResponseEntity<Lugar> updateLugar(@RequestBody LugarDTO lrDto){
        Lugar lr = lrService.getLugar(lrDto.getId());
        if(lr  == null){ResponseEntity.notFound().build();}
        lr = new Lugar();
        if(lrDto.getTipo() != null){lr.setTipo(lrDto.getTipo());}

        return ResponseEntity.ok(lr);
    }

}
