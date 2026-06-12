import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { loadFacebookSdk, parseFacebookXfbml } from '@/lib/facebookSdk'
import { getFacebookPreviewEmbedUrl } from '@/lib/socialFeeds'
import { cn } from '@/lib/utils'

export const FACEBOOK_SLIDE_WIDTH =
  'w-[280px] sm:w-[300px] md:w-[320px] flex-shrink-0'

type FacebookPostEmbedCardProps = {
  permalink: string
  onOpen: () => void
}

/** Single post via official post/video plugin (carousel slide) */
export function FacebookPostEmbedCard({
  permalink,
  onOpen,
}: FacebookPostEmbedCardProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    loadFacebookSdk().then(() => {
      if (!cancelled && rootRef.current) parseFacebookXfbml(rootRef.current)
    })
    return () => {
      cancelled = true
    }
  }, [permalink])

  return (
    <motion.div
      className={cn(FACEBOOK_SLIDE_WIDTH)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.35 }}
    >
      <div
        ref={rootRef}
        className='relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-white shadow-md'
      >
        <iframe
          src={getFacebookPreviewEmbedUrl(permalink)}
          title='Facebook post'
          loading='lazy'
          className='absolute inset-0 h-full w-full border-0 pointer-events-none'
          allow='encrypted-media; autoplay; clipboard-write'
        />
        <button
          type='button'
          aria-label='Open post'
          onClick={onOpen}
          className='absolute inset-0 z-10 cursor-pointer bg-transparent'
        />
      </div>
    </motion.div>
  )
}
