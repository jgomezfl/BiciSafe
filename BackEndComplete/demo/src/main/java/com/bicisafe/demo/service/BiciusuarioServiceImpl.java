package com.bicisafe.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bicisafe.demo.model.Biciusuario;
import com.bicisafe.demo.repository.biciusuarioRepository;

@Service
public class BiciusuarioServiceImpl implements BiciusuarioService {

    private final biciusuarioRepository bcRepository;

    @Autowired
    public BiciusuarioServiceImpl(biciusuarioRepository bcRepository){
        this.bcRepository = bcRepository;
    }

    @Override
    public Biciusuario getBiciusuario(Long identificacion){
        Biciusuario bc = bcRepository.findById(identificacion).orElse(null);
        return bc;
    }

    @Override
    public Biciusuario createBiciusuario(Biciusuario bc){
        return bcRepository.save(bc);
    }

    @Override
    public Biciusuario deleteBiciusuario(Long identificacion){
        Biciusuario bc = bcRepository.findById(identificacion).orElse(null);
        if(bc == null){
            return null;
        }
        bcRepository.delete(bc);
        return bc;
    }

    @Override
    public Biciusuario updateBiciusuario(Long identificacion, String nombre, String apellido, String correo){
        Biciusuario bc = bcRepository.findById(identificacion).orElse(null);
        if(bc == null){
            return null;
        }
        bc.setNombre(nombre);
        bc.setApellido(apellido);
        bc.setCorreo(correo);
        return bc;
    }

    @Override
    public List<Biciusuario> findByNombre(String nombre){
        return bcRepository.findAllByNombre(nombre);
    }
    
    @Override
    public List<Biciusuario> findByApellido(String apellido){
        return bcRepository.findAllByApellido(apellido);
    }

    @Override
    public List<Biciusuario> findByCorreo(String correo){
        return bcRepository.findAllByCorreo(correo);
    }

}
