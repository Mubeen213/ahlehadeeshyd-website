import { useEffect, useRef, useState } from 'react'

type UseLazyLoadOptions = {
  rootMargin?: string
  threshold?: number
}

export function useLazyLoad(options: UseLazyLoadOptions = {}) {
  const { rootMargin = '200px', threshold = 0.01 } = options
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [isVisible, rootMargin, threshold])

  return { ref, isVisible }
}
