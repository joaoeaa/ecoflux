import { useState } from 'react'
import type { Periodo } from '../types'
import { useEmpresas, useEmpresa } from '../hooks/useEmpresa'
import { EvolucaoChart } from '../components/evolucao/EvolucaoChart'
import type { Mode } from '../components/layout/TopNav'
import type { CalculoResponse } from '../types'

interface EvolucaoProps {
  mode: Mode
  lastResult?: CalculoResponse | null
}

const headingStyle: React.CSSProperties = {
  fontFamily: "'Barlow Condensed', system-ui, sans-serif",
  fontWeight: 900,
  textTransform: 'uppercase',
}

export function Evolucao({ mode, lastResult }: EvolucaoProps) {
  const { empresas, loading: loadingEmpresas } = useEmpresas()
  const [empresaId, setEmpresaId] = useState<string | null>(null)
  const [periodo, setPeriodo] = useState<Periodo>('12m')
  const { historico, nomeEmpresa, loading } = useEmpresa(empresaId)

  const periodoN = periodo === '3m' ? 3 : periodo === '6m' ? 6 : 12
  const slice = historico.slice(-periodoN)
  const total = slice.reduce((s, m) => s + m.emissoesEvitadas_tCO2e, 0)
  const melhorMes = slice.length > 0 ? slice.reduce((best, m) => m.emissoesEvitadas_tCO2e > best.emissoesEvitadas_tCO2e ? m : best, slice[0]) : null

  if (mode === 'acompanhamento') {
    const empresa = lastResult?.nomeEmpresa ?? nomeEmpresa ?? 'Empresa XYZ'
    const totalCO2 = lastResult ? lastResult.emissoesEvitadas_tCO2e_ano : total
    const arvores = lastResult?.equivalencias.arvoresEquivalentes ?? Math.round(total * 15)
    const carros = lastResult?.equivalencias.carrosRetirados ?? Math.round(total * 0.25)
    const pvc = lastResult?.equivalencias.kgPVCNaoProduzido ?? Math.round(total * 4)

    return (
      <div className="px-8 py-10 max-w-3xl">
        <h1 className="text-4xl font-black mb-2 text-gray-900 text-center" style={headingStyle}>
          Olá, {empresa} 👋
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Desde que você migrou para o digital, sua empresa ajudou a evitar:
        </p>

        <div className="flex justify-center mb-6">
          <div
            className="w-48 h-48 rounded-full flex flex-col items-center justify-center text-white shadow-xl"
            style={{ background: 'linear-gradient(135deg, #FF1654 0%, #FF6B9D 100%)' }}
          >
            <span className="text-4xl font-black leading-none" style={headingStyle}>
              {totalCO2.toFixed(1).replace('.', ',')} T
            </span>
            <span className="text-sm font-semibold opacity-80 mt-1">DE CO₂</span>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mb-8">
          em {historico.length || 11} meses com Edenred
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { emoji: '🌳', label: 'Como plantar', sub: `${arvores.toLocaleString('pt-BR')} ÁRVORES`, detail: 'e esperar um ano' },
            { emoji: '🚗', label: 'Igual a tirar', sub: `${carros} CARROS`, detail: 'da rua' },
            { emoji: '♻️', label: '', sub: `${pvc} KG`, detail: 'de plástico que não existiram' },
          ].map(({ emoji, label, sub, detail }) => (
            <div key={sub} className="bg-white border border-gray-200 rounded-2xl p-5 text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl"
                style={{ background: 'rgba(255,22,84,0.08)' }}
              >
                {emoji}
              </div>
              {label && <p className="text-xs text-gray-500">{label}</p>}
              <p className="text-lg font-black text-gray-900 leading-tight" style={headingStyle}>{sub}</p>
              <p className="text-xs text-gray-500">{detail}</p>
            </div>
          ))}
        </div>

        {empresaId || historico.length > 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black uppercase" style={headingStyle}>Sua Evolução Mês a Mês</h3>
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1"
                style={{ background: 'rgba(255,22,84,0.08)', color: '#FF1654' }}
              >
                ↑ melhorando a cada mês
              </span>
            </div>
            <EvolucaoChart dados={historico} periodo={periodo} />
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black uppercase" style={headingStyle}>Sua Evolução Mês a Mês</h3>
            </div>
            <div className="text-center py-10 text-gray-400 text-sm">
              Selecione uma empresa para ver a evolução
            </div>
          </div>
        )}

        {melhorMes && (
          <div
            className="mt-4 rounded-2xl p-6 flex items-center justify-between text-white"
            style={{ background: 'linear-gradient(135deg, #FF1654 0%, #FF6B9D 100%)' }}
          >
            <div>
              <p className="text-xs opacity-70 uppercase tracking-widest mb-1">Melhor mês até agora</p>
              <p className="text-2xl font-black uppercase" style={headingStyle}>
                {melhorMes.mes.toUpperCase()} · {melhorMes.emissoesEvitadas_tCO2e.toFixed(1).replace('.', ',')} T EVITADAS
              </p>
            </div>
            <span
              className="bg-white text-sm font-black px-5 py-3 rounded-full uppercase"
              style={{ color: '#FF1654', fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}
            >
              RECORDE!
            </span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="px-8 py-10">
      <h1 className="text-5xl font-black uppercase mb-2 text-gray-900" style={headingStyle}>
        Evolução Histórica
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Acompanhe a redução de emissões ao longo do tempo
      </p>

      <div className="flex items-center gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Empresa</label>
          <select
            value={empresaId ?? ''}
            onChange={(e) => setEmpresaId(e.target.value || null)}
            className="border border-gray-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none min-w-52"
          >
            <option value="">Selecione uma empresa</option>
            {loadingEmpresas
              ? <option disabled>Carregando...</option>
              : empresas.map((e) => <option key={e.id} value={e.id}>{e.nome}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Período</label>
          <div className="flex gap-2">
            {(['3m', '6m', '12m'] as Periodo[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriodo(p)}
                className="px-4 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-all"
                style={
                  periodo === p
                    ? { background: '#111827', color: '#fff' }
                    : { background: '#fff', color: '#6b7280', border: '1px solid #e5e7eb' }
                }
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {empresaId && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total acumulado', value: `${total.toFixed(1)} t CO₂e` },
            { label: 'Média mensal', value: `${(total / (slice.length || 1)).toFixed(2)} t` },
            { label: 'Melhor mês', value: melhorMes ? `${melhorMes.emissoesEvitadas_tCO2e.toFixed(2)} t` : '—' },
            { label: 'Período', value: periodo === '3m' ? '3 meses' : periodo === '6m' ? '6 meses' : '12 meses' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">{label}</p>
              <p className="text-lg font-bold text-gray-900">{value}</p>
            </div>
          ))}
        </div>
      )}

      {empresaId && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="font-black uppercase text-lg mb-4 text-gray-900" style={headingStyle}>
            {nomeEmpresa} — Evolução Mensal
          </h3>
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#FF1654', borderTopColor: 'transparent' }} />
            </div>
          ) : historico.length === 0 ? (
            <p className="text-center text-gray-400 py-16 text-sm">Nenhum dado disponível</p>
          ) : (
            <EvolucaoChart dados={historico} periodo={periodo} />
          )}
        </div>
      )}

      {!empresaId && (
        <div className="flex items-center justify-center h-64 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-sm">Selecione uma empresa para visualizar a evolução</p>
        </div>
      )}
    </div>
  )
}
