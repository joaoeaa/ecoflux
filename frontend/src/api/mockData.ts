import type { Empresa, BenchmarkData } from '../types'

export const MOCK_EMPRESAS: Empresa[] = [
  {
    id: 'empresa-001',
    nome: 'Empresa XYZ S.A.',
    setor: 'varejo',
    porte: 'grande',
    funcionarios: 850,
    modeloAtual: 'FISICO_PVC',
    tiposBeneficio: ['VA', 'VR'],
    dataContrato: '2024-01-15',
    historico: [
      { mes: '2024-06', funcionariosMigrados: 700, transacoesDigitais: 38000, emissoesEvitadas_tCO2e: 9.17 },
      { mes: '2024-07', funcionariosMigrados: 720, transacoesDigitais: 39500, emissoesEvitadas_tCO2e: 9.43 },
      { mes: '2024-08', funcionariosMigrados: 740, transacoesDigitais: 41000, emissoesEvitadas_tCO2e: 9.69 },
      { mes: '2024-09', funcionariosMigrados: 760, transacoesDigitais: 41800, emissoesEvitadas_tCO2e: 9.96 },
      { mes: '2024-10', funcionariosMigrados: 780, transacoesDigitais: 42500, emissoesEvitadas_tCO2e: 10.22 },
      { mes: '2024-11', funcionariosMigrados: 790, transacoesDigitais: 43200, emissoesEvitadas_tCO2e: 10.35 },
      { mes: '2024-12', funcionariosMigrados: 800, transacoesDigitais: 44000, emissoesEvitadas_tCO2e: 10.48 },
      { mes: '2025-01', funcionariosMigrados: 805, transacoesDigitais: 44500, emissoesEvitadas_tCO2e: 10.55 },
      { mes: '2025-02', funcionariosMigrados: 810, transacoesDigitais: 44800, emissoesEvitadas_tCO2e: 10.61 },
      { mes: '2025-03', funcionariosMigrados: 825, transacoesDigitais: 45200, emissoesEvitadas_tCO2e: 10.81 },
      { mes: '2025-04', funcionariosMigrados: 840, transacoesDigitais: 45800, emissoesEvitadas_tCO2e: 11.00 },
      { mes: '2025-05', funcionariosMigrados: 850, transacoesDigitais: 46500, emissoesEvitadas_tCO2e: 11.14 },
    ],
  },
  {
    id: 'empresa-002',
    nome: 'Empresa ABC Ltda.',
    setor: 'servicos',
    porte: 'medio',
    funcionarios: 320,
    modeloAtual: 'VALE_PAPEL',
    tiposBeneficio: ['VR'],
    dataContrato: '2024-06-01',
    historico: [
      { mes: '2024-07', funcionariosMigrados: 200, transacoesDigitais: 16000, emissoesEvitadas_tCO2e: 2.62 },
      { mes: '2024-08', funcionariosMigrados: 215, transacoesDigitais: 17200, emissoesEvitadas_tCO2e: 2.82 },
      { mes: '2024-09', funcionariosMigrados: 230, transacoesDigitais: 18400, emissoesEvitadas_tCO2e: 3.01 },
      { mes: '2024-10', funcionariosMigrados: 245, transacoesDigitais: 19600, emissoesEvitadas_tCO2e: 3.21 },
      { mes: '2024-11', funcionariosMigrados: 260, transacoesDigitais: 20800, emissoesEvitadas_tCO2e: 3.41 },
      { mes: '2024-12', funcionariosMigrados: 275, transacoesDigitais: 22000, emissoesEvitadas_tCO2e: 3.60 },
      { mes: '2025-01', funcionariosMigrados: 285, transacoesDigitais: 22800, emissoesEvitadas_tCO2e: 3.73 },
      { mes: '2025-02', funcionariosMigrados: 295, transacoesDigitais: 23600, emissoesEvitadas_tCO2e: 3.86 },
      { mes: '2025-03', funcionariosMigrados: 305, transacoesDigitais: 24400, emissoesEvitadas_tCO2e: 3.99 },
      { mes: '2025-04', funcionariosMigrados: 312, transacoesDigitais: 24960, emissoesEvitadas_tCO2e: 4.09 },
      { mes: '2025-05', funcionariosMigrados: 318, transacoesDigitais: 25440, emissoesEvitadas_tCO2e: 4.17 },
      { mes: '2025-06', funcionariosMigrados: 320, transacoesDigitais: 25600, emissoesEvitadas_tCO2e: 4.19 },
    ],
  },
]

