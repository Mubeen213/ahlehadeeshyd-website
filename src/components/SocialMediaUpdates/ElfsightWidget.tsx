import { useEffect } from 'react'
import { cn } from '@/lib/utils'

let elfsightLoaded = false

function loadElfsightPlatform(): void {
  if (elfsightLoaded) return
  if (document.querySelector('script[data-elfsight-platform]')) {
    elfsightLoaded = true
    return
  }
  const script = document.createElement('script')
  script.src = 'https://static.elfsight.com/platform/platform.js'
  script.defer = true
  script.dataset.elfsightPlatform = 'true'
  document.body.appendChild(script)
  elfsightLoaded = true
}

type ElfsightWidgetProps = {
  widgetId: string
  className?: string
}

export function ElfsightWidget({ widgetId, className }: ElfsightWidgetProps) {
  useEffect(() => {
    loadElfsightPlatform()
  }, [])

  return (
    <div
      className={cn('elfsight-app rounded-2xl overflow-hidden min-h-[360px]', className)}
      data-elfsight-app-lazy
      style={{ minHeight: 360 }}
    >
      <div className={`elfsight-app-${widgetId}`} />
    </div>
  )
}
