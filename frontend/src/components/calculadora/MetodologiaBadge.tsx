import { ShieldCheck } from 'lucide-react'

interface MetodologiaBadgeProps {
  versao: string
  escopo: string
  fonte: string
}

export function MetodologiaBadge({ versao, escopo, fonte }: MetodologiaBadgeProps) {
  return (
    <div className="flex items-start gap-3 bg-blue-50 rounded-xl p-4 border border-blue-100">
      <ShieldCheck className="text-blue-600 mt-0.5 shrink-0" size={18} />
      <div className="text-xs text-blue-700 space-y-0.5">
        <p className="font-semibold">{fonte} · {escopo}</p>
        <p className="text-blue-500">Versão {versao} · Fatores validados SR2 EcoFlux 2026</p>
        <p className="text-blue-500">MCTI 2023 · IEA 2022 · DEFRA 2023 · GHG Protocol Brasil 2022</p>
      </div>
    </div>
  )
}
