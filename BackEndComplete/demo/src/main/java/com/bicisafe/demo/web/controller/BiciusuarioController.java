package com.bicisafe.demo.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bicisafe.demo.model.Biciusuario;
import com.bicisafe.demo.service.BiciusuarioService;
import com.bicisafe.demo.web.dto.BiciusuarioDTO;

import net.bytebuddy.asm.Advice.Return;

@RestController
@RequestMapping("/biciusuarios")
public class BiciusuarioController {
    
    private final BiciusuarioService  bcService;

    @Autowired
    public BiciusuarioController(BiciusuarioService bcService){
        this.bcService = bcService;
    }

    @GetMapping("/select/{id}")
    public ResponseEntity<Biciusuario> getBiciusuario(@PathVariable("id") Long id){
        Biciusuario bc = bcService.getBiciusuario(id);
        if(bc == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(bc);
    }

    @GetMapping("/select/all")
    public ResponseEntity<List<Biciusuario>> getAll(){
        List<Biciusuario> Listbc = bcService.findAll();
        if(Listbc.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(Listbc);
    }

    @PostMapping("/save")
    public ResponseEntity<Biciusuario> createBiciusuario(@RequestBody BiciusuarioDTO bcDto){
        Biciusuario bc = new Biciusuario(
            bcDto.getCorreo(),
            bcDto.getUserName(),
            bcDto.getContrasena(),
            bcDto.getTelefono()
        );
        Biciusuario createdBc = bcService.createBiciusuario(bc);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBc);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Biciusuario> deleteBiciusuario(@PathVariable("id") Long id){
        Biciusuario bc = bcService.getBiciusuario(id);
        if(bc == null){
            return ResponseEntity.notFound().build();
        }
        bcService.deleteBiciusuario(id);
        return ResponseEntity.ok(bc);
    }

    @PutMapping("/update")
    public ResponseEntity<Biciusuario> updateBiciusuario(@RequestBody BiciusuarioDTO bcDto){
        Biciusuario bcUpdated = bcService.getBiciusuario(bcDto.getId());
        if(bcUpdated == null){
            return ResponseEntity.notFound().build();
        }
        bcUpdated.setUserName(bcDto.getUserName());
        bcUpdated.setCorreo(bcDto.getCorreo());
        bcUpdated.setTelefono(bcDto.getTelefono());
        bcUpdated.setContrasena(bcDto.getContrasena());
        bcUpdated = bcService.updateBiciusuario(bcUpdated);
        return ResponseEntity.ok(bcUpdated);
    }

}
