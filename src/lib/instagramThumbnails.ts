import { fetchOEmbed } from '@/lib/oembed'

function decodeInstagramUrl(raw: string): string {
  return raw.replace(/\\u0026/g, '&').replace(/\\\//g, '/')
}

/** Pull CDN image URLs from Instagram embed/profile HTML (same order as shortcodes). */
export function extractInstagramCdnUrls(html: string): string[] {
  const urls: string[] = []
  const patterns = [
    /https:\\\/\\\/scontent[^"\\]+\.(?:jpg|webp|png)/gi,
    /https:\/\/scontent[^\s"\\]+\.(?:jpg|webp|png)/gi,
    /"display_url":"(https:[^"]+)"/gi,
  ]

  for (const pattern of patterns) {
    let match: RegExpExecArray | null
    while ((match = pattern.exec(html)) !== null) {
      const raw = match[1] ?? match[0]
      const url = decodeInstagramUrl(raw)
      if (url.includes('scontent') && !urls.includes(url)) urls.push(url)
    }
  }

  return urls
}

export async function resolveInstagramThumbnails<
  T extends { shortcode: string; permalink: string; thumbnail: string },
>(items: T[], embedHtml?: string | null): Promise<T[]> {
  const cdnUrls = embedHtml ? extractInstagramCdnUrls(embedHtml) : []

  const resolved = await Promise.all(
    items.map(async (item, index) => {
      let thumbnail = cdnUrls[index] ?? item.thumbnail

      if (!thumbnail.includes('scontent')) {
        const oembed = await fetchOEmbed(item.permalink)
        if (oembed?.thumbnail_url) thumbnail = oembed.thumbnail_url
      }

      return { ...item, thumbnail }
    })
  )

  return resolved
}
