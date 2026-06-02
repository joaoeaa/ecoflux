import { useState } from 'react'
import { useEmpresas, useEmpresa } from '../hooks/useEmpresa'
import { MOCK_EMPRESAS } from '../api/mockData'
import type { CalculoResponse } from '../types'
import type { Mode } from '../components/layout/TopNav'
import { formatCO2, formatMes } from '../utils/formatters'

interface RelatorioProps {
  mode: Mode
  lastResult?: CalculoResponse | null
}

const headingStyle: React.CSSProperties = {
  fontFamily: "'Barlow Condensed', system-ui, sans-serif",
  fontWeight: 900,
  textTransform: 'uppercase',
}

const PERIODOS = [
  { value: 3, label: '3 meses' },
  { value: 6, label: '6 meses' },
  { value: 12, label: '12 meses' },
]

export function Relatorio({ mode, lastResult }: RelatorioProps) {
  const { empresas } = useEmpresas()
  const [empresaId, setEmpresaId] = useState<string | null>(null)
  const [periodo, setPeriodo] = useState(12)
  const { historico } = useEmpresa(empresaId)

  const empresa = empresas.find((e) => e.id === empresaId) ?? MOCK_EMPRESAS.find((e) => e.id === empresaId)
  const slice = historico.slice(-periodo)
  const total = slice.reduce((s, m) => s + m.emissoesEvitadas_tCO2e, 0)
  const totalArvores = Math.round(total * 15)
  const totalCarros = Math.round(total * 0.25)
  const totalPvc = Math.round(total * 4)
  const today = new Date()
  const periodStart = new Date(today)
  periodStart.setMonth(periodStart.getMonth() - periodo)

  const formatPeriod = () => {
    const fmt = (d: Date) => d.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })
    return `${fmt(periodStart)} — ${fmt(today)}`
  }

  const nomeEmpresa = empresa?.nome ?? lastResult?.nomeEmpresa ?? 'Empresa XYZ'
  const totalCO2 = total > 0 ? total : (lastResult?.emissoesEvitadas_tCO2e_ano ?? 8.4)

  return (
    <div className="px-8 py-10">
      <h1 className="text-5xl font-black mb-2 text-gray-900" style={headingStyle}>
        Relatórios em PDF
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Visualize e exporte relatórios personalizados para cada contexto
      </p>

      <div className="flex gap-3 mb-8 flex-wrap">
        <select
          value={empresaId ?? ''}
          onChange={(e) => setEmpresaId(e.target.value || null)}
          className="border border-gray-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none min-w-52"
        >
          <option value="">Selecione uma empresa</option>
          {empresas.map((e) => <option key={e.id} value={e.id}>{e.nome}</option>)}
        </select>

        <div className="flex gap-2">
          {PERIODOS.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriodo(p.value)}
              className="px-4 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-all"
              style={
                periodo === p.value
                  ? { background: '#111827', color: '#fff' }
                  : { background: '#fff', color: '#6b7280', border: '1px solid #e5e7eb' }
              }
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-6 items-start">
        <div id="relatorio-pdf" className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6 text-sm">
          <div className="text-center border-b border-gray-100 pb-6">
            <p className="font-black uppercase text-lg text-gray-900" style={headingStyle}>
              Relatório de Impacto Ambiental
            </p>
            <p className="text-xl font-bold text-gray-900 mt-2">{nomeEmpresa}</p>
            <p className="text-sm text-gray-500 mt-1">Período: {formatPeriod()}</p>
          </div>

          <div>
            <p
              className="font-black uppercase text-xs tracking-widest mb-3"
              style={{ color: '#FF1654', fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}
            >
              Resumo Executivo
            </p>
            <div
              className="rounded-2xl p-6 text-center"
              style={{ background: 'rgba(255,22,84,0.06)' }}
            >
              <p className="text-4xl font-black text-gray-900" style={headingStyle}>
                {totalCO2.toFixed(1).replace('.', ',')} Toneladas de CO₂
              </p>
              <p className="text-sm text-gray-600 mt-1">evitadas em {periodo} meses</p>
            </div>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              Sua empresa alcançou uma redução significativa nas emissões de carbono através da
              migração para o cartão digital Edenred. Este impacto positivo contribui para os
              objetivos de sustentabilidade e demonstra comprometimento com práticas
              ambientalmente responsáveis.
            </p>
          </div>

          <div>
            <p
              className="font-black uppercase text-xs tracking-widest mb-4"
              style={{ color: '#FF1654', fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}
            >
              Equivalências Visuais
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { value: totalArvores.toLocaleString('pt-BR'), label: 'árvores' },
                { value: totalCarros.toLocaleString('pt-BR'), label: 'carros' },
                { value: `${totalPvc} kg`, label: 'plástico' },
              ].map(({ value, label }) => (
                <div key={label} className="border border-gray-100 rounded-xl p-4">
                  <p className="text-2xl font-black text-gray-900">{value}</p>
                  <p className="text-xs text-gray-500 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p
              className="font-black uppercase text-xs tracking-widest mb-3"
              style={{ color: '#FF1654', fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}
            >
              Posicionamento
            </p>
            <p className="text-sm text-gray-700">
              Sua empresa está no{' '}
              <strong style={{ color: '#FF1654' }}>
                TOP {lastResult ? Math.max(10, 100 - lastResult.posicaoPercentil) : 35}%
              </strong>{' '}
              do setor, demonstrando liderança em sustentabilidade.
            </p>
          </div>

          {slice.length > 0 && (
            <div>
              <p
                className="font-black uppercase text-xs tracking-widest mb-3"
                style={{ color: '#FF1654', fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}
              >
                Histórico Mensal
              </p>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 text-gray-400 font-medium">Mês</th>
                    <th className="text-right py-2 text-gray-400 font-medium">Funcionários</th>
                    <th className="text-right py-2 text-gray-400 font-medium">Emissões evitadas</th>
                  </tr>
                </thead>
                <tbody>
                  {slice.map((m) => (
                    <tr key={m.mes} className="border-b border-gray-50">
                      <td className="py-2 text-gray-700">{formatMes(m.mes)}</td>
                      <td className="py-2 text-right text-gray-600">{m.funcionariosMigrados.toLocaleString('pt-BR')}</td>
                      <td className="py-2 text-right font-semibold" style={{ color: '#FF1654' }}>{formatCO2(m.emissoesEvitadas_tCO2e)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="border-t border-gray-100 pt-4 text-xs text-gray-400">
            <p>Dados alimentados pela Edenred · Calculadora EcoFlux</p>
            <p>Período: {formatPeriod()}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,22,84,0.1)' }}
              >
                📄
              </div>
              <div>
                <p className="font-black uppercase text-sm" style={headingStyle}>Relatório PDF</p>
                <p className="text-xs text-gray-400">{mode === 'acompanhamento' ? 'Acompanhamento' : 'Apresentação'}</p>
              </div>
            </div>

            {[
              { label: 'Páginas', value: '4' },
              { label: 'Formato', value: 'A4' },
              { label: 'Tamanho', value: '~2.4 MB' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between py-2 border-b border-gray-100 text-sm">
                <span className="text-gray-500">{label}</span>
                <span className="font-semibold text-gray-900">{value}</span>
              </div>
            ))}

            <div className="mt-4">
              <p className="text-xs font-black uppercase mb-2 text-gray-700" style={headingStyle}>Conteúdo</p>
              {[
                'Resumo executivo simplificado',
                'Evolução mensal em gráfico',
                'Equivalências visuais',
                'Metodologia resumida',
              ].map((item) => (
                <div key={item} className="flex gap-2 items-start py-1">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#FF1654' }} />
                  <span className="text-xs text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="w-full py-3.5 rounded-full text-white font-black text-sm flex items-center justify-center gap-2 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #FF1654, #FF6B9D)' }}
          >
            📥 Baixar PDF
          </button>

          <button
            className="w-full py-3.5 rounded-full font-semibold text-sm border-2 cursor-pointer"
            style={{ borderColor: '#FF1654', color: '#FF1654' }}
          >
            Enviar por email
          </button>

          <div
            className="rounded-2xl p-4 text-sm"
            style={{ background: 'rgba(255,22,84,0.05)' }}
          >
            <p className="font-semibold text-gray-700 mb-1">💡 Dica</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Este formato é ideal para incluir no relatório de sustentabilidade da empresa ou apresentações para stakeholders.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
