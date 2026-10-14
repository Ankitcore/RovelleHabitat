import React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'slate' | 'charcoal' | 'ivory' | 'outline' | 'status'
  className?: string
}

export function Badge({
  children,
  variant = 'slate',
  className,
}: BadgeProps) {
  const variantStyles = {
    slate: 'bg-rovelle-slate/10 text-rovelle-slate border-rovelle-slate/20',
    charcoal: 'bg-rovelle-charcoal text-white border-transparent',
    ivory: 'bg-rovelle-ivory text-rovelle-charcoal border-rovelle-border',
    outline: 'bg-transparent text-rovelle-muted border-rovelle-border',
    status: 'bg-rovelle-tint-blue text-rovelle-charcoal border-rovelle-slate/30 font-semibold',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase rounded-xs border',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
