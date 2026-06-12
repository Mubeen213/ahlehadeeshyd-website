import type { ComponentType } from 'react'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  icon: ComponentType<{ className?: string }>
  title: string
  description?: string
  href?: string
  className?: string
}

export function SectionHeading({
  icon: Icon,
  title,
  description,
  href,
  className,
}: SectionHeadingProps) {
  const heading = (
    <h3 className='text-2xl font-semibold text-primary'>{title}</h3>
  )

  return (
    <div className={cn('mb-6', className)}>
      <div className='flex items-center gap-3 mb-2'>
        <Icon className='h-7 w-7 text-primary/80 flex-shrink-0' />
        {href ? (
          <a
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='hover:opacity-80 transition-opacity'
          >
            {heading}
          </a>
        ) : (
          heading
        )}
      </div>
      {description && (
        <p className='text-muted-foreground ml-10 max-w-2xl'>{description}</p>
      )}
    </div>
  )
}
