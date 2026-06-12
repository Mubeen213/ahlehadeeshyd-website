import {
  INSTAGRAM_REELS_LIMIT,
  SOCIAL_MEDIA,
  YOUTUBE_FETCH_LIMIT,
} from '@/config/socialMedia'
import {
  loadCachedFacebookPosts,
  saveCachedFacebookPosts,
} from '@/lib/facebookCache'
import { fetchJson, fetchText } from '@/lib/fetchWithProxy'

export type InstagramReel = {
  shortcode: string
  permalink: string
  type: 'reel' | 'p'
  thumbnail: string
  title?: string
}

export type YouTubeVideo = {
  id: string
  title: string
  thumbnail: string
  permalink: string
  publishedAt: string
  isShort: boolean
}

export type FacebookPost = {
  id: string
  permalink: string
  message?: string
  thumbnail: string
  mediaType: 'video' | 'photo' | 'post'
}

function parseInstagramItems(html: string, limit: number): InstagramReel[] {
  const seen = new Set<string>()
  const items: InstagramReel[] = []
  const reelCodes = new Set<string>()

  const reelPattern = /instagram\.com\/reel\/([A-Za-z0-9_-]+)/gi
  let match: RegExpExecArray | null
  while ((match = reelPattern.exec(html)) !== null) {
    reelCodes.add(match[1])
  }

  const add = (shortcode: string) => {
    if (seen.has(shortcode)) return
    seen.add(shortcode)
    const type: 'reel' | 'p' = reelCodes.has(shortcode) ? 'reel' : 'p'
    items.push({
      shortcode,
      type,
      permalink: `https://www.instagram.com/${type}/${shortcode}/`,
      thumbnail: `https://www.instagram.com/${type}/${shortcode}/media/?size=l`,
    })
  }

  const jsonPattern = /shortcode\\?"?:\\?"([A-Za-z0-9_-]+)\\?"/g
  while ((match = jsonPattern.exec(html)) !== null) {
    add(match[1])
    if (items.length >= limit) return items
  }

  const postPattern = /instagram\.com\/p\/([A-Za-z0-9_-]+)/gi
  while ((match = postPattern.exec(html)) !== null) {
    add(match[1])
    if (items.length >= limit) return items
  }

  return items
}

export async function fetchInstagramReels(
  limit = INSTAGRAM_REELS_LIMIT
): Promise<InstagramReel[]> {
  const html = await fetchText(SOCIAL_MEDIA.instagram.embedUrl)
  let items = html ? parseInstagramItems(html, limit) : []

  if (!items.length) {
    const profileHtml = await fetchText(SOCIAL_MEDIA.instagram.url)
    items = profileHtml ? parseInstagramItems(profileHtml, limit) : []
  }

  return items
}

const FACEBOOK_FETCH_TIMEOUT_MS = 6000

async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  fallback: T
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ])
}

function isYouTubeShort(title: string, link: string): boolean {
  return (
    /#shorts/i.test(title) ||
    /#short\b/i.test(title) ||
    /\/shorts\//i.test(link) ||
    /\bshorts\b/i.test(title)
  )
}

function parseYouTubeRssEntries(xml: string): YouTubeVideo[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')
  const entries = doc.querySelectorAll('entry')
  const videos: YouTubeVideo[] = []

  entries.forEach((entry) => {
    const id =
      entry.getElementsByTagNameNS(
        'http://www.youtube.com/xml/schemas/2015',
        'videoId'
      )[0]?.textContent ??
      entry.querySelector('videoId')?.textContent ??
      entry.querySelector('id')?.textContent?.replace('yt:video:', '')

    if (!id) return

    const title = entry.querySelector('title')?.textContent ?? ''
    const link =
      entry.querySelector('link[rel="alternate"]')?.getAttribute('href') ??
      `https://www.youtube.com/watch?v=${id}`
    const publishedAt = entry.querySelector('published')?.textContent ?? ''

    videos.push({
      id,
      title,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      permalink: link,
      publishedAt,
      isShort: isYouTubeShort(title, link),
    })
  })

  return videos
}

