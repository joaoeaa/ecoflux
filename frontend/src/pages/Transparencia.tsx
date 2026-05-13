import { Card } from '../components/ui/Card'
import { FontesTable } from '../components/transparencia/FontesTable'
import { FabricasPanel } from '../components/transparencia/FabricasPanel'
import { FronteirasPanel } from '../components/transparencia/FronteirasPanel'

export function Transparencia() {
  return (
    <div className="p-8 space-y-6">
      <Card title="Fatores de emissão utilizados">
        <FontesTable />
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card title="Fábricas de cartões (dados reais Edenred)">
          <FabricasPanel />
        </Card>

        <Card title="Fronteiras do cálculo">
          <FronteirasPanel />
        </Card>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100">
        <p className="text-sm font-bold text-green-800 mb-2">Sobre a metodologia EcoFlux v2.1</p>
        <p className="text-xs text-green-700 leading-relaxed">
          O EcoFlux utiliza fatores de emissão determinísticos validados no SR2 do projeto acadêmico (CESAR School · Grupo 10 · 2026),
          alinhados ao GHG Protocol Escopo 3 e ISO 14064. O cálculo não utiliza inteligência artificial generativa — todos os resultados
          são rastreáveis a fontes publicadas. Os fatores são revisados anualmente para refletir atualizações do MCTI, IEA e DEFRA.
          85% dos cartões Edenred já são produzidos em rPVC reciclado, reduzindo em ~75% a emissão de fabricação em relação ao PVC virgem.
        </p>
      </div>
    </div>
  )
}
