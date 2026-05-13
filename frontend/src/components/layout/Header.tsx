const titles: Record<string, string> = {
  calculadora: 'Calculadora de Impacto',
  evolucao: 'Evolução Histórica',
  benchmark: 'Benchmark Setorial',
  relatorio: 'Relatório Exportável',
  transparencia: 'Transparência Metodológica',
}

const subtitles: Record<string, string> = {
  calculadora: 'Calcule as emissões de GEE evitadas pela migração digital',
  evolucao: 'Acompanhe a evolução mensal de emissões evitadas',
  benchmark: 'Compare o desempenho com outros do mesmo setor',
  relatorio: 'Exporte relatório auditável alinhado ao GHG Protocol',
  transparencia: 'Fatores de emissão, fontes e fronteiras do cálculo',
}

export function Header({ tab }: { tab: string }) {
  return (
    <header className="bg-white border-b border-green-100 px-8 py-5">
      <h1 className="text-xl font-bold text-gray-800">{titles[tab]}</h1>
      <p className="text-sm text-gray-500 mt-0.5">{subtitles[tab]}</p>
    </header>
  )
}
