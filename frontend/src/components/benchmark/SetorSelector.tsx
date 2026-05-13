import type { Setor, Porte } from '../../types'

interface SetorSelectorProps {
  setor: Setor
  porte: Porte
  onSetorChange: (s: Setor) => void
  onPorteChange: (p: Porte) => void
}

const setores: { value: Setor; label: string }[] = [
  { value: 'varejo', label: 'Varejo' },
  { value: 'servicos', label: 'Serviços' },
  { value: 'industria', label: 'Indústria' },
  { value: 'saude', label: 'Saúde' },
  { value: 'educacao', label: 'Educação' },
]

const portes: { value: Porte; label: string }[] = [
  { value: 'pequeno', label: 'Até 100' },
  { value: 'medio', label: '100–500' },
  { value: 'grande', label: '500–2000' },
  { value: 'enterprise', label: '2000+' },
]

export function SetorSelector({ setor, porte, onSetorChange, onPorteChange }: SetorSelectorProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Setor</label>
        <div className="flex gap-2">
          {setores.map((s) => (
            <button
              key={s.value}
              onClick={() => onSetorChange(s.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                setor === s.value
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Porte (funcionários)</label>
        <div className="flex gap-2">
          {portes.map((p) => (
            <button
              key={p.value}
              onClick={() => onPorteChange(p.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                porte === p.value
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
