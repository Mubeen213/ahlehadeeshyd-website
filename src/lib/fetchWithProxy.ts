function localDevProxy(url: string): string | null {
  if (typeof window === 'undefined') return null
  const host = window.location.hostname
  if (host !== 'localhost' && host !== '127.0.0.1') return null

  if (url.includes('cdn.syndication.twimg.com/timeline/profile')) {
    const params = url.substring(url.indexOf('?'))
    return `${window.location.origin}/api/social/twitter-syndication${params}`
  }
  if (url.includes('instagram.com') && url.includes('/embed')) {
    return `${window.location.origin}/api/social/instagram-embed`
  }
  if (url.includes('youtube.com/feeds/videos.xml')) {
    return `${window.location.origin}/api/social/youtube-rss`
  }
  if (url.startsWith('/api/social/facebook-graph')) {
    return `${window.location.origin}${url}`
  }
  if (url.includes('m.facebook.com/JamiatAhlehadeesOfficialHydSec')) {
    return `${window.location.origin}/api/social/facebook-mobile`
  }
  if (url.includes('facebook.com/JamiatAhlehadeesOfficialHydSec')) {
    if (url.includes('/videos')) {
      return `${window.location.origin}/api/social/facebook-videos`
    }
    return `${window.location.origin}/api/social/facebook-page`
  }
  return null
}

const PROXY_WRAPPERS = [
  (url: string) => localDevProxy(url) ?? url,
  (url: string) =>
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url: string) =>
    `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(url)}`,
]

async function fetchOnce(url: string, timeoutMs: number): Promise<Response | null> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    const response = await fetch(url, { signal: controller.signal })
    clearTimeout(timer)
    return response
  } catch {
    return null
  }
}

export async function fetchText(
  url: string,
  timeoutMs = 30000
): Promise<string | null> {
  for (const wrap of PROXY_WRAPPERS) {
    const response = await fetchOnce(wrap(url), timeoutMs)
    if (response?.ok) {
      const text = await response.text()
      if (text.length > 200) return text
    }
  }
  return null
}

export async function fetchJson<T>(
  url: string,
  timeoutMs = 30000
): Promise<T | null> {
  for (const wrap of PROXY_WRAPPERS) {
    const response = await fetchOnce(wrap(url), timeoutMs)
    if (response?.ok) {
      try {
        return (await response.json()) as T
      } catch {
        /* invalid json */
      }
    }
  }
  return null
}
