import { useState } from 'react'
import type { CalculoRequest, CalculoResponse } from '../types'
import { calcular } from '../api/ecofluxApi'
import { calcularLocal } from '../api/mockData'

export function useCalculo() {
  const [resultado, setResultado] = useState<CalculoResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const executar = async (req: CalculoRequest) => {
    setLoading(true)
    setError(null)
    try {
      const res = await calcular(req)
      setResultado(res)
    } catch {
      // Backend not available — use local calculation
      const res = calcularLocal(req) as CalculoResponse
      setResultado(res)
    } finally {
      setLoading(false)
    }
  }

  return { resultado, loading, error, executar }
}
