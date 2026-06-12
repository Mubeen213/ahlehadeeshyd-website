import { useEffect, useRef, useState } from 'react'
import { SOCIAL_MEDIA } from '@/config/socialMedia'
import { loadFacebookSdk, parseFacebookXfbml } from '@/lib/facebookSdk'
import { cn } from '@/lib/utils'

const PAGE_PLUGIN_IFRAME = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
  SOCIAL_MEDIA.facebook.pageUrl
)}&tabs=timeline%2Cvideos&width=500&height=560&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`

type FacebookPageTimelineProps = {
  className?: string
}

/** Official Facebook Page Plugin — renders timeline + videos without Graph API */
export function FacebookPageTimeline({ className }: FacebookPageTimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [useIframe, setUseIframe] = useState(false)

  useEffect(() => {
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []

    loadFacebookSdk()
      .then(() => {
        if (cancelled || !rootRef.current) return
        parseFacebookXfbml(rootRef.current)
        timers.push(
          setTimeout(() => {
            const rendered = rootRef.current?.querySelector('iframe, span')
            if (!rendered && !cancelled) setUseIframe(true)
          }, 4000)
        )
      })
      .catch(() => {
        if (!cancelled) setUseIframe(true)
      })

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className={cn(
        'w-full min-h-[560px] rounded-2xl border border-border bg-white shadow-md overflow-hidden',
        className
      )}
    >
      {useIframe ? (
        <iframe
          src={PAGE_PLUGIN_IFRAME}
          title='Facebook page feed'
          width='100%'
          height='560'
          className='w-full min-h-[560px] border-0'
          scrolling='no'
          allow='encrypted-media; autoplay; clipboard-write'
        />
      ) : (
        <div
          className='fb-page'
          data-href={SOCIAL_MEDIA.facebook.pageUrl}
          data-tabs='timeline,videos'
          data-width='500'
          data-height='560'
          data-small-header='true'
          data-adapt-container-width='true'
          data-hide-cover='false'
          data-show-facepile='false'
        />
      )}
    </div>
  )
}
