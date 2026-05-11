package com.edenred.ecoflux.model;

import lombok.Data;

@Data
public class HistoricoMes {
    private String mes;
    private int funcionariosMigrados;
    private int transacoesDigitais;
    private double emissoesEvitadas_tCO2e;
}
