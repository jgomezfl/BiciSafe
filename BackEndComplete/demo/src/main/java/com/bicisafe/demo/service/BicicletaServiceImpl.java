package com.bicisafe.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bicisafe.demo.model.Bicicleta;
import com.bicisafe.demo.repository.bicicletaRepository;

@Service
public class BicicletaServiceImpl implements BicicletaService {

    private final bicicletaRepository bclRepository;

    @Autowired
    public BicicletaServiceImpl (bicicletaRepository bclRepository){
        this.bclRepository = bclRepository;
    }

    @Override
    public Bicicleta getBicicleta(String serie) {
        Bicicleta bcl = bclRepository.findById(serie).orElse(null);
        return bcl;
    }

    @Override
    public Bicicleta createBicicleta(Bicicleta bcl) {
        return bclRepository.save(bcl);
    }

    @Override
    public Bicicleta deleteBicicleta(String serie) {
        Bicicleta bcl = bclRepository.findById(serie).orElse(null);
        if(bcl == null){
            return null;
        }
        bclRepository.delete(bcl);
        return bcl;
    }

    @Override
    public Bicicleta updateBicicleta(Bicicleta bcl) {
        Bicicleta bclTemp = bclRepository.findById(bcl.getSerie()).orElse(null);
        if(bclTemp == null){
            return null;
        }
        return bclRepository.save(bcl);
    }

    @Override
    public List<Bicicleta> findByIdent(Long ident) {
        return bclRepository.findByIdent(ident);
    }

    @Override
    public List<Bicicleta> findAll() {
        return bclRepository.findAll();
    }
    
}
