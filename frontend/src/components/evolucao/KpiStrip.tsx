import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { KpiData } from '../../types'
import { formatCO2 } from '../../utils/formatters'

export function KpiStrip({ totalAcumulado, mediasMensal, melhorMes, tendencia }: KpiData) {
  const TrendIcon = tendencia === 'up' ? TrendingUp : tendencia === 'down' ? TrendingDown : Minus
  const trendColor = tendencia === 'up' ? 'text-green-600' : tendencia === 'down' ? 'text-red-500' : 'text-gray-400'

  const kpis = [
    { label: 'Total acumulado', value: formatCO2(totalAcumulado) },
    { label: 'Média mensal', value: formatCO2(mediasMensal) },
    { label: 'Melhor mês', value: formatCO2(melhorMes) },
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      {kpis.map(({ label, value }) => (
        <div key={label} className="bg-white rounded-2xl p-4 border border-green-100 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">{label}</p>
          <p className="text-lg font-bold text-gray-800">{value}</p>
        </div>
      ))}
      <div className="bg-white rounded-2xl p-4 border border-green-100 shadow-sm">
        <p className="text-xs text-gray-500 mb-1">Tendência</p>
        <div className={`flex items-center gap-1 ${trendColor}`}>
          <TrendIcon size={20} />
          <span className="text-sm font-semibold capitalize">
            {tendencia === 'up' ? 'Crescendo' : tendencia === 'down' ? 'Caindo' : 'Estável'}
          </span>
        </div>
      </div>
    </div>
  )
}
