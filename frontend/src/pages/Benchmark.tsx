import { useState } from 'react'
import type { Setor, Porte, CalculoResponse } from '../types'
import { useBenchmark } from '../hooks/useBenchmark'
import { Card } from '../components/ui/Card'
import { SetorSelector } from '../components/benchmark/SetorSelector'
import { BenchmarkChart } from '../components/benchmark/BenchmarkChart'
import { PercentilBadge } from '../components/benchmark/PercentilBadge'

interface BenchmarkProps {
  lastResult?: CalculoResponse | null
  initialSetor?: Setor
  initialPorte?: Porte
  onSetorChange?: (s: Setor) => void
  onPorteChange?: (p: Porte) => void
}

export function Benchmark({
  lastResult,
  initialSetor = 'varejo',
  initialPorte = 'grande',
  onSetorChange,
  onPorteChange,
}: BenchmarkProps) {
  const [setor, setSetor] = useState<Setor>(initialSetor)
  const [porte, setPorte] = useState<Porte>(initialPorte)
  const { benchmark, loading } = useBenchmark(setor, porte)

  const empresaEmissoes = lastResult?.emissoesEvitadas_tCO2e_ano ?? 11.14
  const empresaNome = lastResult?.nomeEmpresa ?? 'Empresa XYZ S.A.'

  const percentis = benchmark?.percentis ?? {}
  let percentil = 50
  if (empresaEmissoes >= (percentis.p90 ?? 0)) percentil = 90
  else if (empresaEmissoes >= (percentis.p75 ?? 0)) percentil = 75
  else if (empresaEmissoes >= (percentis.p50 ?? 0)) percentil = 50
  else percentil = 25

  function handleSetorChange(s: Setor) {
    setSetor(s)
    onSetorChange?.(s)
  }

  function handlePorteChange(p: Porte) {
    setPorte(p)
    onPorteChange?.(p)
  }

  return (
    <div className="p-8 space-y-6">
      {lastResult && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700">
          Comparando <span className="font-semibold">{empresaNome}</span> —{' '}
          <span className="font-semibold">{empresaEmissoes.toFixed(2)} t CO₂e/ano</span> evitadas
        </div>
      )}

      <SetorSelector setor={setor} porte={porte} onSetorChange={handleSetorChange} onPorteChange={handlePorteChange} />

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : benchmark ? (
        <>
          <PercentilBadge
            percentil={percentil}
            setor={setor}
            empresa={empresaEmissoes}
            media={benchmark.mediaEmissoes_tCO2e_ano}
          />

          <Card title={`Comparativo setorial — ${setor}`}>
            <BenchmarkChart
              empresa={empresaEmissoes}
              media={benchmark.mediaEmissoes_tCO2e_ano}
              melhor={benchmark.melhorEmissoes_tCO2e_ano}
              setor={setor}
              nomeEmpresa={empresaNome}
            />
          </Card>

          <Card title="Distribuição por percentil">
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(percentis).map(([key, value]) => (
                <div key={key} className="text-center bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1">{key.toUpperCase()}</p>
                  <p className="text-lg font-bold text-gray-700">{value.toFixed(1)}</p>
                  <p className="text-xs text-gray-400">t CO₂e/ano</p>
                </div>
              ))}
            </div>
          </Card>
        </>
      ) : null}
    </div>
  )
}
