package com.edenred.ecoflux.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Equivalencias {
    private int arvoresEquivalentes;
    private int carrosRetirados;
    private double kgPVCNaoProduzido;
}
