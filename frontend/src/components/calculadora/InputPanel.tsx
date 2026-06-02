import { useState } from 'react'
import type { CalculoRequest, ModeloBeneficio, Setor } from '../../types'
import { Button } from '../ui/Button'
import { ChevronDown } from 'lucide-react'

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

const setores: { value: Setor; label: string }[] = [
  { value: 'varejo', label: 'Varejo' },
  { value: 'servicos', label: 'Serviços' },
  { value: 'industria', label: 'Indústria' },
  { value: 'saude', label: 'Saúde' },
  { value: 'educacao', label: 'Educação' },
]

const inputClass =
  'w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all placeholder-gray-400'
const inputFocusStyle = { '--tw-ring-color': '#FF1654' } as React.CSSProperties

const selectClass =
  'w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none cursor-pointer'

export function InputPanel({ onSubmit, loading }: InputPanelProps) {
  const [nome, setNome] = useState('')
  const [funcionarios, setFuncionarios] = useState(1200)
  const [modelo, setModelo] = useState<ModeloBeneficio>('FISICO_PVC')
  const [setor, setSetor] = useState<Setor>('varejo')
  const [migracao, setMigracao] = useState(100)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nome) return
    onSubmit({
      nomeEmpresa: nome,
      funcionarios,
      modeloAtual: modelo,
      tiposBeneficio: ['VA', 'VR'],
      percentualMigracao: migracao,
      setor,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Razão social / Nome da empresa
        </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Grupo Magazine Ltda."
          required
          className={inputClass}
          style={inputFocusStyle}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Total de funcionários beneficiados
        </label>
        <input
          type="number"
          value={funcionarios}
          onChange={(e) => setFuncionarios(Number(e.target.value))}
          placeholder="EX: 1.200"
          min={1}
          className={inputClass}
          style={inputFocusStyle}
        />
        <p className="text-xs text-gray-400 mt-1">
          Utilize o total de colaboradores CLT que recebem o benefício
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Modelo de benefício atual
        </label>
        <div className="relative">
          <select
            value={modelo}
            onChange={(e) => setModelo(e.target.value as ModeloBeneficio)}
            className={selectClass}
            style={inputFocusStyle}
          >
            {modelos.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Setor de atuação
        </label>
        <div className="relative">
          <select
            value={setor}
            onChange={(e) => setSetor(e.target.value as Setor)}
            className={selectClass}
            style={inputFocusStyle}
          >
            {setores.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Percentual estimado de migração para digital:{' '}
          <span className="font-black text-gray-900">{migracao}%</span>
        </label>
        <input
          type="range"
          min={1}
          max={100}
          value={migracao}
          onChange={(e) => setMigracao(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-gray-400 mt-1">
          100% = todos migram para cartão digital Edenred
        </p>
      </div>

      <Button type="submit" loading={loading} className="w-full py-4 text-base font-black uppercase tracking-wider">
        Calcular Impacto Agora
      </Button>
    </form>
  )
}
