import { useState } from 'react'
import type { Setor, Porte, CalculoResponse } from '../types'
import { useBenchmark } from '../hooks/useBenchmark'
import type { Mode } from '../components/layout/TopNav'

interface BenchmarkProps {
  mode: Mode
  lastResult?: CalculoResponse | null
  initialSetor?: Setor
  initialPorte?: Porte
  onSetorChange?: (s: Setor) => void
  onPorteChange?: (p: Porte) => void
}

const headingStyle: React.CSSProperties = {
  fontFamily: "'Barlow Condensed', system-ui, sans-serif",
  fontWeight: 900,
  textTransform: 'uppercase',
}

const setores: { value: Setor; label: string }[] = [
  { value: 'varejo', label: 'Varejo' },
  { value: 'servicos', label: 'Serviços' },
  { value: 'industria', label: 'Indústria' },
  { value: 'saude', label: 'Saúde' },
  { value: 'educacao', label: 'Educação' },
]

export function Benchmark({
  mode,
  lastResult,
  initialSetor = 'varejo',
  initialPorte = 'grande',
  onSetorChange,
  onPorteChange,
}: BenchmarkProps) {
  const [setor, setSetor] = useState<Setor>(initialSetor)
  const { benchmark, loading } = useBenchmark(setor, initialPorte)

  const empresaEmissoes = lastResult?.emissoesEvitadas_tCO2e_ano ?? 12.7
  const empresaNome = lastResult?.nomeEmpresa ?? 'Grupo Magazine Ltda.'

  const media = benchmark?.mediaEmissoes_tCO2e_ano ?? 9.1
  const melhor = benchmark?.melhorEmissoes_tCO2e_ano ?? 18.2
  const top25 = benchmark?.percentis?.p75 ?? 13.4

  let percentil = 50
  const p = benchmark?.percentis ?? {}
  if (empresaEmissoes >= (p.p90 ?? 0)) percentil = 90
  else if (empresaEmissoes >= (p.p75 ?? 0)) percentil = 75
  else if (empresaEmissoes >= (p.p50 ?? 0)) percentil = 50
  else percentil = 25

  const isAboveMedia = empresaEmissoes > media
  const pctAcima = media > 0 ? Math.round(((empresaEmissoes - media) / media) * 100) : 0

  function handleSetorChange(s: Setor) { setSetor(s); onSetorChange?.(s); onPorteChange?.(initialPorte) }

  if (mode === 'acompanhamento') {
    const topPct = 100 - percentil
    const nextMilestone = melhor * 0.8

    return (
      <div className="px-8 py-10">
        <h1 className="text-5xl font-black mb-8 text-gray-900" style={{ ...headingStyle, lineHeight: 1.05 }}>
          Como você está em relação a empresas como a sua?
        </h1>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <p className="text-sm text-gray-500 mb-2">
              {empresaNome} está no
            </p>
            <p className="text-5xl font-black mb-1" style={{ ...headingStyle, color: '#FF1654' }}>
              TOP {topPct}%
            </p>
            <p className="text-sm text-gray-500 mb-6">
              do setor de {setor.charAt(0).toUpperCase() + setor.slice(1)}<br />
              das empresas do seu porte que usam Edenred
            </p>

            <div className="flex items-center justify-center mb-8">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                  <circle cx="80" cy="80" r="60" fill="none" stroke="#f3f4f6" strokeWidth="12" />
                  <circle
                    cx="80" cy="80" r="60" fill="none" strokeWidth="12"
                    stroke="url(#grad)"
                    strokeDasharray={`${(percentil / 100) * 377} 377`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF1654" />
                      <stop offset="100%" stopColor="#FF6B9D" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-xl font-black" style={{ ...headingStyle, color: '#FF1654' }}>
                    TOP {topPct}%
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <p className="font-black uppercase text-sm mb-2" style={headingStyle}>Próximo Marco</p>
              <p className="text-sm text-gray-700">
                Reduzir mais{' '}
                <strong style={{ color: '#FF1654' }}>
                  {Math.max(0, nextMilestone - empresaEmissoes).toFixed(0)} T
                </strong>
                {' '}para entrar no Top {Math.max(5, topPct - 15)}%
              </p>
              <div
                className="mt-3 rounded-xl px-4 py-3 text-sm"
                style={{ background: 'rgba(255,22,84,0.06)', color: '#FF1654' }}
              >
                💡 <strong>Dica:</strong> Aumentar a adesão dos funcionários ao cartão digital pode te ajudar a chegar lá
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <h3 className="text-lg font-black uppercase mb-6" style={headingStyle}>Comparação Simples</h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Sua empresa</p>
                <div
                  className="h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg"
                  style={{
                    background: 'linear-gradient(90deg, #FF1654, #FF6B9D)',
                    width: `${Math.min(100, (empresaEmissoes / melhor) * 100)}%`,
                    minWidth: '60%',
                  }}
                >
                  {empresaEmissoes.toFixed(1).replace('.', ',')} T CO₂
                </div>
              </div>

              <div className="flex items-center justify-center">
                <span
                  className="text-white text-sm font-bold px-4 py-2 rounded-full"
                  style={{ background: '#FF1654' }}
                >
                  VS
                </span>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Média do setor</p>
                <div
                  className="h-14 rounded-2xl flex items-center justify-center font-black text-lg text-gray-600 bg-gray-200"
                  style={{ width: `${Math.min(100, (media / melhor) * 100)}%`, minWidth: '50%' }}
                >
                  {media.toFixed(1).replace('.', ',')} T CO₂
                </div>
              </div>
            </div>

            {isAboveMedia && (
              <div
                className="mt-6 rounded-2xl p-5 text-white"
                style={{ background: 'linear-gradient(135deg, #FF1654 0%, #FF6B9D 100%)' }}
              >
                <p className="font-black uppercase text-lg mb-1" style={headingStyle}>
                  🎉 Você está acima da média!
                </p>
                <p className="text-sm opacity-90">
                  Sua empresa evita <strong>{pctAcima}% MAIS CO₂</strong> que a média do setor
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-8 py-10">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-5xl font-black text-gray-900" style={{ ...headingStyle, lineHeight: 1.05 }}>
            Posicionamento do Cliente no Setor
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Empresas de {setor.charAt(0).toUpperCase() + setor.slice(1)} · Porte 500–2.000 func. · Base Edenred 2025
          </p>
        </div>

        <div className="flex gap-2">
          {setores.map((s) => (
            <button
              key={s.value}
              onClick={() => handleSetorChange(s.value)}
              className="px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all"
              style={
                setor === s.value
                  ? { background: '#111827', color: '#fff' }
                  : { background: '#fff', color: '#6b7280', border: '1px solid #e5e7eb' }
              }
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#FF1654', borderTopColor: 'transparent' }} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <span
                className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-4"
                style={{ background: 'rgba(255,22,84,0.1)', color: '#FF1654' }}
              >
                {empresaNome}
              </span>
              <p className="text-sm text-gray-500 mb-1">Com a migração digital:</p>
              <p className="text-5xl font-black leading-none" style={{ ...headingStyle, color: '#FF1654' }}>
                −{empresaEmissoes.toFixed(1).replace('.', ',')} T CO₂e/
                <br />ANO
              </p>
              <p className="font-black uppercase text-lg mt-3" style={{ ...headingStyle, color: '#FF1654' }}>
                TOP {100 - percentil}%
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Colocaria sua empresa no<br />topo do setor
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h3 className="font-black uppercase text-lg mb-6" style={headingStyle}>Comparativo Setorial</h3>

              <div className="space-y-4">
                {[
                  { label: 'Média do setor', value: media, color: '#d1d5db', textColor: '#6b7280', isEmpresa: false },
                  { label: 'Top 25% do setor', value: top25, color: '#d1d5db', textColor: '#6b7280', isEmpresa: false },
                  { label: 'EMPRESA COM EDENRED', value: empresaEmissoes, color: '', textColor: '#FF1654', isEmpresa: true },
                  { label: 'Melhor do setor', value: melhor, color: '#111827', textColor: '#111827', isEmpresa: false },
                ].map(({ label, value, color, textColor, isEmpresa }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium" style={{ color: isEmpresa ? '#FF1654' : '#6b7280', fontSize: isEmpresa ? '11px' : undefined, textTransform: isEmpresa ? 'uppercase' : undefined, letterSpacing: isEmpresa ? '0.05em' : undefined }}>
                        {label}
                      </span>
                      <span className="font-black text-xs" style={{ color: textColor }}>
                        {value.toFixed(1).replace('.', ',')} T EVITADAS
                      </span>
                    </div>
                    <div
                      className="h-10 rounded-2xl flex items-center justify-end pr-3"
                      style={{
                        width: `${Math.min(100, (value / melhor) * 100)}%`,
                        background: isEmpresa ? 'linear-gradient(90deg, #FF1654, #FF6B9D)' : color,
                        minWidth: '20%',
                      }}
                    >
                      {isEmpresa && (
                        <div
                          className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
                          style={{ background: '#FF1654' }}
                        >
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="mt-6 rounded-2xl p-6 border"
            style={{ background: '#FFFBF5', borderColor: '#FED7AA' }}
          >
            <h3 className="font-black uppercase text-lg mb-4 text-gray-900" style={headingStyle}>
              Conformidade Regulatória
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { title: 'CSRD/ESRS (Escopo 3)', desc: 'Exige que empresas europeias e multinacionais reportem emissões de fornecedores' },
                { title: 'Relatório Anual de Sustentabilidade', desc: 'Dado pronto para publicação' },
              ].map(({ title, desc }) => (
                <div key={title} className="flex gap-2">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#FF1654' }} />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: 'rgba(255,22,84,0.08)' }}
            >
              <span
                className="text-xs font-black uppercase px-3 py-1 rounded-full text-white"
                style={{ background: '#FF1654' }}
              >
                ATENÇÃO
              </span>
              <p className="text-sm text-gray-700">
                Regulamentação SSBR brasileira prevista para 2026–2027
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
