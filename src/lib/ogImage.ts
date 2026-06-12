import { fetchText } from '@/lib/fetchWithProxy'

export async function fetchOgImage(url: string): Promise<string | undefined> {
  const html = await fetchText(url)
  if (!html) return undefined

  const patterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
  ]

  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match?.[1]) return match[1].replace(/&amp;/g, '&')
  }

  return undefined
}
