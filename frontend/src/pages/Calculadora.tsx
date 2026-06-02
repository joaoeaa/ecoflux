import { useEffect } from 'react'
import { useCalculo } from '../hooks/useCalculo'
import { InputPanel } from '../components/calculadora/InputPanel'
import { ResultCard } from '../components/calculadora/ResultCard'
import type { CalculoResponse } from '../types'
import type { Mode } from '../components/layout/TopNav'

interface CalculadoraProps {
  mode: Mode
  lastResult?: CalculoResponse | null
  onNavigateRelatorio?: () => void
  onResult?: (r: CalculoResponse) => void
}

export function Calculadora({ mode, lastResult, onNavigateRelatorio, onResult }: CalculadoraProps) {
  const { resultado, loading, error, executar } = useCalculo()

  useEffect(() => {
    if (resultado) onResult?.(resultado)
  }, [resultado])

  if (mode === 'acompanhamento') {
    const data = lastResult
    return (
      <div className="px-8 py-10 max-w-3xl">
        <h1
          className="heading-display text-5xl text-gray-900 mb-8"
          style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif", fontWeight: 900, textTransform: 'uppercase' }}
        >
          O que sua empresa está evitando
        </h1>

        {data ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: '#FF1654' }} />
              <div>
                <p className="font-semibold text-gray-900">{data.nomeEmpresa}</p>
                <p className="text-sm text-gray-500">
                  {data.funcionariosMigrados.toLocaleString('pt-BR')} funcionários · Migração 100% digital
                </p>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-sm text-gray-500 mb-1">Projeção anual</p>
              <p
                className="text-6xl font-black leading-none"
                style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif", fontWeight: 900, textTransform: 'uppercase' }}
              >
                ~{data.emissoesEvitadas_tCO2e_ano.toFixed(0)} T CO₂ EVITADAS
              </p>
            </div>

            <p className="text-sm text-gray-400">
              (baseado nos seus dados reais dos últimos 6 meses)
            </p>

            {onNavigateRelatorio && (
              <p className="text-sm text-gray-700 pt-2">
                Quer ver o detalhamento completo?{' '}
                <button
                  onClick={onNavigateRelatorio}
                  className="font-bold underline cursor-pointer"
                  style={{ color: '#FF1654' }}
                >
                  Acesse a aba Relatório
                </button>
              </p>
            )}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <p className="text-gray-400 text-sm">
              Nenhum cenário calculado ainda. Acesse o modo <strong>Apresentação</strong> para configurar um cenário.
            </p>
          </div>
        )}

        <p className="text-sm text-gray-400 mt-6">
          Para alterar dados ou simular cenários, entre em contato com seu consultor Edenred
        </p>
      </div>
    )
  }

  return (
    <div className="px-8 py-10">
      <h1
        className="text-5xl font-black uppercase mb-2 text-gray-900"
        style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif", lineHeight: 1.05 }}
      >
        Configurar Cenário do Cliente
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Insira os dados do prospect para gerar o impacto projetado
      </p>

      <div className="grid grid-cols-2 gap-8 items-start">
        <div>
          <InputPanel onSubmit={executar} loading={loading} />
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>

        <div>
          <ResultCard resultado={resultado} loading={loading} />

          {resultado && (
            <div className="mt-4 flex gap-3">
              <button
                onClick={onNavigateRelatorio}
                className="flex-1 py-3 rounded-full text-sm font-semibold text-white flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #FF1654, #FF6B9D)' }}
              >
                📥 Exportar relatório PDF
              </button>
              <button
                className="flex-1 py-3 rounded-full text-sm font-semibold border-2 cursor-pointer"
                style={{ borderColor: '#FF1654', color: '#FF1654' }}
              >
                Salvar cenário
              </button>
            </div>
          )}

          {resultado && (
            <div className="mt-4">
              <button className="w-full flex items-center justify-between text-sm font-medium text-gray-600 border border-gray-200 rounded-2xl px-4 py-3 cursor-pointer hover:bg-gray-50">
                <span>Ver detalhamento metodológico</span>
                <span>▾</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
