# Ecoflux

Plataforma fullstack para cálculo e rastreamento da redução de emissões de carbono (CO2 equivalente) resultante da digitalização de programas de benefícios corporativos — migrando de cartões físicos (PVC, papel) para soluções digitais.

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
- **Histórico mensal** de migração e emissões evitadas
- **Relatório exportável** em PDF com todos os dados
- **Metodologia** e premissas utilizadas no cálculo

O backend é **100% in-memory** — nenhum banco de dados externo é necessário. Todos os dados de referência (premissas, benchmarks, empresas de exemplo) são carregados de arquivos JSON na inicialização.

---

## Tecnologias

### Backend

| Tecnologia | Versão | Função |
|---|---|---|
| Java | 21 (LTS) | Linguagem principal |
| Spring Boot | 3.5.x | Framework da aplicação |
| Spring Web (MVC) | (incluso) | Camada REST/HTTP |
| Spring Validation | (incluso) | Validação de entrada via anotações |
| Lombok | (latest) | Redução de boilerplate |
| Jackson | (incluso) | Serialização/desserialização JSON |
| Jackson JSR310 | (incluso) | Suporte a `LocalDate` / `LocalDateTime` |
| Maven | 3.9.x (wrapper) | Gerenciamento de dependências e build |
| JUnit 5 | (incluso) | Testes unitários e de integração |

### Frontend

| Tecnologia | Versão | Função |
|---|---|---|
| React | 19 | Framework de UI |
| TypeScript | 6 | Tipagem estática |
| Vite | 8 | Bundler e servidor de desenvolvimento |
| Tailwind CSS | 4 | Estilização utilitária |
| Recharts | 3 | Gráficos de linha e barras |
| jsPDF | 4 | Exportação de relatórios em PDF |
| Lucide React | (latest) | Ícones |

---

## Pré-requisitos

### Backend

**Java Development Kit (JDK) 21**

```bash
java -version
# deve exibir openjdk 21 ou java version "21"
```

