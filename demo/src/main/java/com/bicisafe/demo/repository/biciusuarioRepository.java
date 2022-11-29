package com.bicisafe.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bicisafe.demo.model.Biciusuario;

@Repository
public interface biciusuarioRepository extends JpaRepository<Biciusuario, String> {

    public Biciusuario findByCorreoAndContrasena(String correo, String contrasena);
    public Biciusuario findByCorreo(String correo);
    public Biciusuario findByUserName(String UserName);
    public Biciusuario findByIdent(String ident);

    public List<Biciusuario> findAll();
    //public List<Biciusuario> findAllId();
}
