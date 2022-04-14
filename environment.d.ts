// declare global env variable to define types
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DISCORD_API_KEY: string;
      }
    }
  }
  
  export { };