package com.bicisafe.demo.service;

import java.util.List;

import com.bicisafe.demo.model.Lugar;

public interface LugarService {

    public Lugar getLugar(Long id);
    public Lugar createLugar(Lugar lr);
    public Lugar deleteLugar(Long id);
    public Lugar updateLugar(Lugar lr);

    public List<Lugar> findByIdent(Long ident);
    public List<Lugar> findAll();
    
}
