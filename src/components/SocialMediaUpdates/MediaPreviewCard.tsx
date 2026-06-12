import { motion } from 'framer-motion'
import { ExternalLink, MoreVertical, Play } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type MediaPreviewCardProps = {
  variant?: 'reel' | 'video' | 'post'
  imageSrc?: string
  onClick: () => void
  externalUrl?: string
  detailTitle?: string
  className?: string
}

export function MediaPreviewCard({
  variant = 'reel',
  imageSrc,
  onClick,
  externalUrl,
  detailTitle,
  className,
}: MediaPreviewCardProps) {
  const aspect =
    variant === 'reel'
      ? 'aspect-[9/16]'
      : variant === 'video'
        ? 'aspect-video'
        : 'aspect-[4/5]'

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-neutral-900 shadow-md',
        aspect,
        className
      )}
    >
      <motion.div
        className='absolute inset-0 h-full w-full'
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt=''
            loading='lazy'
            className='h-full w-full object-cover object-center'
          />
        ) : (
          <div className='h-full w-full bg-gradient-to-br from-primary/30 via-green-900/40 to-neutral-900' />
        )}
      </motion.div>

      <button
        type='button'
        onClick={onClick}
        className='absolute inset-0 z-10 cursor-pointer bg-transparent border-0'
        aria-label='Play media'
      />

      <div className='pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <span className='flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-primary shadow-xl scale-95 group-hover:scale-100 transition-transform duration-300'>
          <Play className='h-7 w-7 fill-primary ml-0.5' />
        </span>
      </div>

      {externalUrl && (
        <Popover>
          <PopoverTrigger asChild>
            <button
              type='button'
              className='absolute top-2.5 right-2.5 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 hover:bg-black/70 transition-opacity'
              aria-label='More options'
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className='h-4 w-4' />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className='w-56 p-3'
            align='end'
            onClick={(e) => e.stopPropagation()}
          >
            {detailTitle && (
              <p className='text-sm text-foreground mb-2 line-clamp-4'>
                {detailTitle}
              </p>
            )}
            <a
              href={externalUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1.5 text-sm text-primary hover:underline'
            >
              View on platform
              <ExternalLink className='h-3.5 w-3.5' />
            </a>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}
