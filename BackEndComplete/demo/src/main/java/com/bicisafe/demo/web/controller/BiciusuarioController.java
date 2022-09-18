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

@RestController
@RequestMapping("/biciusuarios")
public class BiciusuarioController {
    
    private final BiciusuarioService  bcService;

    @Autowired
    public BiciusuarioController(BiciusuarioService bcService){
        this.bcService = bcService;
    }

    @GetMapping
    public ResponseEntity<List<Biciusuario>> getBiciusuarios(@RequestParam(name = "nombre", required = false) String nombre,
                                                             @RequestParam(name = "apellido", required = false) String apellido,
                                                             @RequestParam(name = "correo", required = false) String correo){
        List<Biciusuario> ListaBiciusuarios;
        if(nombre != null && apellido == null && correo == null){
            ListaBiciusuarios = bcService.findByNombre(nombre);
        }else if(nombre == null && apellido != null && correo == null){
            ListaBiciusuarios = bcService.findByApellido(apellido);
        }else if(nombre == null && apellido == null && correo != null){
            ListaBiciusuarios = bcService.findByCorreo(correo);
        } else{
            return ResponseEntity.noContent().build();
        }
        if(ListaBiciusuarios.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ListaBiciusuarios);
    }

    @GetMapping("/{identificacion}")
    public ResponseEntity<Biciusuario> getBiciusuario(@PathVariable("identificacion") Long identificacion){
        Biciusuario bc = bcService.getBiciusuario(identificacion);
        if(bc == null){
            return null;
        }
        return ResponseEntity.ok(bc);
    }

    @PostMapping
    public ResponseEntity<Biciusuario> creatBiciusuario(@RequestBody BiciusuarioDTO bcDTO){
        Biciusuario bc = new Biciusuario(
            bcDTO.getIdentificacion(),
            bcDTO.getNombre(),
            bcDTO.getApellido(),
            bcDTO.getCorreo(),
            bcDTO.getContrasena()
        );
        Biciusuario createdBc = bcService.createBiciusuario(bc);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBc);
    }

    @DeleteMapping("/{identificacion}")
    public ResponseEntity<Biciusuario> deleteBiciusuario(@PathVariable("identificacion") Long identificacion){
        Biciusuario bcDeleted = bcService.deleteBiciusuario(identificacion);
        if(bcDeleted == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(bcDeleted);
    }

    @PutMapping
    public ResponseEntity<Biciusuario> updateBiciusuario(@RequestBody BiciusuarioDTO bcDto){
        Long identificacion = bcDto.getIdentificacion();
        String nombre = bcDto.getNombre();
        String apellido = bcDto.getApellido();
        String correo = bcDto.getCorreo();

        Biciusuario bc = bcService.updateBiciusuario(identificacion, nombre, apellido, correo);
        if(bc == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(bc);
    }

}
