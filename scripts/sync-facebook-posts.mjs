/**
 * Sync Facebook posts + videos to public/data/facebook-posts.json
 * Requires VITE_FACEBOOK_ACCESS_TOKEN in .env (Page Access Token)
 *
 * Run: npm run sync:facebook
 */
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

function loadEnv() {
  try {
    const raw = readFileSync(resolve('.env'), 'utf8')
    const env = {}
    for (const line of raw.split('\n')) {
      const m = line.match(/^([^#=]+)=(.*)$/)
      if (m) env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '')
    }
    return env
  } catch {
    return {}
  }
}

function dedupe(posts) {
  const seen = new Set()
  return posts.filter((p) => {
    const key = p.permalink || p.id
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const { VITE_FACEBOOK_ACCESS_TOKEN: token } = loadEnv()
const pageId = 'JamiatAhlehadeesOfficialHydSec'

if (!token) {
  console.error('Missing VITE_FACEBOOK_ACCESS_TOKEN in .env')
  console.error('Create a Meta app, connect the page, and add a long-lived Page Access Token.')
  process.exit(1)
}

async function fetchGraph(endpoint, fields, limit = '30') {
  const url = new URL(`https://graph.facebook.com/v21.0/${pageId}/${endpoint}`)
  url.searchParams.set('fields', fields)
  url.searchParams.set('limit', limit)
  url.searchParams.set('access_token', token)
  const res = await fetch(url)
  const json = await res.json()
  if (json.error) {
    console.warn(`${endpoint}:`, json.error.message)
    return []
  }
  return json.data ?? []
}

const postFields =
  'id,permalink_url,full_picture,message,created_time,attachments{media_type,media{image{src}}}'
const videoFields =
  'id,permalink_url,title,description,picture,created_time'

const allPosts = []

for (const endpoint of ['published_posts', 'posts', 'feed']) {
  const data = await fetchGraph(endpoint, postFields)
  for (const p of data) {
    if (!p.permalink_url) continue
    const attachment = p.attachments?.data?.[0]
    const mediaImage = attachment?.media?.image?.src
    const isVideo =
      attachment?.media_type === 'video' ||
      p.permalink_url.includes('/videos/') ||
      p.permalink_url.includes('/reel/')
    allPosts.push({
      id: p.id,
      permalink: p.permalink_url,
      message: p.message,
      thumbnail:
        p.full_picture ??
        mediaImage ??
        `https://graph.facebook.com/${p.id}/picture?type=large&access_token=${token}`,
      mediaType: isVideo ? 'video' : 'photo',
    })
  }
}

const videos = await fetchGraph('videos', videoFields, '25')
for (const v of videos) {
  if (!v.permalink_url) continue
  allPosts.push({
    id: v.id,
    permalink: v.permalink_url,
    message: v.title ?? v.description,
    thumbnail: v.picture ?? '',
    mediaType: 'video',
  })
}

const posts = dedupe(allPosts)

writeFileSync(
  resolve('public/data/facebook-posts.json'),
  JSON.stringify(posts, null, 2)
)
console.log(`Wrote ${posts.length} Facebook items to public/data/facebook-posts.json`)
