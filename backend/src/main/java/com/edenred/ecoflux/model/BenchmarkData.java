package com.edenred.ecoflux.model;

import lombok.Data;

import java.util.Map;

@Data
public class BenchmarkData {
    private String setor;
    private String porte;
    private double mediaEmissoes_tCO2e_ano;
    private double melhorEmissoes_tCO2e_ano;
    private Map<String, Double> percentis;
}
