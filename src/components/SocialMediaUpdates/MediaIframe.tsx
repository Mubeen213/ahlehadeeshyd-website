import { cn } from '@/lib/utils'

type MediaIframeProps = {
  src: string
  title: string
  className?: string
  height?: number | string
  aspectRatio?: 'video' | 'timeline' | 'none'
  allow?: string
}

export function MediaIframe({
  src,
  title,
  className,
  height,
  aspectRatio = 'video',
  allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
}: MediaIframeProps) {
  return (
    <iframe
      src={src}
      title={title}
      loading='lazy'
      className={cn(
        'w-full border-0 bg-white',
        aspectRatio === 'video' && 'aspect-video h-full',
        className
      )}
      style={{
        height: height ?? (aspectRatio === 'timeline' ? 600 : undefined),
        minHeight: aspectRatio === 'timeline' ? 600 : undefined,
      }}
      allow={allow}
      allowFullScreen
      referrerPolicy='strict-origin-when-cross-origin'
    />
  )
}
