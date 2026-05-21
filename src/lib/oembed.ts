import { fetchJson } from '@/lib/fetchWithProxy'

export type OEmbedResult = {
  html?: string
  thumbnail_url?: string
  title?: string
  author_name?: string
  width?: number
  height?: number
}

export async function fetchOEmbed(url: string): Promise<OEmbedResult | null> {
  const instagramToken = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN

  if (instagramToken && url.includes('instagram.com')) {
    try {
      const graphUrl = new URL(
        'https://graph.facebook.com/v21.0/instagram_oembed'
      )
      graphUrl.searchParams.set('url', url)
      graphUrl.searchParams.set('access_token', instagramToken)
      graphUrl.searchParams.set('omitscript', 'true')
      const data = await fetchJson<OEmbedResult>(graphUrl.toString())
      if (data?.thumbnail_url || data?.html) return data
    } catch {
      /* fall through */
    }
  }

  try {
    const igUrl = `https://www.instagram.com/oembed/?url=${encodeURIComponent(url)}&omitscript=true`
    const data = await fetchJson<OEmbedResult>(igUrl)
    if (data?.thumbnail_url || data?.html) return data
  } catch {
    /* fall through */
  }

  try {
    const noembedUrl = `https://noembed.com/embed?url=${encodeURIComponent(url)}`
    const data = await fetchJson<OEmbedResult & { error?: string }>(noembedUrl)
    if (data && !data.error && (data.thumbnail_url || data.html)) return data
  } catch {
    /* unavailable */
  }

  return null
}

export async function enrichWithOEmbed<T extends { permalink: string }>(
  items: T[],
  concurrency = 4
): Promise<(T & { thumbnail?: string; embedHtml?: string; title?: string })[]> {
  const results: (T & {
    thumbnail?: string
    embedHtml?: string
    title?: string
  })[] = []

  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency)
    const enriched = await Promise.all(
      batch.map(async (item) => {
        const oembed = await fetchOEmbed(item.permalink)
        return {
          ...item,
          thumbnail: oembed?.thumbnail_url,
          embedHtml: oembed?.html,
          title: oembed?.title,
        }
      })
    )
    results.push(...enriched)
  }

  return results
}
