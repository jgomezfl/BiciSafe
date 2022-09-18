package com.bicisafe.demo.service;

import java.util.List;

import com.bicisafe.demo.model.Biciusuario;

public interface BiciusuarioService {

    public Biciusuario getBiciusuario(Long id);
    public Biciusuario createBiciusuario(Biciusuario bc);
    public Biciusuario deleteBiciusuario(Long id);
    public Biciusuario updateBiciusuario(Biciusuario bc);

    public List<Biciusuario> findAllByCorreoAndContrasena(String correo, String contrasena);
    public List<Biciusuario> findAll();
}
