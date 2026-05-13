import type { Equivalencias } from '../../types'
import { Trees, Car, Package } from 'lucide-react'

interface EquivalenciasGridProps {
  equivalencias: Equivalencias
}

export function EquivalenciasGrid({ equivalencias }: EquivalenciasGridProps) {
  const items = [
    {
      Icon: Trees,
      color: 'text-green-600',
      bg: 'bg-green-50',
      value: equivalencias.arvoresEquivalentes.toLocaleString('pt-BR'),
      label: 'árvores equivalentes',
      sub: 'absorção anual média',
    },
    {
      Icon: Car,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      value: equivalencias.carrosRetirados.toLocaleString('pt-BR'),
      label: 'carros retirados',
      sub: 'da circulação por 1 ano',
    },
    {
      Icon: Package,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      value: `${equivalencias.kgPVCNaoProduzido.toLocaleString('pt-BR')} kg`,
      label: 'de PVC não produzido',
      sub: '5g por cartão físico',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map(({ Icon, color, bg, value, label, sub }) => (
        <div key={label} className={`${bg} rounded-2xl p-4 text-center`}>
          <Icon className={`${color} mx-auto mb-2`} size={28} />
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          <p className="text-sm font-medium text-gray-700 mt-1">{label}</p>
          <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
        </div>
      ))}
    </div>
  )
}
