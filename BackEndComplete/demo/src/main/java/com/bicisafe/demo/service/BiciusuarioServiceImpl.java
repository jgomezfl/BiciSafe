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
    public Biciusuario getBiciusuario(Long id) {
        Biciusuario bc = bcRepository.findById(id).orElse(null);
        return bc;
    }

    @Override
    public Biciusuario createBiciusuario(Biciusuario bc) {
        return bcRepository.save(bc);
    }

    @Override
    public Biciusuario deleteBiciusuario(Long id) {
        Biciusuario bc = bcRepository.findById(id).orElse(null);
        if(bc == null){
            return null;
        }
        bcRepository.delete(bc);
        return bc;
    }

    @Override
    public Biciusuario updateBiciusuario(Biciusuario bc) {
        Biciusuario bcTemp = bcRepository.findById(bc.getId()).orElse(null);
        if(bcTemp == null){
            return null;
        }
        return bcRepository.save(bc);
    }

    @Override
    public List<Biciusuario> findAllByCorreoAndContrasena(String correo, String contrasena) {
        return bcRepository.findAllByCorreoAndContrasena(correo, contrasena);
    }

    @Override
    public List<Biciusuario> findAll() {
        return bcRepository.findAll();
    }

    

}
