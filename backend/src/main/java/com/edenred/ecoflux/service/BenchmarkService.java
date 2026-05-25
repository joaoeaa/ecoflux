package com.edenred.ecoflux.service;

import com.edenred.ecoflux.config.DataLoader;
import com.edenred.ecoflux.model.BenchmarkData;
import com.edenred.ecoflux.model.BenchmarkJson.PorteBenchmark;
import com.edenred.ecoflux.model.enums.Porte;
import com.edenred.ecoflux.model.enums.Setor;
import org.springframework.stereotype.Service;

/**
 * Provides benchmark calculations based on setor and porte.
 */
@Service
public class BenchmarkService {

    private final DataLoader dataLoader;

    public BenchmarkService(DataLoader dataLoader) {
        this.dataLoader = dataLoader;
    }

    /**
     * Builds benchmark data for the requested setor and porte.
     *
     * @param setor setor da empresa
     * @param porte porte da empresa
     * @return benchmark data
     */
    public BenchmarkData getBenchmark(Setor setor, Porte porte) {
        PorteBenchmark pb = getPorteBenchmark(setor, porte);

        BenchmarkData data = new BenchmarkData();
        data.setSetor(setor.name().toLowerCase());
        data.setPorte(porte.name().toLowerCase());
        data.setMediaEmissoes_tCO2e_ano(pb.getMediaEmissoes_tCO2e_ano());
        data.setMelhorEmissoes_tCO2e_ano(pb.getMelhorEmissoes_tCO2e_ano());
        data.setPercentis(pb.getPercentis());
        return data;
    }

    /**
     * Returns the average emissions for a setor (porte grande).
     *
     * @param setor setor da empresa
     * @return average emissions in tCO2e/ano
     */
    public double getMediaSetor(Setor setor) {
        return getPorteBenchmark(setor, Porte.GRANDE).getMediaEmissoes_tCO2e_ano();
    }

    /**
     * Calculates the percentile position given emissions and setor.
     *
     * @param tCO2e total emissions in tCO2e
     * @param setor setor da empresa
     * @return percentile bucket (10, 25, 50, 75, 90)
     */
    public int calcularPercentil(double tCO2e, Setor setor) {
        PorteBenchmark pb = getPorteBenchmark(setor, Porte.GRANDE);
        double p25 = pb.getPercentis().get("p25");
        double p50 = pb.getPercentis().get("p50");
        double p75 = pb.getPercentis().get("p75");
        double p90 = pb.getPercentis().get("p90");

        if (tCO2e >= p90) return 10;
        if (tCO2e >= p75) return 25;
        if (tCO2e >= p50) return 50;
        if (tCO2e >= p25) return 75;
        return 90;
    }

    private PorteBenchmark getPorteBenchmark(Setor setor, Porte porte) {
        return dataLoader.getBenchmark()
                .getSetores()
                .get(setor.name())
                .getPortes()
                .get(porte.name());
    }
}
