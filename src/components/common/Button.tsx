import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'slate' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  fullWidth?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors duration-150 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs uppercase tracking-wider',
    md: 'px-5 py-2.5 text-sm uppercase tracking-wider',
    lg: 'px-7 py-3 text-sm font-semibold uppercase tracking-wider',
  }

  const variantStyles = {
    primary:
      'bg-rovelle-charcoal text-white hover:bg-rovelle-charcoal-light focus-visible:ring-rovelle-charcoal',
    slate:
      'bg-rovelle-slate text-white hover:bg-rovelle-slate-hover focus-visible:ring-rovelle-slate',
    secondary:
      'bg-rovelle-tint-blue text-rovelle-charcoal hover:bg-rovelle-tint-blue-hover focus-visible:ring-rovelle-slate',
    outline:
      'border border-rovelle-border bg-transparent text-rovelle-charcoal hover:bg-rovelle-tint-blue focus-visible:ring-rovelle-slate',
    ghost:
      'bg-transparent text-rovelle-charcoal hover:bg-rovelle-tint-blue focus-visible:ring-rovelle-slate',
  }

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    fullWidth && 'w-full',
    className
  )

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    )
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
