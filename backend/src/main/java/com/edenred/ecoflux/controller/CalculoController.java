package com.edenred.ecoflux.controller;

import com.edenred.ecoflux.model.CalculoRequest;
import com.edenred.ecoflux.model.CalculoResponse;
import com.edenred.ecoflux.service.CalculoService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CalculoController {

    private final CalculoService calculoService;

    public CalculoController(CalculoService calculoService) {
        this.calculoService = calculoService;
    }

    @PostMapping("/calcular")
    public CalculoResponse calcular(@Valid @RequestBody CalculoRequest req) {
        return calculoService.calcular(req);
    }
}
