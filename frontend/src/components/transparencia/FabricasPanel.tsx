import { MapPin } from 'lucide-react'

const fabricas = [
  {
    id: 1,
    nome: 'Fábrica Colombo/PR',
    endereco: 'R. Amália Strapasson de Souza, 398 — Mauá, Colombo/PR',
    cep: 'CEP 83413-560',
    estado: 'PR',
  },
  {
    id: 2,
    nome: 'Fábrica São Bernardo do Campo/SP',
    endereco: 'R. General Bertoldo Klinger, 69/89/131 — Vila Pauliceia, SBC/SP',
    cep: 'CEP 09688-000',
    estado: 'SP',
  },
  {
    id: 3,
    nome: 'Fábrica Cotia/SP',
    endereco: 'R. Soluções do Lar, 407 — Galpão 11/13/14/15/16 — Cotia/SP',
    cep: 'CEP 06716-020',
    estado: 'SP',
  },
]

export function FabricasPanel() {
  return (
    <div className="space-y-3">
      {fabricas.map((f) => (
        <div key={f.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="text-green-600" size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{f.nome}</p>
            <p className="text-xs text-gray-500 mt-0.5">{f.endereco}</p>
            <p className="text-xs text-gray-400">{f.cep}</p>
          </div>
          <span className="ml-auto text-xs font-medium text-white bg-green-600 px-2 py-0.5 rounded shrink-0">{f.estado}</span>
        </div>
      ))}
      <p className="text-xs text-gray-400 mt-2">
        Frete modal rodoviário calculado a partir dos endereços reais das fábricas (dados briefing cliente Edenred, 2026)
      </p>
    </div>
  )
}
