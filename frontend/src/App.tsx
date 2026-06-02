import React, { useState } from 'react'
import { TopNav } from './components/layout/TopNav'
import type { Mode } from './components/layout/TopNav'
import { Calculadora } from './pages/Calculadora'
import { Evolucao } from './pages/Evolucao'
import { Benchmark } from './pages/Benchmark'
import { Relatorio } from './pages/Relatorio'
import type { CalculoResponse, Setor, Porte } from './types'

type Tab = 'calculadora' | 'evolucao' | 'benchmark' | 'relatorio'

function App() {
  const [tab, setTab] = useState<Tab>('calculadora')
  const [mode, setMode] = useState<Mode>('apresentacao')
  const [lastResult, setLastResult] = useState<CalculoResponse | null>(null)
  const [benchmarkSetor, setBenchmarkSetor] = useState<Setor>('varejo')
  const [benchmarkPorte, setBenchmarkPorte] = useState<Porte>('grande')

  const pages: Record<Tab, React.ReactElement> = {
    calculadora: (
      <Calculadora
        mode={mode}
        lastResult={lastResult}
        onNavigateRelatorio={() => setTab('relatorio')}
        onResult={(r) => {
          setLastResult(r)
          if (r.setor as Setor) setBenchmarkSetor(r.setor as Setor)
        }}
      />
    ),
    evolucao: <Evolucao mode={mode} lastResult={lastResult} />,
    benchmark: (
      <Benchmark
        mode={mode}
        lastResult={lastResult}
        initialSetor={benchmarkSetor}
        initialPorte={benchmarkPorte}
        onSetorChange={setBenchmarkSetor}
        onPorteChange={setBenchmarkPorte}
      />
    ),
    relatorio: <Relatorio mode={mode} lastResult={lastResult} />,
  }

  return (
    <div className="min-h-screen bg-white">
      <TopNav tab={tab} mode={mode} onTabChange={setTab} onModeChange={setMode} />
      <main>{pages[tab]}</main>
    </div>
  )
}

export default App
