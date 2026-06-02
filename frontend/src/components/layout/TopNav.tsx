type Tab = 'calculadora' | 'evolucao' | 'benchmark' | 'relatorio'
export type Mode = 'apresentacao' | 'acompanhamento'

const tabs: { id: Tab; label: string }[] = [
  { id: 'calculadora', label: 'Calculadora' },
  { id: 'evolucao', label: 'Evolução' },
  { id: 'benchmark', label: 'Benchmark' },
  { id: 'relatorio', label: 'Relatório' },
]

interface TopNavProps {
  tab: Tab
  mode: Mode
  onTabChange: (tab: Tab) => void
  onModeChange: (mode: Mode) => void
}

export function TopNav({ tab, mode, onTabChange, onModeChange }: TopNavProps) {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-8 py-4 flex items-center justify-between">
        <div>
          <div
            className="font-black text-xl tracking-tight text-gray-900 leading-none"
            style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif", fontWeight: 900 }}
          >
            EDENRED
          </div>
          <div className="text-xs text-gray-400 mt-0.5">EcoFlux · ESG Tool</div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onModeChange('apresentacao')}
            className="px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer"
            style={
              mode === 'apresentacao'
                ? { background: 'linear-gradient(135deg, #FF1654 0%, #FF6B9D 100%)', color: '#fff' }
                : { background: '#fff', color: '#555', border: '1px solid #e5e7eb' }
            }
          >
            Apresentação
          </button>
          <button
            onClick={() => onModeChange('acompanhamento')}
            className="px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer"
            style={
              mode === 'acompanhamento'
                ? { background: 'linear-gradient(135deg, #FF1654 0%, #FF6B9D 100%)', color: '#fff' }
                : { background: '#fff', color: '#555', border: '1px solid #e5e7eb' }
            }
          >
            Acompanhamento
          </button>
        </div>
      </div>

      <div className="px-8 pb-3 flex gap-2">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className="px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer"
            style={
              tab === id
                ? { background: '#111827', color: '#fff' }
                : { background: '#fff', color: '#6b7280', border: '1px solid #e5e7eb' }
            }
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  )
}
