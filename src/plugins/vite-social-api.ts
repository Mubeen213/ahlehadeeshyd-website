import type { Connect, Plugin } from 'vite'
import { loadEnv } from 'vite'

const PAGE_ID = 'JamiatAhlehadeesOfficialHydSec'
const GRAPH_FIELDS =
  'id,permalink_url,full_picture,message,created_time,attachments{media_type,media{image{src},source},subattachments}'
const VIDEO_FIELDS =
  'id,permalink_url,title,description,picture,created_time,source'

async function proxyFacebookGraph(
  endpoint: string,
  token: string
): Promise<{ status: number; body: string }> {
  const graphUrl = new URL(`https://graph.facebook.com/v21.0/${PAGE_ID}/${endpoint}`)
  graphUrl.searchParams.set(
    'fields',
    endpoint === 'videos' ? VIDEO_FIELDS : GRAPH_FIELDS
  )
  graphUrl.searchParams.set('limit', endpoint === 'videos' ? '25' : '30')
  graphUrl.searchParams.set('access_token', token)

  const response = await fetch(graphUrl.toString())
  const body = await response.text()
  return { status: response.status, body }
}

function createFacebookGraphMiddleware(mode: string): Connect.NextHandleFunction {
  return async (req, res, next) => {
    if (!req.url?.startsWith('/api/social/facebook-graph')) {
      next()
      return
    }

    const env = loadEnv(mode, process.cwd(), '')
    const token = env.VITE_FACEBOOK_ACCESS_TOKEN

    if (!token) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ data: [] }))
      return
    }

    const endpoint =
      req.url.replace('/api/social/facebook-graph', '').replace(/^\//, '') ||
      'published_posts'

    try {
      const { status, body } = await proxyFacebookGraph(endpoint, token)
      res.statusCode = status
      res.setHeader('Content-Type', 'application/json')
      res.end(body)
    } catch {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ data: [] }))
    }
  }
}

export function viteSocialApiPlugin(): Plugin {
  let mode = 'development'

  return {
    name: 'vite-social-api',
    config(_, { mode: m }) {
      mode = m
    },
    configureServer(server) {
      server.middlewares.use(createFacebookGraphMiddleware(mode))
    },
    configurePreviewServer(server) {
      server.middlewares.use(createFacebookGraphMiddleware(mode))
    },
  }
}
