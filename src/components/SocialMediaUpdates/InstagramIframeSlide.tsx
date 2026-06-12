import { motion } from 'framer-motion'
import type { InstagramReel } from '@/lib/socialFeeds'
import { getInstagramPreviewEmbedUrl } from '@/lib/socialFeeds'
import { cn } from '@/lib/utils'

export const INSTAGRAM_SLIDE_WIDTH =
  'w-[220px] sm:w-[240px] md:w-[260px] flex-shrink-0'

type InstagramIframeSlideProps = {
  item: InstagramReel
  onOpen: () => void
}

/** Official Instagram /embed iframe — always renders visible reel content */
export function InstagramIframeSlide({ item, onOpen }: InstagramIframeSlideProps) {
  return (
    <motion.div
      className={cn(INSTAGRAM_SLIDE_WIDTH)}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className='relative aspect-[9/16] overflow-hidden rounded-2xl border border-border bg-black shadow-md'>
        <iframe
          src={getInstagramPreviewEmbedUrl(item.shortcode, item.type)}
          title='Instagram reel'
          loading='lazy'
          className='absolute inset-0 h-full w-full border-0'
          allow='encrypted-media; autoplay; clipboard-write'
        />
        <button
          type='button'
          aria-label='Open reel player'
          onClick={onOpen}
          className='absolute inset-0 z-10 cursor-pointer bg-transparent'
        />
      </div>
    </motion.div>
  )
}
