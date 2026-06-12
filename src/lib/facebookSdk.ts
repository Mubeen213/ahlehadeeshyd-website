declare global {
  interface Window {
    FB?: {
      init: (params: Record<string, unknown>) => void
      XFBML: { parse: (node?: HTMLElement) => void }
    }
    fbAsyncInit?: () => void
  }
}

let sdkPromise: Promise<void> | null = null

export function loadFacebookSdk(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.FB) return Promise.resolve()
  if (sdkPromise) return sdkPromise

  sdkPromise = new Promise((resolve) => {
    window.fbAsyncInit = () => {
      window.FB?.init({
        xfbml: true,
        version: 'v21.0',
      })
      resolve()
    }

    if (document.getElementById('facebook-jssdk')) {
      const poll = setInterval(() => {
        if (window.FB) {
          clearInterval(poll)
          resolve()
        }
      }, 100)
      return
    }

    const script = document.createElement('script')
    script.id = 'facebook-jssdk'
    script.async = true
    script.defer = true
    script.crossOrigin = 'anonymous'
    script.src = 'https://connect.facebook.net/en_US/sdk.js'
    document.body.appendChild(script)
  })

  return sdkPromise
}

export function parseFacebookXfbml(root?: HTMLElement): void {
  window.FB?.XFBML.parse(root)
}
