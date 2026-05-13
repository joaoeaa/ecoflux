import { Trophy } from 'lucide-react'

interface PercentilBadgeProps {
  percentil: number
  setor: string
  empresa: number
  media: number
}

const SETOR_LABELS: Record<string, string> = {
  varejo: 'varejo',
  servicos: 'serviços',
  industria: 'indústria',
  saude: 'saúde',
  educacao: 'educação',
}

export function PercentilBadge({ percentil, setor, empresa, media }: PercentilBadgeProps) {
  const isTop = percentil >= 75
  const bgColor = isTop ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'
  const textColor = isTop ? 'text-green-700' : 'text-amber-700'
  const iconColor = isTop ? 'text-green-600' : 'text-amber-500'
  const diff = ((empresa - media) / media) * 100

  return (
    <div className={`flex items-center gap-4 rounded-2xl p-5 border ${bgColor}`}>
      <Trophy className={`${iconColor} shrink-0`} size={32} />
      <div>
        <p className={`text-lg font-bold ${textColor}`}>
          Sua empresa está no top {100 - percentil}% do setor de {SETOR_LABELS[setor] ?? setor}
        </p>
        <p className={`text-sm ${textColor} opacity-75 mt-0.5`}>
          {diff > 0
            ? `${diff.toFixed(0)}% acima da média do setor`
            : `${Math.abs(diff).toFixed(0)}% abaixo da média do setor`}
        </p>
      </div>
    </div>
  )
}
