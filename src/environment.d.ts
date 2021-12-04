declare global {
    namespace NodeJS {
      interface ProcessEnv {
        CONNECTION_STRING: string;
        NODE_ENV: 'development' | 'production';
        PORT: number;
        PWD: string;
        CLIENT_SECRET: string;
        CLIENT_ID: string;
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}