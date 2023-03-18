import { UserI } from "./schemas";

declare global {
  namespace Express {
    export interface Request {
      user: UserI
      mercadopagoResponse?: any
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string
    }
  }
}
