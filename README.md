# ecoflux

## Mapa técnico completo dos arquivos

Este README descreve **todos os arquivos versionados** do repositório, separados por grupos.

## 1) Raiz do repositório

**Função geral:** arquivos de documentação e visão arquitetural global do projeto.

- `README.md`: documentação principal do projeto e inventário técnico dos arquivos.
- `ecoflux_uml.html`: diagrama arquitetural/UML estático em HTML+CSS com visão de frontend, API, serviços e modelos.

## 2) Frontend

**Função geral:** placeholder do módulo frontend neste snapshot do repositório.

- `frontend/.gitkeep`: mantém o diretório `frontend/` versionado mesmo sem código frontend presente.

## 3) Backend — build, wrapper e controle de ambiente

**Função geral:** infraestrutura de build Maven, padronização de ambiente e exclusões de arquivos locais/gerados.

- `backend/pom.xml`: declaração do projeto Maven (Spring Boot, dependências, plugins e Java 21).
- `backend/mvnw`: script Maven Wrapper para Unix/macOS/Linux.
- `backend/mvnw.cmd`: script Maven Wrapper para Windows.
- `backend/.mvn/wrapper/maven-wrapper.properties`: define versão do wrapper e URL da distribuição Maven.
- `backend/.gitignore`: ignora artefatos de build e arquivos de IDE no módulo backend.
- `backend/.gitattributes`: define política de fim de linha para scripts do wrapper.

## 4) Backend — configuração da aplicação

**Função geral:** configuração de runtime da aplicação e inicialização de dados/config de integração HTTP.

- `backend/src/main/resources/application.properties`: propriedades Spring Boot (porta, encoding e serialização).
- `backend/src/main/java/com/edenred/ecoflux/config/CorsConfig.java`: configura CORS para rotas `/api/**` permitindo o frontend local.
- `backend/src/main/java/com/edenred/ecoflux/config/DataLoader.java`: carrega `premissas.json`, `empresas.json` e `benchmark.json` em memória no startup.

## 5) Backend — dados estáticos de domínio

**Função geral:** base de dados local usada como fonte para cálculos, benchmark e consultas da API.

- `backend/src/main/resources/data/premissas.json`: parâmetros metodológicos, fontes, equivalências ambientais e fábricas.
- `backend/src/main/resources/data/benchmark.json`: referência de emissões por setor/porte com percentis.
- `backend/src/main/resources/data/empresas.json`: empresas de exemplo com histórico mensal de migração e emissões evitadas.

## 6) Backend — bootstrap da aplicação

**Função geral:** ponto de entrada da aplicação Spring Boot.

- `backend/src/main/java/com/edenred/ecoflux/EcofluxApplication.java`: classe `main` que inicia o contexto Spring.

## 7) Backend — controllers (camada HTTP)

**Função geral:** expor endpoints REST, validar/receber payloads e delegar processamento para os serviços.

- `backend/src/main/java/com/edenred/ecoflux/controller/CalculoController.java`: endpoint `POST /api/calcular`, valida `CalculoRequest` e chama `CalculoService`.
- `backend/src/main/java/com/edenred/ecoflux/controller/BenchmarkController.java`: endpoint `GET /api/benchmark/{setor}/{porte}` para consulta de benchmark.
- `backend/src/main/java/com/edenred/ecoflux/controller/EmpresaController.java`: endpoints para listar empresas e obter histórico por ID.
- `backend/src/main/java/com/edenred/ecoflux/controller/PremissasController.java`: endpoint `GET /api/premissas` para expor premissas vigentes.

## 8) Backend — services (regras de negócio)

**Função geral:** implementar regra de domínio, cálculos e orquestração de dados carregados em memória.

- `backend/src/main/java/com/edenred/ecoflux/service/CalculoService.java`: calcula emissões evitadas, equivalências, média setorial, percentil e monta `CalculoResponse`.
- `backend/src/main/java/com/edenred/ecoflux/service/BenchmarkService.java`: consulta benchmark por setor/porte e calcula posicionamento em percentil.
- `backend/src/main/java/com/edenred/ecoflux/service/EmpresaService.java`: lista empresas e busca por ID com retorno 404 quando não encontrada.

## 9) Backend — models (DTOs e estruturas de domínio)

**Função geral:** tipagem de entrada/saída da API e estrutura de dados do domínio desserializada dos JSONs.

- `backend/src/main/java/com/edenred/ecoflux/model/CalculoRequest.java`: DTO de entrada da calculadora com validações de campos.
- `backend/src/main/java/com/edenred/ecoflux/model/CalculoResponse.java`: DTO de saída do cálculo com métricas ambientais, benchmark e metadados.
- `backend/src/main/java/com/edenred/ecoflux/model/Equivalencias.java`: objeto de equivalências ambientais (árvores, carros e PVC evitado).
- `backend/src/main/java/com/edenred/ecoflux/model/Premissas.java`: mapeia estrutura de premissas (parâmetros, equivalências e fábricas).
- `backend/src/main/java/com/edenred/ecoflux/model/BenchmarkData.java`: estrutura de resposta de benchmark simplificada para API.
- `backend/src/main/java/com/edenred/ecoflux/model/BenchmarkJson.java`: estrutura completa do JSON de benchmark (setor/porte/percentis).
- `backend/src/main/java/com/edenred/ecoflux/model/Empresa.java`: estrutura de empresa com atributos cadastrais e histórico.
- `backend/src/main/java/com/edenred/ecoflux/model/HistoricoMes.java`: estrutura mensal de histórico de migração e emissões evitadas.

## 10) Backend — enums de domínio

**Função geral:** restringir valores válidos para atributos de negócio usados em entrada, persistência em memória e benchmark.

- `backend/src/main/java/com/edenred/ecoflux/model/enums/ModeloBeneficio.java`: enum de modelo atual de benefício.
- `backend/src/main/java/com/edenred/ecoflux/model/enums/TipoBeneficio.java`: enum de tipos de benefício.
- `backend/src/main/java/com/edenred/ecoflux/model/enums/Setor.java`: enum de setores econômicos suportados.
- `backend/src/main/java/com/edenred/ecoflux/model/enums/Porte.java`: enum de portes empresariais.

## 11) Backend — testes

**Função geral:** validação mínima da subida do contexto Spring.

- `backend/src/test/java/com/edenred/ecoflux/EcofluxApplicationTests.java`: teste `contextLoads` para garantir que a aplicação inicializa.
