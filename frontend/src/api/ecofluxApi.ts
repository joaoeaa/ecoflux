import type {
  CalculoRequest,
  CalculoResponse,
  Empresa,
  HistoricoMes,
  BenchmarkData,
  Setor,
  Porte,
} from '../types'

const BASE_URL = '/api'

export async function calcular(req: CalculoRequest): Promise<CalculoResponse> {
  const res = await fetch(`${BASE_URL}/calcular`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })
  if (!res.ok) throw new Error(`Erro no cálculo: ${res.status}`)
  return res.json()
}

export async function getEmpresas(): Promise<Empresa[]> {
  const res = await fetch(`${BASE_URL}/empresas`)
  if (!res.ok) throw new Error(`Erro ao buscar empresas: ${res.status}`)
  return res.json()
}

export async function getHistorico(
  empresaId: string
): Promise<{ empresaId: string; nomeEmpresa: string; historico: HistoricoMes[] }> {
  const res = await fetch(`${BASE_URL}/empresas/${empresaId}/historico`)
  if (!res.ok) throw new Error(`Erro ao buscar histórico: ${res.status}`)
  return res.json()
}

export async function getBenchmark(
  setor: Setor,
  porte: Porte
): Promise<BenchmarkData> {
  const res = await fetch(`${BASE_URL}/benchmark/${setor}/${porte}`)
  if (!res.ok) throw new Error(`Erro ao buscar benchmark: ${res.status}`)
  return res.json()
}

export async function getPremissas(): Promise<unknown> {
  const res = await fetch(`${BASE_URL}/premissas`)
  if (!res.ok) throw new Error(`Erro ao buscar premissas: ${res.status}`)
  return res.json()
}
