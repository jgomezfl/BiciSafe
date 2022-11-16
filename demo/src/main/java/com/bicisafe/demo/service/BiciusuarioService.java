package com.bicisafe.demo.service;

import java.util.List;

import com.bicisafe.demo.model.Biciusuario;

public interface BiciusuarioService {

    public Biciusuario getBiciusuario(Long ident);
    public Biciusuario createBiciusuario(Biciusuario bc);
    public Biciusuario deleteBiciusuario(Long ident);
    public Biciusuario updateBiciusuario(Biciusuario bc);

    public Biciusuario findByCorreoAndContrasena(String correo, String contrasena);
    public Biciusuario findByCorreo(String correo);
    public Biciusuario findByUserName(String UserName);
    public Biciusuario findByIdent(Long ident);

    public List<Biciusuario> findAll();
    //public List<Biciusuario> findAllId();
}
