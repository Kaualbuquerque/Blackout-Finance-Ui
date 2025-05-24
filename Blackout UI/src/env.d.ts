// src/env.d.ts
interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    // adicione aqui outras VITE_… que você usar
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  