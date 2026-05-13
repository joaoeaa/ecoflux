import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  children: ReactNode
  className?: string
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-green-100 p-6 ${className}`}>
      {title && <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-4">{title}</h3>}
      {children}
    </div>
  )
}
