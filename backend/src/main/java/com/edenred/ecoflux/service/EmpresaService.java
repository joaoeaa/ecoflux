package com.edenred.ecoflux.service;

import com.edenred.ecoflux.config.DataLoader;
import com.edenred.ecoflux.model.Empresa;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/**
 * Service for accessing empresas loaded from JSON.
 */
@Service
public class EmpresaService {

    private final DataLoader dataLoader;

    public EmpresaService(DataLoader dataLoader) {
        this.dataLoader = dataLoader;
    }

    /**
     * Returns all empresas.
     *
     * @return list of empresas
     */
    public List<Empresa> listarTodas() {
        return dataLoader.getEmpresas();
    }

    /**
     * Finds an empresa by its identifier.
     *
     * @param id empresa identifier
     * @return empresa data
     * @throws ResponseStatusException when the empresa is not found
     */
    public Empresa buscarPorId(String id) {
        return dataLoader.getEmpresas().stream()
                .filter(e -> e.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Empresa não encontrada"));
    }
}
