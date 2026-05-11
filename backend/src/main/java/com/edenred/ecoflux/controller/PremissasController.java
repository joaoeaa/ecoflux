package com.edenred.ecoflux.controller;

import com.edenred.ecoflux.config.DataLoader;
import com.edenred.ecoflux.model.Premissas;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PremissasController {

    private final DataLoader dataLoader;

    public PremissasController(DataLoader dataLoader) {
        this.dataLoader = dataLoader;
    }

    @GetMapping("/premissas")
    public Premissas getPremissas() {
        return dataLoader.getPremissas();
    }
}
