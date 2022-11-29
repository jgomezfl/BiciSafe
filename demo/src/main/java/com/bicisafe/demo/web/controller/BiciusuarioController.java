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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bicisafe.demo.model.Biciusuario;
import com.bicisafe.demo.service.BiciusuarioService;
import com.bicisafe.demo.web.dto.BiciusuarioDTO;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/biciusuarios")
public class BiciusuarioController {
    
    private final BiciusuarioService  bcService;

    @Autowired
    public BiciusuarioController(BiciusuarioService bcService){
        this.bcService = bcService;
    }

    @GetMapping("/select/{id}")
    public ResponseEntity<Biciusuario> getBiciusuario(@PathVariable("id") String id){
        Biciusuario bc = bcService.getBiciusuario(id);
        if(bc == null){
            return ResponseEntity.notFound().build();
        }
        bc.setContrasena("");
        return ResponseEntity.ok(bc);
    }

    @GetMapping("/select/register")
    public ResponseEntity<Biciusuario> getBiciusuarioByCorreo(@RequestBody BiciusuarioDTO bcDto){
        Biciusuario bc = bcService.findByCorreo(bcDto.getCorreo());
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

    @GetMapping("/select/login")
    public String getLogin(@RequestParam(name = "correo") String correo, @RequestParam(name = "contrasena") String contrasena){
        Biciusuario bc = bcService.findByCorreo(correo);
        if(bc == null){
            return null;
        }
        bc =  bcService.findByCorreoAndContrasena(correo, contrasena);
        if(bc == null){
            return null;
        }
        return correo+" "+contrasena;
    }

    @PostMapping("/save")
    public String createBiciusuario(@RequestBody BiciusuarioDTO bcDto){

        Biciusuario bc = bcService.findByCorreo(bcDto.getCorreo());
        if(bc != null){
            return "Correo ya Registrado";
        }
        bc = bcService.findByUserName(bcDto.getUserName());
        if(bc != null){
            return "User Name ya registrado";
        }
        bc = new Biciusuario();
        bc.setIdent(bcDto.getIdent());
        bc.setCorreo(bcDto.getCorreo());
        bc.setUserName(bcDto.getUserName());
        bc.setContrasena(bcDto.getContrasena());
        bc.setTipo_id(bcDto.getTipo_id());
        bc.setTelefono(bcDto.getTelefono());

        bcService.createBiciusuario(bc);
        return "Succesfull";
    }

    @PostMapping("/save/login")
    public ResponseEntity<Biciusuario> LogicaLogin(@RequestBody BiciusuarioDTO bcDto){
        Biciusuario bc = bcService.findByCorreoAndContrasena(bcDto.getCorreo(), bcDto.getContrasena());
        if(bc == null){
            return ResponseEntity.ok(null);
        }
        bc.setContrasena("");
        return ResponseEntity.ok(bc);

    }

    @PostMapping("/save/correo")
    public ResponseEntity<Biciusuario> getByCorreo(@RequestBody BiciusuarioDTO bcDto){
        Biciusuario bc = bcService.findByCorreo(bcDto.getCorreo());
        if(bc == null){
            return ResponseEntity.ok(null);
        }
        bc.setContrasena("");
        return ResponseEntity.ok(bc);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Biciusuario> deleteBiciusuario(@PathVariable("id") String id){
        Biciusuario bc = bcService.getBiciusuario(id);
        if(bc == null){
            return ResponseEntity.notFound().build();
        }
        bcService.deleteBiciusuario(id);
        return ResponseEntity.ok(bc);
    }

    @PutMapping("/update")
    public ResponseEntity<Biciusuario> updateBiciusuario(@RequestBody BiciusuarioDTO bcDto){
        Biciusuario bcUpdated = bcService.findByCorreoAndContrasena(bcDto.getCorreo(), bcDto.getContrasena());
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

    @PutMapping("/update/password")
    public ResponseEntity<Biciusuario> updateBiciusuarioPassword(@RequestBody BiciusuarioDTO bcDto){
        Biciusuario bcUpdated = bcService.findByCorreo(bcDto.getCorreo());
        if(bcUpdated == null){
            return ResponseEntity.ok(null);
            //return "no lo encontró";
        }
        bcUpdated.setContrasena(bcDto.getContrasena());
        bcService.updateBiciusuario(bcUpdated);
        //return "cambió la contraseña";
        bcUpdated.setContrasena("");
        return ResponseEntity.ok(bcUpdated);
    }

}
