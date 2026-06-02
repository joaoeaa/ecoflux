package com.edenred.ecoflux.model;

import lombok.Data;

import java.util.Map;

/**
 * Model that mirrors the benchmark JSON structure.
 */
@Data
public class BenchmarkJson {

    private Map<String, SetorBenchmark> setores;

    /**
     * Benchmark data grouped by porte for a setor.
     */
    @Data
    public static class SetorBenchmark {
        private Map<String, PorteBenchmark> portes;
    }

    /**
     * Benchmark metrics for a specific porte.
     */
    @Data
    public static class PorteBenchmark {
        private double mediaEmissoes_tCO2e_ano;
        private double melhorEmissoes_tCO2e_ano;
        private Map<String, Double> percentis;
    }
}
