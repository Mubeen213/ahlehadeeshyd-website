import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type EmbedSkeletonProps = {
  className?: string
  aspectRatio?: 'video' | 'square' | 'timeline'
}

const aspectClasses = {
  video: 'aspect-video',
  square: 'aspect-square min-h-[360px]',
  timeline: 'min-h-[500px]',
}

export function EmbedSkeleton({
  className,
  aspectRatio = 'video',
}: EmbedSkeletonProps) {
  return (
    <Skeleton
      className={cn('w-full rounded-xl', aspectClasses[aspectRatio], className)}
    />
  )
}
