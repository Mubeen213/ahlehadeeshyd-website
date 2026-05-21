import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Facebook } from 'lucide-react'
import { SOCIAL_MEDIA } from '@/config/socialMedia'
import { useLazyLoad } from '@/hooks/use-lazy-load'
import { fetchFacebookPosts, type FacebookPost } from '@/lib/socialFeeds'
import { CarouselSkeleton } from './CarouselSkeleton'
import { ElfsightWidget } from './ElfsightWidget'
import { FeedCarousel } from './FeedCarousel'
import { FacebookPageTimeline } from './FacebookPageTimeline'
import {
  FACEBOOK_SLIDE_WIDTH,
  FacebookPostEmbedCard,
} from './FacebookPostEmbedCard'
import { MediaPlayerModal, type ModalMedia } from './MediaPlayerModal'
import { MediaPreviewCard } from './MediaPreviewCard'
import { SectionHeading } from './SectionHeading'

const elfsightFbId = import.meta.env.VITE_ELFSIGHT_FACEBOOK_WIDGET_ID

function hasDisplayThumbnail(post: FacebookPost): boolean {
  return Boolean(
    post.thumbnail &&
      !post.thumbnail.includes('picture?type=large') &&
      post.thumbnail.startsWith('http')
  )
}

export function FacebookPostsSection() {
  const { ref } = useLazyLoad({ rootMargin: '80px' })
  const [modalMedia, setModalMedia] = useState<ModalMedia | null>(null)

  const { data: posts = [], isLoading, isFetching, isError } = useQuery({
    queryKey: ['facebook-posts'],
    queryFn: fetchFacebookPosts,
    staleTime: 1000 * 60 * 15,
    retry: 2,
    retryDelay: 1500,
    refetchOnWindowFocus: false,
  })

  const graphPosts = posts.filter(
    (p) => p.id && !p.id.startsWith('fb-page-') && !p.id.startsWith('fb-fallback')
  )
  const showCarousel = graphPosts.length > 0
  const useElfsight = Boolean(elfsightFbId)
  const showCarouselSkeleton =
    !useElfsight && (isLoading || isFetching) && !showCarousel && !isError

  return (
    <div ref={ref} className='mb-14 max-w-full overflow-hidden'>
      <SectionHeading
        icon={Facebook}
        title='Facebook Posts & Videos'
        description='Updates from our official Facebook page'
        href={SOCIAL_MEDIA.facebook.pageUrl}
      />

      {useElfsight ? (
        <ElfsightWidget widgetId={elfsightFbId!} className='min-h-[520px]' />
      ) : (
        <>
          {showCarouselSkeleton && (
            <CarouselSkeleton
              slideClassName={FACEBOOK_SLIDE_WIDTH}
              variant='post'
              count={5}
            />
          )}

          {showCarousel && (
            <div className='mb-8'>
              <FeedCarousel autoplayDelay={3200}>
                {graphPosts.map((post: FacebookPost) => {
                  const openModal = () =>
                    setModalMedia({
                      platform: 'facebook',
                      permalink: post.permalink,
                      title: post.message,
                    })

                  if (hasDisplayThumbnail(post)) {
                    return (
                      <div key={post.id} className={FACEBOOK_SLIDE_WIDTH}>
                        <MediaPreviewCard
                          variant={
                            post.mediaType === 'video' ? 'video' : 'post'
                          }
                          imageSrc={post.thumbnail}
                          externalUrl={post.permalink}
                          detailTitle={post.message}
                          onClick={openModal}
                        />
                      </div>
                    )
                  }

                  return (
                    <FacebookPostEmbedCard
                      key={post.id}
                      permalink={post.permalink}
                      onOpen={openModal}
                    />
                  )
                })}
              </FeedCarousel>
            </div>
          )}

          <FacebookPageTimeline />
        </>
      )}

      <MediaPlayerModal
        media={modalMedia}
        onClose={() => setModalMedia(null)}
      />
    </div>
  )
}
