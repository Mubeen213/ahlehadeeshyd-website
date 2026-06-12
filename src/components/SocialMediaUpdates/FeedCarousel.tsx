import { Children, useId, type ReactNode } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'
import { cn } from '@/lib/utils'

import 'swiper/css'

type FeedCarouselProps = {
  children: ReactNode[]
  slideClassName?: string
  className?: string
  autoplayDelay?: number
}

export function FeedCarousel({
  children,
  slideClassName,
  className,
  autoplayDelay = 2800,
}: FeedCarouselProps) {
  const id = useId().replace(/:/g, '')

  const childArray = Children.toArray(children)
  if (!childArray.length) return null

  const slides =
    childArray.length >= 3
      ? childArray
      : Array.from(
          { length: 3 },
          (_, i) => childArray[i % childArray.length]
        )

  const enableLoop = slides.length >= 3

  return (
    <Swiper
      modules={[Autoplay, FreeMode]}
      className={cn('feed-swiper', className)}
      spaceBetween={16}
      slidesPerView='auto'
      freeMode={{ enabled: true, momentum: true }}
      grabCursor
      loop={enableLoop}
      loopAdditionalSlides={enableLoop ? Math.min(slides.length, 4) : 0}
      autoplay={
        enableLoop
          ? {
              delay: autoplayDelay,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }
          : false
      }
      speed={700}
      id={id}
    >
      {slides.map((child, index) => (
        <SwiperSlide
          key={`feed-slide-${index}`}
          className={cn('!w-auto', slideClassName)}
        >
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
