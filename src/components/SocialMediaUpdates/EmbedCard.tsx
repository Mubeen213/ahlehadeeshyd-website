import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type EmbedCardProps = {
  children: ReactNode
  className?: string
}

export function EmbedCard({ children, className }: EmbedCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden border border-border bg-white shadow-sm',
        className
      )}
    >
      {children}
    </div>
  )
}
