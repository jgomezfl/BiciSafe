package com.bicisafe.demo.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bicisafe.demo.model.Lugar;

@Repository
public interface lugarRepository extends JpaRepository<Lugar, Long> {
    
    public List<Lugar> findByIdent(Long ident);
    public List<Lugar> findAll();

}
