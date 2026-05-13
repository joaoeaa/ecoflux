import type { Empresa, HistoricoMes } from '../../types'
import { formatCO2, formatMes } from '../../utils/formatters'

interface RelatorioPreviewProps {
  empresa: Empresa
  historico: HistoricoMes[]
  periodo: number
}

export function RelatorioPreview({ empresa, historico, periodo }: RelatorioPreviewProps) {
  const slice = historico.slice(-periodo)
  const total = slice.reduce((s, m) => s + m.emissoesEvitadas_tCO2e, 0)
  const today = new Date().toLocaleDateString('pt-BR')

  return (
    <div id="relatorio-pdf" className="bg-white rounded-2xl border border-gray-200 p-8 max-w-2xl mx-auto space-y-6 text-sm print:shadow-none">
      <div className="flex items-start justify-between border-b border-gray-100 pb-6">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Relatório ESG</p>
          <h2 className="text-xl font-bold text-gray-800">{empresa.nome}</h2>
          <p className="text-gray-500 text-xs mt-1">Período: últimos {periodo} meses · Gerado em {today}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-green-700 font-semibold">EcoFlux · Edenred</p>
          <p className="text-xs text-gray-400">GHG Protocol · ISO 14064</p>
        </div>
      </div>

      <div className="bg-green-50 rounded-xl p-5 border border-green-100">
        <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-1">Sumário executivo</p>
        <p className="text-3xl font-bold text-green-800">{formatCO2(total)}</p>
        <p className="text-sm text-green-700 mt-1">de emissões de GEE evitadas no período</p>
        <div className="grid grid-cols-3 gap-4 mt-4 text-center">
          <div>
            <p className="text-lg font-bold text-green-700">{empresa.funcionarios.toLocaleString('pt-BR')}</p>
            <p className="text-xs text-gray-500">funcionários</p>
          </div>
          <div>
            <p className="text-lg font-bold text-green-700">{slice.length}</p>
            <p className="text-xs text-gray-500">meses</p>
          </div>
          <div>
            <p className="text-lg font-bold text-green-700">{formatCO2(total / (slice.length || 1))}</p>
            <p className="text-xs text-gray-500">média/mês</p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Histórico mensal</p>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 text-gray-400 font-medium">Mês</th>
              <th className="text-right py-2 text-gray-400 font-medium">Funcionários migrados</th>
              <th className="text-right py-2 text-gray-400 font-medium">Emissões evitadas</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((m) => (
              <tr key={m.mes} className="border-b border-gray-50">
                <td className="py-2 text-gray-700">{formatMes(m.mes)}</td>
                <td className="py-2 text-right text-gray-600">{m.funcionariosMigrados.toLocaleString('pt-BR')}</td>
                <td className="py-2 text-right font-semibold text-green-700">{formatCO2(m.emissoesEvitadas_tCO2e)}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-green-200 font-semibold">
              <td className="pt-3 text-gray-800">Total</td>
              <td></td>
              <td className="pt-3 text-right text-green-700">{formatCO2(total)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Premissas metodológicas</p>
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Fator físico: 0,0149 t CO₂e/funcionário/ano (SR2 EcoFlux 2026)</p>
          <p>• Fator digital: 0,0018 t CO₂e/usuário/ano (SR2 EcoFlux 2026)</p>
          <p>• Fator de emissão elétrica BR (SIN): 0,0916 kg CO₂e/kWh (MCTI 2023)</p>
          <p>• Escopo 3 · Cradle-to-Gate (digital) / Cradle-to-Grave (físico)</p>
          <p>• Alinhado ao GHG Protocol Brasil 2022 e ISO 14064:2018 · Versão metodologia: 2.1</p>
        </div>
      </div>
    </div>
  )
}
