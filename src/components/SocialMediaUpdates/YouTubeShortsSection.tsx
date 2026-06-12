import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Youtube } from 'lucide-react'
import { SOCIAL_MEDIA } from '@/config/socialMedia'
import { useLazyLoad } from '@/hooks/use-lazy-load'
import { fetchYouTubeCatalog, type YouTubeVideo } from '@/lib/socialFeeds'
import { CarouselSkeleton } from './CarouselSkeleton'
import { FeedCarousel } from './FeedCarousel'
import { MediaPlayerModal, type ModalMedia } from './MediaPlayerModal'
import { MediaPreviewCard } from './MediaPreviewCard'
import { SectionHeading } from './SectionHeading'

const SLIDE_WIDTH = 'w-[180px] sm:w-[200px] md:w-[220px]'

export function YouTubeShortsSection() {
  const { ref, isVisible } = useLazyLoad({ rootMargin: '80px' })
  const [modalMedia, setModalMedia] = useState<ModalMedia | null>(null)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['youtube-catalog'],
    queryFn: fetchYouTubeCatalog,
    enabled: true,
    staleTime: 1000 * 60 * 30,
    retry: 5,
    retryDelay: 2000,
    refetchOnWindowFocus: false,
  })

  const shorts = data?.shorts ?? []
  const showContent = shorts.length > 0
  const showSkeleton = (isLoading || isFetching) && !showContent

  return (
    <div ref={ref} className='mb-14 max-w-full overflow-hidden'>
      <SectionHeading
        icon={Youtube}
        title='YouTube Shorts'
        description='Short vertical videos from our channel'
        href={`${SOCIAL_MEDIA.youtube.url}/shorts`}
      />

      {showSkeleton && (
        <CarouselSkeleton slideClassName={SLIDE_WIDTH} variant='reel' count={6} />
      )}

      {showContent && (
        <FeedCarousel autoplayDelay={3000}>
          {shorts.map((video: YouTubeVideo) => (
            <div key={video.id} className={SLIDE_WIDTH}>
              <MediaPreviewCard
                variant='reel'
                imageSrc={video.thumbnail}
                externalUrl={video.permalink}
                detailTitle={video.title}
                onClick={() =>
                  setModalMedia({
                    platform: 'youtube',
                    videoId: video.id,
                    title: video.title,
                  })
                }
              />
            </div>
          ))}
        </FeedCarousel>
      )}

      <MediaPlayerModal
        media={modalMedia}
        onClose={() => setModalMedia(null)}
      />
    </div>
  )
}