async function fetchYouTubeViaApi(): Promise<YouTubeVideo[]> {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
  if (!apiKey) return []

  const playlistId = SOCIAL_MEDIA.youtube.uploadsPlaylistId
  const allItems: Array<{
    snippet: {
      title: string
      publishedAt: string
      resourceId: { videoId: string }
      thumbnails: { high?: { url: string }; medium?: { url: string } }
    }
    contentDetails: { videoId: string }
  }> = []
  let pageToken: string | undefined

  do {
    const url = new URL(
      'https://www.googleapis.com/youtube/v3/playlistItems'
    )
    url.searchParams.set('part', 'snippet,contentDetails')
    url.searchParams.set('playlistId', playlistId)
    url.searchParams.set('maxResults', '50')
    url.searchParams.set('key', apiKey)
    if (pageToken) url.searchParams.set('pageToken', pageToken)

    const data = await fetchJson<{
      items?: typeof allItems
      nextPageToken?: string
    }>(url.toString())

    if (!data?.items?.length) break
    allItems.push(...data.items)
    pageToken = data.nextPageToken
  } while (pageToken && allItems.length < YOUTUBE_FETCH_LIMIT)

  return allItems.map((item) => {
    const id =
      item.contentDetails?.videoId ?? item.snippet.resourceId.videoId
    const title = item.snippet.title
    return {
      id,
      title,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      permalink: `https://www.youtube.com/watch?v=${id}`,
      publishedAt: item.snippet.publishedAt,
      isShort: isYouTubeShort(title, ''),
    }
  })
}

export async function fetchYouTubeCatalog(): Promise<{
  shorts: YouTubeVideo[]
  videos: YouTubeVideo[]
}> {
  let catalog = await fetchYouTubeViaApi()

  if (!catalog.length) {
    const xml = await fetchText(SOCIAL_MEDIA.youtube.rssUrl)
    if (xml) catalog = parseYouTubeRssEntries(xml)
  }

  let shorts = catalog.filter((v) => v.isShort)
  let videos = catalog.filter((v) => !v.isShort)

  if (!shorts.length && catalog.length > 0) {
    shorts = catalog.slice(0, Math.min(8, catalog.length))
    videos = catalog.slice(shorts.length)
  }

  if (!videos.length && catalog.length > shorts.length) {
    videos = catalog.filter((v) => !shorts.some((s) => s.id === v.id))
  }

  return { shorts, videos }
}

type GraphPost = {
  id: string
  permalink_url?: string
  full_picture?: string
  message?: string
  attachments?: {
    data?: Array<{
      media_type?: string
      media?: { image?: { src?: string }; source?: string }
    }>
  }
}

function mapGraphPosts(posts: GraphPost[], token?: string): FacebookPost[] {
  return posts
    .filter((p) => p.permalink_url)
    .map((p) => {
      const attachment = p.attachments?.data?.[0]
      const mediaImage = attachment?.media?.image?.src
      const isVideo =
        attachment?.media_type === 'video' ||
        p.permalink_url?.includes('/videos/') ||
        p.permalink_url?.includes('/reel/')

      return {
        id: p.id,
        permalink: p.permalink_url!,
        message: p.message,
        thumbnail:
          p.full_picture ??
          mediaImage ??
          (token
            ? `https://graph.facebook.com/${p.id}/picture?type=large&access_token=${token}`
            : SOCIAL_MEDIA.facebook.pagePicture),
        mediaType: isVideo ? ('video' as const) : ('photo' as const),
      }
    })
}

type GraphVideo = {
  id: string
  permalink_url?: string
  title?: string
  description?: string
  picture?: string
}

function mapGraphVideos(videos: GraphVideo[]): FacebookPost[] {
  return videos
    .filter((v) => v.permalink_url)
    .map((v) => ({
      id: v.id,
      permalink: v.permalink_url!,
      message: v.title ?? v.description,
      thumbnail: v.picture ?? '',
      mediaType: 'video' as const,
    }))
}

