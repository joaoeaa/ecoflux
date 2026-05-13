import { useState, useEffect } from 'react'
import type { Empresa, HistoricoMes } from '../types'
import { getEmpresas, getHistorico } from '../api/ecofluxApi'
import { MOCK_EMPRESAS } from '../api/mockData'

export function useEmpresas() {
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEmpresas()
      .then(setEmpresas)
      .catch(() => setEmpresas(MOCK_EMPRESAS))
      .finally(() => setLoading(false))
  }, [])

  return { empresas, loading }
}

export function useEmpresa(empresaId: string | null) {
  const [historico, setHistorico] = useState<HistoricoMes[]>([])
  const [nomeEmpresa, setNomeEmpresa] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!empresaId) return
    setLoading(true)
    getHistorico(empresaId)
      .then((data) => {
        setHistorico(data.historico)
        setNomeEmpresa(data.nomeEmpresa)
      })
      .catch(() => {
        const mock = MOCK_EMPRESAS.find((e) => e.id === empresaId)
        if (mock) {
          setHistorico(mock.historico)
          setNomeEmpresa(mock.nome)
        }
      })
      .finally(() => setLoading(false))
  }, [empresaId])

  return { historico, nomeEmpresa, loading }
}
