import type { ComponentType } from 'react'
import { SOCIAL_MEDIA } from '@/config/socialMedia'
import { useLazyLoad } from '@/hooks/use-lazy-load'
import { EmbedCard } from './EmbedCard'
import { EmbedSkeleton } from './EmbedSkeleton'
import { MediaIframe } from './MediaIframe'
import { SectionHeading } from './SectionHeading'

const XIcon: ComponentType<{ className?: string }> = ({ className }) => (
  <svg
    viewBox='0 0 24 24'
    aria-hidden='true'
    className={className}
    fill='currentColor'
  >
    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
  </svg>
)

function buildTwitterTimelineIframeSrc(): string {
  const params = new URLSearchParams({
    theme: 'light',
    maxHeight: '650',
    dnt: 'true',
    showHeader: 'true',
    showFooter: 'false',
    showReplies: 'false',
    transparent: 'false',
  })
  return `https://syndication.twitter.com/srv/timeline-profile/screen-name/${SOCIAL_MEDIA.twitter.handle}?${params.toString()}`
}

export function TwitterFeed() {
  const { ref, isVisible } = useLazyLoad({ rootMargin: '120px' })

  return (
    <div ref={ref} className='max-w-full overflow-hidden'>
      <SectionHeading
        icon={XIcon}
        title='X (Twitter) Feed'
        description='Timeline of posts from our official X account'
        href={SOCIAL_MEDIA.twitter.url}
      />

      <EmbedCard>
        {!isVisible ? (
          <EmbedSkeleton aspectRatio='timeline' className='min-h-[500px]' />
        ) : (
          <MediaIframe
            src={buildTwitterTimelineIframeSrc()}
            title='X timeline'
            aspectRatio='timeline'
            height={650}
          />
        )}
      </EmbedCard>
    </div>
  )
}