async function fetchFacebookViaServerGraph(): Promise<FacebookPost[]> {
  const posts: FacebookPost[] = []

  for (const endpoint of ['published_posts', 'posts', 'feed']) {
    const data = await fetchJson<{ data?: GraphPost[] }>(
      `/api/social/facebook-graph/${endpoint}`
    )
    if (data?.data?.length) posts.push(...mapGraphPosts(data.data))
  }

  const videosData = await fetchJson<{ data?: GraphVideo[] }>(
    '/api/social/facebook-graph/videos'
  )
  if (videosData?.data?.length) posts.push(...mapGraphVideos(videosData.data))

  return dedupeFacebookPosts(posts)
}

async function fetchFacebookViaGraph(): Promise<FacebookPost[]> {
  const token = import.meta.env.VITE_FACEBOOK_ACCESS_TOKEN
  if (!token) return []

  const posts: FacebookPost[] = []

  for (const endpoint of ['published_posts', 'posts', 'feed']) {
    const graphUrl = new URL(
      `https://graph.facebook.com/v21.0/${SOCIAL_MEDIA.facebook.pageId}/${endpoint}`
    )
    graphUrl.searchParams.set(
      'fields',
      'id,permalink_url,full_picture,message,created_time,attachments{media_type,media{image{src},source}}'
    )
    graphUrl.searchParams.set('limit', '30')
    graphUrl.searchParams.set('access_token', token)

    const data = await fetchJson<{ data?: GraphPost[] }>(graphUrl.toString())
    if (data?.data?.length) posts.push(...mapGraphPosts(data.data, token))
  }

  const videosUrl = new URL(
    `https://graph.facebook.com/v21.0/${SOCIAL_MEDIA.facebook.pageId}/videos`
  )
  videosUrl.searchParams.set(
    'fields',
    'id,permalink_url,title,description,picture,created_time'
  )
  videosUrl.searchParams.set('limit', '25')
  videosUrl.searchParams.set('access_token', token)

  const videosData = await fetchJson<{ data?: GraphVideo[] }>(
    videosUrl.toString()
  )
  if (videosData?.data?.length) posts.push(...mapGraphVideos(videosData.data))

  return dedupeFacebookPosts(posts)
}

