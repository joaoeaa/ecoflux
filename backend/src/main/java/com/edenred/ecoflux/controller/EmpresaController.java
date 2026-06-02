package com.edenred.ecoflux.controller;

import com.edenred.ecoflux.model.Empresa;
import com.edenred.ecoflux.model.HistoricoMes;
import com.edenred.ecoflux.service.EmpresaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST endpoints for empresas and their historico.
 */
@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {

    private final EmpresaService empresaService;

    public EmpresaController(EmpresaService empresaService) {
        this.empresaService = empresaService;
    }

    /**
     * Lists all empresas.
     *
     * @return list of empresas
     */
    @GetMapping
    public List<Empresa> listar() {
        return empresaService.listarTodas();
    }

    /**
     * Returns historico data for a given empresa.
     *
     * @param id empresa identifier
     * @return map with empresa summary and historico list
     */
    @GetMapping("/{id}/historico")
    public Map<String, Object> historico(@PathVariable String id) {
        Empresa empresa = empresaService.buscarPorId(id);
        List<HistoricoMes> historico = empresa.getHistorico();
        return Map.of(
                "empresaId", empresa.getId(),
                "nomeEmpresa", empresa.getNome(),
                "historico", historico != null ? historico : List.of()
        );
    }
}
