import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
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
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="colorEmissoes" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FF1654" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#FF1654" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" vertical={false} />
        <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          tickFormatter={(v) => `${v} t`}
          width={50}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          formatter={(value) => [`${Number(value).toFixed(2)} t CO₂e`, 'Emissões evitadas']}
          contentStyle={{ borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: 12 }}
        />
        {meta && (
          <ReferenceLine y={meta} stroke="#FF1654" strokeDasharray="4 4" label={{ value: 'Meta', fill: '#FF1654', fontSize: 11 }} />
        )}
        <Area
          type="monotone"
          dataKey="emissoes"
          stroke="#FF1654"
          strokeWidth={2.5}
          fill="url(#colorEmissoes)"
          dot={{ r: 4, fill: '#FF1654', strokeWidth: 0 }}
          activeDot={{ r: 6, fill: '#FF1654' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
