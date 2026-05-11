package com.edenred.ecoflux.model;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class Premissas {
    private String versao;
    private String dataAtualizacao;
    private Map<String, String> fontes;
    private ParametrosCalculo parametros;
    private EquivalenciasConfig equivalencias;
    private List<Fabrica> fabricas;

    @Data
    public static class ParametrosCalculo {
        private double fatorEmissaoRede_kgCO2e_kWh;
        private double energiaTransacaoDigital_kWh;
        private double PUE_datacenter;
        private double emissaoPVCVirgem_kgCO2e_kg;
        private double emissaoRPVC_kgCO2e_kg;
        private double massaCartao_kg;
        private int vidaUtilCartao_anos;
        private int transacoesPorCartaoPorAno;
        private double percentualRPVC_Edenred;
        private double fatorFisicoConsolidado_tCO2e_funcionario_ano;
        private double fatorDigitalConsolidado_tCO2e_usuario_ano;
        private double delta_tCO2e_funcionario_ano;
    }

    @Data
    public static class EquivalenciasConfig {
        private double absorcaoArvore_kgCO2e_ano;
        private double emissaoCarroFlex_kgCO2e_ano;
    }

    @Data
    public static class Fabrica {
        private int id;
        private String cidade;
        private String estado;
    }
}
