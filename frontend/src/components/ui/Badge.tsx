type BadgeColor = 'green' | 'amber' | 'blue' | 'gray' | 'emerald'

interface BadgeProps {
  label: string
  color?: BadgeColor
}

const colors: Record<BadgeColor, string> = {
  green: 'bg-green-100 text-green-800',
  amber: 'bg-amber-100 text-amber-800',
  blue: 'bg-blue-100 text-blue-800',
  gray: 'bg-gray-100 text-gray-700',
  emerald: 'bg-emerald-100 text-emerald-800',
}

export function Badge({ label, color = 'green' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors[color]}`}>
      {label}
    </span>
  )
}
