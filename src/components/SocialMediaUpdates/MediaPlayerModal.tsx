import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  getFacebookPostEmbedUrl,
  getInstagramReelEmbedUrl,
  getYouTubeEmbedUrl,
} from '@/lib/socialFeeds'
import { cn } from '@/lib/utils'

export type ModalMedia =
  | {
      platform: 'instagram'
      shortcode: string
      mediaType?: 'reel' | 'p'
      title?: string
    }
  | { platform: 'youtube'; videoId: string; title?: string }
  | { platform: 'facebook'; permalink: string; title?: string }

type MediaPlayerModalProps = {
  media: ModalMedia | null
  onClose: () => void
}

export function MediaPlayerModal({ media, onClose }: MediaPlayerModalProps) {
  const open = media !== null
  const isVertical = media?.platform === 'instagram'

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className={cn(
          'p-0 gap-0 overflow-hidden border-0 bg-black',
          isVertical ? 'max-w-[min(100vw,420px)]' : 'max-w-4xl w-[95vw]'
        )}
      >
        <DialogTitle className='sr-only'>Media player</DialogTitle>

        {media?.platform === 'instagram' && (
          <div className='flex justify-center bg-black overflow-hidden'>
            <iframe
              src={`${getInstagramReelEmbedUrl(media.shortcode, media.mediaType ?? 'reel')}&hidecaption=1`}
              title='Instagram reel player'
              className='w-full max-w-[400px] h-[min(85vh,720px)] border-0'
              allow='autoplay; encrypted-media; picture-in-picture'
              allowFullScreen
            />
          </div>
        )}

        {media?.platform === 'youtube' && (
          <div className='aspect-video w-full'>
            <iframe
              src={getYouTubeEmbedUrl(media.videoId)}
              title='YouTube player'
              className='w-full h-full border-0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          </div>
        )}

        {media?.platform === 'facebook' && (
          <div className='bg-white flex justify-center max-h-[85vh] overflow-auto'>
            <iframe
              src={getFacebookPostEmbedUrl(media.permalink)}
              title='Facebook post'
              className='w-full max-w-[520px] min-h-[520px] border-0'
              allow='autoplay; encrypted-media; picture-in-picture'
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
