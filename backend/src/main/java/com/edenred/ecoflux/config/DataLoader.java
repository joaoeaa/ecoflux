package com.edenred.ecoflux.config;

import com.edenred.ecoflux.model.BenchmarkJson;
import com.edenred.ecoflux.model.Empresa;
import com.edenred.ecoflux.model.Premissas;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
@Getter
public class DataLoader {

    private Premissas premissas;
    private List<Empresa> empresas;
    private BenchmarkJson benchmark;

    @PostConstruct
    public void load() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        mapper.registerModule(new JavaTimeModule());

        premissas = mapper.readValue(
                new ClassPathResource("data/premissas.json").getInputStream(),
                Premissas.class);

        empresas = mapper.readValue(
                new ClassPathResource("data/empresas.json").getInputStream(),
                new TypeReference<>() {});

        benchmark = mapper.readValue(
                new ClassPathResource("data/benchmark.json").getInputStream(),
                BenchmarkJson.class);
    }
}
