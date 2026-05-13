export function FronteirasPanel() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-red-50 border border-red-100 rounded-xl p-5">
          <p className="text-sm font-bold text-red-700 mb-2">Operação Física · Cradle-to-Grave</p>
          <ul className="text-xs text-red-600 space-y-1.5">
            <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">▪</span>Extração de matéria-prima (PVC / rPVC)</li>
            <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">▪</span>Fabricação do cartão físico</li>
            <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">▪</span>Logística rodoviária (3 fábricas)</li>
            <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">▪</span>Uso e transações com cartão</li>
            <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">▪</span>Fim de vida: aterro / logística reversa</li>
          </ul>
          <p className="text-xs text-red-500 mt-3 font-medium">Escopo 3 · 0,0149 t CO₂e/func/ano</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-5">
          <p className="text-sm font-bold text-green-700 mb-2">Operação Digital · Cradle-to-Gate</p>
          <ul className="text-xs text-green-600 space-y-1.5">
            <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">▪</span>Energia consumida no datacenter</li>
            <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">▪</span>Rede de telecomunicações</li>
            <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">▪</span>Dispositivo do usuário (proporcional)</li>
            <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">▪</span>Tecnologias: NFC, QR, PIX, Wallet</li>
            <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">▪</span>Camadas: emissora → bandeira → adquirente</li>
          </ul>
          <p className="text-xs text-green-600 mt-3 font-medium">Escopo 3 · 0,0018 t CO₂e/usuário/ano</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="text-xs text-blue-700 font-semibold mb-1">Alinhamento normativo</p>
        <p className="text-xs text-blue-600">
          GHG Protocol Brasil 2022 · ISO 14064:2018 · IPCC AR6 (fatores GWP100) ·
          Auditável por terceira parte independente (ex. Bureau Veritas, EcoVadis)
        </p>
      </div>
    </div>
  )
}
