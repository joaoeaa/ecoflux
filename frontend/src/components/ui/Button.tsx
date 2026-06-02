import type { ReactNode, ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
  children: ReactNode
}

export function Button({ variant = 'primary', loading, children, className = '', disabled, style, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

  const variantStyle: React.CSSProperties =
    variant === 'primary'
      ? { background: 'linear-gradient(135deg, #FF1654 0%, #FF6B9D 100%)', color: '#fff' }
      : variant === 'secondary'
      ? { background: '#fff', color: '#FF1654', border: '1.5px solid #FF1654' }
      : { background: 'transparent', color: '#FF1654' }

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${base} ${className}`}
      style={{ ...variantStyle, ...style }}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
