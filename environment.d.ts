// declare global env variable to define types
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DISCOVERY_URL: string;
        PERSPECTIVE_API_KEY: string;
        DISCORD_API_KEY: string;
      }
    }
  }
  
  export { };