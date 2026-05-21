import { cn } from '@/lib/utils'
import { EmbedSkeleton } from './EmbedSkeleton'

type CarouselSkeletonProps = {
  count?: number
  slideClassName: string
  variant?: 'reel' | 'video' | 'post'
}

export function CarouselSkeleton({
  count = 6,
  slideClassName,
  variant = 'reel',
}: CarouselSkeletonProps) {
  const aspect =
    variant === 'reel'
      ? 'aspect-[9/16]'
      : variant === 'video'
        ? 'aspect-video'
        : 'aspect-[4/5]'

  return (
    <div className='flex gap-4 overflow-hidden'>
      {Array.from({ length: count }).map((_, i) => (
        <EmbedSkeleton
          key={i}
          className={cn(slideClassName, aspect, 'flex-shrink-0 rounded-2xl')}
        />
      ))}
    </div>
  )
}
