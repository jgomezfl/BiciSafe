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
        // return bcRepository.save(bc);
        return bc;
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
        Biciusuario bcTemp = bcRepository.findByCorreo(bc.getCorreo());
        if(bcTemp == null){
            return null;
        }
        return bcRepository.save(bc);
    }

    @Override
    public Biciusuario findByCorreoAndContrasena(String correo, String contrasena) {
        Biciusuario bc = bcRepository.findByCorreoAndContrasena(correo, contrasena);
        return bc;
    }

    @Override
    public List<Biciusuario> findAll() {
        return bcRepository.findAll();
    }

    @Override
    public Biciusuario findByCorreo(String correo) {
        Biciusuario bc = bcRepository.findByCorreo(correo);
        return bc;
    }

    @Override
    public Biciusuario findByUserName(String UserName) {
        Biciusuario bc = bcRepository.findByUserName(UserName);
        return bc;
    }

    @Override
    public Biciusuario findByIdent(Long ident) {
        Biciusuario bc = bcRepository.findByIdent(ident);
        return bc;
    }   

}
