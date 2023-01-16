/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COGNITO_IDP_ENDPOINT: string;
  readonly VITE_COGNITO_CLIENT_ID: string;
  readonly VITE_COGNITO_CLIENT_SECRET: string;
  readonly VITE_PUBLIC_MEDIA_URL: string;
  readonly VITE_PUBLIC_API_URL: string;
  readonly VITE_PUBLIC_WS_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
