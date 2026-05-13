import { useState } from 'react'
import type { CalculoRequest, ModeloBeneficio, TipoBeneficio, Setor } from '../../types'
import { Button } from '../ui/Button'

interface InputPanelProps {
  onSubmit: (req: CalculoRequest) => void
  loading: boolean
}

const modelos: { value: ModeloBeneficio; label: string }[] = [
  { value: 'VALE_PAPEL', label: 'Vale Papel' },
  { value: 'FISICO_PVC', label: 'Cartão Físico PVC' },
  { value: 'FISICO_RPVC', label: 'Cartão Físico rPVC (Edenred)' },
  { value: 'MISTO', label: 'Misto' },
]

const beneficios: { value: TipoBeneficio; label: string }[] = [
  { value: 'VA', label: 'Vale Alimentação' },
  { value: 'VR', label: 'Vale Refeição' },
  { value: 'MOBILIDADE', label: 'Mobilidade' },
]

const setores: { value: Setor; label: string }[] = [
  { value: 'varejo', label: 'Varejo' },
  { value: 'servicos', label: 'Serviços' },
  { value: 'industria', label: 'Indústria' },
  { value: 'saude', label: 'Saúde' },
  { value: 'educacao', label: 'Educação' },
]

export function InputPanel({ onSubmit, loading }: InputPanelProps) {
  const [nome, setNome] = useState('')
  const [funcionarios, setFuncionarios] = useState(500)
  const [modelo, setModelo] = useState<ModeloBeneficio>('FISICO_PVC')
  const [tipos, setTipos] = useState<TipoBeneficio[]>(['VA', 'VR'])
  const [migracao, setMigracao] = useState(100)
  const [setor, setSetor] = useState<Setor>('varejo')

  function toggleTipo(t: TipoBeneficio) {
    setTipos((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nome || tipos.length === 0) return
    onSubmit({ nomeEmpresa: nome, funcionarios, modeloAtual: modelo, tiposBeneficio: tipos, percentualMigracao: migracao, setor })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome da empresa</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Empresa XYZ S.A."
          required
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Funcionários: <span className="text-green-700 font-bold">{funcionarios.toLocaleString('pt-BR')}</span>
        </label>
        <input
          type="range"
          min={10}
          max={50000}
          step={10}
          value={funcionarios}
          onChange={(e) => setFuncionarios(Number(e.target.value))}
          className="w-full accent-green-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>10</span><span>50.000</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Modelo atual</label>
          <select
            value={modelo}
            onChange={(e) => setModelo(e.target.value as ModeloBeneficio)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {modelos.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Setor</label>
          <select
            value={setor}
            onChange={(e) => setSetor(e.target.value as Setor)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {setores.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tipos de benefício</label>
        <div className="flex gap-2 flex-wrap">
          {beneficios.map((b) => (
            <button
              key={b.value}
              type="button"
              onClick={() => toggleTipo(b.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                tipos.includes(b.value)
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          % de migração: <span className="text-green-700 font-bold">{migracao}%</span>
        </label>
        <input
          type="range"
          min={1}
          max={100}
          value={migracao}
          onChange={(e) => setMigracao(Number(e.target.value))}
          className="w-full accent-green-600"
        />
      </div>

      <Button type="submit" loading={loading} className="w-full py-3">
        Calcular Emissões Evitadas
      </Button>
    </form>
  )
}
