package com.edenred.ecoflux.service;

import com.edenred.ecoflux.config.DataLoader;
import com.edenred.ecoflux.model.BenchmarkData;
import com.edenred.ecoflux.model.BenchmarkJson.PorteBenchmark;
import com.edenred.ecoflux.model.enums.Porte;
import com.edenred.ecoflux.model.enums.Setor;
import org.springframework.stereotype.Service;

@Service
public class BenchmarkService {

    private final DataLoader dataLoader;

    public BenchmarkService(DataLoader dataLoader) {
        this.dataLoader = dataLoader;
    }

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

    public double getMediaSetor(Setor setor) {
        return getPorteBenchmark(setor, Porte.GRANDE).getMediaEmissoes_tCO2e_ano();
    }

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
