/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COGNITO_IDP_ENDPOINT: string;
  readonly VITE_COGNITO_CLIENT_ID: string;
  readonly VITE_COGNITO_CLIENT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
