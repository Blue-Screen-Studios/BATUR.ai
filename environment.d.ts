// declare global env variable to define types
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DATABASE_PASS: string;
        DISCORD_API_KEY: string;
      }
    }
  }
  
  export { };