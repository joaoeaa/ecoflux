package com.edenred.ecoflux.model;

import com.edenred.ecoflux.model.enums.ModeloBeneficio;
import com.edenred.ecoflux.model.enums.Porte;
import com.edenred.ecoflux.model.enums.Setor;
import com.edenred.ecoflux.model.enums.TipoBeneficio;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

/**
 * Empresa domain model loaded from the dataset.
 */
@Data
public class Empresa {
    private String id;
    private String nome;
    private Setor setor;
    private Porte porte;
    private int funcionarios;
    private ModeloBeneficio modeloAtual;
    private List<TipoBeneficio> tiposBeneficio;
    private LocalDate dataContrato;
    private List<HistoricoMes> historico;
}
