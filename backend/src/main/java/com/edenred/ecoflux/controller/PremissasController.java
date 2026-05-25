package com.edenred.ecoflux.controller;

import com.edenred.ecoflux.config.DataLoader;
import com.edenred.ecoflux.model.Premissas;
import org.springframework.web.bind.annotation.*;

/**
 * REST endpoints for premissas data.
 */
@RestController
@RequestMapping("/api")
public class PremissasController {

    private final DataLoader dataLoader;

    public PremissasController(DataLoader dataLoader) {
        this.dataLoader = dataLoader;
    }

    /**
     * Returns the premissas configuration loaded at startup.
     *
     * @return premissas configuration
     */
    @GetMapping("/premissas")
    public Premissas getPremissas() {
        return dataLoader.getPremissas();
    }
}
