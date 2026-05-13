export function formatCO2(value: number, unit: 't' | 'kg' = 't'): string {
  if (unit === 'kg') {
    return `${value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} kg CO₂e`
  }
  if (value < 1) {
    return `${(value * 1000).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} kg CO₂e`
  }
  return `${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} t CO₂e`
}

export function formatMes(mes: string): string {
  const [year, month] = mes.split('-')
  const date = new Date(parseInt(year), parseInt(month) - 1)
  return date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' })
}

export function formatNumber(n: number): string {
  return n.toLocaleString('pt-BR')
}
