package com.edenred.ecoflux.model;

import com.edenred.ecoflux.model.enums.ModeloBeneficio;
import com.edenred.ecoflux.model.enums.Setor;
import com.edenred.ecoflux.model.enums.TipoBeneficio;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.List;

/**
 * Request payload for emissions calculation.
 */
@Data
public class CalculoRequest {

    @NotBlank
    @Size(max = 200)
    private String nomeEmpresa;

    @Min(1) @Max(500000)
    private int funcionarios;

    @NotNull
    private ModeloBeneficio modeloAtual;

    @NotEmpty
    private List<TipoBeneficio> tiposBeneficio;

    @Min(1) @Max(100)
    private int percentualMigracao = 100;

    private Setor setor = Setor.VAREJO;
}
