export type ModeloBeneficio = 'VALE_PAPEL' | 'FISICO_PVC' | 'FISICO_RPVC' | 'MISTO'
export type TipoBeneficio = 'VA' | 'VR' | 'MOBILIDADE'
export type Setor = 'varejo' | 'servicos' | 'industria' | 'saude' | 'educacao'
export type Porte = 'pequeno' | 'medio' | 'grande' | 'enterprise'
export type Periodo = '3m' | '6m' | '12m'
export type Tendencia = 'up' | 'down' | 'stable'

export interface CalculoRequest {
  nomeEmpresa: string
  funcionarios: number
  modeloAtual: ModeloBeneficio
  tiposBeneficio: TipoBeneficio[]
  percentualMigracao: number
  setor?: Setor
}

export interface Equivalencias {
  arvoresEquivalentes: number
  carrosRetirados: number
  kgPVCNaoProduzido: number
}

export interface CalculoResponse {
  nomeEmpresa: string
  funcionariosMigrados: number
  emissoesEvitadas_tCO2e_ano: number
  emissoesEvitadas_kgCO2e_ano: number
  fatorFisico_tCO2e: number
  fatorDigital_tCO2e: number
  delta_tCO2e: number
  equivalencias: Equivalencias
  setor: string
  mediaSetor_tCO2e_ano: number
  posicaoPercentil: number
  metodologia: string
  versaoMetodologia: string
  dataCalculo: string
}

export interface HistoricoMes {
  mes: string
  funcionariosMigrados: number
  transacoesDigitais: number
  emissoesEvitadas_tCO2e: number
}

export interface Empresa {
  id: string
  nome: string
  setor: Setor
  porte: Porte
  funcionarios: number
  modeloAtual: ModeloBeneficio
  tiposBeneficio: TipoBeneficio[]
  dataContrato: string
  historico: HistoricoMes[]
}

export interface BenchmarkData {
  setor: string
  porte: string
  mediaEmissoes_tCO2e_ano: number
  melhorEmissoes_tCO2e_ano: number
  percentis: Record<string, number>
}

export interface KpiData {
  totalAcumulado: number
  mediasMensal: number
  melhorMes: number
  tendencia: Tendencia
}
