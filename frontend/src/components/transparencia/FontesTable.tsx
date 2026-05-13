const fatores = [
  { parametro: 'Fator de emissão rede elétrica BR (SIN)', valor: '0,0916 kg CO₂e/kWh', fonte: 'MCTI', versao: '2023' },
  { parametro: 'Energia por transação digital (datacenter)', valor: '0,00043 kWh', fonte: 'IEA', versao: '2022' },
  { parametro: 'PUE médio datacenter global', valor: '1,58', fonte: 'Uptime Institute', versao: '2023' },
  { parametro: 'Emissão fabricação PVC virgem', valor: '~2,0 kg CO₂e/kg', fonte: 'DEFRA', versao: '2023' },
  { parametro: 'Emissão fabricação rPVC', valor: '~0,5 kg CO₂e/kg', fonte: 'DEFRA / Ecoinvent', versao: '2023' },
  { parametro: 'Massa média cartão PVC', valor: '5 g (0,005 kg)', fonte: 'Briefing cliente', versao: '2026' },
  { parametro: 'Vida útil cartão', valor: '4 anos', fonte: 'Padrão setor', versao: '—' },
  { parametro: 'Transações por cartão por ano', valor: '840', fonte: 'Briefing cliente', versao: '2026' },
  { parametro: 'Fator físico consolidado', valor: '0,0149 t CO₂e/funcionário/ano', fonte: 'SR2 EcoFlux', versao: '2026' },
  { parametro: 'Fator digital consolidado', valor: '0,0018 t CO₂e/usuário/ano', fonte: 'SR2 EcoFlux', versao: '2026' },
  { parametro: 'Delta (impacto por migração)', valor: '0,0131 t CO₂e/funcionário/ano', fonte: 'SR2 EcoFlux', versao: '2026' },
]

export function FontesTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 pr-4 text-gray-500 font-medium">Parâmetro</th>
            <th className="text-left py-3 pr-4 text-gray-500 font-medium">Valor</th>
            <th className="text-left py-3 pr-4 text-gray-500 font-medium">Fonte</th>
            <th className="text-left py-3 text-gray-500 font-medium">Versão</th>
          </tr>
        </thead>
        <tbody>
          {fatores.map((f, i) => (
            <tr key={i} className="border-b border-gray-50 hover:bg-green-50 transition-colors">
              <td className="py-2.5 pr-4 text-gray-700 font-medium">{f.parametro}</td>
              <td className="py-2.5 pr-4 text-gray-600 font-mono text-xs">{f.valor}</td>
              <td className="py-2.5 pr-4">
                <span className="inline-flex px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">{f.fonte}</span>
              </td>
              <td className="py-2.5 text-gray-500">{f.versao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