function dedupeFacebookPosts(posts: FacebookPost[]): FacebookPost[] {
  const seen = new Set<string>()
  return posts.filter((p) => {
    const key = p.permalink || p.id
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

async function fetchFacebookStaticBundle(): Promise<FacebookPost[]> {
  try {
    const res = await fetch('/data/facebook-posts.json')
    if (!res.ok) return []
    const data = (await res.json()) as FacebookPost[]
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function parseFacebookFromHtml(html: string): FacebookPost[] {
  const posts: FacebookPost[] = []
  const seen = new Set<string>()
  const page = SOCIAL_MEDIA.facebook.pageId

  const addPost = (permalink: string, id: string, mediaType: 'video' | 'photo' | 'post') => {
    const clean = permalink.split('&')[0].split('"')[0].replace(/\\\//g, '/')
    if (!clean.startsWith('http') || seen.has(clean)) return
    seen.add(clean)
    posts.push({
      id,
      permalink: clean,
      thumbnail: SOCIAL_MEDIA.facebook.pagePicture,
      mediaType,
    })
  }

  const permalinkJson =
    /"permalink"\s*:\s*"(https:\/\/www\.facebook\.com\/[^"]+)"/gi
  let jsonMatch: RegExpExecArray | null
  while ((jsonMatch = permalinkJson.exec(html)) !== null) {
    const permalink = jsonMatch[1].replace(/\\\//g, '/')
    if (!permalink.includes(page)) continue
    addPost(
      permalink,
      permalink,
      permalink.includes('/videos/') ? 'video' : 'photo'
    )
    if (posts.length >= 24) return posts
  }

  const pfbidRe = new RegExp(
    `/${page}/posts/(pfbid[a-zA-Z0-9_-]+)`,
    'gi'
  )
  while ((jsonMatch = pfbidRe.exec(html)) !== null) {
    addPost(
      `https://www.facebook.com/${page}/posts/${jsonMatch[1]}`,
      jsonMatch[1],
      'photo'
    )
    if (posts.length >= 24) return posts
  }

  const patterns: Array<{ re: RegExp; type: 'video' | 'photo' }> = [
    {
      re: new RegExp(
        `https://www\\.facebook\\.com/${page}/posts/(\\d+)`,
        'gi'
      ),
      type: 'photo',
    },
    {
      re: new RegExp(
        `https://www\\.facebook\\.com/${page}/videos/(\\d+)`,
        'gi'
      ),
      type: 'video',
    },
    { re: /\/reel\/(\d+)/gi, type: 'video' },
  ]

  for (const { re, type } of patterns) {
    let match: RegExpExecArray | null
    while ((match = re.exec(html)) !== null) {
      addPost(match[0], match[1] ?? match[0], type)
      if (posts.length >= 24) return posts
    }
  }

  const fbidRe = /story_fbid=(\d+)/gi
  while ((jsonMatch = fbidRe.exec(html)) !== null) {
    addPost(
      `https://www.facebook.com/photo.php?fbid=${jsonMatch[1]}`,
      jsonMatch[1],
      'photo'
    )
    if (posts.length >= 24) return posts
  }

  return posts
}

async function scrapeFacebookPosts(): Promise<FacebookPost[]> {
  const htmlSources = [SOCIAL_MEDIA.facebook.pageUrl]
  for (const url of htmlSources) {
    const html = await fetchText(url, 8000)
    if (!html) continue
    const parsed = parseFacebookFromHtml(html)
    if (parsed.length) return parsed
  }
  return []
}

export async function fetchFacebookPosts(): Promise<FacebookPost[]> {
  const quickSources: Array<() => Promise<FacebookPost[]>> = [
    () => fetchFacebookStaticBundle(),
    () => Promise.resolve(loadCachedFacebookPosts()),
    () => fetchFacebookViaServerGraph(),
    () => fetchFacebookViaGraph(),
  ]

  for (const load of quickSources) {
    const posts = await load()
    if (posts.length) {
      saveCachedFacebookPosts(posts)
      return posts
    }
  }

  const scraped = await withTimeout(scrapeFacebookPosts(), FACEBOOK_FETCH_TIMEOUT_MS, [])
  if (scraped.length) {
    saveCachedFacebookPosts(scraped)
    return scraped
  }

  const cached = loadCachedFacebookPosts()
  if (cached.length) return cached

  return []
}

export function getInstagramPreviewEmbedUrl(
  shortcode: string,
  type: 'reel' | 'p' = 'reel'
): string {
  return `https://www.instagram.com/${type}/${shortcode}/embed/`
}

export function getInstagramReelEmbedUrl(
  shortcode: string,
  type: 'reel' | 'p' = 'reel'
): string {
  return `https://www.instagram.com/${type}/${shortcode}/embed/?autoplay=1`
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
}

export function getFacebookPreviewEmbedUrl(permalink: string): string {
  const href = encodeURIComponent(permalink)
  if (
    permalink.includes('/videos/') ||
    permalink.includes('/reel/') ||
    permalink.endsWith('/videos/')
  ) {
    return `https://www.facebook.com/plugins/video.php?href=${href}&show_text=false&width=350&height=500&adapt_container_width=true`
  }
  if (permalink.endsWith('/') && permalink.includes('facebook.com/Jamiat')) {
    return `https://www.facebook.com/plugins/page.php?href=${href}&tabs=timeline&width=350&height=500&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false`
  }
  return `https://www.facebook.com/plugins/post.php?href=${href}&show_text=false&width=350&height=500&adapt_container_width=true`
}

export function getFacebookPostEmbedUrl(permalink: string): string {
  if (permalink.includes('/videos/') || permalink.includes('/reel/')) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(permalink)}&show_text=false&width=500`
  }
  return `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(permalink)}&show_text=false&width=500`
}
