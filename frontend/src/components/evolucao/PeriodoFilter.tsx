import type { Periodo } from '../../types'

interface PeriodoFilterProps {
  selected: Periodo
  onChange: (p: Periodo) => void
}

const opcoes: Periodo[] = ['3m', '6m', '12m']
const labels: Record<Periodo, string> = { '3m': '3 meses', '6m': '6 meses', '12m': '12 meses' }

export function PeriodoFilter({ selected, onChange }: PeriodoFilterProps) {
  return (
    <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
      {opcoes.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
            selected === p ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {labels[p]}
        </button>
      ))}
    </div>
  )
}
