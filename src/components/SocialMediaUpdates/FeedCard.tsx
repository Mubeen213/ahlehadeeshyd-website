import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'

type FeedCardProps = {
  thumbnail: string
  title?: string
  subtitle?: string
  onClick: () => void
  variant?: 'reel' | 'video' | 'post'
  className?: string
}

export function FeedCard({
  thumbnail,
  title,
  subtitle,
  onClick,
  variant = 'reel',
  className,
}: FeedCardProps) {
  const aspect =
    variant === 'reel'
      ? 'aspect-[9/16]'
      : variant === 'video'
        ? 'aspect-video'
        : 'aspect-[4/5]'

  return (
    <motion.button
      type='button'
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className={cn(
        'group relative w-full overflow-hidden rounded-2xl border border-border bg-white shadow-md',
        'focus:outline-none focus:ring-2 focus:ring-primary/40',
        aspect,
        className
      )}
    >
      <div className='absolute inset-0 bg-gradient-to-br from-primary/20 via-green-50 to-green-100' />

      <img
        src={thumbnail}
        alt=''
        loading='lazy'
        className='absolute inset-0 h-full w-full object-cover'
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />

      <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent' />

      <div className='absolute inset-0 flex items-center justify-center'>
        <span className='flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all'>
          <Play className='h-7 w-7 fill-primary ml-0.5' />
        </span>
      </div>

      {(title || subtitle) && (
        <div className='absolute bottom-0 left-0 right-0 p-3 text-left'>
          {title && (
            <p className='text-sm font-semibold text-white line-clamp-2'>{title}</p>
          )}
          {subtitle && (
            <p className='text-xs text-white/80 line-clamp-1 mt-0.5'>{subtitle}</p>
          )}
        </div>
      )}
    </motion.button>
  )
}
