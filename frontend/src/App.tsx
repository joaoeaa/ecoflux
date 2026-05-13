import React, { useState } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { Calculadora } from './pages/Calculadora'
import { Evolucao } from './pages/Evolucao'
import { Benchmark } from './pages/Benchmark'
import { Relatorio } from './pages/Relatorio'
import { Transparencia } from './pages/Transparencia'
import type { CalculoResponse, Setor, Porte } from './types'

type Tab = 'calculadora' | 'evolucao' | 'benchmark' | 'relatorio' | 'transparencia'

function App() {
  const [tab, setTab] = useState<Tab>('calculadora')
  const [lastResult, setLastResult] = useState<CalculoResponse | null>(null)
  const [benchmarkSetor, setBenchmarkSetor] = useState<Setor>('varejo')
  const [benchmarkPorte, setBenchmarkPorte] = useState<Porte>('grande')

  const pages: Record<Tab, React.ReactElement> = {
    calculadora: (
      <Calculadora
        onNavigateRelatorio={() => setTab('relatorio')}
        onResult={(r) => {
          setLastResult(r)
          if (r.setor as Setor) setBenchmarkSetor(r.setor as Setor)
        }}
      />
    ),
    evolucao: <Evolucao />,
    benchmark: (
      <Benchmark
        lastResult={lastResult}
        initialSetor={benchmarkSetor}
        initialPorte={benchmarkPorte}
        onSetorChange={setBenchmarkSetor}
        onPorteChange={setBenchmarkPorte}
      />
    ),
    relatorio: <Relatorio />,
    transparencia: <Transparencia />,
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active={tab} onChange={setTab} />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header tab={tab} />
        <main className="flex-1 overflow-auto">{pages[tab]}</main>
      </div>
    </div>
  )
}

export default App
