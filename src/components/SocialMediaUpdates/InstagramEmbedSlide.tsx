import { motion } from 'framer-motion'
import type { InstagramReel } from '@/lib/socialFeeds'
import { cn } from '@/lib/utils'

const SLIDE = 'w-[220px] sm:w-[240px] md:w-[260px]'

type InstagramEmbedSlideProps = {
  item: InstagramReel
  onOpen: () => void
}

export function InstagramEmbedSlide({ item, onOpen }: InstagramEmbedSlideProps) {
  return (
    <motion.div
      className={cn(SLIDE, 'flex-shrink-0')}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
    >
      <div className='relative rounded-2xl overflow-hidden border border-border bg-white shadow-md'>
        <blockquote
          className='instagram-media m-0 w-full pointer-events-none'
          data-instgrm-permalink={item.permalink}
          data-instgrm-version='14'
          data-instgrm-captioned
          style={{
            background: '#FFF',
            border: 0,
            margin: 0,
            maxWidth: '100%',
            minWidth: 220,
            width: '100%',
            minHeight: 380,
          }}
        />
        <button
          type='button'
          aria-label='Play reel'
          onClick={onOpen}
          className='absolute inset-0 z-10 cursor-pointer bg-transparent'
        />
      </div>
    </motion.div>
  )
}

export const INSTAGRAM_SLIDE_WIDTH = SLIDE
