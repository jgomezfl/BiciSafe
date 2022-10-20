package com.bicisafe.demo.service;

import java.util.List;

import com.bicisafe.demo.model.Bicicleta;

public interface BicicletaService {
    
    public Bicicleta getBicicleta(String serie);
    public Bicicleta createBicicleta(Bicicleta bcl);
    public Bicicleta deleteBicicleta(String serie);
    public Bicicleta updateBicicleta(Bicicleta bcl);

    public List<Bicicleta> findByIdent(Long ident);
    public List<Bicicleta> findAll();

}
