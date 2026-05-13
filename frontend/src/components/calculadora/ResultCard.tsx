import type { CalculoResponse } from '../../types'
import { formatCO2 } from '../../utils/formatters'
import { Leaf } from 'lucide-react'

interface ResultCardProps {
  resultado: CalculoResponse | null
  loading: boolean
}

export function ResultCard({ resultado, loading }: ResultCardProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 gap-3">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500">Calculando emissões...</p>
      </div>
    )
  }

  if (!resultado) {
    return (
      <div className="flex flex-col items-center justify-center h-48 gap-3 text-gray-400">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <Leaf className="text-green-300" size={32} />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500">Aguardando dados</p>
          <p className="text-xs text-gray-400 mt-1">Preencha o formulário e clique em Calcular</p>
        </div>
      </div>
    )
  }

  const isAboveMedia = resultado.emissoesEvitadas_tCO2e_ano > resultado.mediaSetor_tCO2e_ano

  return (
    <div className="text-center space-y-4">
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border border-green-200">
        <p className="text-sm text-green-700 font-medium mb-1">{resultado.nomeEmpresa}</p>
        <p className="text-5xl font-bold text-green-800 tracking-tight">
          {formatCO2(resultado.emissoesEvitadas_tCO2e_ano)}
        </p>
        <p className="text-sm text-green-600 mt-2">de GEE evitadas por ano</p>
        <p className="text-xs text-green-500 mt-1">{resultado.funcionariosMigrados.toLocaleString('pt-BR')} funcionários migrados</p>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">Fator físico</p>
          <p className="text-sm font-semibold text-gray-700">{resultado.fatorFisico_tCO2e.toFixed(4)}</p>
          <p className="text-xs text-gray-400">t CO₂e/func/ano</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">Fator digital</p>
          <p className="text-sm font-semibold text-gray-700">{resultado.fatorDigital_tCO2e.toFixed(4)}</p>
          <p className="text-xs text-gray-400">t CO₂e/func/ano</p>
        </div>
        <div className="bg-green-50 rounded-xl p-3">
          <p className="text-xs text-green-600 mb-1">Delta</p>
          <p className="text-sm font-semibold text-green-700">{resultado.delta_tCO2e.toFixed(4)}</p>
          <p className="text-xs text-green-500">t CO₂e/func/ano</p>
        </div>
      </div>

      <div className={`rounded-xl p-3 text-sm ${isAboveMedia ? 'bg-green-50' : 'bg-amber-50'}`}>
        <span className="text-gray-500">vs. média do setor ({resultado.setor}):</span>{' '}
        <span className={`font-semibold ${isAboveMedia ? 'text-green-700' : 'text-amber-600'}`}>
          {isAboveMedia ? '▲ Acima da média' : '▼ Abaixo da média'} ({resultado.mediaSetor_tCO2e_ano.toFixed(1)} t CO₂e)
        </span>
        {resultado.posicaoPercentil > 50 && (
          <p className={`text-xs mt-1 ${isAboveMedia ? 'text-green-600' : 'text-amber-500'}`}>
            Top {100 - resultado.posicaoPercentil}% do setor
          </p>
        )}
      </div>
    </div>
  )
}
