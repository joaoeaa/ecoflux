package com.edenred.ecoflux.controller;

import com.edenred.ecoflux.model.BenchmarkData;
import com.edenred.ecoflux.model.enums.Porte;
import com.edenred.ecoflux.model.enums.Setor;
import com.edenred.ecoflux.service.BenchmarkService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/benchmark")
public class BenchmarkController {

    private final BenchmarkService benchmarkService;

    public BenchmarkController(BenchmarkService benchmarkService) {
        this.benchmarkService = benchmarkService;
    }

    @GetMapping("/{setor}/{porte}")
    public BenchmarkData getBenchmark(
            @PathVariable Setor setor,
            @PathVariable Porte porte) {
        return benchmarkService.getBenchmark(setor, porte);
    }
}
