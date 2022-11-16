package com.bicisafe.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bicisafe.demo.model.Lugar;
import com.bicisafe.demo.repository.lugarRepository;

@Service
public class LugarServiceImpl implements LugarService {

    private final lugarRepository lrRepository;

    @Autowired
    public LugarServiceImpl (lugarRepository lrRepository){
        this.lrRepository = lrRepository;
    }

    @Override
    public Lugar getLugar(Long id) {
        Lugar lr = lrRepository.findById(id).orElse(null);
        return lr;
    }

    @Override
    public Lugar createLugar(Lugar lr) {
        return lrRepository.save(lr);
    }

    @Override
    public Lugar deleteLugar(Long id) {
        Lugar lr = lrRepository.findById(id).orElse(null);
        if(lr == null){
            return null;
        }
        lrRepository.delete(lr);
        return lr;
    }

    @Override
    public Lugar updateLugar(Lugar lr) {
        Lugar lrTemp = lrRepository.findById(lr.getId()).orElse(null);
        if(lrTemp == null){return null;}
        return lrRepository.save(lr);
    }

    @Override
    public List<Lugar> findByIdent(Long ident) {
        return lrRepository.findByIdent(ident);
    }

    @Override
    public List<Lugar> findAll() {
        return lrRepository.findAll();
    }

    
    
}
