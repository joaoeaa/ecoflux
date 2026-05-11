package com.edenred.ecoflux.model;

import lombok.Data;

import java.util.Map;

@Data
public class BenchmarkJson {

    private Map<String, SetorBenchmark> setores;

    @Data
    public static class SetorBenchmark {
        private Map<String, PorteBenchmark> portes;
    }

    @Data
    public static class PorteBenchmark {
        private double mediaEmissoes_tCO2e_ano;
        private double melhorEmissoes_tCO2e_ano;
        private Map<String, Double> percentis;
    }
}
