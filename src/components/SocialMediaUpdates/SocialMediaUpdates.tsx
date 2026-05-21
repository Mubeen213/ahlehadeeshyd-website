import { Share2 } from 'lucide-react'
import { FacebookPostsSection } from './FacebookPostsSection'
import { InstagramReelsSection } from './InstagramReelsSection'
import { TwitterFeed } from './TwitterFeed'
import { useSocialPrefetch } from './useSocialPrefetch'
import { YouTubeShortsSection } from './YouTubeShortsSection'
import { YouTubeVideosSection } from './YouTubeVideosSection'

export default function SocialMediaUpdates() {
  useSocialPrefetch()

  return (
    <section
      id='social-media-updates'
      className='py-16 bg-gray-50 overflow-x-hidden'
      aria-labelledby='social-media-heading'
    >
      <div className='container mx-auto px-4 max-w-6xl'>
        <div className='flex justify-center mb-6'>
          <Share2 className='h-12 w-12 text-primary/80' />
        </div>
        <h2
          id='social-media-heading'
          className='text-3xl font-bold text-center mb-4 text-primary'
        >
          Social Media Updates
        </h2>
        <p className='text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto'>
          Reels, shorts, videos, and community posts from our official channels.
          Tap any card to watch here on the site.
        </p>

        <InstagramReelsSection />
        <YouTubeShortsSection />
        <YouTubeVideosSection />
        <FacebookPostsSection />
        <TwitterFeed />
      </div>
    </section>
  )
}
