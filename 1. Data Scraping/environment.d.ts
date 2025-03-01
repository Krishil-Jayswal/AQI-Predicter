declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ACCESS_TOKEN: string;
      COOKIE: string;
      AGENT: string;
    }
  }
}

export {};
