import { useState } from 'react'
import { useEmpresas, useEmpresa } from '../hooks/useEmpresa'
import { RelatorioPreview } from '../components/relatorio/RelatorioPreview'
import { ExportButton } from '../components/relatorio/ExportButton'
import { MOCK_EMPRESAS } from '../api/mockData'

const PERIODOS = [
  { value: 3, label: '3 meses' },
  { value: 6, label: '6 meses' },
  { value: 12, label: '12 meses' },
]

export function Relatorio() {
  const { empresas } = useEmpresas()
  const [empresaId, setEmpresaId] = useState<string | null>(null)
  const [periodo, setPeriodo] = useState(12)
  const { historico, loading } = useEmpresa(empresaId)

  const empresa = empresas.find((e) => e.id === empresaId) ?? MOCK_EMPRESAS.find((e) => e.id === empresaId)

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-4 flex-wrap">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Empresa</label>
          <select
            value={empresaId ?? ''}
            onChange={(e) => setEmpresaId(e.target.value || null)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 min-w-52"
          >
            <option value="">Selecione uma empresa</option>
            {empresas.map((e) => <option key={e.id} value={e.id}>{e.nome}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Período</label>
          <div className="flex gap-2">
            {PERIODOS.map((p) => (
              <button
                key={p.value}
                onClick={() => setPeriodo(p.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                  periodo === p.value
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {empresa && historico.length > 0 && (
          <div className="mt-5">
            <ExportButton nomeEmpresa={empresa.nome} />
          </div>
        )}
      </div>

      {!empresaId && (
        <div className="flex items-center justify-center h-64 text-gray-400">
          <p className="text-sm">Selecione uma empresa para gerar o relatório</p>
        </div>
      )}

      {empresaId && loading && (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {empresa && !loading && historico.length > 0 && (
        <RelatorioPreview empresa={empresa} historico={historico} periodo={periodo} />
      )}
    </div>
  )
}
