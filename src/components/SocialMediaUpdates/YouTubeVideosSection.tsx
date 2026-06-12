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

const SLIDE_WIDTH = 'w-[300px] sm:w-[340px] md:w-[380px]'

export function YouTubeVideosSection() {
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

  const videos = data?.videos ?? []
  const showContent = videos.length > 0
  const showSkeleton = (isLoading || isFetching) && !showContent

  return (
    <div ref={ref} className='mb-14 max-w-full overflow-hidden'>
      <SectionHeading
        icon={Youtube}
        title='YouTube Videos'
        description='Full lectures and programs from our channel'
        href={SOCIAL_MEDIA.youtube.url}
      />

      {showSkeleton && (
        <CarouselSkeleton slideClassName={SLIDE_WIDTH} variant='video' count={5} />
      )}

      {showContent && (
        <FeedCarousel autoplayDelay={3500}>
          {videos.map((video: YouTubeVideo) => (
            <div key={video.id} className={SLIDE_WIDTH}>
              <MediaPreviewCard
                variant='video'
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
