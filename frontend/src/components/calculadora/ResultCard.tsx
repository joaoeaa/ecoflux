import type { CalculoResponse } from '../../types'
import { Plus } from 'lucide-react'

interface ResultCardProps {
  resultado: CalculoResponse | null
  loading: boolean
}

export function ResultCard({ resultado, loading }: ResultCardProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-56 gap-3">
        <div
          className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: '#FF1654', borderTopColor: 'transparent' }}
        />
        <p className="text-sm text-gray-500">Calculando emissões...</p>
      </div>
    )
  }

  if (!resultado) {
    return (
      <div className="flex flex-col items-center justify-center h-56 gap-3 text-gray-400 rounded-2xl border-2 border-dashed border-gray-200">
        <div className="w-14 h-14 rounded-full border-2 border-gray-300 flex items-center justify-center">
          <Plus className="text-gray-400" size={28} />
        </div>
        <p className="text-sm text-gray-400 text-center">
          Insira os dados do prospect ao lado para<br />gerar o impacto
        </p>
      </div>
    )
  }

  const pct = Math.round((1 - resultado.fatorDigital_tCO2e / resultado.fatorFisico_tCO2e) * 100)
  const barFisicoWidth = 100
  const barDigitalWidth = Math.max(4, 100 - pct)

  return (
    <div className="space-y-4">
      <div
        className="rounded-2xl p-6 text-white"
        style={{ background: 'linear-gradient(135deg, #FF1654 0%, #FF6B9D 100%)' }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-2">
          Redução projetada de CO₂e
        </p>
        <p
          className="text-5xl font-black leading-none mb-2"
          style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif" }}
        >
          {resultado.emissoesEvitadas_tCO2e_ano.toFixed(1).replace('.', ',')} T CO₂e/ANO
        </p>
        <p className="text-sm opacity-90 mt-2">
          com migração de {resultado.funcionariosMigrados.toLocaleString('pt-BR')} funcionários para cartão digital Edenred
        </p>
        <p className="text-xs opacity-60 mt-2">
          Calculado via GHG Protocol Cat. 1 · Fator PVC: {resultado.fatorFisico_tCO2e.toFixed(2)} kgCO₂e/unidade · Logística MCTI 2024
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { emoji: '🌳', value: resultado.equivalencias.arvoresEquivalentes.toLocaleString('pt-BR'), label: 'árvores equivalentes' },
          { emoji: '🚗', value: resultado.equivalencias.carrosRetirados.toLocaleString('pt-BR'), label: 'carros removidos/ano' },
          { emoji: '♻️', value: `${resultado.equivalencias.kgPVCNaoProduzido.toLocaleString('pt-BR')} KG`, label: 'PVC não produzido' },
        ].map(({ emoji, value, label }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-2xl p-4 text-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 text-lg"
              style={{ background: 'rgba(255,22,84,0.08)' }}
            >
              {emoji}
            </div>
            <p className="text-xl font-black text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5 leading-tight">{label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Operação atual — físico</span>
            <span className="font-semibold text-gray-800">{resultado.fatorFisico_tCO2e.toFixed(1)} T</span>
          </div>
          <div className="h-3 rounded-full bg-gray-200" style={{ width: `${barFisicoWidth}%` }} />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Com Edenred Digital</span>
            <span className="font-semibold text-gray-800">{resultado.fatorDigital_tCO2e.toFixed(1)} T</span>
          </div>
          <div
            className="h-3 rounded-full"
            style={{
              width: `${barDigitalWidth}%`,
              background: 'linear-gradient(90deg, #FF1654, #FF6B9D)',
            }}
          />
        </div>
        <div className="flex justify-center">
          <span
            className="text-white text-sm font-bold px-5 py-2 rounded-full"
            style={{ background: 'linear-gradient(135deg, #FF1654, #FF6B9D)' }}
          >
            −{resultado.emissoesEvitadas_tCO2e_ano.toFixed(1).replace('.', ',')} T · −{pct}%
          </span>
        </div>
      </div>
    </div>
  )
}
