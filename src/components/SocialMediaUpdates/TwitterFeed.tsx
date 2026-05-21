import { useEffect, useMemo, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { SOCIAL_MEDIA } from '@/config/socialMedia'
import { EmbedCard } from './EmbedCard'
import { EmbedSkeleton } from './EmbedSkeleton'
import { SectionHeading } from './SectionHeading'
import { loadCachedTwitterPosts } from '@/lib/twitterCache'
import { fetchTwitterTimeline, type TwitterPost } from '@/lib/twitterFeeds'
import { cn } from '@/lib/utils'

const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox='0 0 24 24'
    aria-hidden='true'
    className={className}
    fill='currentColor'
  >
    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
  </svg>
)

function useThemeMode(): 'light' | 'dark' {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    if (typeof document === 'undefined') return 'light'
    return document.documentElement.classList.contains('dark') ||
      window.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    if (typeof document === 'undefined') return

    const update = () => {
      setMode(
        document.documentElement.classList.contains('dark') ||
          window.matchMedia?.('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
      )
    }

    update()
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return mode
}

function formatTwitterDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function buildTweetStats(post: TwitterPost): string {
  const parts = [post.authorHandle, formatTwitterDate(post.createdAt)].filter(
    Boolean
  )
  return parts.join(' - ')
}

function TwitterTimelineEmbed({ posts }: { posts: TwitterPost[] }) {
  const theme = useThemeMode()

  return (
    <div className='relative overflow-hidden min-h-[600px] w-full rounded-xl bg-background p-4'>
      {posts.length > 0 ? (
        <div className="flex flex-col items-center gap-6">
          {posts.slice(0, 3).map(post => (
            <iframe
              key={post.id}
              src={`https://platform.twitter.com/embed/Tweet.html?id=${post.id}&theme=${theme}&dnt=true`}
              title={`X post`}
              className='min-h-[350px] w-full rounded-xl border-0 bg-background'
              loading='lazy'
              referrerPolicy='strict-origin-when-cross-origin'
            />
          ))}
        </div>
      ) : (
        <div className='absolute inset-0 overflow-hidden rounded-xl bg-background flex flex-col items-center justify-center px-6 text-center space-y-4'>
           <p className="text-muted-foreground">Failed to load tweets</p>
           <a
             href={SOCIAL_MEDIA.twitter.timelineUrl}
             target='_blank'
             rel='noopener noreferrer'
             className='rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted'
           >
             Open X timeline
           </a>
        </div>
      )}
    </div>
  )
}

function TwitterPostCard({ post }: { post: TwitterPost }) {
  const theme = useThemeMode()

  return (
    <article className='overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md'>
      <div className='px-4 pt-4'>
        <div className='flex items-center gap-3'>
          {post.avatar ? (
            <img
              src={post.avatar}
              alt=''
              className='h-10 w-10 rounded-full object-cover ring-1 ring-border'
              loading='lazy'
            />
          ) : (
            <div className='h-10 w-10 rounded-full bg-primary/10' />
          )}
          <div className='min-w-0'>
            <div className='flex items-center gap-1.5'>
              <p className='truncate font-semibold text-foreground'>
                {post.authorName}
              </p>
              {post.verified && (
                <span className='rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary'>
                  Verified
                </span>
              )}
            </div>
            <p className='truncate text-sm text-muted-foreground'>
              {buildTweetStats(post)}
            </p>
          </div>
        </div>
      </div>

      <div className='relative min-h-[360px] px-2 pb-2 pt-3'>
        <div className='w-full flex justify-center'>
          <iframe
            src={`https://platform.twitter.com/embed/Tweet.html?id=${post.id}&theme=${theme}&dnt=true`}
            title={`X post by ${post.authorName}`}
            className='min-h-[320px] w-full rounded-xl border-0 bg-background'
            loading='lazy'
            referrerPolicy='strict-origin-when-cross-origin'
          />
        </div>
      </div>
    </article>
  )
}

export function TwitterFeed() {
  const [posts, setPosts] = useState<TwitterPost[]>(() => loadCachedTwitterPosts())
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let active = true

    fetchTwitterTimeline()
      .then((items) => {
        if (!active) return
        if (items.length) setPosts(items)
      })
      .finally(() => {
        if (active) setLoaded(true)
      })

    return () => {
      active = false
    }
  }, [])

  const visiblePosts = useMemo(() => posts, [posts])

  return (
    <div className='max-w-full overflow-hidden scroll-smooth'>
      <SectionHeading
        icon={XIcon}
        title='X (Twitter) Feed'
        description='Official live timeline plus cached posts, so this section stays useful even if the widget is temporarily blocked.'
        href={SOCIAL_MEDIA.twitter.url}
      />

      <div className='grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'>
        <EmbedCard className='bg-card/95 backdrop-blur-sm'>
          <div className='border-b border-border px-5 py-4'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
              <div>
                <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
                  Live timeline
                </p>
                <p className='text-sm text-muted-foreground'>
                  Auto-syncs future posts from @{SOCIAL_MEDIA.twitter.handle}
                </p>
              </div>
              <a
                href={SOCIAL_MEDIA.twitter.url}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted'
              >
                View on X
                <ExternalLink className='h-4 w-4' />
              </a>
            </div>
          </div>
          <TwitterTimelineEmbed posts={posts} />
        </EmbedCard>

        <div className='space-y-4'>
          <EmbedCard className='bg-card/95 p-5'>
            <div className='space-y-2'>
              <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
                Feed Status
              </p>
              <h4 className='text-xl font-semibold text-foreground'>
                {loaded ? 'Ready' : 'Refreshing'}
              </h4>
              <p className='text-sm leading-6 text-muted-foreground'>
                The timeline renders from X&apos;s official embed endpoint. The
                archive cards below show the account&apos;s existing posts,
                media, and videos directly inside the current design.
              </p>
            </div>
          </EmbedCard>

          {visiblePosts.length > 0 ? (
            <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-1'>
              {visiblePosts.map((post) => (
                <TwitterPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <EmbedCard className='p-5'>
              <div className='space-y-2'>
                <p className='font-semibold text-foreground'>
                  Cached posts will appear here
                </p>
                <p className='text-sm leading-6 text-muted-foreground'>
                  Once the feed loads successfully, we save a local copy so the
                  section can still display posts later if X is briefly
                  unavailable.
                </p>
              </div>
            </EmbedCard>
          )}
        </div>
      </div>
    </div>
  )
}
