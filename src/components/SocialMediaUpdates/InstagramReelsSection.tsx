import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Instagram } from 'lucide-react'
import { SOCIAL_MEDIA } from '@/config/socialMedia'
import { useLazyLoad } from '@/hooks/use-lazy-load'
import { fetchInstagramReels, type InstagramReel } from '@/lib/socialFeeds'
import { CarouselSkeleton } from './CarouselSkeleton'
import { ElfsightWidget } from './ElfsightWidget'
import { FeedCarousel } from './FeedCarousel'
import {
  INSTAGRAM_SLIDE_WIDTH,
  InstagramIframeSlide,
} from './InstagramIframeSlide'
import { MediaPlayerModal, type ModalMedia } from './MediaPlayerModal'
import { SectionHeading } from './SectionHeading'

const elfsightIgId = import.meta.env.VITE_ELFSIGHT_INSTAGRAM_WIDGET_ID

export function InstagramReelsSection() {
  const { ref } = useLazyLoad({ rootMargin: '80px' })
  const [modalMedia, setModalMedia] = useState<ModalMedia | null>(null)

  const { data: reels = [], isLoading, isFetching } = useQuery({
    queryKey: ['instagram-reels'],
    queryFn: () => fetchInstagramReels(),
    staleTime: 1000 * 60 * 30,
    retry: 6,
    retryDelay: 1500,
    refetchOnWindowFocus: false,
  })

  const useElfsight = Boolean(elfsightIgId)
  const showReels = !useElfsight && reels.length > 0
  const showSkeleton = !useElfsight && (isLoading || isFetching) && reels.length === 0
  const showProfileEmbed =
    !useElfsight &&
    !isLoading &&
    !isFetching &&
    reels.length === 0

  return (
    <div ref={ref} className='mb-14 max-w-full overflow-hidden'>
      <SectionHeading
        icon={Instagram}
        title='Instagram Reels'
        description='Latest reels from our official Instagram'
        href={SOCIAL_MEDIA.instagram.url}
      />

      {useElfsight && <ElfsightWidget widgetId={elfsightIgId!} className='min-h-[480px]' />}

      {showSkeleton && (
        <CarouselSkeleton slideClassName={INSTAGRAM_SLIDE_WIDTH} variant='reel' count={6} />
      )}

      {showReels && (
        <FeedCarousel autoplayDelay={2800}>
          {reels.map((item: InstagramReel) => (
            <InstagramIframeSlide
              key={item.shortcode}
              item={item}
              onOpen={() =>
                setModalMedia({
                  platform: 'instagram',
                  shortcode: item.shortcode,
                  mediaType: item.type,
                  title: item.title,
                })
              }
            />
          ))}
        </FeedCarousel>
      )}

      {showProfileEmbed && (
        <div className='rounded-2xl overflow-hidden border border-border shadow-md min-h-[480px] bg-white'>
          <iframe
            src={SOCIAL_MEDIA.instagram.embedUrl}
            title='Instagram profile feed'
            className='w-full border-0 min-h-[520px]'
            loading='lazy'
            allow='encrypted-media'
          />
        </div>
      )}

      <MediaPlayerModal
        media={modalMedia}
        onClose={() => setModalMedia(null)}
      />
    </div>
  )
}
