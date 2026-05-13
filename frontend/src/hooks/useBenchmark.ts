import { useState, useEffect } from 'react'
import type { BenchmarkData, Setor, Porte } from '../types'
import { getBenchmark } from '../api/ecofluxApi'
import { MOCK_BENCHMARK } from '../api/mockData'

export function useBenchmark(setor: Setor, porte: Porte) {
  const [benchmark, setBenchmark] = useState<BenchmarkData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getBenchmark(setor, porte)
      .then(setBenchmark)
      .catch(() => {
        const mock = MOCK_BENCHMARK[setor]
        if (mock) setBenchmark({ ...mock, porte })
      })
      .finally(() => setLoading(false))
  }, [setor, porte])

  return { benchmark, loading }
}
