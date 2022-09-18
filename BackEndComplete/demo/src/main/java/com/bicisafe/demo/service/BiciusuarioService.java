package com.bicisafe.demo.service;

import java.util.List;

import com.bicisafe.demo.model.Biciusuario;

public interface BiciusuarioService {

    public Biciusuario getBiciusuario(Long identificacion);
    public Biciusuario createBiciusuario(Biciusuario bc);
    public Biciusuario deleteBiciusuario(Long identificacion);
    public Biciusuario updateBiciusuario(Long identificacion, String nombre, String apellido, String correo);

    public List<Biciusuario> findByNombre(String nombre);
    public List<Biciusuario> findByApellido(String apellido);
    public List<Biciusuario> findByCorreo(String correo);
}