export const MOCK_BENCHMARK: Record<string, BenchmarkData> = {
  varejo: {
    setor: 'varejo',
    porte: 'grande',
    mediaEmissoes_tCO2e_ano: 9.1,
    melhorEmissoes_tCO2e_ano: 18.4,
    percentis: { p25: 5.2, p50: 9.1, p75: 13.8, p90: 17.1 },
  },
  servicos: {
    setor: 'servicos',
    porte: 'medio',
    mediaEmissoes_tCO2e_ano: 4.8,
    melhorEmissoes_tCO2e_ano: 11.2,
    percentis: { p25: 2.8, p50: 4.8, p75: 7.4, p90: 9.9 },
  },
  industria: {
    setor: 'industria',
    porte: 'grande',
    mediaEmissoes_tCO2e_ano: 14.3,
    melhorEmissoes_tCO2e_ano: 31.0,
    percentis: { p25: 8.1, p50: 14.3, p75: 21.5, p90: 28.0 },
  },
  saude: {
    setor: 'saude',
    porte: 'medio',
    mediaEmissoes_tCO2e_ano: 6.2,
    melhorEmissoes_tCO2e_ano: 15.0,
    percentis: { p25: 3.5, p50: 6.2, p75: 9.8, p90: 13.1 },
  },
  educacao: {
    setor: 'educacao',
    porte: 'pequeno',
    mediaEmissoes_tCO2e_ano: 3.9,
    melhorEmissoes_tCO2e_ano: 9.5,
    percentis: { p25: 2.1, p50: 3.9, p75: 6.3, p90: 8.4 },
  },
}

// Calculation performed locally when backend is unavailable
export function calcularLocal(req: {
  nomeEmpresa: string
  funcionarios: number
  modeloAtual: string
  tiposBeneficio: string[]
  percentualMigracao: number
  setor?: string
}) {
  const funcionariosMigrados = Math.round(req.funcionarios * (req.percentualMigracao / 100))

  const fatores: Record<string, number> = {
    VALE_PAPEL: 0.016,
    FISICO_PVC: 0.0149,
    FISICO_RPVC: 0.0149 * 0.35,
    MISTO: (0.0149 + 0.016) / 2,
  }
  const fatorFisico = fatores[req.modeloAtual] ?? 0.0149
  const fatorDigital = 0.0018
  const delta = fatorFisico - fatorDigital

  const emissoesEvitadas_tCO2e_ano = funcionariosMigrados * delta
  const emissoesEvitadas_kgCO2e_ano = emissoesEvitadas_tCO2e_ano * 1000

  const arvoresEquivalentes = Math.round(emissoesEvitadas_kgCO2e_ano / 21.77)
  const carrosRetirados = Math.round(emissoesEvitadas_kgCO2e_ano / 2400)
  const kgPVCNaoProduzido = parseFloat((funcionariosMigrados * 0.005).toFixed(2))

  const setorKey = (req.setor ?? 'varejo') as keyof typeof MOCK_BENCHMARK
  const benchmark = MOCK_BENCHMARK[setorKey] ?? MOCK_BENCHMARK['varejo']
  const mediaSetor = benchmark.mediaEmissoes_tCO2e_ano
  const percentis = benchmark.percentis
  let posicaoPercentil = 50
  if (emissoesEvitadas_tCO2e_ano >= percentis.p90) posicaoPercentil = 90
  else if (emissoesEvitadas_tCO2e_ano >= percentis.p75) posicaoPercentil = 75
  else if (emissoesEvitadas_tCO2e_ano >= percentis.p50) posicaoPercentil = 50
  else posicaoPercentil = 25

  return {
    nomeEmpresa: req.nomeEmpresa,
    funcionariosMigrados,
    emissoesEvitadas_tCO2e_ano: parseFloat(emissoesEvitadas_tCO2e_ano.toFixed(3)),
    emissoesEvitadas_kgCO2e_ano: parseFloat(emissoesEvitadas_kgCO2e_ano.toFixed(1)),
    fatorFisico_tCO2e: fatorFisico,
    fatorDigital_tCO2e: fatorDigital,
    delta_tCO2e: parseFloat(delta.toFixed(4)),
    equivalencias: { arvoresEquivalentes, carrosRetirados, kgPVCNaoProduzido },
    setor: setorKey,
    mediaSetor_tCO2e_ano: mediaSetor,
    posicaoPercentil,
    metodologia: 'GHG Protocol · Escopo 3 · Cradle-to-Gate (digital) / Cradle-to-Grave (físico)',
    versaoMetodologia: '2.1',
    dataCalculo: new Date().toISOString().split('T')[0],
  }
}
