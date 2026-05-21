import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  fetchFacebookPosts,
  fetchInstagramReels,
  fetchYouTubeCatalog,
} from '@/lib/socialFeeds'

export function useSocialPrefetch() {
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['instagram-reels'],
      queryFn: () => fetchInstagramReels(),
      staleTime: 1000 * 60 * 30,
    })
    queryClient.prefetchQuery({
      queryKey: ['youtube-catalog'],
      queryFn: fetchYouTubeCatalog,
      staleTime: 1000 * 60 * 30,
    })
    queryClient.prefetchQuery({
      queryKey: ['facebook-posts'],
      queryFn: fetchFacebookPosts,
      staleTime: 1000 * 60 * 30,
    })
  }, [queryClient])
}
