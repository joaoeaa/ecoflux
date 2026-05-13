import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import type { HistoricoMes, Periodo } from '../../types'
import { formatMes } from '../../utils/formatters'

interface EvolucaoChartProps {
  dados: HistoricoMes[]
  periodo: Periodo
  meta?: number
}

const periodoMap: Record<Periodo, number> = { '3m': 3, '6m': 6, '12m': 12 }

export function EvolucaoChart({ dados, periodo, meta }: EvolucaoChartProps) {
  const n = periodoMap[periodo]
  const slice = dados.slice(-n)

  const data = slice.map((d) => ({
    mes: formatMes(d.mes),
    emissoes: d.emissoesEvitadas_tCO2e,
    funcionarios: d.funcionariosMigrados,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
        <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#6b7280' }} />
        <YAxis
          tick={{ fontSize: 12, fill: '#6b7280' }}
          tickFormatter={(v) => `${v} t`}
          width={55}
        />
        <Tooltip
          formatter={(value) => [`${Number(value).toFixed(2)} t CO₂e`, 'Emissões evitadas']}
          contentStyle={{ borderRadius: '8px', border: '1px solid #d1fae5', fontSize: 13 }}
        />
        {meta && (
          <ReferenceLine y={meta} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Meta', fill: '#f59e0b', fontSize: 11 }} />
        )}
        <Line
          type="monotone"
          dataKey="emissoes"
          stroke="#16a34a"
          strokeWidth={2.5}
          dot={{ r: 4, fill: '#16a34a' }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
