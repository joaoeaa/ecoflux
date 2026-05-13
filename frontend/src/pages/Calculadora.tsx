import { useEffect } from 'react'
import { useCalculo } from '../hooks/useCalculo'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { InputPanel } from '../components/calculadora/InputPanel'
import { ResultCard } from '../components/calculadora/ResultCard'
import { EquivalenciasGrid } from '../components/calculadora/EquivalenciasGrid'
import { MetodologiaBadge } from '../components/calculadora/MetodologiaBadge'
import type { CalculoResponse } from '../types'
import { FileText } from 'lucide-react'

interface CalculadoraProps {
  onNavigateRelatorio?: () => void
  onResult?: (r: CalculoResponse) => void
}

export function Calculadora({ onNavigateRelatorio, onResult }: CalculadoraProps) {
  const { resultado, loading, error, executar } = useCalculo()

  useEffect(() => {
    if (resultado) onResult?.(resultado)
  }, [resultado])

  return (
    <div className="grid grid-cols-2 gap-6 p-8 items-start">
      <Card title="Dados da empresa">
        <InputPanel onSubmit={executar} loading={loading} />
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </Card>

      <div className="space-y-6">
        <Card title="Resultado">
          <ResultCard resultado={resultado} loading={loading} />
        </Card>

        {resultado && (
          <>
            <Card title="Equivalências visuais">
              <EquivalenciasGrid equivalencias={resultado.equivalencias} />
            </Card>

            <MetodologiaBadge
              versao={resultado.versaoMetodologia}
              escopo="Escopo 3"
              fonte="GHG Protocol"
            />

            {onNavigateRelatorio && (
              <Button
                variant="secondary"
                onClick={onNavigateRelatorio}
                className="w-full gap-2 py-3"
              >
                <FileText size={16} />
                Gerar Relatório PDF
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
