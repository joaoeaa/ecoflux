package com.edenred.ecoflux.controller;

import com.edenred.ecoflux.model.Empresa;
import com.edenred.ecoflux.model.HistoricoMes;
import com.edenred.ecoflux.service.EmpresaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {

    private final EmpresaService empresaService;

    public EmpresaController(EmpresaService empresaService) {
        this.empresaService = empresaService;
    }

    @GetMapping
    public List<Empresa> listar() {
        return empresaService.listarTodas();
    }

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
