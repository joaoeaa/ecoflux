import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  children: ReactNode
  className?: string
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-200 p-6 ${className}`}>
      {title && (
        <h3
          className="text-sm font-black uppercase tracking-widest text-gray-900 mb-4"
          style={{ fontFamily: "'Barlow Condensed', system-ui, sans-serif", letterSpacing: '0.05em' }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}
