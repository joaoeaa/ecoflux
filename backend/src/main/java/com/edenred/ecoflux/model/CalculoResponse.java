package com.edenred.ecoflux.model;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

/**
 * Response payload with emissions and equivalences results.
 */
@Data
@Builder
public class CalculoResponse {
    private String nomeEmpresa;
    private int funcionariosMigrados;
    private double emissoesEvitadas_tCO2e_ano;
    private double emissoesEvitadas_kgCO2e_ano;
    private double fatorFisico_tCO2e;
    private double fatorDigital_tCO2e;
    private double delta_tCO2e;
    private Equivalencias equivalencias;
    private String setor;
    private double mediaSetor_tCO2e_ano;
    private int posicaoPercentil;
    private String metodologia;
    private String versaoMetodologia;
    private LocalDate dataCalculo;
}
