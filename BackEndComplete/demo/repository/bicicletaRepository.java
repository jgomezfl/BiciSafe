package com.bicisafe.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bicisafe.demo.model.Bicicleta;

@Repository
public interface bicicletaRepository extends JpaRepository<Bicicleta, String>{

    public List<Bicicleta> findByIdent(Long ident);
    public List<Bicicleta> findAll();
    
}
