package com.edenred.ecoflux.controller;

import com.edenred.ecoflux.model.CalculoRequest;
import com.edenred.ecoflux.model.CalculoResponse;
import com.edenred.ecoflux.service.CalculoService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

/**
 * REST endpoints for calculation requests.
 */
@RestController
@RequestMapping("/api")
public class CalculoController {

    private final CalculoService calculoService;

    public CalculoController(CalculoService calculoService) {
        this.calculoService = calculoService;
    }

    /**
     * Calculates emissions and equivalences for a request payload.
     *
     * @param req request data with company and benefit details
     * @return calculated response with emissions and equivalences
     */
    @PostMapping("/calcular")
    public CalculoResponse calcular(@Valid @RequestBody CalculoRequest req) {
        return calculoService.calcular(req);
    }
}
