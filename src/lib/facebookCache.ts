import type { FacebookPost } from '@/lib/socialFeeds'

const CACHE_KEY = 'jamiat-facebook-posts-v2'

export function loadCachedFacebookPosts(): FacebookPost[] {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as FacebookPost[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveCachedFacebookPosts(posts: FacebookPost[]): void {
  if (!posts.length) return
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(posts))
  } catch {
    /* storage full */
  }
}