Caso não tenha, baixe em [Adoptium (Eclipse Temurin)](https://adoptium.net/temurin/releases/?version=21).

O Maven Wrapper já está incluso (`mvnw` / `mvnw.cmd`), então **não é necessário instalar o Maven globalmente**.

### Frontend

**Node.js 18+** e **npm**

```bash
node -v
npm -v
```

---

## Como rodar o projeto

### Backend

**1. Entrar no diretório do backend:**
```bash
cd backend
```

**2. Executar a aplicação:**

Linux / macOS:
```bash
./mvnw spring-boot:run
```

Windows (PowerShell ou CMD):
```bat
mvnw.cmd spring-boot:run
```

A API estará disponível em **http://localhost:8080**.

**3. Verificar que subiu corretamente:**

Quando pronto, o terminal exibirá:
```
Started EcofluxApplication in 2.341 seconds (process running for 2.6)
```

**4. Testar um endpoint rápido:**
```bash
curl http://localhost:8080/api/premissas
```

---

### Frontend

**1. Entrar no diretório do frontend:**
```bash
cd frontend
```

**2. Instalar as dependências:**
```bash
npm install
```

**3. Iniciar o servidor de desenvolvimento:**
```bash
npm run dev
```

O frontend estará disponível em **http://localhost:5173**.

> O backend deve estar rodando antes de usar o frontend, pois ele consome a API em `http://localhost:8080`.

---

### Build de produção (frontend)

```bash
cd frontend
npm run build
```

Os arquivos estáticos serão gerados em `frontend/dist/`.

---

### Executar via JAR (backend)

Linux / macOS:
```bash
./mvnw clean package -DskipTests
java -jar target/ecoflux-0.0.1-SNAPSHOT.jar
```

Windows:
```bat
mvnw.cmd clean package -DskipTests
java -jar target\ecoflux-0.0.1-SNAPSHOT.jar
```

---

### Executar os testes (backend)

Linux / macOS:
```bash
./mvnw test
```

Windows:
```bat
mvnw.cmd test
```

---

## Configuração

### Backend

Arquivo de configuração: `backend/src/main/resources/application.properties`

| Propriedade | Valor padrão | Descrição |
|---|---|---|
| `server.port` | `8080` | Porta em que a API sobe |
| `spring.application.name` | `ecoflux` | Nome da aplicação no Spring |
| `spring.jackson.serialization.write-dates-as-timestamps` | `false` | Datas em formato ISO 8601 |
| `server.servlet.encoding.charset` | `UTF-8` | Encoding padrão das respostas |

### CORS

A API está configurada para aceitar requisições do frontend local na porta **5173** (servidor de desenvolvimento Vite):

```
http://localhost:5173
```

Para alterar a origem permitida, edite `backend/src/main/java/com/edenred/ecoflux/config/CorsConfig.java`.

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
├── frontend/                          # Aplicação React + TypeScript + Vite
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── src/
│       ├── App.tsx                    # Roteamento entre abas e estado global
│       ├── main.tsx                   # Ponto de entrada React
│       ├── index.css                  # Estilos globais + tokens Tailwind
│       │
│       ├── api/
│       │   ├── ecofluxApi.ts          # Chamadas HTTP para o backend
│       │   └── mockData.ts            # Dados mock para modo apresentação
│       │
│       ├── hooks/
│       │   ├── useCalculo.ts          # Hook para POST /api/calcular
│       │   ├── useBenchmark.ts        # Hook para GET /api/benchmark
│       │   └── useEmpresa.ts          # Hook para GET /api/empresas
│       │
│       ├── pages/
│       │   ├── Calculadora.tsx        # Aba de cálculo de emissões evitadas
│       │   ├── Evolucao.tsx           # Aba de histórico mensal com gráfico
│       │   ├── Benchmark.tsx          # Aba de comparativo setorial
│       │   ├── Relatorio.tsx          # Aba de relatório exportável em PDF
│       │   └── Transparencia.tsx      # Aba de metodologia e rastreabilidade
│       │
│       ├── components/
│       │   ├── layout/
│       │   │   ├── TopNav.tsx         # Navegação entre abas + toggle de modo
│       │   │   ├── Header.tsx         # Cabeçalho da aplicação
│       │   │   └── Sidebar.tsx        # Barra lateral
│       │   ├── ui/
│       │   │   ├── Button.tsx         # Componente de botão base
│       │   │   ├── Card.tsx           # Container de conteúdo
│       │   │   └── Badge.tsx          # Etiqueta de status/categoria
│       │   ├── calculadora/
│       │   │   ├── InputPanel.tsx     # Formulário de entrada de dados
│       │   │   ├── ResultCard.tsx     # Exibição dos resultados do cálculo
│       │   │   ├── EquivalenciasGrid.tsx  # Grid de equivalências ambientais
│       │   │   └── MetodologiaBadge.tsx   # Indicador de metodologia GHG
│       │   ├── evolucao/
│       │   │   ├── EvolucaoChart.tsx  # Gráfico de linha mensal (Recharts)
│       │   │   ├── KpiStrip.tsx       # Faixa de KPIs do período
│       │   │   └── PeriodoFilter.tsx  # Filtro de período (3/6/12 meses)
│       │   ├── benchmark/
│       │   │   ├── BenchmarkChart.tsx # Gráfico de barras comparativo
│       │   │   ├── PercentilBadge.tsx # Exibição do percentil da empresa
│       │   │   └── SetorSelector.tsx  # Seletor de setor/porte
│       │   ├── relatorio/
│       │   │   ├── RelatorioPreview.tsx   # Preview do relatório antes do export
│       │   │   └── ExportButton.tsx       # Botão de download em PDF (jsPDF)
│       │   └── transparencia/
│       │       ├── FabricasPanel.tsx  # Localização das fábricas consideradas
│       │       ├── FontesTable.tsx    # Tabela de fontes de dados (MCTI, IEA, DEFRA)
│       │       └── FronteirasPanel.tsx    # Fronteiras do sistema (Scope 3)
│       │
│       ├── types/
│       │   └── index.ts               # Interfaces e tipos TypeScript
│       └── utils/
│           └── formatters.ts          # Formatação de números, datas e unidades
│
└── backend/
    ├── pom.xml                        # Configuração Maven (dependências, Java 21)
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
                    ┌─────────────────────────────┐
                    │        Frontend (React)       │
                    │  http://localhost:5173        │
                    │                               │
                    │  Calculadora │ Evolução        │
                    │  Benchmark   │ Relatório       │
                    │  Transparência                 │
                    └──────────────┬────────────────┘
                                   │ HTTP (JSON)
                                   ▼
                    ┌─────────────────────────────┐
                    │        Backend (Spring Boot)  │
                    │  http://localhost:8080        │
                    │                               │
                    │  Controllers (4 classes)      │
                    │        ↓                      │
                    │  Services (3 classes)         │
                    │        ↓                      │
                    │  DataLoader (in-memory)       │
                    │        ↓                      │
                    │  JSONs (premissas, benchmark, │
                    │         empresas)             │
                    └─────────────────────────────┘
```

O backend é um serviço REST stateless sem banco de dados, cache externo ou mensageria — simples de rodar, sem dependências externas além do JDK.

---

## Problemas comuns

### `java.lang.UnsupportedClassVersionError`
Você está usando uma versão do Java anterior à 21. Instale o JDK 21 e certifique-se de que `JAVA_HOME` aponta para ele.

```bash
java -version
echo $JAVA_HOME          # Linux/macOS
echo $env:JAVA_HOME      # Windows PowerShell
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

### Porta 5173 já em uso
Altere a porta no `frontend/vite.config.ts`:

```ts
export default defineConfig({
  server: { port: 5174 }
})
```

### Erro de encoding em caracteres especiais
Garanta que o terminal usa UTF-8. No Windows, execute `chcp 65001` antes de rodar a aplicação.

### `mvnw: Permission denied` (Linux/macOS)
```bash
chmod +x mvnw
./mvnw spring-boot:run
```

### `npm install` falha
Verifique a versão do Node.js:
```bash
node -v   # deve ser 18 ou superior
```
