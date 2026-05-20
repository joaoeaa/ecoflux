# Ecoflux

API REST para cálculo e rastreamento da redução de emissões de carbono (CO2 equivalente) resultante da digitalização de programas de benefícios corporativos — migrando de cartões físicos (PVC, papel) para soluções digitais.

Desenvolvido por **Edenred**, o sistema calcula o impacto ambiental da migração, compara com benchmarks do setor e fornece equivalências ambientais compreensíveis (árvores plantadas, carros retirados de circulação, kg de PVC economizados).

---

## Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Configuração](#configuração)
- [Endpoints da API](#endpoints-da-api)
- [Exemplos de requisição](#exemplos-de-requisição)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Dados e metodologia](#dados-e-metodologia)
- [Arquitetura](#arquitetura)

---

## Visão Geral

O Ecoflux permite que uma empresa informe seu perfil (número de funcionários, modelo atual de benefício, setor, porte) e receba de volta:

- **Emissões evitadas** em tCO2e/ano e kgCO2e/ano
- **Equivalências ambientais** (árvores, carros, kg de PVC)
- **Posicionamento no benchmark** do setor (percentil)
- **Metodologia** e premissas utilizadas no cálculo

A aplicação é **100% in-memory** — nenhum banco de dados externo é necessário. Todos os dados de referência (premissas, benchmarks, empresas de exemplo) são carregados de arquivos JSON na inicialização.

---

## Tecnologias

| Tecnologia | Versão | Função |
|---|---|---|
| Java | 21 (LTS) | Linguagem principal |
| Spring Boot | 3.5.x | Framework da aplicação |
| Spring Web (MVC) | (incluso) | Camada REST/HTTP |
| Spring Validation | (incluso) | Validação de entrada via anotações |
| Lombok | (latest) | Redução de boilerplate (getters, setters, etc.) |
| Jackson | (incluso) | Serialização/desserialização JSON |
| Jackson JSR310 | (incluso) | Suporte a `LocalDate` / `LocalDateTime` |
| Maven | 3.9.x (wrapper) | Gerenciamento de dependências e build |
| JUnit 5 | (incluso) | Testes unitários e de integração |

---

## Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado na sua máquina:

### 1. Java Development Kit (JDK) 21

O projeto usa **Java 21**. Versões anteriores não funcionarão.

**Verificar versão instalada:**
```bash
java -version
```
A saída deve exibir `openjdk 21` ou `java version "21"`.

**Instalar o JDK 21 (caso não tenha):**
- **Windows/Mac/Linux:** Baixe em [Adoptium (Eclipse Temurin)](https://adoptium.net/temurin/releases/?version=21) — opção recomendada e gratuita.
- Ou via gerenciador de pacotes:
  ```bash
  # macOS com Homebrew
  brew install openjdk@21

  # Ubuntu/Debian
  sudo apt install openjdk-21-jdk

  # Windows via Scoop
  scoop bucket add java && scoop install temurin21-jdk
  ```

### 2. Maven (opcional — já incluso via Wrapper)

O projeto já inclui o **Maven Wrapper** (`mvnw` / `mvnw.cmd`), então **não é necessário instalar o Maven globalmente**. O wrapper baixa a versão correta automaticamente na primeira execução.

Se preferir usar o Maven instalado na máquina, garanta **Maven 3.8+**:
```bash
mvn -version
```

### 3. Git

Para clonar o repositório:
```bash
git --version
```

### 4. (Opcional) IDE

Recomendadas para desenvolvimento:
- **IntelliJ IDEA** (Community ou Ultimate) — melhor suporte a Spring Boot
- **VS Code** com extensão [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
- **Eclipse** com Spring Tools Suite

---

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/<org>/ecoflux.git
cd ecoflux
```

### 2. Entrar no diretório do backend

```bash
cd backend
```

### 3. Executar a aplicação

**Linux / macOS:**
```bash
./mvnw spring-boot:run
```

**Windows (PowerShell ou CMD):**
```bat
mvnw.cmd spring-boot:run
```

Na primeira execução, o Maven Wrapper baixará todas as dependências automaticamente (pode demorar alguns minutos dependendo da conexão).

### 4. Verificar que subiu corretamente

Quando a aplicação estiver pronta, você verá no terminal uma linha parecida com:

```
Started EcofluxApplication in 2.341 seconds (process running for 2.6)
```

A API estará disponível em: **http://localhost:8080**

### 5. Testar um endpoint rápido

```bash
curl http://localhost:8080/api/premissas
```

Deve retornar um JSON com as premissas metodológicas.

---

### Executar via JAR (build manual)

Se preferir compilar e executar o JAR diretamente:

**Linux / macOS:**
```bash
./mvnw clean package -DskipTests
java -jar target/ecoflux-0.0.1-SNAPSHOT.jar
```

**Windows:**
```bat
mvnw.cmd clean package -DskipTests
java -jar target\ecoflux-0.0.1-SNAPSHOT.jar
```

---

### Executar os testes

**Linux / macOS:**
```bash
./mvnw test
```

**Windows:**
```bat
mvnw.cmd test
```

---

## Configuração

Todas as configurações ficam em:
```
backend/src/main/resources/application.properties
```

| Propriedade | Valor padrão | Descrição |
|---|---|---|
| `server.port` | `8080` | Porta em que a API sobe |
| `spring.application.name` | `ecoflux` | Nome da aplicação no Spring |
| `spring.jackson.serialization.write-dates-as-timestamps` | `false` | Datas em formato ISO 8601 (ex: `2026-01-15`) |
| `server.servlet.encoding.charset` | `UTF-8` | Encoding padrão das respostas |

### CORS

A API está configurada para aceitar requisições do frontend local na porta **5173** (servidor de desenvolvimento Vite):

```
http://localhost:5173
```

Para alterar a origem permitida, edite `backend/src/main/java/com/edenred/ecoflux/config/CorsConfig.java`.

### Variáveis de ambiente

O projeto **não usa variáveis de ambiente**. Toda a configuração está em `application.properties`.

---

## Endpoints da API

Base URL: `http://localhost:8080`

Todos os endpoints retornam JSON com encoding UTF-8.

---

### POST `/api/calcular`

Calcula as emissões evitadas a partir da migração de benefícios físicos para digitais.

**Body (JSON):**

| Campo | Tipo | Obrigatório | Valores válidos | Descrição |
|---|---|---|---|---|
| `nomeEmpresa` | string | Sim | máx. 200 chars | Nome da empresa |
| `funcionarios` | int | Sim | 1 – 500.000 | Total de funcionários com benefícios |
| `modeloAtual` | string | Sim | `VALE_PAPEL`, `FISICO_PVC`, `FISICO_RPVC`, `MISTO` | Modelo atual de benefício físico |
| `tiposBeneficio` | array | Sim | `VA`, `VR`, `MOBILIDADE` | Tipos de benefício utilizados |
| `percentualMigracao` | int | Não | 1 – 100 (padrão: 100) | % de funcionários que migrarão |
| `setor` | string | Não | `VAREJO`, `SERVICOS`, `INDUSTRIA`, `SAUDE`, `EDUCACAO` (padrão: VAREJO) | Setor econômico da empresa |

**Resposta:** Objeto com emissões evitadas, equivalências ambientais, benchmark setorial e metodologia.

---

### GET `/api/benchmark/{setor}/{porte}`

Retorna dados de benchmark de emissões para um setor e porte específicos.

**Parâmetros de path:**

| Parâmetro | Valores válidos |
|---|---|
| `setor` | `VAREJO`, `SERVICOS`, `INDUSTRIA`, `SAUDE`, `EDUCACAO` |
| `porte` | `PEQUENO`, `MEDIO`, `GRANDE`, `ENTERPRISE` |

**Resposta:** Médias de emissão, melhor desempenho e percentis (p25, p50, p75, p90) do setor.

---

### GET `/api/empresas`

Lista todas as empresas de exemplo cadastradas no sistema.

**Resposta:** Array com perfis das empresas (nome, setor, porte, número de funcionários).

---

### GET `/api/empresas/{id}/historico`

Retorna o histórico mensal de migração e emissões evitadas de uma empresa.

**Parâmetro de path:**
- `id` — identificador da empresa (string)

**Resposta:** Histórico com mês a mês de funcionários migrados, transações digitais e emissões evitadas.

---

### GET `/api/premissas`

Retorna as premissas metodológicas vigentes usadas nos cálculos.

**Resposta:** Versão da metodologia, fatores de emissão, equivalências ambientais, localizações de fábricas e fontes de dados.

---

## Exemplos de requisição

### Calcular emissões evitadas

```bash
curl -X POST http://localhost:8080/api/calcular \
  -H "Content-Type: application/json" \
  -d '{
    "nomeEmpresa": "Empresa Exemplo S.A.",
    "funcionarios": 1000,
    "modeloAtual": "FISICO_PVC",
    "tiposBeneficio": ["VA", "VR"],
    "percentualMigracao": 80,
    "setor": "VAREJO"
  }'
```

### Consultar benchmark

```bash
curl http://localhost:8080/api/benchmark/VAREJO/GRANDE
```

### Listar empresas

```bash
curl http://localhost:8080/api/empresas
```

### Histórico de uma empresa

```bash
curl http://localhost:8080/api/empresas/empresa-xyz/historico
```

### Ver premissas metodológicas

```bash
curl http://localhost:8080/api/premissas
```

---

## Estrutura do projeto

```
ecoflux/
├── README.md                          # Este arquivo
├── ecoflux_uml.html                   # Diagrama UML arquitetural (abra no browser)
│
├── frontend/
│   └── .gitkeep                       # Placeholder — frontend ainda não implementado
│
└── backend/
    ├── pom.xml                        # Configuração Maven (dependências, Java 21, plugins)
    ├── mvnw                           # Maven Wrapper — Linux/macOS
    ├── mvnw.cmd                       # Maven Wrapper — Windows
    ├── .mvn/wrapper/
    │   └── maven-wrapper.properties   # Versão e URL do Maven Wrapper
    │
    └── src/
        ├── main/
        │   ├── java/com/edenred/ecoflux/
        │   │   ├── EcofluxApplication.java          # Ponto de entrada Spring Boot
        │   │   │
        │   │   ├── config/
        │   │   │   ├── CorsConfig.java              # Libera CORS para o frontend local
        │   │   │   └── DataLoader.java              # Carrega os 3 JSONs em memória no startup
        │   │   │
        │   │   ├── controller/
        │   │   │   ├── CalculoController.java       # POST /api/calcular
        │   │   │   ├── BenchmarkController.java     # GET /api/benchmark/{setor}/{porte}
        │   │   │   ├── EmpresaController.java       # GET /api/empresas e /historico
        │   │   │   └── PremissasController.java     # GET /api/premissas
        │   │   │
        │   │   ├── service/
        │   │   │   ├── CalculoService.java          # Lógica de cálculo de emissões
        │   │   │   ├── BenchmarkService.java        # Consultas e percentis de benchmark
        │   │   │   └── EmpresaService.java          # Listagem e busca de empresas
        │   │   │
        │   │   └── model/
        │   │       ├── CalculoRequest.java          # DTO de entrada (com validações)
        │   │       ├── CalculoResponse.java         # DTO de saída com métricas
        │   │       ├── Equivalencias.java           # Árvores, carros, PVC evitado
        │   │       ├── Premissas.java               # Estrutura das premissas
        │   │       ├── BenchmarkData.java           # Resposta simplificada de benchmark
        │   │       ├── BenchmarkJson.java           # Estrutura completa do JSON de benchmark
        │   │       ├── Empresa.java                 # Perfil e histórico da empresa
        │   │       ├── HistoricoMes.java            # Dados mensais de migração
        │   │       └── enums/
        │   │           ├── Setor.java               # VAREJO, SERVICOS, INDUSTRIA, SAUDE, EDUCACAO
        │   │           ├── Porte.java               # PEQUENO, MEDIO, GRANDE, ENTERPRISE
        │   │           ├── ModeloBeneficio.java     # VALE_PAPEL, FISICO_PVC, FISICO_RPVC, MISTO
        │   │           └── TipoBeneficio.java       # VA, VR, MOBILIDADE
        │   │
        │   └── resources/
        │       ├── application.properties           # Configurações da aplicação
        │       └── data/
        │           ├── premissas.json               # Fatores de emissão e metodologia
        │           ├── benchmark.json               # Benchmarks por setor/porte
        │           └── empresas.json                # Empresas de exemplo com histórico
        │
        └── test/
            └── java/com/edenred/ecoflux/
                └── EcofluxApplicationTests.java     # Teste de inicialização do contexto Spring
```

---

## Dados e metodologia

### Arquivos de dados (in-memory)

A aplicação não usa banco de dados. Na inicialização, três arquivos JSON são carregados em memória:

**`premissas.json`** — Parâmetros metodológicos (versão 2.1)
- Fatores de emissão por modelo de benefício (PVC virgem, PVC reciclado, papel, digital)
- Taxas de equivalência ambiental (absorção de árvores, emissão de carros, massa de PVC por cartão)
- Localizações de fábricas consideradas no cálculo
- Fontes de dados: MCTI, IEA, DEFRA, GHG Protocol

**`benchmark.json`** — Benchmarks setoriais
- 5 setores × 4 portes = 20 combinações
- Métricas: média, melhor resultado, p25, p50, p75, p90 (em tCO2e/ano)

**`empresas.json`** — Empresas de exemplo
- Perfis com setor, porte e número de funcionários
- Histórico mensal com funcionários migrados, transações digitais e emissões evitadas

### Lógica de cálculo

O `CalculoService` segue estes passos para calcular emissões evitadas:

1. **Funcionários migrados** = `funcionarios × (percentualMigracao / 100)`
2. **Fator de emissão físico** por modelo:
   - `FISICO_PVC` → 100% do fator consolidado
   - `FISICO_RPVC` → 35% (PVC reciclado tem menor emissão)
   - `VALE_PAPEL` → 110% (papel tem emissão maior)
   - `MISTO` → 70% (impacto médio ponderado)
3. **Fator digital** → ~0,0018 tCO2e/usuário/ano (fixo)
4. **Delta** = `max(0, fator_físico - fator_digital)`
5. **Emissões evitadas** = `funcionários_migrados × delta`
6. **Equivalências:**
   - Árvores = `emissões / taxa_absorção_árvore`
   - Carros = `emissões / emissão_média_carro`
   - PVC economizado = `funcionários_migrados × 0,005 kg`
7. **Benchmark** = comparação com média e percentis do setor/porte informado

### Padrão metodológico

- **Protocolo GHG** — Scope 3 (emissões indiretas da cadeia de valor)
- **Modelo físico** → Cradle-to-Grave (ciclo completo)
- **Modelo digital** → Cradle-to-Gate (produção + entrega)

---

## Arquitetura

```
Requisição HTTP
      ↓
Controllers (4 classes)          ← Validação de entrada, roteamento
      ↓
Services (3 classes)             ← Regras de negócio, cálculos, percentis
      ↓
DataLoader (singleton)           ← Dados em memória carregados no startup
      ↓
Arquivos JSON (3 arquivos)       ← premissas.json, benchmark.json, empresas.json
```

A aplicação **não tem banco de dados, não tem cache externo e não tem mensageria**. É um serviço REST stateless com dados estáticos em memória — simples de rodar, sem dependências externas além do JDK.

---

## Problemas comuns

### `java.lang.UnsupportedClassVersionError`
Você está usando uma versão do Java anterior à 21. Instale o JDK 21 e certifique-se de que `JAVA_HOME` aponta para ele.

```bash
# Verificar versão
java -version

# Verificar JAVA_HOME (Linux/macOS)
echo $JAVA_HOME

# Windows PowerShell
echo $env:JAVA_HOME
```

### Porta 8080 já em uso
Altere a porta em `backend/src/main/resources/application.properties`:

```properties
server.port=9090
```

Ou passe via linha de comando:
```bash
./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=9090
```

### Erro de encoding em caracteres especiais
Garanta que o terminal usa UTF-8. No Windows, execute `chcp 65001` antes de rodar a aplicação.

### `mvnw: Permission denied` (Linux/macOS)
```bash
chmod +x mvnw
./mvnw spring-boot:run
```
