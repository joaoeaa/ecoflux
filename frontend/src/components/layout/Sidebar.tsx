import { Leaf, BarChart2, TrendingUp, FileText, BookOpen } from 'lucide-react'

type Tab = 'calculadora' | 'evolucao' | 'benchmark' | 'relatorio' | 'transparencia'

interface SidebarProps {
  active: Tab
  onChange: (tab: Tab) => void
}

const items: { id: Tab; label: string; Icon: typeof Leaf }[] = [
  { id: 'calculadora', label: 'Calculadora', Icon: Leaf },
  { id: 'evolucao', label: 'Evolução', Icon: TrendingUp },
  { id: 'benchmark', label: 'Benchmark', Icon: BarChart2 },
  { id: 'relatorio', label: 'Relatório', Icon: FileText },
  { id: 'transparencia', label: 'Metodologia', Icon: BookOpen },
]

export function Sidebar({ active, onChange }: SidebarProps) {
  return (
    <aside className="w-56 bg-white border-r border-green-100 flex flex-col min-h-screen">
      <div className="p-5 border-b border-green-100">
        <div className="flex items-center gap-2">
          <Leaf className="text-green-600" size={22} />
          <span className="font-bold text-green-800 text-lg tracking-tight">EcoFlux</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">Edenred · GHG Tracker</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {items.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer text-left ${
              active === id
                ? 'bg-green-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-green-100">
        <p className="text-xs text-gray-400 text-center">v2.1 · SR2 EcoFlux</p>
      </div>
    </aside>
  )
}
