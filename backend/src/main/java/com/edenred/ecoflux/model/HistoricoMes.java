package com.edenred.ecoflux.model;

import lombok.Data;

/**
 * Historical monthly metrics for an empresa.
 */
@Data
public class HistoricoMes {
    private String mes;
    private int funcionariosMigrados;
    private int transacoesDigitais;
    private double emissoesEvitadas_tCO2e;
}
