import { useState } from 'react'
import type { Periodo, KpiData, Tendencia } from '../types'
import { useEmpresas, useEmpresa } from '../hooks/useEmpresa'
import { Card } from '../components/ui/Card'
import { KpiStrip } from '../components/evolucao/KpiStrip'
import { PeriodoFilter } from '../components/evolucao/PeriodoFilter'
import { EvolucaoChart } from '../components/evolucao/EvolucaoChart'

export function Evolucao() {
  const { empresas, loading: loadingEmpresas } = useEmpresas()
  const [empresaId, setEmpresaId] = useState<string | null>(null)
  const [periodo, setPeriodo] = useState<Periodo>('12m')
  const { historico, nomeEmpresa, loading } = useEmpresa(empresaId)

  const periodoN = periodo === '3m' ? 3 : periodo === '6m' ? 6 : 12
  const slice = historico.slice(-periodoN)

  const total = slice.reduce((s, m) => s + m.emissoesEvitadas_tCO2e, 0)
  const media = slice.length > 0 ? total / slice.length : 0
  const melhor = slice.length > 0 ? Math.max(...slice.map((m) => m.emissoesEvitadas_tCO2e)) : 0

  let tendencia: Tendencia = 'stable'
  if (slice.length >= 2) {
    const last = slice[slice.length - 1].emissoesEvitadas_tCO2e
    const prev = slice[slice.length - 2].emissoesEvitadas_tCO2e
    tendencia = last > prev ? 'up' : last < prev ? 'down' : 'stable'
  }

  const kpi: KpiData = { totalAcumulado: total, mediasMensal: media, melhorMes: melhor, tendencia }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Empresa</label>
          <select
            value={empresaId ?? ''}
            onChange={(e) => setEmpresaId(e.target.value || null)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 min-w-52"
          >
            <option value="">Selecione uma empresa</option>
            {loadingEmpresas
              ? <option disabled>Carregando...</option>
              : empresas.map((e) => <option key={e.id} value={e.id}>{e.nome}</option>)}
          </select>
        </div>
        <div className="mt-5">
          <PeriodoFilter selected={periodo} onChange={setPeriodo} />
        </div>
      </div>

      {empresaId && (
        <>
          <KpiStrip {...kpi} />

          <Card title={`Evolução mensal — ${nomeEmpresa}`}>
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : historico.length === 0 ? (
              <p className="text-center text-gray-400 py-16 text-sm">Nenhum dado disponível para esta empresa</p>
            ) : (
              <EvolucaoChart dados={historico} periodo={periodo} />
            )}
          </Card>
        </>
      )}

      {!empresaId && (
        <div className="flex items-center justify-center h-64 text-gray-400">
          <p className="text-sm">Selecione uma empresa para visualizar a evolução</p>
        </div>
      )}
    </div>
  )
}
