package com.bicisafe.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bicisafe.demo.model.Biciusuario;

@Repository
public interface biciusuarioRepository extends JpaRepository<Biciusuario, Long> {

    public List<Biciusuario> findAllByCorreoAndContrasena(String correo, String contrasena);

    public List<Biciusuario> findAll();
}
