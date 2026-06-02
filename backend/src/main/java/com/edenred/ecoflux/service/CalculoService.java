package com.edenred.ecoflux.service;

import com.edenred.ecoflux.config.DataLoader;
import com.edenred.ecoflux.model.CalculoRequest;
import com.edenred.ecoflux.model.CalculoResponse;
import com.edenred.ecoflux.model.enums.Setor;
import com.edenred.ecoflux.model.Equivalencias;
import com.edenred.ecoflux.model.Premissas;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

/**
 * Service that performs emission calculations and equivalences.
 */
@Service
public class CalculoService {

    private final DataLoader dataLoader;
    private final BenchmarkService benchmarkService;

    public CalculoService(DataLoader dataLoader, BenchmarkService benchmarkService) {
        this.dataLoader = dataLoader;
        this.benchmarkService = benchmarkService;
    }

    /**
     * Calculates emissions and benchmark position for a request payload.
     *
     * @param req request data with company and benefit details
     * @return calculated response with emissions and equivalences
     */
    public CalculoResponse calcular(CalculoRequest req) {
        Premissas.ParametrosCalculo p = dataLoader.getPremissas().getParametros();
        Premissas.EquivalenciasConfig eq = dataLoader.getPremissas().getEquivalencias();

        int funcionariosMigrados = (int) Math.round(req.getFuncionarios() * (req.getPercentualMigracao() / 100.0));

        double fatorFisico = switch (req.getModeloAtual()) {
            case FISICO_PVC  -> p.getFatorFisicoConsolidado_tCO2e_funcionario_ano();
            case FISICO_RPVC -> p.getFatorFisicoConsolidado_tCO2e_funcionario_ano() * 0.35;
            case VALE_PAPEL  -> p.getFatorFisicoConsolidado_tCO2e_funcionario_ano() * 1.10;
            case MISTO       -> p.getFatorFisicoConsolidado_tCO2e_funcionario_ano() * 0.70;
        };

        double fatorDigital = p.getFatorDigitalConsolidado_tCO2e_usuario_ano();
        double delta = Math.max(0, fatorFisico - fatorDigital);

        double emissoesTCO2 = funcionariosMigrados * delta;
        double emissoesKgCO2 = emissoesTCO2 * 1000;

        int arvores = (int) Math.round(emissoesKgCO2 / eq.getAbsorcaoArvore_kgCO2e_ano());
        int carros = (int) Math.round(emissoesKgCO2 / eq.getEmissaoCarroFlex_kgCO2e_ano());
        double kgPVC = funcionariosMigrados * 0.005;

        Setor setor = req.getSetor();
        double mediaSetor = benchmarkService.getMediaSetor(setor);
        int percentil = benchmarkService.calcularPercentil(emissoesTCO2, setor);

        return CalculoResponse.builder()
                .nomeEmpresa(req.getNomeEmpresa())
                .funcionariosMigrados(funcionariosMigrados)
                .emissoesEvitadas_tCO2e_ano(emissoesTCO2)
                .emissoesEvitadas_kgCO2e_ano(emissoesKgCO2)
                .fatorFisico_tCO2e(fatorFisico)
                .fatorDigital_tCO2e(fatorDigital)
                .delta_tCO2e(delta)
                .equivalencias(new Equivalencias(arvores, carros, kgPVC))
                .setor(setor.name().toLowerCase())
                .mediaSetor_tCO2e_ano(mediaSetor)
                .posicaoPercentil(percentil)
                .metodologia("GHG Protocol · Escopo 3 · Cradle-to-Gate (digital) / Cradle-to-Grave (físico)")
                .versaoMetodologia(dataLoader.getPremissas().getVersao())
                .dataCalculo(LocalDate.now())
                .build();
    }
}
