import { Download } from 'lucide-react'
import { Button } from '../ui/Button'

interface ExportButtonProps {
  nomeEmpresa: string
}

export function ExportButton({ nomeEmpresa }: ExportButtonProps) {
  function handlePrint() {
    window.print()
  }

  return (
    <Button onClick={handlePrint} variant="primary" className="gap-2">
      <Download size={16} />
      Exportar PDF — {nomeEmpresa}
    </Button>
  )
}
