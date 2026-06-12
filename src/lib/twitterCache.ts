import type { TwitterPost } from '@/lib/twitterFeeds'

const CACHE_KEY = 'jamiat-twitter-posts-v1'

export function loadCachedTwitterPosts(): TwitterPost[] {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as TwitterPost[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveCachedTwitterPosts(posts: TwitterPost[]): void {
  if (!posts.length) return
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(posts))
  } catch {
    /* storage can be unavailable */
  }
}
