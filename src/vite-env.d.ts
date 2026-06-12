/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_YOUTUBE_API_KEY?: string
  readonly VITE_FACEBOOK_ACCESS_TOKEN?: string
  readonly VITE_INSTAGRAM_ACCESS_TOKEN?: string
  readonly VITE_ELFSIGHT_INSTAGRAM_WIDGET_ID?: string
  readonly VITE_ELFSIGHT_FACEBOOK_WIDGET_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
