import { UserI } from "./schemas";

declare global {
  namespace Express {
    export interface Request {
      user: any
      mercadopagoResponse?: any 
      file?: any
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string
    }
  }
}
