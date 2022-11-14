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

import com.bicisafe.demo.model.Bicicleta;
import com.bicisafe.demo.service.BicicletaService;
import com.bicisafe.demo.web.dto.BicicletaDTO;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/bicicletas")
public class BicicletaController {

    private final BicicletaService bclService;

    @Autowired
    public BicicletaController(BicicletaService bclService){
        this.bclService = bclService;
    }

    @GetMapping("/select/{id}")
    public ResponseEntity<Bicicleta> getBicicleta(@PathVariable("id") String id){
        Bicicleta bcl = bclService.getBicicleta(id);
        if(bcl == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(bcl);
    }

    @GetMapping("/select/all/{id}")
    public ResponseEntity<List<Bicicleta>> getBicicletasbyIdent(@PathVariable("id") Long id){
        List<Bicicleta> bclList = bclService.findByIdent(id);
        if(bclList.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(bclList);
    }

    @GetMapping("/select/all")
    public ResponseEntity<List<Bicicleta>> getAll(){
        List<Bicicleta> Listbcl = bclService.findAll();
        if(Listbcl.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(Listbcl);
    }

    @PostMapping("/save")
    public String createBicicleta(@RequestBody BicicletaDTO bclDto){
        Bicicleta bcl = bclService.getBicicleta(bclDto.getSerie());

        if(bcl != null){return "Bicicleta ya registrada";}

        bcl = new Bicicleta();
        bcl.setSerie(bclDto.getSerie());
        bcl.setIdent(bclDto.getIdent());
        bcl.setModelo(bclDto.getModelo());
        bcl.setColor(bclDto.getColor());
        bcl.setVendedor(bclDto.getVendedor());
        bcl.setRobada(false);

        bclService.createBicicleta(bcl);
        return "Succesfull";
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Bicicleta> deleteBicicleta(@PathVariable("id") String id){
        Bicicleta bcl = bclService.getBicicleta(id);
        if(bcl == null){
            return ResponseEntity.notFound().build();
        }
        bclService.deleteBicicleta(id);
        return ResponseEntity.ok(bcl);
    }

    @PutMapping("/update")
    public ResponseEntity<Bicicleta> updateBicicleta(@RequestBody BicicletaDTO bclDto){
        Bicicleta bclTemp = bclService.getBicicleta(bclDto.getSerie());
        if(bclTemp == null){
            return ResponseEntity.notFound().build();
        }
        bclTemp.setSerie(bclDto.getSerie());
        bclTemp.setIdent(bclDto.getIdent());
        bclTemp.setModelo(bclDto.getModelo());
        bclTemp.setColor(bclDto.getColor());
        bclTemp.setVendedor(bclDto.getVendedor());
        bclTemp.setRobada(bclDto.getRobada());
        bclTemp = bclService.updateBicicleta(bclTemp);
        return ResponseEntity.ok(bclTemp);
    }
    @PutMapping("/update/{serie}")
    public ResponseEntity<Bicicleta> updateStateBike(@PathVariable("serie") String serie){
        Bicicleta bcl = bclService.getBicicleta(serie);
        if(bcl == null){return ResponseEntity.notFound().build();}
        bcl.setRobada(true);
        bcl = bclService.updateBicicleta(bcl);
        return ResponseEntity.ok(bcl);
    }

}
