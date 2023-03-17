import { UserI } from "./schemas";

declare global {
  namespace Express {
    interface Request {
      user: UserI
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
export {}
