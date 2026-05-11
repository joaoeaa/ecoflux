package com.edenred.ecoflux.service;

import com.edenred.ecoflux.config.DataLoader;
import com.edenred.ecoflux.model.Empresa;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class EmpresaService {

    private final DataLoader dataLoader;

    public EmpresaService(DataLoader dataLoader) {
        this.dataLoader = dataLoader;
    }

    public List<Empresa> listarTodas() {
        return dataLoader.getEmpresas();
    }

    public Empresa buscarPorId(String id) {
        return dataLoader.getEmpresas().stream()
                .filter(e -> e.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Empresa não encontrada"));
    }
}
