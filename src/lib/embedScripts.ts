declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void
        createTimeline: (
          dataSource: { sourceType: 'profile' | 'list'; screenName?: string },
          targetEl: HTMLElement,
          options?: Record<string, unknown>
        ) => Promise<unknown>
      }
    }
  }
}

let instagramScriptPromise: Promise<void> | null = null

export function loadInstagramEmbedScript(): Promise<void> {
  if (window.instgrm?.Embeds) return Promise.resolve()

  if (!instagramScriptPromise) {
    instagramScriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector(
        'script[src="https://www.instagram.com/embed.js"]'
      ) as HTMLScriptElement | null

      if (existing) {
        if (existing.dataset.loaded === 'true') {
          resolve()
          return
        }
        existing.addEventListener('load', () => resolve())
        existing.addEventListener('error', () =>
          reject(new Error('Instagram embed.js failed'))
        )
        return
      }

      const script = document.createElement('script')
      script.src = 'https://www.instagram.com/embed.js'
      script.async = true
      script.onload = () => {
        script.dataset.loaded = 'true'
        resolve()
      }
      script.onerror = () =>
        reject(new Error('Instagram embed.js failed to load'))
      document.body.appendChild(script)
    })
  }

  return instagramScriptPromise
}

export function processInstagramEmbeds(): void {
  window.instgrm?.Embeds.process()
}

let twitterScriptPromise: Promise<void> | null = null

export function loadTwitterWidgets(): Promise<void> {
  if (window.twttr?.widgets) return Promise.resolve()

  if (!twitterScriptPromise) {
    twitterScriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector(
        'script[src="https://platform.twitter.com/widgets.js"]'
      ) as HTMLScriptElement | null

      if (existing) {
        if (existing.dataset.loaded === 'true') {
          resolve()
          return
        }
        existing.addEventListener('load', () => resolve())
        return
      }

      const script = document.createElement('script')
      script.src = 'https://platform.twitter.com/widgets.js'
      script.async = true
      script.charset = 'utf-8'
      script.onload = () => {
        script.dataset.loaded = 'true'
        resolve()
      }
      script.onerror = () =>
        reject(new Error('Twitter widgets.js failed to load'))
      document.body.appendChild(script)
    })
  }

  return twitterScriptPromise
}
