import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

interface BenchmarkChartProps {
  empresa: number
  media: number
  melhor: number
  setor: string
  nomeEmpresa?: string
}

export function BenchmarkChart({ empresa, media, melhor, setor, nomeEmpresa }: BenchmarkChartProps) {
  const data = [
    { name: nomeEmpresa ?? 'Esta empresa', value: empresa, color: '#16a34a' },
    { name: `Média (${setor})`, value: media, color: '#9ca3af' },
    { name: 'Melhor do setor', value: melhor, color: '#0ea5e9' },
  ]

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} />
        <YAxis
          tick={{ fontSize: 12, fill: '#6b7280' }}
          tickFormatter={(v) => `${v} t`}
          width={55}
        />
        <Tooltip
          formatter={(value) => [`${Number(value).toFixed(2)} t CO₂e/ano`, 'Emissões evitadas']}
          contentStyle={{ borderRadius: '8px', border: '1px solid #d1fae5', fontSize: 13 }}
        />
        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
